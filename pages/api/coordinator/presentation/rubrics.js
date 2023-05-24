const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleteRubricsFromPresentation = async (req, res) => {
  const { presentationId, rubricsId } = req.query;
  if (req.method === "DELETE") {
    try {
      const presentation = await prisma.presentation_Scedule.update({
        where: { id: parseInt(presentationId) },
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
        data: {
          Rubrics: {
            delete: { id: parseInt(rubricsId) },
          },
        },
      });

      return res.status(200).json(presentation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { presentationId, rubricsId } = req.query;
    const { statement } = req.body;
    try {
      const presentation = await prisma.presentation_Scedule.update({
        where: { id: parseInt(presentationId) },
        include: { Rubrics: true },
        data: {
          Rubrics: {
            update: {
              where: { id: parseInt(rubricsId) },
              data: { statement },
            },
          },
        },
      });

      return res.status(200).json(presentation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default deleteRubricsFromPresentation;
