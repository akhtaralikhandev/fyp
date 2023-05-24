import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  deletePresentation,
  fetchAllPresentations,
} from "../../../redux/features/coordinator/coordPresentationSlice";
import { useEffect } from "react";
import { NavbarContext } from "../navbarContext";
const DeleteConfirmation = ({ id, onDelete }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const department_name = session?.user?.department_name;
  console.log(department_name);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { list, setList } = useContext(NavbarContext);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePresentation(id));
    dispatch(fetchAllPresentations(department_name));
    setList(allPresentations);
    setShowConfirmation(false);
  };
  const allPresentations = useSelector(
    (state) => state.coordPresentation.allPresentations
  );

  return (
    <>
      <button onClick={() => setShowConfirmation(true)}>
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
      {showConfirmation && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="z-20 bg-white p-4 rounded-md shadow-md">
            <p className="mb-4 text-black">
              Are you sure you want to delete this Presentation?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmation;
