import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateGroup from "../../pages/student/student";
import Employee_home from "../employee/home";
import { loginUser } from "../../redux/features/user/userSlice";
import Home2 from "../../pages/superAdmin/home";
import Coordinator_home from "../../pages/coordinator/Home";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", { email: email, password: password });
  };
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  if (session?.user?.reg_no) {
    dispatch(loginUser(session));
    return (
      <>
        <CreateGroup />
      </>
    );
  } else if (session?.user?.role === "employee") {
    dispatch(loginUser(session));
    return (
      <>
        <span>employee page</span>
        <button onClick={() => signOut()}>sign out</button>
      </>
    );
  } else if (session?.user?.role === "COORDINATOR") {
    dispatch(loginUser(session));
    return (
      <>
        <Coordinator_home />
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
      <div className="bg-slate-700 login_form">
        <form
          className="flex flex-col gap-3 items-center lg:pt-12 xl:pt-48"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="email"
            className="p-2 w-72 text-xl rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 w-72 text-xl rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="p-2 hover:bg-slate-400 bg-white w-72 text-xl rounded-lg"
            type="submit"
          >
            sign in
          </button>
        </form>
        <div className="flex flex-col gap-8  items-center pt-4">
          <span className="text-xl text-white">
            not having account create here
          </span>
          <div className="flex gap-2">
            <span
              onClick={() => router.push("/student/register")}
              className="bg-slate-400 cursor-pointer p-2 rounded-xl"
            >
              Student
            </span>
            <span
              onClick={() => router.push("/faculty/register")}
              className="bg-slate-400 cursor-pointer p-2 rounded-xl"
            >
              Faculty
            </span>
          </div>
        </div>
      </div>
    );
  }
}
