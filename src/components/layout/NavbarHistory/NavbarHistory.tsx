import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Drawer, List, Divider, IconButton, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useAppSelector, useAppDispatch } from "hooks/useRedux";
import { setMenuOpen } from "redux/slices/openMenu";
import { HistoryTypes } from "redux/slices/searchHistory";
import { setLastSearchDetails } from "redux/slices/lastSearchDetails";

const drawerWidth = 280;

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface NavbarHistoryProps {
  isMobile: boolean;
}

const NavbarHistory = ({ isMobile }: NavbarHistoryProps) => {
  const searchHistory = useAppSelector((state) => state.searchHistory);
  const isMenuOpen = useAppSelector((state) => state.openMenu);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(setMenuOpen(false));
  };

  const handleHistoryClick = (historyItem: HistoryTypes) => {
    dispatch(setLastSearchDetails({ ...historyItem }));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        position: isMobile ? "absolute" : "static",
      }}
      variant="persistent"
      anchor="left"
      open={isMenuOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {searchHistory.length !== 0 ? (
          searchHistory.map((historyItem) => (
            <ListItem key={historyItem.id} disablePadding onClick={() => handleHistoryClick(historyItem)}>
              <ListItemButton>
                <ListItemText
                  primary={historyItem.primaryText}
                  secondary={historyItem.secondaryText}
                  sx={{ overflow: "hidden" }}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Your history is empty" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default NavbarHistory;
