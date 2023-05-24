import { useContext, useState } from "react";
import { NavbarContext } from "../navbarContext";
const Panel = ({ panel }) => {
  const [more, setMore] = useState(false);
  const { setId, setViewMore } = useContext(NavbarContext);
  console.log("this is setId");
  console.log(setId);
  console.log(more);
  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer text-center p-2">{panel.id}</td>
      <td className="border  cursor-pointer text-center p-2">
        {panel.totalEmployee}
      </td>
      <td className="border  cursor-pointer text-center p-2">
        {panel.totalProjects}
      </td>
      <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
        <span
          onClick={() => {
            setId(panel.id);
            setViewMore(true);
          }}
          className=" p-2 rounded-lg  bg-blue-600 text-white  hover:bg-blue-400 cursor-pointer"
        >
          view more
        </span>
      </td>
    </tr>
  );
};
export default Panel;
