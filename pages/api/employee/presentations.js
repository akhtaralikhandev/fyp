import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  const { panelId } = req.query;
  if (req.method === "GET") {
    try {
      const panel = await prisma.panel.findFirst({
        where: { id: parseInt(panelId) },
        include: {
          projects: {
            select: {
              Presentation_Scedule: true,
            },
          },
        },
      });
      return res.status(200).json(panel);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
