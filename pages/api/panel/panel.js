import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { emails, projects } = req.body;
      const assignedEmployees = await prisma.employee.findMany({
        where: {
          panelNumber: {
            not: null,
          },
          email: {
            in: emails,
          },
        },
        select: {
          email: true,
        },
      });
      if (assignedEmployees.length > 0) {
        const assignedEmails = assignedEmployees.map(
          (employee) => employee.email
        );
        return res.status(403).json({
          message:
            "Some of the provided employees are already assigned to a panel",
          assignedEmails,
        });
      }
      const assignedProjects = await prisma.project.findMany({
        where: {
          panelNumber: {
            not: null,
          },
          email: {
            in: emails,
          },
        },
        select: {
          email: true,
        },
      });
      if (assignedProjects.length > 0) {
        const assignedProject = assignedProjects.map(
          (employee) => employee.email
        );
        return res.status(403).json({
          message:
            "Some of the provided Projects are already assigned to a panel",
          assignedProject,
        });
      }
      const createdPanel = await prisma.panel.create({
        data: {
          projects: {
            connect: projects.map((projectId) => ({ id: projectId })),
          },
          Employees: {
            connect: emails.map((email) => ({ email })),
          },
        },
      });
      return res.status(200).json(createdPanel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT" && req.body.email) {
    const { id, email } = req.body;
    try {
      const alreadyPartOfPanel = await prisma.panel.findFirst({
        where: {
          id: parseInt(id),
          Employees: {
            some: {
              email: email,
            },
          },
        },
      });
      if (alreadyPartOfPanel)
        return res.status(404).json({
          message: "this is already part of a panel",
          alreadyPartOfPanel,
        });
      const updatePanel = await prisma.panel.update({
        where: { id: parseInt(id) },
        include: {
          Employees: true,
          projects: {
            include: {
              employee: {
                where: {
                  role: "ADVISOR",
                },
              },
              Presentation_Scedule: true,
            },
          },
        },
        data: {
          Employees: {
            connect: { email: email },
          },
        },
      });
      const panelWithCounts = {
        ...updatePanel,
        totalEmployee: updatePanel.Employees.length,
        totalProjects: updatePanel.projects.length,
      };
      return res.status(200).json(panelWithCounts);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT" && req.body.projectId) {
    const { id, projectId } = req.body;
    console.log(req.body);
    try {
      const alreadyPartOfPanel = await prisma.panel.findFirst({
        where: {
          id: parseInt(id),
          projects: {
            some: {
              id: parseInt(projectId),
            },
          },
        },
      });
      if (alreadyPartOfPanel)
        return res.status(404).json({
          message: "this is already part of a panel",
          alreadyPartOfPanel,
        });
      const updatePanel = await prisma.panel.update({
        where: { id: parseInt(id) },
        include: {
          Employees: true,
          projects: {
            include: {
              employee: {
                where: {
                  role: "ADVISOR",
                },
              },
              Presentation_Scedule: true,
            },
          },
        },
        data: {
          projects: {
            connect: { id: parseInt(projectId) },
          },
        },
      });
      const panel = {
        ...updatePanel,
        totalEmployee: updatePanel.Employees.length,
        totalProjects: updatePanel.projects.length,
      };
      return res.status(200).json(panel);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const { department_name } = req.query;
    try {
      const panels = await prisma.panel.findMany({
        where: {
          projects: {
            some: {
              department_name: department_name,
            },
          },
        },
        include: {
          Employees: true,
          projects: {
            include: {
              employee: {
                where: {
                  role: "ADVISOR",
                },
              },
              Presentation_Scedule: true,
            },
          },
        },
      });

      const panelsWithCounts = panels.map((panel) => {
        return {
          ...panel,
          totalEmployee: panel.Employees.length,
          totalProjects: panel.projects.length,
        };
      });
      // `panelsWithCounts` now contains the same panel objects as `panels`,
      // but with additional `totalEmployee` and `totalProjects` properties
      return res.status(200).json(panelsWithCounts);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
