import Navbar from "./navbar";
import Create_depart from "./create";
import { useContext, useState } from "react";
import { NavbarContext } from "./navbarContext";
import Depart_list from "./departList";

const Home = () => {
  const { render, setRender } = useContext(NavbarContext);
  return (
    <div className="home">
      <div className="home_wrapper">
        <div className="home_navbar">
          <Navbar />
        </div>
        <div className="home_main">
          {render === "add_department" ? <Create_depart /> : ""}
          {render === "depart_list" ? <Depart_list /> : ""}
        </div>
      </div>
    </div>
  );
};
export default Home;
