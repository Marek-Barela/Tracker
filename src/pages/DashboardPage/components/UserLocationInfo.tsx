import { useUserIpInfoQuery } from "redux/api/userIpInfo";
import { DetailsList } from "components";

const UserLocationInfo = () => {
  const { data } = useUserIpInfoQuery();

  return <DetailsList data={data} />;
};

export default UserLocationInfo;
