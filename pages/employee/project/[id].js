import { useEffect } from "react";
import OneProjectComp from "../../../components/employee/oneProject/project";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
const ProjectComp = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const id = parseInt(router.query?.id);
  console.log(id);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(
          `http://localhost:3000/api/employee/projects/single?id=${id}`
        );
        console.log(resp);
        setData(resp.data);
        return resp.data;
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchProject();
  }, []);
  return (
    <div>
      <OneProjectComp data={data} />
    </div>
  );
};
export default ProjectComp;
