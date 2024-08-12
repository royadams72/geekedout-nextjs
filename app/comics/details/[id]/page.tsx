"use client";

import React from "react";

import ComicDetails from "../../components/ComicDetails";

const ComicDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  return <ComicDetails params={{ id }} />;
};

export default ComicDetailsPage;
