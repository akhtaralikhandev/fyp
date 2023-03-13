const Project = ({ list, onDelete, onEdit, onSubmit }) => {
  return (
    <div className="project">
      <div className="project_wrapper   flex flex-col gap-2 items-start md:p-8 p-4 xl:p-8  border">
        <span>{list.id}</span>
        <span>{list.title}</span>
        <span>{list.description}</span>
        <span className=" underline">{list.status}</span>
        <div className="flex gap-8 items-center">
          <span className="bg-slate-600 cursor-pointer hover:bg-slate-500 text-white p-2 rounded-xl">
            Delete
          </span>
          <span className="bg-slate-600 cursor-pointer p-2 hover:bg-slate-500 text-white rounded-xl">
            Edit
          </span>
        </div>
      </div>
    </div>
  );
};

export default Project;
