import { SearchBar } from "components";
import styled from "styled-components";
import { UserMapPosition, SelectedLocationMap } from "./components";
import { Box } from "@mui/system";

const SearchWrapper = styled.div`
  padding: 20px 0;
`;

const DashboardPage = () => {
  return (
    <>
      <Box>
        <UserMapPosition />
      </Box>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <Box>
        <SelectedLocationMap />
      </Box>
    </>
  );
};

export default DashboardPage;
