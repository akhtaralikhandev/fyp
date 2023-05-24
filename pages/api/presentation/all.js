import { PrismaClient } from "@prisma/client";
const { parseISO } = require("date-fns");
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { department_name } = req.query;
    try {
      const allPresentations = await prisma.presentation_Scedule.findMany({
        where: {
          Project: {
            department_name: department_name,
          },
        },
      });
      if (!allPresentations)
        return res.status(404).json("No presentation was found");
      return res.status(200).json({ allPresentations });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
