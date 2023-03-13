import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, password, email, contact_no, department_name } = req.body;
      const employee = await prisma.employee.create({
        data: {
          name: name,
          email: email,
          password: password,
          contact_no: contact_no,
          department_name: department_name,
        },
      });
      console.log(employee);
      res.status(200).json(employee);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { email, data } = req.body;
      const employee = await prisma.employee.update({
        where: { email: email },
        data: { ...data },
      });
      if (!employee) return res.status(404).json("No student found");
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const { email } = req.body;
      const employee = await prisma.employee.delete({
        where: {
          email: email,
        },
      });
      res.status(200).json("Employee deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
