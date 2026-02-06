import { useUserState } from "@/store/user.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2, LogOut, Settings, UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

const UserBox = () => {
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  const name =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "User";

  const initials = name.slice(0, 1).toUpperCase(); // yoki 2 ta harf: slice(0,2)

  if (!user) return <Loader2 className="animate-spin" />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.photoURL!} />
          <AvatarFallback>{initials || null}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={onLogOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;
