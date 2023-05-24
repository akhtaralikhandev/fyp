import { useState, useEffect, useContext } from "react";
import Navbar from "../navbar";
import Sidebar from "./presentSidebar";
import { useSelector, useDispatch } from "react-redux";
const CalendarComponent = () => {
  return (
    <div className="text-black">
      <Navbar />
      <div className="div flex">
        <div className="createPresentationLeftSide fixed">
          <Sidebar />
        </div>
        <div className="rightside pl-72 mt-32 m-8">
          <span>Presentaion calendar</span>
        </div>
      </div>
    </div>
  );
};
export default CalendarComponent;
