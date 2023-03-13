import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, coordinator_email } = req.body;
      const departmentData = {
        name,
        ...(coordinator_email && { coordinator_email }), // Make coordinator_email optional
      };
      const department = await prisma.department.create({
        data: departmentData,
      });
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const all_departments = await prisma.department.findMany();
      return res.status(200).json(all_departments);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    const { name } = req.body;
    try {
      const deleted_department = await prisma.department.delete({
        where: {
          name: name,
        },
      });
      if (!deleted_department)
        res.status(404).json("No department found with that name");
      res.status(200).json(deleted_department);
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
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default handler;
