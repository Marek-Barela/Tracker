import { SearchBar } from "components";
import styled from "styled-components";
import { UserMapPosition, SelectedLocationMap, UserLastSearchInfo, UserLocationInfo } from "./components";
import Grid from "@mui/system/Unstable_Grid";

const SearchWrapper = styled.div`
  padding: 20px 0;
`;

const DashboardPage = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <UserMapPosition />
        </Grid>
        <Grid xs={12} md={6}>
          <UserLocationInfo />
        </Grid>
        <Grid xs={12}>
          <SearchWrapper>
            <SearchBar />
          </SearchWrapper>
        </Grid>
        <Grid xs={12} md={6}>
          <SelectedLocationMap />
        </Grid>
        <Grid xs={12} md={6}>
          <UserLastSearchInfo />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
