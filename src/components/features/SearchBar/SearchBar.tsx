import { useCombobox } from "downshift";
import { useLazyProvidedIpInfoQuery } from "redux/api/userIpInfo";
import React, { useState } from "react";
import { TextField, Box, List, ListItem, Button, ListItemText, Grow } from "@mui/material";
import { styled } from "@mui/system";
import { isValidIp } from "utils/isValidIpRegEx";
import { isValidUrl } from "utils/isValidUrlRegEx";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { HistoryTypes, historyAdded } from "redux/slices/searchHistory";
import { setLastSearchDetails } from "redux/slices/lastSearchDetails";
import { stringTruncate } from "utils/stringTruncate";
import { getCoordinatesFromUrl } from "utils/getCoordinatesFromUrl";

const StyledList = styled(List)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  marginTop: "10px",
  zIndex: 100000,
}));

const getHistoryFilter = (inputValue: string) => {
  return function historyFilter(history: HistoryTypes) {
    return (
      !inputValue ||
      history.primaryText.toLowerCase().includes(inputValue) ||
      history.secondaryText.toLowerCase().includes(inputValue)
    );
  };
};

const SearchBar = () => {
  const dropdownList = useAppSelector((state) => [
    //Select only unique values for dropdown
    ...new Map(state.searchHistory.map((item) => [item["primaryText"], item])).values(),
  ]);
  const [isError, setIsError] = useState(false);
  const [items, setItems] = useState<HistoryTypes[]>(dropdownList);
  const dispatch = useAppDispatch();

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    openMenu,
    inputValue,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(dropdownList.filter(getHistoryFilter(inputValue || "")));
    },
    items,
    itemToString(item) {
      return item ? item.primaryText : "";
    },
  });

  const [search] = useLazyProvidedIpInfoQuery();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidIp(inputValue)) {
      search(inputValue, true).then((res) => {
        if (res.data === undefined) return;
        dispatch(
          historyAdded({
            primaryText: inputValue,
            secondaryText: `${res.data.latitude || ""} ${res.data.longitude || ""}`,
          })
        );
        dispatch(setLastSearchDetails({ ...res.data, zoom: 16 }));
      });
      return;
    }

    if (isValidUrl(inputValue)) {
      const coordinates = getCoordinatesFromUrl(inputValue);
      if (coordinates === undefined) return;
      dispatch(
        historyAdded({ primaryText: inputValue, secondaryText: `${coordinates[0] || ""} ${coordinates[1] || ""}` })
      );
      dispatch(setLastSearchDetails({ latitude: coordinates[0], longitude: coordinates[1], zoom: coordinates[2] }));
      return;
    }

    setIsError(true);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <Box {...getComboboxProps()} sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <TextField
            label="IP or URL"
            variant="outlined"
            placeholder="Enter IP address or URL"
            onChangeCapture={() => setIsError(false)}
            size="small"
            sx={{ width: "100%" }}
            required
            onFocus={openMenu}
            error={isError}
            helperText={isError ? "You provided incorrect IP or URL" : ""}
            {...getInputProps()}
          />
          <Button variant="contained" color="primary" sx={{ height: "40px" }} type="submit">
            Search
          </Button>
        </Box>
      </form>
      <Grow in={isOpen}>
        <StyledList {...getMenuProps()} sx={{ border: (!isOpen || items.length === 0) && "none" }}>
          {isOpen && (
            <>
              {items.map((item, index) => (
                <ListItem
                  key={`${item.id}${item.primaryText}${index}`}
                  sx={{
                    backgroundColor: highlightedIndex === index ? "#bde4ff" : "inherit",
                    cursor: "pointer",
                  }}
                  {...getItemProps({ item, index })}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: { fontWeight: selectedItem === item ? "bold" : "" } }}
                    primary={stringTruncate(item.primaryText, 30)}
                    secondary={item.secondaryText}
                  />
                </ListItem>
              ))}
            </>
          )}
        </StyledList>
      </Grow>
    </Box>
  );
};

export default SearchBar;
