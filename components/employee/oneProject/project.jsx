import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Table from "./studentTable";

const ViewProjectComp = ({ data }) => {
  return (
    <div className="presentationLists">
      <Navbar />
      <div className="allPresentationsLeft">
        <Sidebar />
      </div>
      <div className="allPresentationsRight mt-24 m-24 text-black">
        <div>
          <div>
            <div className="flex flex-col gap-12">
              {" "}
              <span className="text-3xl text-blue-900 text-center">
                Project Info
              </span>
              <div className="presentationDetail shadow-lg  p-8 rounded-lg">
                {" "}
                <div className="presentationDetailWrapper gap-4 flex flex-col">
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Title</span>
                    <span className="flex-1">{data?.title}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Description</span>
                    <span className="flex-1">{data?.description}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Coordinator Approval</span>
                    <span className="flex-1">{data?.status}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Presentation Info</span>
                    <span className="flex-1">
                      {data?.Presentation_Scedule?.length}
                    </span>
                  </div>
                </div>
                <div className="startPresentation"></div>
              </div>{" "}
              <span className="text-3xl text-blue-900 text-center">
                Students Info
              </span>
              <div className="presentationDetail shadow-lg  p-8 rounded-lg">
                <Table students={data?.students} />
              </div>{" "}
              <span className="text-3xl text-blue-900 text-center">
                Faculty Detail
              </span>
              <div className="">
                <table className="table presentationListTable  w-full   border-collapse border-slate-500  ">
                  <tbody>
                    <tr className="  border-blue-500 text-xl">
                      <th className="border text-center p-2">Email</th>
                      <th className="border text-center p-2">Role</th>
                      <th className="border text-center p-2">Acceptance</th>
                    </tr>
                    {data?.employee?.map((x) => (
                      <tr className="studentlist_tr text-black">
                        <td className="border  cursor-pointer text-center p-2">
                          {x?.employee_email}
                        </td>
                        <td className="border  cursor-pointer text-center p-2">
                          {x?.role}
                        </td>
                        <td className="border  cursor-pointer text-center p-2">
                          {x?.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewProjectComp;
