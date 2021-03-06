export interface Task {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  // bug or task
  typeId: number;
  note: string;
  planned?: String[];
  plannedProgress?: number;
  actualProgress?: number;
}
