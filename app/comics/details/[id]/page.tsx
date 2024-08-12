"use client";

import React from "react";

import { StoreProvider } from "@/app/StoreProvider";
import ComicDetails from "../../components/ComicDetails";

const ComicDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  console.log("sdasdasdasdasdasdad", id);

  return (
    <StoreProvider>
      <ComicDetails params={{ id }} />
    </StoreProvider>
  );
};

export default ComicDetailsPage;
