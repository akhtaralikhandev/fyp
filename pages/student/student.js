import CreateOrJoinGroup from "../../components/student/createOrJoin";
import { useSession } from "next-auth/react";
import Student_home from "../../components/student/home";
import { NavbarContext } from "../../components/student/navbarContext";
import { useState } from "react";
const CreateGroup = () => {
  const [render, setRender] = useState("Project Detail");
  const { data: session } = useSession();
  console.log(session);
  if (session?.user?.projectId) {
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
