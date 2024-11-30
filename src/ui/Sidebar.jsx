import React from "react";
import MainNav from "./MainNav";
import Logo from "./Logo";

export default function Sidebar() {
  return (
    <div className="flex flex-col mt-10 ">
      <Logo />
      <MainNav />
    </div>
  );
}
