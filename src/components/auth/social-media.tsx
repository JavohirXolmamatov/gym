import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import FillLoading from "../shared/fill-loading";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

const SocialMedia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      const result = error as Error;
      console.log(result?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const hanleGithub = async () => {
    setIsLoading(true);
    try {
      const githubprovider = new GithubAuthProvider();
      await signInWithPopup(auth, githubprovider);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      const result = error as Error;
      console.log(result?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FillLoading />}
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="h-12"
          variant={"secondary"}
          disabled={isLoading}
          onClick={hanleGithub}
        >
          <FaGithub className="mr-2" />
          <span>Sign in with Github</span>
        </Button>
        <Button
          className="h-12"
          variant={"destructive"}
          disabled={isLoading}
          onClick={handleGoogle}
        >
          <FaGoogle className="mr-2" />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </>
  );
};

export default SocialMedia;
