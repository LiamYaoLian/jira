import {Capacity} from "../types/capacity";
import {useHttp} from "./http";
import {useQuery} from "react-query";

export const useCapacityRecords = (param?: Partial<Capacity>) => {
  const client = useHttp();
  // After the backend has been implemented, the backend will only return the latest records
  return useQuery<Capacity[]>(["capacity", param], () => client("capacity", {data: param}));
};





