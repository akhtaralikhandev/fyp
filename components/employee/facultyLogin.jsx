import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { sendContactForm } from "../../lib/api";
const Faculty_Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().max(15, "must be less than 15").required("Required"),
      regNo: Yup.string()
        .max(15, "must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(10, "must be less than 10")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await sendContactForm(values);
    },
  });

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
              Faculty Login For Final Year Project
            </span>
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
              <input
                type="password"
                id="password"
                name="password"
                className="p-3 outline-blue-500"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-600">{formik.errors.password}</p>
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
              <div>
                <span className="md:text-xl">
                  Not Having account{" "}
                  <span
                    onClick={() => router.push("/faculty/register")}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Register here
                  </span>
                </span>
              </div>
            </div>
          </div>
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default Faculty_Login;
