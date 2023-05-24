import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const studentsWithProjects = await prisma.student.findMany({
        include: {
          project: {
            select: {
              id: true,
            },
          },
        },
      });
      return res.status(200).json(studentsWithProjects);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
};

export default handler;
