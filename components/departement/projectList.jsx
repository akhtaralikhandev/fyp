import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Project from "./project";

const ProjectList = () => {
  const [list, setList] = useState();
  useEffect(() => {
    const fetchProjects = async () => {
      const resp = await axios.get(
        "http://localhost:3000/api/coordinator/projectList"
      );
      setList(resp.data);
      console.log(resp.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="div">
      {list?.map((x) => (
        <Project list={x} />
      ))}
    </div>
  );
};

export default ProjectList;
