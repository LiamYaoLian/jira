import {useLocation} from "react-router";
import {useHttp} from "../../utils/http";
import {useQuery} from "react-query";
import {User} from "../../types/user";

export const useUserIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/users\/(\d+)/)?.[1];
  return Number(id);
}

export const useUser= (id?: number) => {
  const client = useHttp();
  return useQuery<User>(["users", {id}], () => client(`users/${id}`),
    {enabled: Boolean(id)}
  );
};

export const useUserInUrl = () => useUser(useUserIdInUrl());
