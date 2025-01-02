import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Correct export syntax
const sendEmail = async (email, subject, text) => {
	try {
		console.log("sendEmail function ");
		console.log("The Rl", text);
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			text: text,
		});
		
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

// Correct default export
export default sendEmail;
