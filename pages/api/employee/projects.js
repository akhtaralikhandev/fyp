import { PrismaClient, Prisma, RequestStatus } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "GET") {
    const { employee_email } = req.query;

    try {
      const allPresentations = await prisma.project.findMany({
        where: {
          employee: {
            some: {
              employee_email: employee_email,
              status: RequestStatus.ACCEPTED,
            },
          },
        },
        include: {
          employee: true,
          students: true,
          student_request: true,
          Presentation_Scedule: true,
        },
      });
      if (!allPresentations)
        return res.status(404).json("No presentation was found");
      return res.status(200).json(allPresentations);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
