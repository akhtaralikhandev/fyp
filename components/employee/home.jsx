import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signOut2 } from "../../redux/app/store";
import { persistor } from "../../redux/app/store";
import { useDispatch } from "react-redux";
const Employee_home = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  if (!session) {
    return <>loading</>;
  }
  if (typeof session === "undefined") {
    return <div>session data not loaded</div>;
  }
  console.log(session);
  return (
    <div className="home">
      <div className="home_wrapper">employee home</div>
      <button
        onClick={() => {
          dispatch(signOut2());
          signOut();
          persistor.purge();
        }}
      >
        sign out
      </button>
    </div>
  );
};

export default Employee_home;
