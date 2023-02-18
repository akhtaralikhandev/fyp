import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { createStudent } from "../../lib/student/register";

const Faculty_Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      reg_no: "",
      password: "",
      batch_no: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),

      email: Yup.string().max(15, "must be less than 15").required("Required"),
      reg_no: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await createStudent(values);
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
            <div className="flex gap-4 sm:flex-row flex-col w-full">
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  id="reg_no"
                  name="reg_no"
                  className="p-3 outline-blue-500"
                  placeholder="Reg No"
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
              <div className="flex flex-col flex-1">
                <input
                  type="number"
                  id="batch_no"
                  name="batch_no"
                  className="p-3 outline-blue-500"
                  placeholder="batch no"
                  value={formik.values.batch_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.batch_no && formik.errors.batch_no ? (
                  <p className="text-red-500">{formik.errors.batch_no}</p>
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
