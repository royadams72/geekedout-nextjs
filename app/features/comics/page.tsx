import React from "react";
import ComicsDisplay from "./components/ComicsDisplay";
import Link from "next/link";

const ComicsPage = () => {
  return (
    <>
      <div>ComicsPage</div>
      <Link href={"/"}>Back to main Page</Link>
      <ComicsDisplay />
    </>
  );
};

export default ComicsPage;
