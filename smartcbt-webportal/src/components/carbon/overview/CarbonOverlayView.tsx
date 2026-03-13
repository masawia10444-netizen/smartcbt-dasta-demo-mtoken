import { OverlayView, OverlayViewF } from "@react-google-maps/api";
import { MarkerItem } from "./CarbonFootprintMap";
import { cn } from "@/utils/cn";

type CarbonCustomOverlayViewProps = { item?: MarkerItem; style: "region" | "detail" };

const CarbonCustomOverlayView = ({ item, style }: CarbonCustomOverlayViewProps) => {
  return item?.position ? (
    <OverlayViewF
      position={item?.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(ow, oh) => ({ x: -ow / 2, y: -oh / 2 })}
    >
      {style == "region" && (
        <div className={cn("flex flex-col gap-1 rounded-xl bg-white p-2 shadow-lg")}>
          <p className="text-xs" style={{ color: item?.color }}>
            {item?.name}
          </p>
          <p className="text-base" style={{ color: item?.color }}>
            {item?.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} kgCO2eq
          </p>
        </div>
      )}
      {style == "detail" && (
        <p className={cn("rounded-xl bg-white p-2 text-sm font-medium shadow-lg")} style={{ color: item?.color }}>
          <span className="mr-2">{item?.name}</span>
          <span>{item?.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} kgCO2eq</span>
        </p>
      )}
    </OverlayViewF>
  ) : (
    <div></div>
  );
};

export default CarbonCustomOverlayView;
