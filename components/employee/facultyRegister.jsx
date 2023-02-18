import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { sendContactForm } from "../../lib/api";
const Faculty_Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      regNo: "",
      faculty: "",
      phoneNo: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(10, "must be less than 10")
        .required("Required"),
      email: Yup.string().max(15, "must be less than 15").required("Required"),
      regNo: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),
      phoneNo: Yup.number()
        .max(10, "must be less than 10")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await sendContactForm(values);
    },
  });
  console.log(formik.values.firstName);
  console.log(formik.touched);
  return (
    <div>
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
                  id="firstName"
                  name="firstName"
                  className="p-3 outline-blue-500"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="text-red-500">{formik.errors.firstName}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="p-3 outline-blue-500"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="text-red-500">{formik.errors.lastName}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex gap-4 sm:flex-row flex-col w-full">
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  id="regNo"
                  name="regNo"
                  className="p-3 outline-blue-500"
                  placeholder="Reg No"
                  value={formik.values.regNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.regNo && formik.errors.regNo ? (
                  <p className="text-red-500">{formik.errors.regNo}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col flex-1">
                <input
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  className="p-3 outline-blue-500"
                  placeholder="Phone No"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNo && formik.errors.phoneNo ? (
                  <p className="text-red-500">{formik.errors.phoneNo}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <input
                type="text"
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
            <div className="flex flex-col w-full">
              <label htmlFor="cars">Faculty*</label>
              <select className="p-3  outline-blue-500" name="cars" id="cars">
                <option className="p-2 cursor-pointer" value="volvo">
                  FES
                </option>
                <option className="p-2 cursor-pointer" value="saab">
                  FCE
                </option>
                <option className="p-2 cursor-pointer" value="opel">
                  FEE
                </option>
                <option className="p-2 cursor-pointer" value="audi">
                  FME
                </option>
                <option className="p-2 cursor-pointer" value="opel">
                  MGS
                </option>
                <option className="p-2 cursor-pointer" value="audi">
                  FCE
                </option>
              </select>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-600">{formik.errors.email}</p>
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
                  onClick={() => router.push("/faculty/login")}
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
