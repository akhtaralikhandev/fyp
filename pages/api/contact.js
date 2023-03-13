import { mailOption, transporter } from "../../config/nodemailer";
const Handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await transporter.sendMail({
        ...mailOption,
        to: req.body.email,
        subject: req.body.subject,
        text: `${req.body.text}`,
        html: `<h1>${req.body.text}</h1> ${req.body.text} </p>`,
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
