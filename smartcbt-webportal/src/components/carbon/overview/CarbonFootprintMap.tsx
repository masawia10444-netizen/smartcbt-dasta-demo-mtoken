import { GoogleMapLoader } from "@/components/GoogleMap";
import {
  Region,
  covertGroupMapCarbonProvincesMaker,
  covertGroupMapCarbonRegionsMaker,
} from "@/utils/carbon-project-helper";
import { GroupMapCarbon } from "@/utils/cms/adapters/website/carbon/types";
import { useState } from "react";
import CarbonCustomOverlayView from "./CarbonOverlayView";

export type MarkerItem = {
  name: string;
  value: number;
  color: string;
  position: { lat: number; lng: number };
  key: string;
};

type CarbonFootprintMap = {
  groupMapCarbon: GroupMapCarbon;
};

const CarbonFootprintMap = ({ groupMapCarbon }: CarbonFootprintMap) => {
  const groupMapCarbonRegions = groupMapCarbon.filter((g) => g.category == "region");
  const groupMapCarbonProvinces = groupMapCarbon
    .filter((g) => g.category == "province")
    .map((p) => covertGroupMapCarbonProvincesMaker(p));

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerType, setMarkerType] = useState<"region" | "detail">("region");

  const detailMarkers = groupMapCarbonProvinces;
  const regionMarkers = [
    covertGroupMapCarbonRegionsMaker(groupMapCarbonRegions, Region.North),
    covertGroupMapCarbonRegionsMaker(groupMapCarbonRegions, Region.West),
    covertGroupMapCarbonRegionsMaker(groupMapCarbonRegions, Region.East),
    covertGroupMapCarbonRegionsMaker(groupMapCarbonRegions, Region.Central),
    covertGroupMapCarbonRegionsMaker(groupMapCarbonRegions, Region.NorthEast),
    covertGroupMapCarbonRegionsMaker(groupMapCarbonRegions, Region.South),
  ];

  const handleZoomChanged = () => {
    const currentZoom = map?.getZoom();
    currentZoom && setMarkerType(currentZoom < 8 ? "region" : "detail");
  };

  const options: google.maps.MapOptions | undefined = {
    mapTypeControl: false,
    zoomControl: false,
    restriction: { latLngBounds: { east: 106, west: 96, north: 22, south: 5 } },
    minZoom: 6,
    maxZoom: 13,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const center: google.maps.LatLng | google.maps.LatLngLiteral | undefined = { lat: 13.7, lng: 101.5 };

  return (
    <GoogleMapLoader
      options={options}
      zoom={6}
      center={center}
      onLoad={(map) => {
        setMap(map);
        handleZoomChanged();
      }}
      onZoomChanged={handleZoomChanged}
    >
      {(markerType == "region" ? regionMarkers : detailMarkers).map((item) => (
        <CarbonCustomOverlayView key={item?.key} item={item as any} style={markerType} />
      ))}
    </GoogleMapLoader>
  );
};

export default CarbonFootprintMap;
