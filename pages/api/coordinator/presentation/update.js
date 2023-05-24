import { PrismaClient, Prisma, ProjectStatus } from "@prisma/client";
const { parseISO } = require("date-fns");
const prisma = new PrismaClient();

const handler = async (req, res) => {
  // async function updatePresentation(id, data) {
  if (req.method === "PUT") {
    const { id } = req.body;

    const data = req.body;
    const date2 = parseISO(data.date);
    console.log(date2);
    console.log(data);
    try {
      const presentation = await prisma.presentation_Scedule.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          Rubrics: true,
        },
      });

      if (!presentation) {
        throw new Error("Presentation not found.");
      }

      const updatedFields = {};

      if (data.Presentation_number) {
        updatedFields.Presentation_number = parseInt(data.Presentation_number);
      }

      if (data.title) {
        updatedFields.title = data.title;
      }

      if (data.date) {
        updatedFields.date = date2;
      }

      if (data.venue) {
        updatedFields.venue = data.venue;
      }

      if (data.projectId) {
        updatedFields.Project = {
          connect: {
            id: parseInt(data.projectId),
          },
        };
      }

      if (data.rubrics) {
        updatedFields.Rubrics = {
          create: data.rubrics.map((r) => ({
            statement: r,
          })),
        };
      }

      const updatedPresentation = await prisma.presentation_Scedule.update({
        where: {
          id: parseInt(id),
        },
        data: updatedFields,
        include: {
          Rubrics: true,
          Project: {
            include: {
              students: true,
              employee: true,
              admin_student: true,
            },
          },
        },
      });

      return res.status(200).json(updatedPresentation);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
