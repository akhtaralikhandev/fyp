import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, coordinator_email } = req.body;
      const student = await prisma.department.create({
        data: {
          name: name,
          coordinator_email: coordinator_email,
        },
      });
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const all_departements = await prisma.department.findMany();
      return res.status(200).json(all_departements);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    const { name } = req.body;
    try {
      const deleted_departement = await prisma.department.delete({
        where: {
          name: name,
        },
      });
      if (!deleted_departement)
        res.status(404).json("No departement found with that name");
      res.status(200).json(deleted_departement);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (req.method === "PUT") {
    const { name } = req.body;
    try {
      const updatedDepartment = await prisma.department.update({
        where: { name: name },
        data: req.body,
      });
      res.status(200).json(updatedDepartment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
