import { useState } from "react";
import Home from "../../components/superAdmin/Home";
import { NavbarContext } from "../../components/superAdmin/navbarContext";
const Home2 = () => {
  const [render, setRender] = useState("depart_list");
  return (
    <NavbarContext.Provider value={{ render, setRender }}>
      <div>
        <Home />
      </div>
    </NavbarContext.Provider>
  );
};
export default Home2;
