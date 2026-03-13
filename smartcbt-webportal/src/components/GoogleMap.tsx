import { GoogleMapProps, GoogleMap as Map, Marker, useJsApiLoader } from "@react-google-maps/api";
import { PropsWithChildren } from "react";

const LoadingMap = () => {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-5">
      <div className="flex animate-pulse space-x-2">
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
};

const thaiLatLong = {
  lat: 13.736717,
  lng: 100.523186,
};

const GoogleMap = (props: GoogleMapProps & { hideMarker?: boolean }) => {
  return (
    <GoogleMapLoader {...props}>
      {!props.hideMarker && <Marker position={props.center ?? thaiLatLong} />}
    </GoogleMapLoader>
  );
};

export default GoogleMap;

export const GoogleMapLoader = (props: PropsWithChildren<GoogleMapProps>) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });
  const { center, zoom, children } = props;

  return isLoaded ? (
    <Map mapContainerClassName="h-[400px] w-full lg:h-full" center={center ?? thaiLatLong} zoom={zoom ?? 15} {...props}>
      {children}
    </Map>
  ) : (
    <LoadingMap />
  );
};
