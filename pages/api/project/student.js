import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { projectId, reg_no, disconnect } = req.body;
    try {
      const student = await prisma.student.findFirst({
        where: { reg_no: parseInt(reg_no) },
      });
      if (!student)
        return res
          .status(404)
          .json({ message: "Student with the given reg no not found" });
      // Check if the student is already in the project
      const project = await prisma.project.findUnique({
        where: { id: parseInt(projectId) },
        include: {
          students: true,
        },
      });
      const studentExists = project.students.some(
        (student) => student.reg_no === parseInt(reg_no)
      );

      if (studentExists) {
        // If the student already exists, disconnect them if the `disconnect` flag is set to true
        if (disconnect) {
          const disconnectStudent = await prisma.project.update({
            where: { id: parseInt(projectId) },
            include: {
              students: true,
            },
            data: {
              students: {
                disconnect: {
                  reg_no: parseInt(reg_no),
                },
              },
            },
          });
          return res.status(200).json(disconnectStudent);
        } else {
          // If the student already exists and the `disconnect` flag is not set, return a message
          return res
            .status(200)
            .json({ message: "Student already exists in the project" });
        }
      } else {
        // If the student does not exist, connect them to the project
        const connectStudent = await prisma.project.update({
          where: { id: parseInt(projectId) },
          include: {
            students: true,
          },
          data: {
            students: {
              connect: {
                reg_no: parseInt(reg_no),
              },
            },
          },
        });
        return res.status(200).json(connectStudent);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
};

export default handler;
