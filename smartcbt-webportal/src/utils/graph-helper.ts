import { Plugin } from "chart.js";

export const ShadowPlugin: Plugin<"polarArea">[] = [
  {
    id: "shadow",
    beforeDraw: (chart) => {
      const { ctx } = chart;
      const _fill = ctx.fill;
      ctx.fill = function () {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 1;
        _fill.apply(this, arguments as any);
        ctx.restore();
      };
    },
  },
];
