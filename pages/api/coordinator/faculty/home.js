import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { department_name } = req.query;
    try {
      const allStudents = await prisma.employee.findMany({
        where: { department_name: department_name },
      });
      return res.status(200).json(allStudents);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
