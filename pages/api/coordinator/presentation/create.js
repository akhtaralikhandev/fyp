import { PrismaClient, Prisma, ProjectStatus } from "@prisma/client";
const prisma = new PrismaClient();
const { parseISO } = require("date-fns");
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { projectId, Presentation_number, title, date, venue, rubrics } =
      req.body;
    console.log("this is called from post request");
    console.log(req.body);
    const date2 = parseISO(date);
    try {
      const conflictingSchedules = await prisma.presentation_Scedule.findMany({
        where: {
          venue: venue,
          date: date2,
        },
      });
      if (conflictingSchedules.length > 0) {
        // Venue is not available
        return res.status(403).json({
          message: `The venue ${venue} is not available at the given time.`,
        });
      }
      const existingPresentation = await prisma.presentation_Scedule.findFirst({
        where: {
          projectId: parseInt(projectId),
          Presentation_number: parseInt(Presentation_number),
        },
      });
      if (existingPresentation) {
        // Presentation number already exists for this project
        return res.status(403).json({
          message: `Presentation number ${Presentation_number} already exists for project ${projectId}.`,
        });
      }
      const newPresentation = await prisma.presentation_Scedule.create({
        data: {
          Presentation_number: parseInt(Presentation_number),
          title: title,
          date: date2,
          venue: venue,
          Project: {
            connect: {
              id: parseInt(projectId),
            },
          },
          ...(rubrics && rubrics.length > 0
            ? {
                Rubrics: {
                  create: rubrics.map((r) => ({
                    statement: r,
                  })),
                },
              }
            : {}),
        },
        include: {
          Rubrics: true,
        },
      });
      console.log(newPresentation);
      return res.status(200).json(newPresentation);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const presentationScheduleFind =
        await prisma.presentation_Scedule.findFirst({
          where: { id: parseInt(id) },
        });
      if (!presentationScheduleFind)
        return res.status(404).json("No record found");
      const presentationSchedule = await prisma.presentation_Scedule.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json(presentationSchedule);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
