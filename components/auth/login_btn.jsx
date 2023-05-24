import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateGroup from "../../pages/student/student";
import { loginUser } from "../../redux/features/user/userSlice";
import Home2 from "../../pages/superAdmin/home";
import Coordinator_home from "../../pages/coordinator/Home";
import { HavingProject } from "../../redux/features/student/studentSlice";
import Home from "../employee/home";
import Cookies from "js-cookie";
import HomeDashboard from "../coordinator/home/home";
import StudentHome from "../student/home/home";
import FacultyHome from "../employee/home";
export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { email, password });
    console.log("this is the result ");
    console.log(result);
    if (!result?.error) {
      // Store user info in a cookie
      Cookies.set("userInfo", result.user, { expires: 1 });

      // Redirect to authenticated page
      router.push("/authenticated");
    }
  };

  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  if (session?.user?.reg_no) {
    dispatch(loginUser(session));
    return (
      <>
        <StudentHome />
      </>
    );
  } else if (session?.user?.role === "employee") {
    dispatch(loginUser(session));
    return (
      <>
        <FacultyHome />
      </>
    );
  } else if (session?.user?.role === "COORDINATOR") {
    dispatch(loginUser(session));
    return (
      <>
        <HomeDashboard />
      </>
    );
  } else if (session?.user?.role === "superAdmin") {
    dispatch(loginUser(session));
    return (
      <>
        <Home2 />
      </>
    );
  } else {
    return (
      <div className="bg-white login_form flex  items-center justify-center">
        <form
          className="flex flex-col gap-8 p-2  m-8  shadow-lg rounded-lg items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <span className="text-3xl font-bold text-blue-900">Sign in</span>
            <span>Fill in the fields below to sign into your account</span>
          </div>
          <input
            type="email"
            className="p-2 border-2 border-blue-600 w-72 text-xl rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            className="p-2 border-2 border-blue-600  w-72 text-xl rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button
            className="p-2 hover:bg-blue-400 bg-blue-600 text-white w-72 text-xl rounded-lg"
            type="submit"
          >
            sign in
          </button>{" "}
          <div className="flex flex-col    ">
            <span className="text-xl ">not having account ? click below</span>
            <div className="flex flex-col ">
              <span
                onClick={() => router.push("/student/register")}
                className=" text-blue-800 hover:underline cursor-pointer p-2 rounded-xl"
              >
                Student
              </span>
              <span
                onClick={() => router.push("/faculty/register")}
                className="text-blue-800 hover:underline cursor-pointer p-2 rounded-xl"
              >
                Faculty
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
