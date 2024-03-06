import { fallbackDisplayname } from "@/lib/utils";
import useUserStore from "@/stores/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserBox = () => {
  const { user } = useUserStore();

  return (
    <div className="flex justify-end mb-2">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 bg-primary rounded-[30px] shadow-sm text-white">
          <p className="text-sm font-medium leading-none px-4">
            {user?.displayName}
          </p>
          <Avatar>
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback>{fallbackDisplayname(user?.email)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
