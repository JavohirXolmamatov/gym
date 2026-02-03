import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { ITask } from "../types";
import type { TaskSchema } from "@/lib/validation";
import type z from "zod";
// import { v4 as uuidv4 } from "uuid";

export async function fetchTasks(userId: string): Promise<ITask[]> {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ITask, "id">),
  }));
}

export const addTask = async (
  data: z.infer<typeof TaskSchema> & { userId: string },
) => {
  const docRef = await addDoc(collection(db, "tasks"), {
    // id: uuidv4(),
    title: data.title,
    status: false,
    startTime: null,
    endTime: null,
    userId: data.userId,
  });
  return docRef;
};
export const updateTask = async (data: { id: string; title: string }) => {
  const taskRef = doc(db, "tasks", data.id);
  await updateDoc(taskRef, {
    title: data.title,
  });
  return data;
};

export const deleteTask = async (id: string) => {
  console.log("API: Deleting task with ID:", id); // Debug
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
  return id;
};
