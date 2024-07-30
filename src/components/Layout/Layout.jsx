import React from "react";
import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <Fragment>
        <MainNavigation />
        <main>{props.children}</main> 
      </Fragment>
    </div>
  );
};

export default Layout;
