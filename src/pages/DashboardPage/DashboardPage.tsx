import { SearchBar } from "components";
import styled from "styled-components";
import { UserMapPosition, SelectedLocationMap, UserLastSearchInfo, UserLocationInfo } from "./components";
import { Box } from "@mui/system";

const SearchWrapper = styled.div`
  padding: 20px 0;
`;

const DashboardPage = () => {
  return (
    <>
      <Box display="flex" gap="20px">
        <UserMapPosition />
        <UserLocationInfo />
      </Box>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <Box display="flex" gap="20px">
        <SelectedLocationMap />
        <UserLastSearchInfo />
      </Box>
    </>
  );
};

export default DashboardPage;
