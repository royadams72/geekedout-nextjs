"use client";

import React from "react";
import ComicsCategory from "./ComicsCategory";

const ComicsCategoryWrapper = ({ preloadedState }: { preloadedState: any }) => {
  const handleChildLoaded = () => {
    console.log("Child component has loaded");
  };

  return (
    <ComicsCategory
      preloadedState={preloadedState}
      onLoad={handleChildLoaded}
    />
  );
};

export default ComicsCategoryWrapper;
