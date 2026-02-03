import { MdOutlineTaskAlt } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { Card } from "../ui/card";
import type { ITask } from "../types";

const taskItemProps = {
  task: {} as ITask,
  onDelete: (_id: string) => {},
  onEdit: (_task: ITask) => {},
};

const TaskItem = ({ task, onDelete, onEdit }: typeof taskItemProps) => {
  return (
    <Card
      className="w-full p-4  shadow-md grid grid-cols-4 items-center relative"
      key={task?.id}
    >
      <div className="flex gap-1 items-center col-span-2">
        <MdOutlineTaskAlt className="text-blue-500" />
        <span className="capitalize">{task?.title}</span>
      </div>
      <div className="flex gap-1 items-center ">
        <HiStatusOnline className="text-blue-500" />
        <span className="capitalize">
          {task?.status ? "started" : "unstarted"}
        </span>
      </div>
      <div className="flex gap-1 items-center justify-self-end ">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-8 h-8 cursor-pointer"
        >
          <CiPlay1 className="text-indigo-500 w-5 h-5" />
        </Button>
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
