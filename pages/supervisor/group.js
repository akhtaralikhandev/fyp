import { useState } from "react";
import Group from "../../components/supervisor/group";
import Main from "../../components/main";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useSession } from "next-auth/react";
import { StudentGroupContext } from "../../context/StudentGroup";
import axios from "axios";
import { useEffect } from "react";
const students = [
  { regNo: 1234, name: "khan" },
  { regNo: 3433, name: "king" },
  { regNo: 2434, name: "ali" },
];
const Group_page = () => {
  // http://localhost:3000/api/coordinator/projectList
  const [editRegNo, setEditRegNo] = useState("");
  const [studentList, setStudentList] = useState(students);
  const { data: session } = useSession();
  const [data, setData] = useState();
  // const { projectId } = session?.user;
  return (
    <StudentGroupContext.Provider
      value={{
        studentList,
        setStudentList,
        editRegNo,
        setEditRegNo,
      }}
    >
      <div className="group_page">
        <div className="group_page_wrapper flex gap-4 relative">
          {/* <div style={{ flex: "1" }} className="group_sidebar  md:block hidden">
            <Sidebar />
          </div> */}
          <div style={{ flex: "3" }}>
            <Navbar />

            <Group />
          </div>
        </div>
      </div>
    </StudentGroupContext.Provider>
  );
};

export default Group_page;
