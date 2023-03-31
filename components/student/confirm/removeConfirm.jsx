import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { removeStudentByAdminStudent } from "../../../redux/features/student/studentSlice";
const RemoveConfirmation = ({ reg_no, onDelete, projectId }) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    const data = {
      reg_no: reg_no,
      projectId: projectId,
      remove: true,
    };
    dispatch(removeStudentByAdminStudent(data));
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        className=" bg-green-800 text-white p-2 rounded-lg cursor-pointer hover:bg-green-600"
        onClick={() => setShowConfirmation(true)}
      >
        Delete Student
      </button>
      {showConfirmation && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="z-20 bg-white p-4 rounded-md shadow-md">
            <p className="mb-4 text-black">
              Are you sure you want to delete this student?
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

export default RemoveConfirmation;
