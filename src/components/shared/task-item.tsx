import { MdOutlineTaskAlt } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { Card } from "../ui/card";
import type { ITask } from "../types";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { RxReload } from "react-icons/rx";
import FillLoading from "./fill-loading";
import { useQueryClient } from "@tanstack/react-query";

const taskItemProps = {
  task: {} as ITask,
  onDelete: (_id: string) => {},
  onEdit: (_task: ITask) => {},
};

const TaskItem = ({ task, onDelete, onEdit }: typeof taskItemProps) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const queryClient = useQueryClient();

  const onStart = async () => {
    setIsStatusLoading(true);
    const ref = doc(db, "tasks", task.id);
    try {
      await updateDoc(ref, { status: "in_progress", startTime: Date.now() });
      queryClient.invalidateQueries({ queryKey: ["tasks", task.userId] });
    } catch (error) {
      toast.error("Failed to start task");
    } finally {
      setIsStatusLoading(false);
    }
  };
  const onPause = async () => {
    setIsStatusLoading(true);
    const ref = doc(db, "tasks", task.id);
    try {
      const elapsed = Date.now() - task.startTime!;
      const newTotalTime = task.totalTime! + elapsed;
      await updateDoc(ref, {
        status: "paused",
        endTime: Date.now(),
        totalTime: newTotalTime,
      });
      queryClient.invalidateQueries({ queryKey: ["tasks", task.userId] });
    } catch (error) {
      toast.error("Failed to pause task");
    } finally {
      setIsStatusLoading(false);
    }
  };

  const renderColors = useMemo(() => {
    switch (task.status) {
      case "in_progress":
        return "text-green-500";
      case "paused":
        return "text-yellow-500";
      case "unstarted":
        return "text-red-500";
    }
  }, [task.status]);

  const renderBtns = () => {
    switch (task.status) {
      case "unstarted":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-8 h-8 cursor-pointer"
            onClick={onStart}
          >
            <CiPlay1 className="text-indigo-500 w-5 h-5" />
          </Button>
        );
      case "in_progress":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-8 h-8 cursor-pointer"
            onClick={onPause}
          >
            <CiPause1 className="text-indigo-500 w-5 h-5" />
          </Button>
        );
      case "paused":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-8 h-8 cursor-pointer"
            onClick={onStart}
          >
            <RxReload className="text-indigo-500 w-5 h-5" />
          </Button>
        );
    }
  };

  return (
    <Card
      className="w-full p-4 shadow-md grid grid-cols-4 gap-3 items-center relative"
      key={task?.id}
    >
      {isStatusLoading && <FillLoading />}
      <div className="flex gap-1 items-center col-span-2">
        <MdOutlineTaskAlt className="text-blue-500" />
        <span className="capitalize">{task?.title}</span>
      </div>
      <div className="flex gap-1 items-center ">
        <HiStatusOnline className={`${renderColors} w-4 h-4`} />
        <span className="capitalize">{task?.status}</span>
      </div>
      <div className="flex gap-1 items-center justify-self-end ">
        {renderBtns()}
        <Button
          variant={"secondary"}
          size={"icon"}
          className="w-8 h-8 cursor-pointer"
          onClick={() => onEdit(task)}
        >
          <Edit2 className="text-indigo-500 w-5 h-5" />
        </Button>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="w-8 h-8 cursor-pointer"
          onClick={() => onDelete(task?.id)}
        >
          <Trash className="text-indigo-500 w-5 h-5 " />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
