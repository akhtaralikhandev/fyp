import { useRouter } from "next/router";
const Table = () => {
  const router = useRouter();
  return (
    <div>
      <div className="wrapper_table p-4 ">
        <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Group ID</th>
              <th className="border text-center p-2">status</th>
              <th className="border text-center p-2">View More</th>
            </tr>
            <tr className="bg-slate-300">
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                1234
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                pending
              </td>
              <td
                onClick={() => router.push("/admin/group")}
                className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2"
              >
                view more
              </td>
            </tr>
            <tr>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                18434
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                pending
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                view more{" "}
              </td>
            </tr>
            <tr className="bg-slate-300">
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                1234
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                pending
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                view more
              </td>
            </tr>
            <tr>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                18434
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                pending
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                view more{" "}
              </td>
            </tr>
            <tr className="bg-slate-300">
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                1234
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                pending
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                view more
              </td>
            </tr>
            <tr>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                18434
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                pending
              </td>
              <td className="border hover:bg-slate-600 hover:text-white cursor-pointer text-center p-2">
                view more{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
