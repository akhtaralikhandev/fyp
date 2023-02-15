import nodemailer from "nodemailer";
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOption = {
  from: email,
  to: "akhtaralikhandear@gmail.com",
};
