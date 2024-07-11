import React from "react";
import Link from "next/link";
import MusicDisplay from "./components/MusicDisplay";
import dynamic from "next/dynamic";

// const MusicDisplay = dynamic(() => import("./components/MusicDisplay"), {
//   ssr: false,
// });
const MuiscPage = () => {
  return (
    <>
      <div>Muisc</div>
      <Link href={"/"}>Back to main Page</Link>
      <MusicDisplay />
    </>
  );
};

export default MuiscPage;
