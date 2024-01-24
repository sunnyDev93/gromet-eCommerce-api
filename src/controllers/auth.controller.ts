import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";
import {
  secretKey,
  appname,
  frontendBaseUrl,
  frontendBaseVerificationUrl,
} from "../config";
import { sendEmail } from "../utils/sendEmail";
import Token from "../models/token";

const signup = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists. Login to continue." });
    }

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const newUser = await user.save();

    return await sendEmail({
      email,
      res,
      template: "signupVerificationTemplate.ejs",
      compiledTemplateData: {
        appname: "Gromet",
        verifyurl: `${frontendBaseVerificationUrl}/${user.id}`,
        actiontype: "verification",
        appbaseurl: frontendBaseUrl,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("email", email);
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send("Invalid Credentials");
    }

    const isPwdValid = bcrypt.compareSync(password, user.password);
    if (!isPwdValid) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");
    }
    if (!user.isEmailVerified) {
      return await sendEmail({
        email,
        res,
        template: "signupVerificationTemplate.ejs",
        compiledTemplateData: {
          appname,
          verifyurl: `${frontendBaseVerificationUrl}?uid=${user.id}`,
          actiontype: "verification",
          appbaseurl: frontendBaseUrl,
        },
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey,
      { algorithm: "HS256", expiresIn: "7d" }
    );

    return res.status(StatusCodes.OK).json({ accessToken: token, data: user });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const fetchMe = async (req: Request, res: Response) => {
  // const email = req.body?.decoded?.email;
  const { user_id } = req.body;
  try {
    const user = await User.findOne({ _id: user_id });
    console.log(user, user_id);

    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: jwt.sign(
          {
            email: email,
          },
          secretKey,
          { algorithm: "HS256" }
        ),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail({
      email: user.email,
      subject: "Password reset",
      text: link,
    });

    res.send("password reset link sent to your email account");
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const verifyUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { isEmailVerified: true },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const authController = {
  signup,
  login,
  forgotPassword,
  fetchMe,
  verifyUserById,
};

export default authController;
