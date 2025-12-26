import { useAuthState } from "@/store/auts-store";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { z } from "zod";
import { loginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { RiAlertLine } from "react-icons/ri";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuthState();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const hundleSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
      setIsLoading(false);
      toast.success("Login successful");
    } catch (error) {
      const result = error as Error;
      setIsError(result.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>
      <Separator className="my-3" />
      {isError && (
        <Alert variant="destructive">
          <RiAlertLine className="mr-2" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{isError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(hundleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full h-12 mt-4"
            type="submit"
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
