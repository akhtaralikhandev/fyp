import CreateOrJoinGroup from "../../components/student/createOrJoin";
import { useSession } from "next-auth/react";
import Student_home from "../../components/student/home";
import { NavbarContext } from "../../components/student/navbarContext";

import { useState } from "react";
import { useSelector } from "react-redux";
const CreateGroup = () => {
  const [render, setRender] = useState("Project Detail");
  const [render2, setRender2] = useState("Project Detail");
  const { data: session } = useSession();
  const havingProject = useSelector((state) => state.student.havingProject);
  console.log(havingProject);
  console.log(session);
  if (havingProject) {
    return (
      <NavbarContext.Provider value={{ render, setRender }}>
        {" "}
        <Student_home />
      </NavbarContext.Provider>
    );
  } else {
    return (
      <>
        <CreateOrJoinGroup />
      </>
    );
  }
};

export default CreateGroup;
