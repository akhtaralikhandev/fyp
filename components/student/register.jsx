import { useFormik } from "formik";
import Image from "next/image";

import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { createStudent } from "../../lib/student/register";
const options = [
  { value: "FME", label: "FME" },
  { value: "FCSE", label: "FCSE" },
  { value: "FEE", label: "FEE" },
];
const Faculty_Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
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
        const resp = await createStudent(values);
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    },
  });
  console.log(formik.values.firstName);
  console.log(formik.touched);
  return (
    <div className="bg-slate-700">
      <div className="wrapper flex gap-0 md:gap-24  p-4 md:p-14 h-full w-full">
        <div className="lg:block hidden">
          <Image
            className=" rounded-xl"
            src={"/images/register.jpg"}
            width={400}
            height={400}
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-slate-200 flex-1 pb-0 md:flex-nowrap flex-wrap justify-start items-start  flex flex-col gap-6 rounded-lg md:p-8"
        >
          <div className="form_wrapper pt-4 pb-0 md:flex-nowrap flex-wrap justify-start items-start  flex flex-col gap-6 rounded-lg md:p-8 w-full p-4 ">
            <span className="text-2xl sm:text-3xl md:text-4xl">
              Register As Student For Final Year Project
            </span>
            <div className="flex sm:flex-row flex-col gap-4 w-full">
              <div className="flex flex-col md:flex-nowrap flex-wrap flex-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="p-3 outline-blue-500"
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
                className="p-3 outline-blue-500"
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
                  className="p-3 outline-blue-500"
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
                  className="p-3 outline-blue-500"
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
                className="p-3 outline-blue-500"
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
                className="p-3 outline-blue-500"
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
                <p className="text-red-600">{formik.errors.department_name}</p>
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
            Account not created (make sure that credentials ie email contact no,
            reg no are not used before)
          </h3>
        ) : (
          ""
        )}
      </div>{" "}
    </div>
  );
};

export default Faculty_Register;
