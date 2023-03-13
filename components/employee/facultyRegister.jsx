import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { registerEmployee } from "../../lib/employee/login";
const options = [
  { value: "FME", label: "FME" },
  { value: "FCSE", label: "FCSE" },
  { value: "FEE", label: "FEE" },
];
const Faculty_Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      contact_no: "",

      department_name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),
      email: Yup.string().max(25, "must be less than 25").required("Required"),
      password: Yup.string()
        .max(15, "must be less than 15")
        .required("Required"),
      contact_no: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("clicked");
      await registerEmployee(values);
    },
  });
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
              Register As Faculty For Final Year Project
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
              <div className="flex flex-col flex-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-3 outline-blue-500"
                  placeholder="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>
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
                  <p className="text-red-500">{formik.errors.contact_no}</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <select
                id="department_name"
                name="department_name"
                defaultValue={"FME"}
                className="p-3 outline-blue-500"
                value={formik.values.department_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {options.map((option) => (
                  <option
                    defaultValue={"FME"}
                    key={option.value}
                    value={option.value}
                  >
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
      </div>{" "}
    </div>
  );
};

export default Faculty_Register;
