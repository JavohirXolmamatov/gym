import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import FillLoading from "../shared/fill-loading";

interface TaskFormProps {
  onClose: () => void;
  handler?: (data: z.infer<typeof TaskSchema>) => Promise<void>;
}

const TaskForm = ({ onClose, handler }: TaskFormProps) => {
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: { title: "" },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    if (!handler) return;

    try {
      await handler(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      {isSubmitting && <FillLoading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Name</Label>
            <Input
              id="title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <span className="text-destructive text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default TaskForm;
