import { Button } from "@/components/ui/button";
import { featuredItems, programs } from "@/constants";
import men from "@/assets/men.png";
import { Card, CardHeader } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useUserState } from "@/store/user.store";
import { LogOut } from "lucide-react";
import { auth } from "@/firebase";
import { CgGym } from "react-icons/cg";

const Home = () => {
  const { user, setUser } = useUserState();
  const navigate = useNavigate();
  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center gap-x-40">
        <div className="max-w-xl ml-60 flex h-full flex-col justify-center">
          <h1 className="text-9xl font-semibold uppercase">Workout with me</h1>
          <p className="text-muted-foreground">
            A huge selections of health and fitness content, healthy recipes and
            transformation stories to help you get fit and stay fit!
          </p>
          {user ? (
            <div className="flex gap-4">
              <Link to="/dashboard">
                <Button
                  className="w-fit mt-6 font-bold h-12  cursor-pointer"
                  size={"lg"}
                >
                  <CgGym className="mr-2 h-4 w-4" />
                  Go to GYM
                </Button>
              </Link>

              <Button
                className="w-fit mt-6 font-bold h-12  cursor-pointer"
                variant={"destructive"}
                size={"lg"}
                onClick={onLogOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="w-fit mt-6 font-bold h-12" size={"lg"}>
                Join club now
              </Button>
            </Link>
          )}

          <div className="mt-24">
            <p className="text-muted-foreground ">AS FEATURED IN</p>
            <div className="flex items-center gap-4 mt-2">
              {featuredItems.map((Icon, index) => (
                <Icon key={index} className=" w-12 h-12" />
              ))}
            </div>
          </div>
        </div>
        <img src={men} alt="men" className="w-1/4" />
      </div>

      <div className="container max-w-5xl mx-auto">
        <h1 className="text-4xl ">Not sure where to start?</h1>
        <p className="mt-2 text-muted-foreground">
          Programs offer day-to-day guidance on an interactive calendar to keep
          you on track.
        </p>
        <div className="grid grid-cols-3 my-8 gap-4">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="py-8 px-4 relative cursor-pointer group"
            >
              <CardHeader>
                <h3>{program.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {program.descriptions}
                </p>
              </CardHeader>

              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform"
              >
                <FaArrowRightLong />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
