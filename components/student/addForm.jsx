const AddForm = () => {
  return (
    <div className="add_form">
      <div className="add_form_wrapper gap-4 flex-col pt-24 flex items-center justify-center">
        <label htmlFor="" className="text-xl">
          write Reg No here
        </label>
        <input type="text" className="p-3 rounded-lg" placeholder="Reg No" />
        <button className="text-xl bg-slate-500 hover:bg-slate-300 hover:text-black p-2 rounded-lg">
          submit
        </button>
      </div>
    </div>
  );
};
export default AddForm;
