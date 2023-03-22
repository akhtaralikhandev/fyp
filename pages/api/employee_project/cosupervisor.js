import { EmployeeRole, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { projectId, employee_email, role } = req.body;
  console.log(req.body);
  console.log(projectId);
  if (req.method === "POST") {
    try {
      const alreadySupervisor = await prisma.employee_Project.findFirst({
        where: {
          project_id: parseInt(projectId),
          role: EmployeeRole.CO_ADVISOR,
        },
      });
      console.log({ alreadySupervisor, message: "Already having advisor" });
      if (alreadySupervisor) {
        console.log("already having supervisor");
        return res
          .status(403)
          .json({ message: "already having supervisor", alreadySupervisor });
      }

      const supervisor = await prisma.employee_Project.create({
        data: {
          project_id: parseInt(projectId),
          employee_email: employee_email,
          role: role,
        },
      });
      return res.status(200).json(supervisor);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
