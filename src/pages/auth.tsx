import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import SocialMedia from "@/components/auth/social-media";
import { Card } from "@/components/ui/card";
import { useAuthStateStore } from "@/store/auts-store";

const Auth = () => {
  const { authState } = useAuthStateStore();
  return (
    <div className="h-screen w-full bg-linear-to-t from-foreground to-background flex justify-center items-center">
      <Card className="w-1/3 p-8">
        {authState === "login" && <Login />}
        {authState === "register" && <Register />}
        <SocialMedia />
      </Card>
    </div>
  );
};

export default Auth;
