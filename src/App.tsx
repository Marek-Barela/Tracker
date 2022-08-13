import { useUserIpInfoQuery, useProvidedIpInfoQuery } from "redux/api/userIpInfo";

const App = () => {
  const { data } = useUserIpInfoQuery();
  const { data: dataLocation } = useProvidedIpInfoQuery("134.201.250.155");

  return (
    <div>
      {data && (
        <h1>
          User ip: {data.ip} {data.city}{" "}
        </h1>
      )}
      {dataLocation && (
        <h1>
          Provided ip info: {dataLocation.ip} {dataLocation.city}{" "}
        </h1>
      )}
    </div>
  );
};

export default App;
