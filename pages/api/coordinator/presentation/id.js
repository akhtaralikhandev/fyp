const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const handler = async (req, res) => {
  const { id } = req.query;
  try {
    const thisPresentation = await prisma.presentation_Scedule.findFirst({
      where: { id: parseInt(id) },
      include: {
        Rubrics: true,
        Project: {
          include: {
            students: true,
            admin_student: true,
            employee: true,
          },
        },
      },
    });
    return res.status(200).json(thisPresentation);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default handler;
