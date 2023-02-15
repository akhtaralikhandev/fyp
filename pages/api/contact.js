import { mailOption, transporter } from "../../config/nodemailer";
const Handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await transporter.sendMail({
        ...mailOption,
        subject: data.subject,
        text: `${req.body.firstName}`,
        html: `<h1>${req.body.firstName}</h1> ${req.body.email} </p>`,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default Handler;
