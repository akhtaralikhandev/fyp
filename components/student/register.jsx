import { useFormik } from "formik";
import Image from "next/image";
import { Triangle } from "react-loader-spinner";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { createStudent } from "../../lib/student/register";
import {
  clearFailure,
  clearMsg,
  registerStudent,
} from "../../redux/features/student/studentSlice";
const options = [
  { value: "FME", label: "FME" },
  { value: "FCSE", label: "FCSE" },
  { value: "FEE", label: "FEE" },
];
export const StudentRegister = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const registerSuccess = useSelector(
    (state) => state.student.studentRegisterSuccess
  );
  const goToLogin = useSelector((state) => state.student.login);
  const studentRegisterPending = useSelector(
    (state) => state.student.registerStudentPending
  );

  console.log(goToLogin);
  // const registerFailure = useSelector(
  //   (state) => state.student.studentRegisterFailure
  // );
  // console.log(registerSuccess);
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      reg_no: "",
      password: "",
      contact_no: "",
      department_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "must be 50 characters or less")
        .required("Required"),

      email: Yup.string().max(40, "must be less than 21").required("Required"),
      reg_no: Yup.string()
        .required("Required")
        .max(7, "must be 7")
        .min(7, "cannot be less than 7")
        .required("Required"),
      password: Yup.string()
        .max(25, "must be less than 25")
        .min(8, "must be greater than 8 character")
        .required("Required"),
      department_name: Yup.string().required("Required"),
      contact_no: Yup.string()
        .required("required")
        .max(11, "must be not greater than 11"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(registerStudent(values));
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMsg(""));
      console.log("useEffect with clear msg called");
    }, 5000);
    return () => clearTimeout(timer);
  }, [registerSuccess]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(clearFailure(""));
  //     console.log("useEffect with clear msg called");
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [registerFailure]);

  console.log(formik.values.firstName);
  console.log(formik.touched);
  return (
    <div className="studentRegisteration">
      {studentRegisterPending ? (
        <div
          style={{ height: "100vh" }}
          className="flex items-center justify-center"
        >
          {" "}
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="wrapper flex gap-2 ">
          <form
            onSubmit={formik.handleSubmit}
            className="    flex-1 pb-0 md:flex-nowrap flex-wrap justify-center items-center  flex flex-col gap-6 rounded-lg md:p-8"
          >
            <div className="form_wrapper shadow-lg    p-8 pt-4 pb-0 md:flex-nowrap flex-wrap justify-start items-start  flex flex-col gap-6 rounded-lg md:p-8   ">
              <span className="text-2xl sm:text-3xl md:text-4xl">
                Register As Student For Final Year Project
              </span>
              <span className=" left-96 text-green-500 text-2xl">
                {registerSuccess && <span> {registerSuccess} </span>}
              </span>
              {/* <span className=" left-96 text-red-500 text-2xl">
              {registerFailure && <span> {registerFailure} </span>}
            </span> */}
              <div className="flex sm:flex-row flex-col gap-4 w-full">
                <div className="flex flex-col md:flex-nowrap flex-wrap flex-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="p-3 outline-blue-500 border-blue-400 rounded-lg border"
                    placeholder="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500">{formik.errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-3 outline-blue-500 border-blue-400 rounded-lg border"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-600">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="flex gap-4 sm:flex-row flex-col w-full">
                <div className="flex flex-col flex-1">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="p-3 outline-blue-500 border-blue-400 rounded-lg border"
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-red-500">{formik.errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <input
                    type="number"
                    id="reg_no"
                    name="reg_no"
                    className="p-3 outline-blue-500 border-blue-400 rounded-lg border"
                    placeholder="reg no"
                    value={formik.values.reg_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.reg_no && formik.errors.reg_no ? (
                    <p className="text-red-500">{formik.errors.reg_no}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  id="contact_no"
                  name="contact_no"
                  className="p-3 outline-blue-500 border-blue-400 rounded-lg border"
                  placeholder="contact no"
                  value={formik.values.contact_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.contact_no && formik.errors.contact_no ? (
                  <p className="text-red-600">{formik.errors.contact_no}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col w-full">
                <select
                  id="department_name"
                  name="department_name"
                  className="p-3 outline-blue-500 border-blue-400 rounded-lg border"
                  value={formik.values.department_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue={"FME"}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.department_name &&
                formik.errors.department_name ? (
                  <p className="text-red-600">
                    {formik.errors.department_name}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex  items-center justify-between w-full">
                <button
                  className="bg-blue-600 text-white text-xl p-2 rounded-xl w-24"
                  type="submit"
                >
                  Submit
                </button>{" "}
                <span className="md:text-xl">
                  Having account{" "}
                  <span
                    onClick={() => router.push("/")}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    login here
                  </span>
                </span>
              </div>
            </div>
          </form>{" "}
          {isSuccess ? (
            <h3 className="text-white absolute top-2 left-1/2">
              Account created{" "}
            </h3>
          ) : (
            ""
          )}
          {isFailure ? (
            <h3 className="text-white absolute top-2 left-64">
              Account not created (make sure that credentials ie email contact
              no, reg no are not used before)
            </h3>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
