import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
function Profile() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const department_name = session?.user?.department_name;
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    router.replace("/");
    closePopup();
  };
  const name = session?.user?.name;
  return (
    <>
      <div className="flex flex-col gap-2">
        <img
          className="h-12 w-12 rounded-full object-cover cursor-pointer"
          src="https://media.gettyimages.com/id/1314489757/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=mU_OXyCcBWewSUuA-IQE7LYuwo7FtHqX8pVnpNSSXcQ="
          alt=""
          onClick={openPopup}
        />
      </div>

      {isPopupOpen && (
        <div className="absolute right-8 -top-24 z-10  ">
          <div className="flex  flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closePopup}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-gray-50 p-8 flex flex-col gap-3 items-center justify-center">
                <img
                  className="h-16 w-16 rounded-full object-cover cursor-pointer"
                  src="https://media.gettyimages.com/id/1314489757/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=mU_OXyCcBWewSUuA-IQE7LYuwo7FtHqX8pVnpNSSXcQ="
                  alt=""
                />
                <span className="text-black"> {name}</span>
                <span className="text-black"> {email}</span>
                <span className="text-black"> {department_name}</span>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closePopup}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
