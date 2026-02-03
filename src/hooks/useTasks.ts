import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../components/lib/api";

export const useTasks = (userId?: string) =>
  useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => fetchTasks(userId!),
    enabled: !!userId,
  });
