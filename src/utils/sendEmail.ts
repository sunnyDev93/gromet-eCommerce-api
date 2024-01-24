import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

type sendEmailTypes = {
  email: string;
  subject?: string;
  text?: any;
  res?: Response;
  template?: string;
  compiledTemplateData?: any;
};

export const sendEmail = async ({
  email,
  subject,
  text,
  res,
  template,
  compiledTemplateData,
}: sendEmailTypes) => {
  try {
    const transporter = nodemailer.createTransport({
      // port: 587,

      host: "smtp.gmail.com",
      // service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailTemplatePath = path.join(
      __dirname,
      "../",
      "templates",
      template
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    const compiledTemplate = ejs.compile(emailTemplate);

    await transporter.sendMail({
      // from: "process.env.EMAIL_USER,",
      from: " @no-reply.com <donotreply@bar.com>",
      to: email,
      subject: subject || "Verify Your Account",
      html: template ? compiledTemplate(compiledTemplateData) : "",
      text: text,
    });

    return res?.status(StatusCodes.OK).json({
      message:
        "A mail has been sent to you for verification. Please verify your mail to proceed",
    });
  } catch (error) {
    console.log(error, "email not sent");
    res
      ?.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error in sending mail. Might be network issues.");
  }
};
