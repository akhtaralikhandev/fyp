import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { project_id } = req.body;
    try {
      // First, delete all employee_project rows that reference the project to be deleted
      await prisma.employee_Project.deleteMany({
        where: { project_id: undefined },
      });

      // Then, delete the project itself
      const project = await prisma.project.deleteMany({
        where: { admin_student_email: null },
      });

      return res.status(200).json(project);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
};

export default handler;
