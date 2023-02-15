import { useRouter } from "next/router";
import { useState } from "react";
const Select_Category = () => {
  const [state, setState] = useState("student");
  const router = useRouter();
  const handleChange = (e) => {
    setState(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);
    if (state === "student") {
      router.push("/student/login");
      setState("");
    } else if (state === "faculty") {
      router.push("/faculty/login");
      setState("");
    }
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="select_category h-full bg-slate-600"
    >
      <div className="  select_category_wrapper flex xl:gap-4 gap-6 items-center justify-center flex-col h-full w-full">
        <span className="text-white xl:text-4xl">Select Your Category</span>
        <select
          onChange={(e) => handleChange(e)}
          value={state}
          className="p-4 border-1 cursor-pointer border-blue-500"
          name=""
          id=""
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-green-500 p-3 text-2xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Select_Category;
