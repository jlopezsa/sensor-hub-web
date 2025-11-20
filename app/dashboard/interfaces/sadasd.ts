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
  data: SeriesPoint[];
  wsUrl: string;
  maxPoints: number;
  colors: {
    background: string;
    grid: string;
    line: string;
    text: string;
  };
}
