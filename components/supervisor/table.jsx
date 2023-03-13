import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { fetchProjects } from "../../redux/features/supervisor/supervisorSlice";
import { setIndex } from "../../redux/features/coordinator/coordinator_slice";

const Table = () => {
  const { data: session } = useSession();
  console.log(session);
  const [data, setData] = useState();
  const projects = useSelector((state) => state.coordinator.projects);
  console.log(projects);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  // const { projectId } = session?.user;
  const { department_name } = session?.user || {};
  console.log(`department name is ${department_name}`);
  useEffect(() => {
    console.log("useEffect called");
    dispatch(fetchProjects(user.email));
  }, []);
  // console.log(studentList);
  const router = useRouter();
  return (
    <div>
      <div className="wrapper_table p-4 ">
        <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Group ID</th>
              <th className="border text-center p-2">Title</th>
              <th className="border text-center p-2">status</th>
              <th className="border text-center p-2">View More</th>
            </tr>
            {projects?.map((x) => (
              <tr className="bg-slate-300">
                <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                  {x.id}
                </td>
                <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                  {x.title}
                </td>
                <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                  pending
                </td>
                <td
                  onClick={() => {
                    router.push("/supervisor/group");
                    dispatch(setIndex(x.id));
                    console.log(x.id);
                  }}
                  className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2"
                >
                  view more
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
