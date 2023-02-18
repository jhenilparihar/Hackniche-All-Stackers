import React from "react";
import loadingGIF from "./loading.gif";

const Loading = () => {
  return (
    <div className="loading-div">
      <img src={loadingGIF} alt="Loading.." className="d-block m-auto" />;
    </div>
  );
};

export default Loading;
