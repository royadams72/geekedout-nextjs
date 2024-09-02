"use client";

import { StateLoading } from "@/shared/enums/loading";
import { isNotEmpty } from "@/utils/helpers";
import React, { ReactNode, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import CategoryLoader from "./CategoryLoader";

const CategoryContainer = <T extends { status: string }>({
  preloadedState,
  children,
  title,
}: {
  preloadedState: T;
  title: string;
  children: React.ReactNode;
}) => {
  const [isPreloadedState, setIsPreloadedState] = useState(false);

  useEffect(() => {
    if (isNotEmpty(preloadedState)) {
      setIsPreloadedState(true);
    }
  }, [preloadedState]);

  if (!isPreloadedState) {
    return (
      <div style={{ position: "relative" }}>
        <CategoryLoader title={title} />
      </div>
    );
  }

  if (preloadedState.status === StateLoading.FAILED) {
    return <div>Category failed to load</div>;
  }
  return <> {children}</>;
};

export default CategoryContainer;
