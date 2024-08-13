import React from "react";

import ComicDetails from "../../components/ComicDetails";

const ComicDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  return <ComicDetails id={id} />;
};

export default ComicDetailsPage;
