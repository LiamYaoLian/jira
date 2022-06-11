/**
 * util function to query evm records
 */
import {useHttp} from "utils/http";
import {useQuery} from "react-query";
import {Evm} from "types/evm";

/*
* a function to get an array of evm records of a projectId from backend
* How: send an HTTP request to "evm records" to get an array of evm records; avoid sending too many requests while user is typing
* */
// TODO
export const useEvms = (param?: Partial<Evm>) => {
  const client = useHttp();


  return useQuery<Evm[]>(["evms", param], () =>
    client("evms", {data: param})
  );

};

