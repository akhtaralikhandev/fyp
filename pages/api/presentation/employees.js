import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { department } = req.query;
  if (req.method === "GET") {
    try {
      const unassignedEmployees = await prisma.employee.findMany({
        where: {
          panelNumber: null,
          department_name: department,
        },
        include: {
          projects: true,
          Coordinator: true,
        },
      });
      return res.status(200).json(unassignedEmployees);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;
