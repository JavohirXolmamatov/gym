import TaskForm from "@/components/forms/task-form";
import FillLoading from "@/components/shared/fill-loading";
import TaskItem from "@/components/shared/task-item";
import type { ITask } from "@/components/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTaskMutations } from "@/hooks/useTaskMutations";
import { useTasks } from "@/hooks/useTasks";
import type { TaskSchema } from "@/lib/validation";
import { useUserState } from "@/store/user.store";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserState();
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const { data: tasks, isLoading } = useTasks(user?.uid);
  const { add, remove, update } = useTaskMutations(user?.uid);

  const onAdd = async (data: z.infer<typeof TaskSchema>) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }
    try {
      // mutateAsync ishlatish (await bilan)
      await add.mutateAsync({
        ...data,
        userId: user.uid,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // UPDATE
  const onEdit = async (data: z.infer<typeof TaskSchema>) => {
    if (!editingTask) return;

    try {
      await update.mutateAsync({
        id: editingTask.id,
        title: data.title,
      });
      setEditingTask(null);
      setOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await remove.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="h-screen max-w-6xl mx-auto flex items-center">
      <div className="grid grid-cols-2 w-full gap-8 items-center">
        <div className="flex flex-col space-y-3">
          <div className="w-full p-4 rounded-md flex justify-between bg-linear-to-t from-background to-secondary">
            <div className="text-2xl font-bold">Trainings</div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size={"icon"} className="cursor-pointer">
                  <BadgePlus />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Task</DialogTitle>
                </DialogHeader>
                <TaskForm
                  onClose={() => {
                    setOpen(false);
                    setEditingTask(null);
                  }}
                  handler={editingTask ? onEdit : onAdd}
                  initialData={editingTask}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Separator />

          <div className="w-full p-4 rounded-md flex justify-between bg-linear-to-b from-background to-secondary relative min-h-60">
            <ScrollArea className="w-full h-[400px] p-4  ">
              <div className="flex gap-4 flex-col">
                {isLoading ? (
                  <FillLoading />
                ) : tasks && tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskItem
                      task={task}
                      onDelete={onDelete}
                      key={task.id}
                      onEdit={(task) => {
                        setEditingTask(task);
                        setOpen(true);
                      }}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No tasks yet. Create one!
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex flex-col space-y-3 relative w-full">
          <div className="p-4 rounded-md bg-linear-to-r from-blue-900 to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            <div className="text-3xl font-bold">02:08:47</div>
          </div>
          <div className="p-4 rounded-md bg-linear-to-r from-secondary to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            <div className="text-3xl font-bold">02:08:47</div>
          </div>
          <div className="p-4 rounded-md bg-linear-to-r from-destructive to-background relative h-24">
            <div className="text-2xl font-bold">Total week</div>
            <div className="text-3xl font-bold">02:08:47</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
