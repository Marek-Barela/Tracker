import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import type { Coordinates } from "types/coordinates";

const MapWrapper = styled.div`
  height: 100%;
`;

interface MarkerPoint {
  id: number;
  position: Coordinates;
  message: string;
}

interface MapProps {
  defaultPosition?: Coordinates;
  userPosition?: Coordinates;
  markers?: MarkerPoint[];
  draggable?: boolean;
  scrollable?: boolean;
  isControllingHistory?: boolean;
  defaultZoom?: number;
  latlng?: { lat: number; lng: number };
  zoom?: number;
}

const Map = ({
  defaultPosition,
  userPosition,
  markers,
  draggable = true,
  scrollable = true,
  isControllingHistory = false,
  defaultZoom,
  latlng,
  zoom = 16,
}: MapProps) => {
  return (
    <MapWrapper>
      <MapContainer
        dragging={draggable}
        center={defaultPosition}
        zoom={defaultZoom}
        scrollWheelZoom={scrollable}
        style={{ height: "100%", minHeight: "100%" }}
      >
        <MapContent
          userPosition={userPosition}
          markers={markers}
          isControllingHistory={isControllingHistory}
          latlng={latlng}
          zoom={zoom}
        />
      </MapContainer>
    </MapWrapper>
  );
};

interface MapContentProps {
  userPosition?: Coordinates;
  markers?: MarkerPoint[];
  isControllingHistory?: boolean;
  latlng?: { lat: number; lng: number };
  zoom: number;
}

const MapContent = ({ userPosition, markers, isControllingHistory, latlng, zoom }: MapContentProps) => {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [mapZoom, setMapZoom] = useState(() => map.getZoom());

  useEffect(() => {
    map.locate().on("moveend", () => {
      setPosition(map.getCenter());
    });
  }, [map]);

  useEffect(() => {
    map.locate().on("zoomend", () => {
      setMapZoom(map.getZoom());
    });
  }, [map]);

  useEffect(() => {
    if (latlng === undefined) return;
    if (latlng.lat === 0 && latlng.lng === 0) return;
    map.setView([latlng.lat, latlng.lng], zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latlng]);

  useEffect(() => {
    if (isControllingHistory) {
      window.history.pushState(null, "", `@${position.lat},${position.lng},${mapZoom}z`);
      window.history.replaceState(null, "", `@${position.lat},${position.lng},${mapZoom}z`);
    }
  }, [position, zoom, isControllingHistory]);

  return (
    <>
      <TileLayer
        maxZoom={20}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userPosition && (
        <Marker position={userPosition}>
          <Popup>
            Hello there, 😊 <br /> According to ip api this is your current position
          </Popup>
        </Marker>
      )}
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
