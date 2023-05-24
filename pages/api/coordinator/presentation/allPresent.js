// Import PrismaClient
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    const allPresentations = await prisma.presentation_Scedule.findMany({});
    return res.status(200).json(allPresentations);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default handler;
