import Navbar from "../navbar/navbar";
import Sidebar from "../project/sidebar";
const ViewPresentationComp = ({ data }) => {
  return (
    <div className="presentationLists">
      <Navbar />
      <div className="allPresentationsLeft">
        <Sidebar />
      </div>
      <div className="allPresentationsRight mt-24 m-24 text-black">
        <div>
          <div>
            <div>
              <div className="presentationDetail shadow-lg  p-8 rounded-lg">
                <div className="presentationDetailWrapper gap-4 flex flex-col">
                  <span className="text-3xl text-blue-900">
                    Presentation Info
                  </span>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Title</span>
                    <span className="flex-1">{data?.title}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Number</span>
                    <span className="flex-1">{data?.Presentation_number}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">status</span>
                    <span className="flex-1">{data?.status}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Venue</span>
                    <span className="flex-1">{data?.venue}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Date and Time</span>
                    <span className="flex-1">
                      {new Date(data?.date).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="startPresentation"></div>
              </div>
              <div className="presentationDetail shadow-lg  p-8 rounded-lg">
                <span className="text-3xl text-blue-900">Rubrics</span>
                {data?.Rubrics?.length > 0 ? (
                  <div className="relative presentationDetailWrapper mt-4 gap-4 flex flex-col">
                    {data?.Rubrics?.map((item, index) => (
                      <div className="flex items-center justify-center">
                        <span className="rubricsNumber">
                          Rubrics {index + 1}
                        </span>
                        <span className="rubricsStatement">
                          {item?.statement}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <span>No Rubrics was found for this project</span>
                  </div>
                )}

                <div className="startPresentation"></div>
              </div>
              <div className="presentationDetail shadow-lg  p-8 rounded-lg">
                <div className="presentationDetailWrapper gap-4 flex flex-col">
                  <span className="text-3xl text-blue-900">Project Info</span>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Title</span>
                    <span className="flex-1">This is the title</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Number</span>
                    <span className="flex-1">1</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">status</span>
                    <span className="flex-1">PENDING</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Venue</span>
                    <span className="flex-1">Academic Block</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="flex-1">Date and Time</span>
                    <span className="flex-1">3/3/2003</span>
                  </div>
                </div>
                <div className="startPresentation"></div>
              </div>
              <div className="mt-14 p-8">
                <span className="text-3xl text-blue-900">Faculty Detail</span>
                <table className="table presentationListTable  w-full   border-collapse border-slate-500  ">
                  <tbody>
                    <tr className="  border-blue-500 text-xl">
                      <th className="border text-center p-2">Name</th>
                      <th className="border text-center p-2">Email</th>
                      <th className="border text-center p-2">Contact Number</th>
                    </tr>
                    {/* {list?.map((x) => ( */}
                    <tr className="studentlist_tr text-black">
                      <td className="border  cursor-pointer text-center p-2">
                        {/* {x?.title} */} john doe
                      </td>
                      <td className="border  cursor-pointer text-center p-2">
                        johndoe@gmail.com
                      </td>
                      <td className="border  cursor-pointer text-center p-2">
                        03035352332
                      </td>
                    </tr>
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
export default ViewPresentationComp;
//  <div className="mt-14 p-8">
//                 <span className="text-3xl text-blue-900">Students Detail</span>
//                 <table className="table presentationListTable  w-full   border-collapse border-slate-500  ">
//                   <tbody>
//                     <tr className="  border-blue-500 text-xl">
//                       <th className="border text-center p-2">Name</th>
//                       <th className="border text-center p-2">Email</th>
//                       <th className="border text-center p-2">Contact Number</th>
//                     </tr>
//                     {/* {list?.map((x) => ( */}
//                     <tr className="studentlist_tr text-black">
//                       <td className="border  cursor-pointer text-center p-2">
//                         {/* {x?.title} */} john doe
//                       </td>
//                       <td className="border  cursor-pointer text-center p-2">
//                         johndoe@gmail.com
//                       </td>
//                       <td className="border  cursor-pointer text-center p-2">
//                         03035352332
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
