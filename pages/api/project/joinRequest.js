import { PrismaClient, Prisma, RequestStatus } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { reg_no, projectId } = req.body;
    try {
      const alreadyRequest =
        await prisma.studentProjectJoiningRequest.findFirst({
          where: {
            student_reg_no: parseInt(reg_no),
            projectId: parseInt(projectId),
          },
        });
      if (alreadyRequest) return res.status(403).json("Already sent request");
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
    const { status } = req.body;
    if (status === RequestStatus.ACCEPTED) {
      try {
        const studentRequest = await prisma.studentProjectJoiningRequest.update(
          {
            where: {
              id: parseInt(id),
            },
            data: { status: "ACCEPTED" },
          }
        );
        const Project = await prisma.project.update({
          where: { id: parseInt(projectId) },
          include: {
            students: true,
            student_request: {
              include: {
                student: true,
              },
            },
          },
          data: {
            students: {
              connect: {
                reg_no: parseInt(reg_no),
              },
            },
          },
        });
        await prisma.studentProjectJoiningRequest.delete({
          where: { id: parseInt(id) },
        });
        return res.status(200).json({ studentRequest, Project });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
      }
    } else if (status === RequestStatus.REJECTED) {
      const { id } = req.body;
      try {
        const project = await prisma.studentProjectJoiningRequest.delete({
          where: {
            id: parseInt(id),
          },
        });
        return res.status(200).json({
          message1: "Rejected succesfully",
          message2: "Undo successfuly",
          project,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json("No such request found  ddd");
    }
  }
};

export default handler;
