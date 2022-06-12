import React from "react";

export interface TimeLog {
  id: React.Key;
  projectId: number;
  plannedHour?: number;
  actualHour?: number;
  taskName?: string;
  occurredAt?: string;
}
