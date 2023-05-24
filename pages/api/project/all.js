import { PrismaClient, Prisma, EmployeeRole } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { department_name } = req.query;
    try {
      const allProjects = await prisma.project.findMany({
        where: {
          department_name: department_name,
        },
        include: {
          employee: {
            include: {
              project: true,
            },
          },
        },
      });
      if (!allProjects)
        return res.status(404).json("No project found for this department");
      return res.status(200).json(allProjects);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
