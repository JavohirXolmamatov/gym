import { useAuthStateStore } from "@/store/auts-store";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Login = () => {
  const { setAuthState } = useAuthStateStore();
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuthState("register")}
        >
          Sign up
        </span>
      </p>
      <Separator className="my-3" />
      <div>
        <span>Email</span>
        <Input type="email" placeholder="Email" />
      </div>
      <div className="mt-2">
        <span>Password</span>
        <Input type="password" placeholder="******" />
      </div>
      <Button className="w-full h-12 mt-4">Login</Button>
    </div>
  );
};

export default Login;
