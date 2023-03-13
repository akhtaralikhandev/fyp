import { PrismaClient, Prisma, EmployeeRole } from "@prisma/client";

const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        title,
        description,
        department_name,
        supervisor_email,
        coSuperVisor_email,
        student_email,
        EmployeeRole,
        SDG,
        attributes,
        status,
      } = req.body;
      const student_check = await prisma.student.findUnique({
        where: { email: student_email },
      });
      if (student_check.projectId) {
        return res.status(403).json("already have a project");
      } else if (student_check && !student_check.projectId) {
        const project = await prisma.project.create({
          data: {
            title: title,
            description: description,
            department_name: department_name,
            SDG: SDG,
            attributes: attributes,
            admin_student_email: student_email,
          },
          include: {
            students: true,
          },
        });
        console.log(project);
        const student = await prisma.student.update({
          where: {
            email: student_email,
          },
          data: {
            projectId: project.id,
          },
        });
        if (supervisor_email && coSuperVisor_email) {
          const supervisorProjectData = {
            project_id: project.id,
            employee_email: supervisor_email,
            role: EmployeeRole.superVisor, // set the value of the role field
            status: status,
          };
          const coSupervisorProjectData = {
            project_id: project.id,
            employee_email: supervisor_email,
            role: EmployeeRole.coSuperVisor, // set the value of the role field
            status: status,
          };
          const SupervisedProject = await prisma.employee_Project.createMany({
            data: [supervisorProjectData, coSupervisorProjectData],
          });
          return res
            .status(200)
            .json({ supervisorProjectData, message: "Requested Successfully" });
        } else if (supervisor_email) {
          const supervisedProject = await prisma.employee_Project.create({
            data: {
              project_id: project.id,
              employee_email: supervisor_email,
              role: EmployeeRole.superVisor, // set the value of the role field
              status: status,
            },
          });
          return res.status(200).json(supervisedProject);
        } else if (coSuperVisor_email) {
          const superVisedProject = await prisma.employee_Project.create({
            data: {
              project_id: project.id,
              employee_email: supervisor_email,
              role: EmployeeRole.coSuperVisor, // set the value of the role field
              status: status,
            },
          });
          return res.status(200).json(superVisedProject);
        }

        res.status(200).json({ project: project, request: request });
      } else {
        return res.status(404).json("No student found with that email");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { projectId, email } = req.body;
      const student_check = await prisma.student.findUnique({
        where: { email: email },
      });
      if (!student_check.projectId) {
        const student = await prisma.student.update({
          where: { email: email },
          data: { projectId: projectId },
        });
      } else if (student_check.projectId) {
        return res.status(403).json("already joined a group");
      }

      if (!student) return res.status(404).json("No student found");
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const { email } = req.body;
      const project = await prisma.project.delete({
        where: {
          email: email,
        },
      });
      res.status(200).json("Project deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
