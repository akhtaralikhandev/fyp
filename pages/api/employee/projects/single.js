import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const Project = await prisma.project.findFirst({
        where: { id: parseInt(id) },
        include: {
          employee: true,
          students: true,
          student_request: true,
          Presentation_Scedule: true,
        },
      });
      return res.status(200).json(Project);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
