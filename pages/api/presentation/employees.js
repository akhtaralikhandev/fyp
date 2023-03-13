import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const allEmployees = await prisma.employee.findMany({
        include: {
          projects: true,
          Coordinator: true,
        },
      });
      return res.status(200).json(allEmployees);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred." });
    }
  }
};

export default handler;
