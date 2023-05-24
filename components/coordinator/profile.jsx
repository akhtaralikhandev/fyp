import { useSelector } from "react-redux";
import Navbar from "./navbar";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div className="profile pt-24">
      <div className="profilePageWithNavbar">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="profileWrapper p-4 flex flex-col items-center gap-6 justify-center">
          <img
            src="/images/Image.jpg"
            className="w-32 h-32 rounded-full object-cover"
            alt=""
          />{" "}
          <span className="text-slate-700 xl:text-3xl font-bold">About Me</span>
          <div>
            <span>Name : </span> <span>{user?.name}</span>
          </div>
          <div>
            <span>Department : </span> <span>{user?.department_name}</span>
          </div>
          <div>
            <span>Email : </span> <span>{user?.email}</span>
          </div>
          <div>
            <span>Role : </span> <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
