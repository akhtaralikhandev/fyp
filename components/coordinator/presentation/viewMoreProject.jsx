import { useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import Sidebar from "./presentSidebar";
import Navbar from "../navbar";
import { NavbarContext } from "../navbarContext";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import axios from "axios";
const ViewMoreComp = () => {
  const [error, setError] = useState("");
  const [editRubric, setEditRubric] = useState(false);
  const [data, setData] = useState();
  const [rubrics, setRubrics] = useState([]);
  const [addRubrics, setAddRubrics] = useState(false);
  const [numberOfRubrics, setNumberOfRubrics] = useState();
  const [editRubricStatement, setEditRubricStatement] = useState("");
  const [editingRubricId, setEditingRubricId] = useState(null);

  const {
    setViewMorePresentationLoading,
    viewMorePresentationLoading,
    viewMorePresentationId,
    setViewMorePresentationId,
  } = useContext(NavbarContext);

  const URL = `http://localhost:3000/api/coordinator/presentation/id?id=${viewMorePresentationId}`;
  useEffect(() => {
    const fetchMorePresentation = async () => {
      try {
        const resp = await axios.get(URL);
        setViewMorePresentationLoading(false);
        console.log(resp.data);
        setData(resp.data);
        return resp.data;
      } catch (error) {
        setError(error.message);
        setViewMorePresentationLoading(false);
        console.log(error);
      }
    };
    fetchMorePresentation();
  }, []);
  const handleAddRubrics = async (e) => {
    e.preventDefault();
    if (rubrics) {
      try {
        setViewMorePresentationLoading(true);
        const resp = await axios.put(
          `http://localhost:3000/api/coordinator/presentation/update`,
          {
            id: viewMorePresentationId,
            rubrics,
          }
        );
        console.log(resp);
        setData(resp.data);
        setAddRubrics(false);
        return resp.data;
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setViewMorePresentationLoading(false);
      }
    } else {
      alert("Please write rubrics to make changes");
    }
  };
  const handleAddRubricsDelete = async (e, rubricsId, presentationId) => {
    e.preventDefault();
    try {
      setViewMorePresentationLoading(true);
      const resp = await axios.delete(
        `http://localhost:3000/api/coordinator/presentation/rubrics?rubricsId=${rubricsId}&presentationId=${presentationId}`,
        {
          rubricsId: viewMorePresentationId,
          rubrics,
        }
      );
      console.log(resp);
      setData(resp.data);
      setAddRubrics(false);
      return resp.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setViewMorePresentationLoading(false);
    }
  };
  const handleAddRubricsEditing = async (e, rubricsId, presentationId) => {
    e.preventDefault();
    if (editRubricStatement) {
      try {
        setViewMorePresentationLoading(true);
        const resp = await axios.put(
          `http://localhost:3000/api/coordinator/presentation/rubrics?rubricsId=${rubricsId}&presentationId=${presentationId}`,
          {
            statement: editRubricStatement,
          }
        );
        console.log(resp);
        setData(resp.data);
        setAddRubrics(false);
        return resp.data;
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setViewMorePresentationLoading(false);
      }
    }
  };
  console.log(error);
  console.log("presentation id");
  console.log("This is data");
  console.log(data);
  console.log(viewMorePresentationId);
  const handleRubricChange = (index, value) => {
    const newRubrics = [...rubrics];
    newRubrics[index] = value;
    setRubrics(newRubrics);
    console.log(rubrics);
  };
  const handleNumberOfRubricsChange = (event) => {
    setNumberOfRubrics(event.target.value);
  };
  const handleEdit = (rubric) => {
    setEditRubric(true);
    setEditRubricStatement(rubric.statement);
    setEditingRubricId(rubric.id);
  };
  const renderRubricInputs = () => {
    if (numberOfRubrics) {
      return Array.from({ length: numberOfRubrics }, (_, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <textarea
            className="border-2 mt-2 w-full p-2 rounded-lg outline-blue-800 border-blue-500"
            type="text"
            placeholder={`Rubric ${index + 1}`}
            id={`rubric-${index}`}
            name=""
            value={rubrics[index] || ""}
            onChange={(e) => handleRubricChange(index, e.target.value)}
            cols="30"
            rows="3"
          ></textarea>
        </div>
      ));
    }
  };
  return (
    <div className="presentationLists">
      <Navbar />
      <div className="allPresentationsLeft">
        <Sidebar />
      </div>
      <div className="allPresentationsRight mt-24 m-24 text-black">
        {error ? (
          <span>{error}</span>
        ) : (
          <div>
            {" "}
            {viewMorePresentationLoading === true ? (
              <div className="div createPresentationLoading w-full">
                <TailSpin
                  height="120"
                  width="120"
                  color="blue"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />{" "}
              </div>
            ) : (
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
                        <span className="flex-1">
                          {data?.Presentation_number}
                        </span>
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
                      <div className="relative presentationDetailWrapper gap-4 flex flex-col">
                        {data?.Rubrics?.map((item, index) => (
                          <div className="flex items-center justify-center">
                            <span className="rubricsNumber">
                              Rubrics {index + 1}
                            </span>
                            <span className="rubricsStatement">
                              {editingRubricId === item.id ? (
                                <div className="flex  gap-4">
                                  <textarea
                                    type="text"
                                    cols={50}
                                    className="border-2  w-80 border-blue-600"
                                    onChange={(e) =>
                                      setEditRubricStatement(e.target.value)
                                    }
                                    value={editRubricStatement}
                                  />
                                  <button
                                    onClick={(e) => {
                                      handleAddRubricsEditing(
                                        e,
                                        item?.id,
                                        item?.presentation_SceduleId
                                      );
                                      setEditRubric(false);
                                      setEditRubricStatement("");
                                      setEditingRubricId("");
                                    }}
                                    className="bg-blue-600 h-10  w-1/4 text-white rounded-lg p-2 cursor-pointer"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              ) : (
                                item?.statement
                              )}
                            </span>
                            <div className="absolute right-0 flex gap-4">
                              <span
                                onClick={(e) => {
                                  handleAddRubricsDelete(
                                    e,
                                    item?.id,
                                    item?.presentation_SceduleId
                                  );
                                }}
                                class="tooltip cursor-pointer"
                              >
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                <span class="tooltiptext">Delete</span>
                              </span>
                              {editingRubricId === item.id ? (
                                <button
                                  onClick={() => {
                                    setEditRubric(false);
                                    setEditRubricStatement("");
                                    setEditingRubricId("");
                                  }}
                                  className="bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-400 p-2"
                                >
                                  Cancel
                                </button>
                              ) : (
                                <span
                                  onClick={() => handleEdit(item)}
                                  className="tooltip cursor-pointer"
                                >
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                  <span className="tooltiptext">Edit</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        <button
                          className={
                            addRubrics
                              ? "bg-red-700 w-32 hover:bg-red-600 text-white rounded-lg cursor-pointer p-2"
                              : "bg-blue-700 w-32 hover:bg-blue-600 text-white rounded-lg cursor-pointer p-2"
                          }
                          onClick={() => setAddRubrics(!addRubrics)}
                        >
                          {addRubrics ? "Cancel" : "Add Rubrics"}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <span>No Rubrics was found for this project</span>
                        <button
                          className={
                            addRubrics
                              ? "bg-red-700 w-32 hover:bg-red-600 text-white rounded-lg cursor-pointer p-2"
                              : "bg-blue-700 w-32 hover:bg-blue-600 text-white rounded-lg cursor-pointer p-2"
                          }
                          onClick={() => setAddRubrics(!addRubrics)}
                        >
                          {addRubrics ? "Cancel" : "Add Rubrics"}
                        </button>
                      </div>
                    )}
                    {addRubrics ? (
                      <input
                        placeholder="write number of rubrics"
                        type="text"
                        value={numberOfRubrics}
                        onChange={handleNumberOfRubricsChange}
                        className="border-2 p-2 mt-4 rounded-lg outline-blue-800 border-blue-500"
                      />
                    ) : (
                      ""
                    )}

                    {addRubrics && numberOfRubrics && renderRubricInputs()}
                    {numberOfRubrics && addRubrics && (
                      <button
                        onClick={(e) => handleAddRubrics(e)}
                        className="bg-blue-600 text-white p-2 rounded-lg cursor-pointer mt-2 hover:bg-blue-500"
                      >
                        Save Changes
                      </button>
                    )}
                    <div className="startPresentation"></div>
                  </div>
                  <div className="presentationDetail shadow-lg  p-8 rounded-lg">
                    <div className="presentationDetailWrapper gap-4 flex flex-col">
                      <span className="text-3xl text-blue-900">
                        Project Info
                      </span>
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
                    <span className="text-3xl text-blue-900">
                      Faculty Detail
                    </span>
                    <table className="table presentationListTable  w-full   border-collapse border-slate-500  ">
                      <tbody>
                        <tr className="  border-blue-500 text-xl">
                          <th className="border text-center p-2">Name</th>
                          <th className="border text-center p-2">Email</th>
                          <th className="border text-center p-2">
                            Contact Number
                          </th>
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
                  <div className="mt-14 p-8">
                    <span className="text-3xl text-blue-900">
                      Students Detail
                    </span>
                    <table className="table presentationListTable  w-full   border-collapse border-slate-500  ">
                      <tbody>
                        <tr className="  border-blue-500 text-xl">
                          <th className="border text-center p-2">Name</th>
                          <th className="border text-center p-2">Email</th>
                          <th className="border text-center p-2">
                            Contact Number
                          </th>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewMoreComp;
