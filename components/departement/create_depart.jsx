import { useFormik, Field } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { createDepartement } from "../../lib/department/create";
const options = [
  { value: "FME", label: "FME" },
  { value: "FCSE", label: "FCSE" },
  { value: "FEE", label: "FEE" },
];
const Create_depart = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      coordinator_email: "",
    },
    validationSchema: Yup.object({
      coordinator_email: Yup.string()
        .max(15, "must be less than 15")
        .required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await createDepartement(values);
    },
  });

  console.log(formik.touched);
  return (
    <div>
      <div className="wrapper flex gap-0 md:gap-24  p-4 md:p-14 h-full w-full">
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
                type="email"
                id="coordinator_email"
                name="coordinator_email"
                className="p-3 outline-blue-500"
                placeholder="Coordinator Email"
                value={formik.values.coordinator_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.coordinator_email &&
              formik.errors.coordinator_email ? (
                <p className="text-red-600">
                  {formik.errors.coordinator_email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col w-full">
              <select
                id="name"
                name="name"
                className="p-3 outline-blue-500"
                defaultValue={"FME"}
                value={formik.values.name}
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
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-600">{formik.errors.name}</p>
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
              <div></div>
            </div>
          </div>
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default Create_depart;
