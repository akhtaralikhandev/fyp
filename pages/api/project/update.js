import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { projectId } = req.query;
    const { title, description } = req.body;
    try {
      const project = await prisma.project.update({
        where: { id: parseInt(projectId) },
        data: {
          description: description,
          title: title,
        },
        include: {
          employee: true,
          Presentation_Scedule: true,
          Panel: true,
        },
      });
      return res.status(200).json({ message: "udpated Successfuly", project });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
