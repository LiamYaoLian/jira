import {useHttp} from "utils/http";
import {User} from "types/user";
import {useQuery} from "react-query";

/*
* What: query a user list from backend by params
* */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", {data: param})
  );
};