
import { useHttp } from './http';
import { QueryKey, useMutation, useQuery, useQueryClient} from "react-query";
import {useDeleteConfig, useEditConfig} from "./use-optimistic-options";
import {Project} from "../types/project";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // when queryKey changes, useQuery will be called again
  return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params:Partial<Project>) => client(`projects`, {
    data: params,
    method: 'POST'
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};