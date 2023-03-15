import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { project_id, employee_email, role } = req.body;
    try {
      const employee_project = await prisma.employee_Project.create({
        data: {
          employee_email: employee_email,
          project_id: project_id,
          role: role,
        },
      });
      return res.status(200).json(employee_email);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
