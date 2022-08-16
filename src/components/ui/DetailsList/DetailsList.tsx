import { IpInfoTypes } from "types/ipInfo";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WifiIcon from "@mui/icons-material/Wifi";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const detailsConstructor = (data: IpInfoTypes | undefined) => {
  if (data === undefined) return [];
  return [
    { title: `Country: ${data.country_name || "Unknown"}`, icon: <FlagIcon fontSize="small" /> },
    { title: `City: ${data.city || "Unknown"}`, icon: <LocationCityIcon fontSize="small" /> },
    { title: `IP: ${data.ip || "Unknown"}`, icon: <WifiIcon fontSize="small" /> },
    { title: `IP version: ${data.version || "Unknown"}`, icon: <WifiTetheringIcon fontSize="small" /> },
    { title: `Latitude: ${data.latitude || "Unknown"}`, icon: <SwapHorizIcon fontSize="small" /> },
    { title: `Longitude: ${data.longitude || "Unknown"}`, icon: <SwapVertIcon fontSize="small" /> },
  ];
};

interface DetailsListProps {
  data: IpInfoTypes | undefined;
}

const DetailsList = ({ data }: DetailsListProps) => {
  const details = detailsConstructor(data);

  return (
    <List sx={{ padding: 0 }}>
      {details.map((detail, index) => (
        <ListItem key={index}>
          <ListItemIcon>{detail.icon}</ListItemIcon>
          <ListItemText>{detail.title}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default DetailsList;
