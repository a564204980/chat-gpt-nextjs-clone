import { useState } from "react";
import { useMutation } from "convex/react";

interface PayloadProps {
  [key: string]: any;
}

export const useApiMutation = (mutationFunction: any) => {
  const [pedding, setPedding] = useState(false);

  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: PayloadProps) => {
    setPedding(true);
    return apiMutation(payload)
      .finally(() => setPedding(false))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  return {
    pedding,
    mutate,
  };
};
