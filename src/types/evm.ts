export interface Evm {
  id: number;
  projectId: number;
  taskId: number;
  // task name
  name: string;
  bac: number;
  pv: number;
  ev: number;
  ac: number;
  cv: number;
  sv: number;
  cpi: number;
  spi: number;
  eac: number;
  etc: number;
  vac: number;
  plannedProgress: number;
  actualProgress: number;
  progressDelay: number;
}
