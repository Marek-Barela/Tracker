import { Box } from "@mui/material";
import { Map } from "components";
import { useUserIpInfoQuery } from "redux/api/userIpInfo";

const UserMapPosition = () => {
  const { data } = useUserIpInfoQuery();

  return (
    <Box width="60%" height="300px">
      {data && (
        <Map
          defaultPosition={[data.latitude, data.longitude]}
          userPosition={[data.latitude, data.longitude]}
          defaultZoom={16}
          draggable={false}
          scrollable={false}
        />
      )}
    </Box>
  );
};

export default UserMapPosition;
