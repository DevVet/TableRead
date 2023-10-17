"use client";

import {
  MutationFunction,
  QueryFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

export const useReactQuery = () => {
  const queryClient = useQueryClient();
  const query = useCallback(
    (key: string[], fetcher: QueryFunction, options: UseQueryOptions = {}) =>
      useQuery({ queryKey: key, queryFn: fetcher, ...options }),
    []
  );

  const mutate = (
    key: string[],
    mutator: MutationFunction,
    options: UseMutationOptions = {}
  ) =>
    useMutation({
      mutationKey: key,
      mutationFn: mutator,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });

  return { query };
};
