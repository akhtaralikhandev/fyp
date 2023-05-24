import { EmployeeRole, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { projectId, employee_email, role, undo } = req.body;
  console.log(req.body);
  console.log(projectId);

  if (req.method === "POST") {
    try {
      if (undo) {
        // Handle undo operation
        const employee_project = await prisma.employee_Project.findFirst({
          where: {
            employee_email: employee_email,
            project_id: parseInt(projectId),
          },
        });
        const deletedSupervisor = await prisma.employee_Project.delete({
          where: {
            id: employee_project.id,
          },
        });
        return res
          .status(200)
          .json({ message: "Undo successful", deletedSupervisor });
      } else {
        // Create supervisor
        const alreadySupervisor = await prisma.employee_Project.findFirst({
          where: {
            project_id: parseInt(projectId),
            role: EmployeeRole.ADVISOR,
          },
        });
        console.log(alreadySupervisor);
        if (alreadySupervisor?.role === EmployeeRole.ADVISOR) {
          return res.status(403).json({
            message: "Already having a supervisor",
            alreadySupervisor,
          });
        }

        const supervisor = await prisma.employee_Project.create({
          data: {
            project_id: parseInt(projectId),
            employee_email: employee_email,
            role: role,
          },
        });
        return res.status(200).json(supervisor);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
