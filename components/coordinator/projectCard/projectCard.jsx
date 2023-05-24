const ProjectCard = ({ project }) => {
  return (
    <div className="projectCard w-96 rounded-lg shadow-lg ">
      <div className="projectCardWrapper">
        <div className="projectCardTop">
          <img
            src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="projectCardImg"
            alt=""
          />
        </div>
        <div className="projectCardBetween flex p-4 flex-col  justify-between">
          <div className="flex justify-between ">
            <span className="flex-1 items-center justify-center">Title</span>
            <span className="flex-1 items-center justify-center">
              {project?.title}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="flex-1 items-center justify-center">Status</span>
            <span className="flex-1 items-center justify-center">
              {project?.status}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="flex-1 items-center justify-center">
              Total Students
            </span>
            <span className="flex-1 items-center justify-center">
              {project?.students?.length}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="flex-1 items-center justify-center">
              Group Leader
            </span>
            <span className="flex-1 items-center justify-center">
              {project?.admin_student_email}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="flex-1 items-center justify-center">
              No of Presentations
            </span>
            <span className="flex-1 items-center justify-center">
              {project?.Presentation_Scedule?.length}
            </span>
          </div>
        </div>
        <div className="projectCardBottom p-2 pl-4">
          <button className="projectCardButtonOk hover:bg-blue-500 bg-blue-600 p-2 text-white rounded-lg">
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
