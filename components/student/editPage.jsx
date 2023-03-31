import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { updateProject } from "../../redux/features/student/studentSlice";
import { useRouter } from "next/router";
import { NavbarContext } from "./navbarContext";
const EditPage = ({ sdgList, attributes, options }) => {
  const { render, setRender } = useContext(NavbarContext);
  const router = useRouter();
  const { data: session } = useSession();
  const { projectId } = session.user;
  const data = useSelector((state) => state.student.student?.project);
  console.log(data);
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [department_name, setDepartment_name] = useState(data?.department_name);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description && title) {
      console.log("clicked from edit page");
      const data = {
        projectId: projectId,
        title: title,
        description: description,
      };
      dispatch(updateProject(data));
      setRender("Project Detail");
    }
  };
  return (
    <div className="student_edit_page text-black">
      <div className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="project title"
          className=" border-2 p-2 w-96 outline-blue-600 rounded-xl"
        />{" "}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="write description"
          className=" border-2 p-2 resize-none  outline-blue-600 rounded-xl"
          cols={10}
          rows={10}
        />
        <select
          id="department_name"
          name="department_name"
          className="p-3 outline-blue-500"
          defaultValue={"FME"}
          value={department_name}
          onChange={(e) => setDepartment_name(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">S#</th>
              <th className="border text-center p-2">SDG</th>
              <th className="border text-center p-2">Mapped (yes/no)</th>
            </tr>
            {sdgList?.map((x) => (
              <tr className="studentlist_tr text-black">
                <td className="border  cursor-pointer text-center p-2">
                  {x.id}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x.text}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  <div className="wrapper">
                    <input type="checkbox" className=" h-7  w-7" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="wrapper flex flex-col gap-4 text-white xl:mt-24">
          <span className="text-4xl flex items-center justify-center ">
            FINAL YEAR PROJECT AS A COMPLEX ENGINEERING/COMPUTING PROBLEM
          </span>
          <span className="text-xl w-1/2">
            It is to certify here that the final year design project (FYDP)
            entitled,
            <span className=" underline text-4xl  font-bold">
              {" "}
              {title}
            </span>{" "}
            <span> </span>
            categorized as a complex engineering/computing problem (CEP) based
            on the preamble (in-depth engineering knowledge) and involvement of
            the following attributes.
          </span>
          <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
            <tbody>
              <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                <th className="border text-center p-2">Attributes</th>
                <th className="border text-center p-2">Involved (yes/no)</th>
              </tr>
              {attributes?.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border  cursor-pointer  text-xl p-2">
                    {x.text}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    <input type="checkbox" className="h-7 w-7" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="bg-green-700 p-2 rounded-xl w-1/4 hover:bg-green-500 cursor-pointer text-white"
            onClick={(e) => handleSubmit(e)}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditPage;
