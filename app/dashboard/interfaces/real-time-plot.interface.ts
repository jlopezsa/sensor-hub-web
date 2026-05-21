export interface SeriesPoint {
  time: string;
  value: number;
}

export interface SensorMessage {
  sensor_id?: string | number;
  value?: number;
  time?: string;
  timestamp?: string | number;
}

export interface RealtimePlotProps {
  wsUrl: string;
  maxPoints: number;
  title?: string;
  sensorLabel?: string;
  unit?: string;
  timeRangeLabel?: string;
  colors: {
    background: string;
    grid: string;
    line: string;
    text: string;
    muted?: string;
    accent?: string;
  };
}
