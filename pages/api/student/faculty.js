import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const facultyWithProjects = await prisma.employee.findMany({
        include: {
          projects: true,
        },
      });
      return res.status(200).json(facultyWithProjects);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
};

export default handler;
