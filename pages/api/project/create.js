import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { title, description, department_name, student_email } = req.body;
      const student_check = await prisma.student.findUnique({
        where: { email: student_email },
      });
      if (student_check.projectId) {
        return res.status(403).json("already have a project");
      } else if (student_check && !student_check.projectId) {
        const project = await prisma.project.create({
          data: {
            title: title,
            description: description,
            department_name: department_name,
          },
          include: {
            students: true,
          },
        });
        console.log(project);
        const student = await prisma.student.update({
          where: {
            email: student_email,
          },
          data: {
            projectId: project.id,
          },
        });
        res.status(200).json(project);
      } else {
        return res.status(404).json("No student found with that email");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { projectId, email } = req.body;
      const student_check = await prisma.student.findUnique({
        where: { email: email },
      });
      if (!student_check.projectId) {
        const student = await prisma.student.update({
          where: { email: email },
          data: { projectId: projectId },
        });
      } else if (student_check.projectId) {
        return res.status(403).json("already joined a group");
      }

      if (!student) return res.status(404).json("No student found");
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const { email } = req.body;
      const project = await prisma.project.delete({
        where: {
          email: email,
        },
      });
      res.status(200).json("Project deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
