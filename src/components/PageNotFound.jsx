import React from "react";
import StatusPage from "./StatusPage";

const PageNotFound = () => {
  return (
    <StatusPage 
      title="404"
      subtitle="Page Not Found"
      message="The divine destination you are seeking seems to have moved or doesn't exist in our earthly realm."
      buttonText="Return Home"
      buttonLink="/"
    />
  );
};

export default PageNotFound;
