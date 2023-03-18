export interface Spot {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  windRange: [number, number];
  windDirections: string[];
}
