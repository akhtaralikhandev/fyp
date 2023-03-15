import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // initialize the createdPanel variable first
      const { emails, projects } = req.body;
      console.log(req.body);
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
            },
          },
        },
      });

      return res.status(200).json(panels);

      return res.status(200).json(panels);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
