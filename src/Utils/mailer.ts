import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO  configure mail for usage
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const verifyEmail = `<p><a href='${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}'>click here </a> to ${
      emailType === "VERIFY" ? "verify" : "Reset your password"
    }
    
   <br>
    or copy and paste the link in your Browser
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
     </p>

    `;
    const ResetPassword = `<p><a href='${
      process.env.DOMAIN
    }/resetPassword?token=${hashedToken}'>click here </a> to ${
      emailType === "VERIFY" ? "verify" : "Reset your password"
    }
    
   <br>
    or copy and paste the link in your Browser
    ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
     </p>

    `;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "474ab5d213569c",
        pass: "********cab9",
      },
    });

    const mailOptions = await transport.sendMail({
      from: "tk@tk.ai", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset your password", // Subject line

      html: `${emailType === "VERIFY" ? verifyEmail : ResetPassword}`,
    }); // html body

    return mailOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
