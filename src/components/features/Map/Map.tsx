import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import styled from "styled-components";

const MapBox = styled.div`
  height: 600px;
`;

const MapWrapper = styled.div`
  height: 100%;
`;

type Coordinates = [number, number];

interface MarkerPoint {
  id: number;
  position: Coordinates;
  message: string;
}

interface MapProps {
  defaultPosition: Coordinates;
  markers?: MarkerPoint[];
  draggable?: boolean;
  isControllingHistory?: boolean;
}

const Map = ({ defaultPosition, markers, draggable = true, isControllingHistory = false }: MapProps) => {
  return (
    <MapBox>
      <MapWrapper>
        <MapContainer
          dragging={draggable}
          center={defaultPosition}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", minHeight: "100%" }}
        >
          <MapContent defaultPosition={defaultPosition} markers={markers} isControllingHistory={isControllingHistory} />
        </MapContainer>
      </MapWrapper>
    </MapBox>
  );
};

const MapContent = ({ defaultPosition, markers, isControllingHistory }: MapProps) => {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [zoom, setZoom] = useState(() => map.getZoom());

  useEffect(() => {
    map.locate().on("moveend", () => {
      setPosition(map.getCenter());
    });
  }, [map]);

  useEffect(() => {
    map.locate().on("zoomend", () => {
      setZoom(map.getZoom());
    });
  }, [map]);

  useEffect(() => {
    if (isControllingHistory) {
      window.history.pushState(null, "", `@${position.lat},${position.lng},${zoom}z`);
      window.history.replaceState(null, "", `@${position.lat},${position.lng},${zoom}z`);
    }
  }, [position, zoom]);

  return (
    <>
      <TileLayer
        maxZoom={20}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultPosition}>
        <Popup>
          Hello there, 😊 <br /> According to ipstack this is your current position
        </Popup>
      </Marker>
      {markers &&
        markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.message}</Popup>
          </Marker>
        ))}
    </>
  );
};

export default Map;
