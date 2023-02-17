import { useState } from "react";
import axios from "axios";
const Depart_List = ({ list }) => {
  //   console.log(list);

  return (
    <div className="depart_list">
      <div className="depart_list_wrapper flex items-center justify-center">
        <ul className="flex flex-col">
          {list?.map((x) => (
            <li className="flex gap-8 items-center justify-center">
              {x.name}
              {x.coordinator_email} <span>Edit</span> <span>Delete</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Depart_List;
