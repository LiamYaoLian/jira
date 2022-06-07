import { useProjectIdInUrl } from "screens/kanban/util";

/**
 * a function to return an object, e.g. {projectId: 1}
 */
export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

/**
 * a function to return an array, e.g. ['epics', {projectId: 1}]
 */
export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];