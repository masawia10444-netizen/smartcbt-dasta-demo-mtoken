import { Region } from "@/utils/carbon-project-helper";

type CarbonFootprintRegionalLegendProps = {
  data: {
    color: {
      bg: string;
      color: string;
      text: string;
    };
    data: number[];
    region: Region;
  }[];
};

const CarbonFootprintRegionalLegend = ({ data }: CarbonFootprintRegionalLegendProps) => {
  return (
    <div className="mx-auto flex flex-wrap justify-center items-center gap-4 text-sm text-smart-cbt-medium-grey mt-4">
      {data.map((r) => (
        <div key={r.region} className="flex items-center gap-2">
          <div className={`h-2 w-2`} style={{ backgroundColor: r.color.color }} />
          {r.region}
        </div>
      ))}
    </div>
  );
};

export default CarbonFootprintRegionalLegend;
