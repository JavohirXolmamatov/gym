import { useAuthStateStore } from "@/store/auts-store";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const Register = () => {
  const { setAuthState } = useAuthStateStore();
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Register</h2>
      <p className="text-muted-foreground">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuthState("login")}
        >
          Sign in
        </span>
      </p>
      <Separator className="my-3" />
      <div>
        <span>Email</span>
        <Input type="email" placeholder="Email" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="mt-2">
          <span>Password</span>
          <Input type="password" placeholder="******" />
        </div>
        <div className="mt-2">
          <span>Confirm Password</span>
          <Input type="password" placeholder="******" />
        </div>
      </div>
      <Button className="w-full h-12 mt-4">Register</Button>
    </div>
  );
};

export default Register;
