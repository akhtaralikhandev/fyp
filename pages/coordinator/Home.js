import { NavbarContext } from "../../components/coordinator/navbarContext";
import Home from "../../components/coordinator/Home";
import { useState } from "react";
const Coordinator_home = () => {
  const [render, setRender] = useState("");
  return (
    <NavbarContext.Provider value={{ render, setRender }}>
      <div>
        <Home />
      </div>{" "}
    </NavbarContext.Provider>
  );
};
export default Coordinator_home;
