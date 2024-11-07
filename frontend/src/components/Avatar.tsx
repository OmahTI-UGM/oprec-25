import { getCurrentUser } from "@/utils/auth";
import { AvatarIcon } from "@radix-ui/react-icons";

const Avatar = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex items-center gap-2 absolute top-2 right-1 bg-custom-gray-dark p-2 rounded-sm">
      <h1 className="hidden xs:block">{user?.username}</h1>
      <div className=" bg-custom-gray p-1 rounded-sm">
        <AvatarIcon className="h-6 w-auto" />
      </div>
    </div>
  );
};

export default Avatar;
