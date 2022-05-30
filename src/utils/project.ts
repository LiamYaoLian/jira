
import { Project } from '../screens/project-list/list';
import { useHttp } from './http';
import { QueryKey, useMutation, useQuery, useQueryClient} from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // when queryKey changes, useQuery will be called again
  return useQuery<Project[]>(['projects', param], () => client('project', {data: param}))
}
export const useEditProject = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`,{
    method:'PATCH',
    data: params
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')

  })
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params:Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'POST'
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}