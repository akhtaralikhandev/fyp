import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { reg_no, projectId } = req.body;
    try {
      const project = await prisma.studentProjectJoiningRequest.create({
        data: {
          student_reg_no: parseInt(reg_no),
          projectId: parseInt(projectId),
        },
      });
      console.log(project);
      return res
        .status(200)
        .json({ message: "Request sent successfuly ", project });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const { projectId } = req.query;
    console.log(req.query);
    try {
      const studentRequest = await prisma.studentProjectJoiningRequest.findMany(
        {
          where: { projectId: parseInt(projectId) },
          include: {
            student: true,
          },
        }
      );
      console.log(studentRequest);
      return res.status(200).json(studentRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { id, reg_no, projectId } = req.query;
    try {
      const studentRequest = await prisma.studentProjectJoiningRequest.update({
        where: {
          id: parseInt(id),
        },
        data: { status: "ACCEPTED" },
      });
      if (!studentRequest) return res.status(404).json("No request found");
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: { projectId: parseInt(projectId) },
      });
      await prisma.studentProjectJoiningRequest.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json({ studentRequest, student });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error);
    }
  }
};

export default handler;
