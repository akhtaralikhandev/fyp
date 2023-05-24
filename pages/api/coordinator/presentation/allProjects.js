// Import PrismaClient
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    const allProjects = await prisma.project.findMany({
      // Include the number of presentation schedules each project has
      include: {
        Panel: {
          include: {
            Employees: true,
          },
        },
        Presentation_Scedule: {
          select: {
            id: true,
          },
        },
      },
    });

    // Modify each project object to include the number of presentation schedules it has
    const projectsWithNumSchedules = allProjects.map((project) => {
      return {
        ...project,
        numPresentationSchedules: project.Presentation_Scedule.length,
      };
    });

    return res.status(200).json(projectsWithNumSchedules);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default handler;
