import React from "react";
import { NewtonsCradle } from "@uiball/loaders";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <NewtonsCradle size={100} speed={1.4} color="black" />
    </div>
  );
};

export default Loading;