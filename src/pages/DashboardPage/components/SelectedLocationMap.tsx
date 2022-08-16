import { Box } from "@mui/material";
import { Map } from "components";
import { useAppSelector } from "hooks/useRedux";
import { useUserIpInfoQuery } from "redux/api/userIpInfo";

const SelectedLocationMap = () => {
  const { data } = useUserIpInfoQuery();
  const searchDetails = useAppSelector((state) => state.lastSearchDetails);

  return (
    <Box height="300px">
      {data && (
        <Map
          defaultPosition={[data.latitude, data.longitude]}
          defaultZoom={16}
          latlng={{ lat: searchDetails.latitude || 0, lng: searchDetails.longitude || 0 }}
          isControllingHistory
          zoom={searchDetails.zoom || 16}
        />
      )}
    </Box>
  );
};

export default SelectedLocationMap;
