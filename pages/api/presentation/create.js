import { PrismaClient } from "@prisma/client";
const { parseISO } = require("date-fns");
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { date, venue, projectId } = req.body;
  console.log("this is called");
  try {
    const presentationSchedule = await prisma.presentation_Scedule.create({
      data: {
        date: parseISO(date),
        venue: venue,
        projects: {
          connect: {
            id: parseInt(projectId),
          },
        },
      },
    });
    return res
      .status(200)
      .json({ presentationSchedule, projectId: parseInt(projectId) });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default handler;
