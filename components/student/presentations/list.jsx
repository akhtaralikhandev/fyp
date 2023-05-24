import { useSelector } from "react-redux";
import Link from "next/link";
const PresentationList = () => {
  const myProject = useSelector((state) => state.student?.projects);
  return (
    <>
      {myProject?.Presentation_Scedule?.length > 0 ? (
        <div>
          <div className="mt-4 mb-4">
            <span className="text-2xl ">
              Total Number of Presentations Assigned{" "}
              {myProject?.Presentation_Scedule?.length}
            </span>
          </div>

          <div className="flex gap-8 flex-wrap">
            {myProject?.Presentation_Scedule.map((x) => (
              <Link href={`/student/presentation/${x?.id}`}>
                <div className=" shadow-lg p-8 gap-6 flex flex-col rotating-div rounded-lg cursor-pointer">
                  <div className="flex gap-8 items-center">
                    <span className="text-3xl flex-1 flex items-center text-blue-600 ">
                      Title
                    </span>{" "}
                    <span className="text-xl flex-1 flex items-center  ">
                      This is the title of prsentation
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-8 items-center">
                      <span className="text-xl flex-1 flex items-center text-blue-600 ">
                        Status
                      </span>{" "}
                      <span className="text-xl flex-1 flex items-center  ">
                        Pending
                      </span>
                    </div>
                    <div className="flex gap-8 items-center">
                      <span className="text-xl flex-1 flex items-center text-blue-600 ">
                        Date & Time
                      </span>{" "}
                      <span className="text-xl flex-1 flex items-center  ">
                        01 May 2002
                      </span>
                    </div>
                    <div className="flex gap-8 items-center">
                      <span className="text-xl flex-1 flex items-center text-blue-600 ">
                        Venue
                      </span>{" "}
                      <span className="text-xl flex-1 flex items-center  ">
                        Academic Block
                      </span>
                    </div>
                    <div className="flex gap-8 items-center">
                      <span className="text-xl flex-1 flex items-center text-blue-600 ">
                        Presentation Number
                      </span>{" "}
                      <span className="text-xl flex-1 flex items-center  ">
                        01
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <span>No presentation is assigned yet</span>
        </div>
      )}
    </>
  );
};

export default PresentationList;
