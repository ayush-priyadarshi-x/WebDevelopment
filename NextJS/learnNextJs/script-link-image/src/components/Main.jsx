import React from "react";

const Main = ({ children }) => {
  return (
    <main className="flex-1" role="main">
      {" "}
      {/* role for accessibility */}
      {children}
    </main>
  );
};

export default Main;
