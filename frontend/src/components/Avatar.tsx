import { GetServerSideProps } from "next";
import { getCurrentUser } from "@/utils/auth";
import Image from "next/image";
import logo from "@/logos/logo.svg";
import { AvatarIcon } from "@radix-ui/react-icons";

interface UserProps {
  id: string;
  NIM: string;
  username: string;
  isAdmin: string | boolean;
  enrolledSlugOti: string;
  enrolledSlugHima: string;
}

const Avatar = ( user: UserProps) => {
  return (
    <div className="flex items-center gap-2 absolute top-2 right-1 bg-custom-gray-dark p-2 rounded-sm h-">
      <h1 className="hidden xs:block">{user.username}</h1>
      <div className=" bg-custom-gray p-1 rounded-sm">
        <AvatarIcon className="h-6 w-auto" />
      </div>
    </div>
  );
};

export default Avatar;
