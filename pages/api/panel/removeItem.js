import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "PUT" && req.body.email) {
    const { id, email } = req.body;
    try {
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
            disconnect: { email: email },
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
      const updateProject = await prisma.panel.update({
        where: { id: parseInt(id) },
        data: {
          projects: {
            disconnect: { id: parseInt(projectId) },
          },
        },
      });
      return res.status(200).json(updateProject);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
