"use client";
import Link from "next/link";
import {
  selectCurrPrevUrls,
  setFirstPage,
  setUrls,
} from "@/lib/features/uiData/uiDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
// <Link href={movieDetails?.homepage} target="_blank" className="btn">
const NavLink = ({
  href,
  target,
  className,
  label,
}: {
  href: string;
  target: string;
  className: string;
  label: string;
}) => {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const { currentUrl, previousUrl } = useAppSelector(selectCurrPrevUrls);

  useEffect(() => {
    if (currentUrl !== currentPath) {
      dispatch(setUrls({ currentUrl: currentPath, previousUrl: currentUrl }));
    }
    if (currentPath !== "/") {
      dispatch(setFirstPage(false));
      console.log("dispatch(setFirstPage(false))");
    } else {
      dispatch(setFirstPage(true));
      console.log("dispatch(setFirstPage(true))");
    }
  }, [currentPath, dispatch, currentUrl, previousUrl]);
  return (
    <Link href={href} target={target} className={className}>
      {label}
    </Link>
  );
};

export default NavLink;
