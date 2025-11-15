'use client';

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type SeriesPoint = {
  time: string;
  value: number;
};

type RealtimePlotProps = {
  temperature: SeriesPoint[];
  humidity: SeriesPoint[];
  colors: {
    background: string;
    grid: string;
    temperature: string;
    humidity: string;
    text: string;
  };
};

export function RealtimePlot({ temperature, humidity, colors }: RealtimePlotProps) {
  const data = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Temperatura",
      x: temperature.map((point) => point.time),
      y: temperature.map((point) => point.value),
      line: {
        color: colors.temperature,
        shape: "spline",
        smoothing: 1.3,
        width: 3,
      },
      marker: { color: colors.temperature, size: 6 },
    },
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Humedad",
      x: humidity.map((point) => point.time),
      y: humidity.map((point) => point.value),
      line: {
        color: colors.humidity,
        shape: "spline",
        smoothing: 1.3,
        width: 3,
      },
      marker: { color: colors.humidity, size: 6 },
    },
  ];

  const layout = {
    autosize: true,
    paper_bgcolor: colors.background,
    plot_bgcolor: colors.background,
    font: {
      color: colors.text,
      family: "Inter, 'SF Pro Display', system-ui, sans-serif",
    },
    margin: { t: 20, r: 20, b: 40, l: 50 },
    xaxis: {
      title: "Tiempo",
      gridcolor: colors.grid,
      zerolinecolor: colors.grid,
    },
    yaxis: {
      title: "Valor sincronizado",
      gridcolor: colors.grid,
      zerolinecolor: colors.grid,
    },
    legend: {
      orientation: "h",
      x: 0,
      y: 1.2,
    },
  };

  const config = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      "lasso2d",
      "select2d",
      "autoScale2d",
      "toggleSpikelines",
      "zoomIn2d",
      "zoomOut2d",
      "hoverClosestCartesian",
      "hoverCompareCartesian",
    ],
  };

  return <Plot data={data as any} layout={layout as any} config={config} useResizeHandler style={{ width: "100%", height: "100%" }} />;
}
