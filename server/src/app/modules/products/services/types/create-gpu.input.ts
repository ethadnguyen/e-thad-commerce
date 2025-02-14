export interface CreateGpuInput {
  chipset: string;
  memorySize: number;
  memoryType: string;
  coreClock: number;
  boostClock: number;
  tdp: number;
}
