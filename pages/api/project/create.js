import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { title, description, department_name, student_email } = req.body;
      const project = await prisma.project.create({
        data: {
          title: title,
          description: description,
          student_email: student_email,
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
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, data } = req.body;
      const project = await prisma.project.update({
        where: { id: id },
        data: { ...data },
      });
      if (!project) return res.status(404).json("No student found");
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json(error);
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
