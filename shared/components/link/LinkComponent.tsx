"use client";
import { ReactNode, useEffect } from "react";

import Link from "next/link";

import { setFirstPage, setUrls } from "@/lib/features/uiData/uiDataSlice";

import { useAppDispatch } from "@/lib/hooks/store.hooks";
import { usePathname } from "next/navigation";

const LinkComponent = ({
  href,
  target,
  className,
  children,
}: {
  href: string;
  target?: string;
  className?: string;
  children: ReactNode;
}) => {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setUrls({ currentUrl: href, previousUrl: currentPath }));

    if (href !== "/") {
      dispatch(setFirstPage(false));
    } else {
      dispatch(setFirstPage(true));
    }
  };

  return (
    <Link
      onClick={handleClick}
      className={className}
      href={href}
      target={target}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
