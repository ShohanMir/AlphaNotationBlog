import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <Header />
        {children}
        <p>footer</p>
      </React.Fragment>
    </div>
  );
};

export default Layout;
