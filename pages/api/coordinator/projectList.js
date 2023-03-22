import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (
    req.method === "GET" &&
    (req.query.supervisor_email || req.query.coSuperVisor_email)
  ) {
    try {
      const projects = await prisma.projectRequest.findMany({
        where: { supervisor_email: req.query.supervisor_email },
      });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const { department_name } = req.query;
    try {
      console.log(department_name);
      const department = await prisma.department.findFirst({
        where: { name: department_name },
        include: {
          students: {
            include: { ProjectJoiningRequest: true },
          },
          employees: true,
          employee: true,
          projects: {
            include: {
              employee: true,
              Panel: true,
              Presentation_Scedule: true,
              students: true,
            },
          },
        },
      });

      if (!department)
        return res.status(404).json("No project found for that department");
      // const projectsWithStudentCount = department.map((project) => ({
      //   ...project,
      //   numberOfStudents: project.students.length,
      // }));
      return res.status(200).json(department);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { id, status } = req.body;
    try {
      const project = await prisma.project.update({
        where: { id: parseInt(id) },
        data: {
          status: status,
        },
      });
      return res.status(200).json(project);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
