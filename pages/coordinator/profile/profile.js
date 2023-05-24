import Navbar from "../../../components/coordinator/navbar";
import Profile from "../../../components/coordinator/profile";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div className="profilePageWrapper">
        <div className="navbar">
          <Navbar />
        </div>

        <Profile />
      </div>
    </div>
  );
};
export default ProfilePage;
