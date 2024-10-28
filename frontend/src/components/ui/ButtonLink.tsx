"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ButtonLinkProps {
  className: string;
  children: ReactNode;
  href: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ className, children, href }) => {
  const router = useRouter();

  return (
    <button type="button" className={className} onClick={() => router.push(href)}>
      {children}
    </button>
  );
};

export default ButtonLink;