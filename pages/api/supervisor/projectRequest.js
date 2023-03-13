import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { status, id, employee_email, project_id } = req.body;

  try {
    if (req.method === "PUT") {
      console.log(req.body);
      const employee = await prisma.employee_Project.findFirst({
        where: { id: parseInt(id) },
      });
      if (employee.role === "ADVISOR" && status === "ACCEPTED") {
        const updatedEmployee = await prisma.employee_Project.update({
          where: { id: parseInt(id) },
          data: {
            status: status,
          },
        });
        const updatedProject = await prisma.project.update({
          where: { id: parseInt(project_id) },
          data: { supervisor_accepted: true },
        });
        return res.status(200).json({
          updatedEmployee,
          updatedProject,
          message: "Accepted Successfully",
        });
      } else if (employee.role === "ADVISOR" && status === "REJECTED") {
        const updatedProject = await prisma.project.update({
          where: { id: parseInt(project_id) },
          data: {
            supervisor_accepted: false,
          },
        });
        const updatedEmployee = await prisma.employee_Project.delete({
          where: { id: parseInt(id) },
        });
        return res.status(200).json(updatedEmployee, updatedProject);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default handler;
