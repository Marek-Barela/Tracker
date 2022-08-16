import { useAppSelector } from "hooks/useRedux";
import { DetailsList } from "components";
import { IpInfoTypes } from "types/ipInfo";

const UserLastSearchInfo = () => {
  const searchDetails = useAppSelector((state) => state.lastSearchDetails);

  return <>{Object.keys(searchDetails).length !== 0 && <DetailsList data={searchDetails as IpInfoTypes} />}</>;
};

export default UserLastSearchInfo;
