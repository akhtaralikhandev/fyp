import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { projectId } = req.query;
      const currentProject = await prisma.project.findUnique({
        where: { id: parseInt(projectId) },
      });
      const { projectId: _, ...updatedValues } = req.body;
      const updatedProject = {
        ...currentProject,
        id: parseInt(req.body.projectId),
        ...updatedValues,
      };
      const project = await prisma.project.update({
        where: { id: parseInt(projectId) },
        data: updatedProject,
      });
      return res.status(200).json(project);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
};

export default handler;
