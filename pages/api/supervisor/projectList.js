import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { supervisor_email } = req.query;
    try {
      console.log(supervisor_email);
      const projects = await prisma.project.findMany({
        where: { supervisor_email: supervisor_email },
        include: {
          students: true,
        },
      });
      if (!projects)
        return res.status(404).json("No project found for that department");
      const projectsWithStudentCount = projects.map((project) => ({
        ...project,
        numberOfStudents: project.students.length,
      }));
      return res.status(200).json(projectsWithStudentCount);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT" && req.body.status === "REJECTED") {
    const { id } = req.body;
    try {
      const project = await prisma.project.update({
        where: { id: id },
        data: {
          SuperVisor: undefined,
          supervisor_email: null,
          supervisor_accepted: false,
        },
      });
      console.log("projecte callleddd");
      console.log(project);
      const projectRequest = await prisma.projectRequest.update({
        where: { id: id },
        data: { status: "REJECTED" },
      });
      return res.status(200).json({ project, projectRequest });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    const { id, supervisor_accepted, status } = req.body;
    try {
      const project = await prisma.project.update({
        where: { id: parseInt(id) },
        data: {
          supervisor_accepted: supervisor_accepted,
        },
      });
      const projectRequest = await prisma.projectRequest.update({
        where: { id: id },
        data: { status: status },
      });
      return res.status(200).json({ project, projectRequest });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
