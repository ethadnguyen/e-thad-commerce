export interface CPU {
  id: string;
  name: string;
  socket: string;
  cores: number;
  threads: number;
  baseSpeed: number;
  boostSpeed: number;
  cache: number;
  tdp: number;
}

export interface GPU {
  id: string;
  name: string;
  vram: number;
  memoryType: string;
  clockSpeed: number;
  tdp: number;
  length: number;
}

export interface RAM {
  id: string;
  name: string;
  capacity: number;
  speed: number;
  type: number;
  timing: string;
}

export interface Mainboard {
  id: string;
  name: string;
  socket: string;
  chipset: string;
  formFactor: string;
  ramSlots: number;
  ramType: number;
  m2Slots: number;
}

export interface PSU {
  id: string;
  name: string;
  wattage: number;
  efficiency: string;
  formFactor: string;
  modular: boolean;
}

export interface Storage {
  id: string;
  name: string;
  type: 'SSD' | 'HDD';
  capacity: number;
  interface: string;
  readSpeed: number;
  writeSpeed: number;
}

export interface Case {
  id: string;
  name: string;
  formFactor: string;
  maxGpuLength: number;
  maxCpuCoolerHeight: number;
  includedFans: number;
}
