import {useSetUrlSearchParam, useUrlQueryParam} from '../../utils/url';
import {useMemo} from 'react';
import {useProject} from '../../utils/project';

/**
 * A function to get parameters (['name','personId']) in the page url based and a function to set search params in a clean way
 */
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
    setParam,
  ] as const;
};

/**
 * A function to return an object related to the Project Modal. This object includes:
 * {
 *   projectModalOpen: true | false,
 *   open: fn to change url
 *   close: fn to change url
 *   startEdit: fn to change url
 *   editingProject: the project being edited
 *   isLoading: true | false
 * }
 */
export const useProjectModal = () => {

  const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const setUrlParams = useSetUrlSearchParam()
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

  // These functions will change url
  const open = () => setProjectCreate({projectCreate: true})
  const close = () => setUrlParams({projectCreate: '', editingProjectId: ''})
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id});

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
}

/**
 * A function to return an array: ['projects',  {personId: number | undefined, name: string}]
 */
export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ['projects', params];
};