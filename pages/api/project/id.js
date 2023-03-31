import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const project = await prisma.project.findUnique({
        where: { id: parseInt(id) },
        include: {
          employee: true,
          Panel: true,
          Presentation_Scedule: true,
          student_request: {
            include: {
              student: true,
            },
          },
          students: true,
        },
      });

      if (project) {
        return res.status(200).json(project);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { reg_no, id } = req.body;
      const project = await prisma.project.findFirst({
        where: { id: parseInt(id) },
      });
      if (project) {
        const student = await prisma.student.findUnique({
          where: { reg_no: parseInt(reg_no) },
        });

        // Remove the student from the project
        const updatedProject = await prisma.project.update({
          where: { id: parseInt(id) },
          data: { students: { disconnect: { reg_no: parseInt(reg_no) } } },
        });
        return res.status(200).json(updatedProject);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { reg_no, id } = req.body;
      const project = await prisma.project.findUnique({
        where: { id: parseInt(id) },
      });
      if (project) {
        const students_of_project = await prisma.student.update({
          where: { reg_no: parseInt(reg_no) },
          data: { projectId: parseInt(id) },
        });
        return res.status(200).json({
          project: project,
          students_of_project: students_of_project,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
};

export default handler;
