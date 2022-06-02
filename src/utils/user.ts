import {useHttp} from "utils/http";
import {User} from "types/user";
import {useQuery} from "react-query";

/*
* What: a function to get an array of users from backend by params
* */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", {data: param})
  );
};