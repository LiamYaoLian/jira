export interface Capacity {
  id: number;
  userId: number;
  timeStamp: number,
  type: string,
  totalHours: number,
  plannedHours: number,
  actualHours: number,
  remainingPlannedHours: number,
  remainingActualHours: number
}
