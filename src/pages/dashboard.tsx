import TaskForm from "@/components/forms/task-form";
import TaskItem from "@/components/shared/task-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase";
import type { TaskSchema } from "@/lib/validation";
import { useUserState } from "@/store/user.store";
import { addDoc, collection } from "firebase/firestore";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserState();

  const onAdd = async (data: z.infer<typeof TaskSchema>) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const promise = addDoc(collection(db, "tasks"), {
        title: data?.title,
        status: false,
        startTime: null,
        endTime: null,
        userId: user?.uid,
      });
      toast.promise(promise as any, {
        loading: "Loading...",
        success: "Task created successfully",
        error: "Error",
        richColors: true,
      });
      await promise;
      setOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
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
                <Button size={"icon"}>
                  <BadgePlus />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Task</DialogTitle>
                </DialogHeader>
                <TaskForm onClose={() => setOpen(false)} handler={onAdd} />
              </DialogContent>
            </Dialog>
          </div>

          <Separator />

          <div className="w-full p-4 rounded-md flex justify-between bg-linear-to-b from-background to-secondary relative min-h-60">
            <div className="flex flex-col space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <TaskItem key={idx} />
              ))}
            </div>
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
