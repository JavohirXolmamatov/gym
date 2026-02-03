import { addTask, deleteTask, updateTask } from "@/components/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTaskMutations = (userId?: string) => {
  const qc = useQueryClient();

  const add = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks", userId] });
      toast.success("Task created successfully");
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    },
  });

  const update = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks", userId] });
      toast.success("Task updated successfully");
    },
    onError: (error) => {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    },
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks", userId] });
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    },
  });

  return { add, update, remove };
};
