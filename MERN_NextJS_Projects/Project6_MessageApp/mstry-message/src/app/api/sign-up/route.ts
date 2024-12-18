import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import userModel from "../../../../models/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  const { username, email, password } = await request.json();

  console.log(
    `Username: ${username}  | |  Email: ${email}  | | Password: ${password}`
  );
  try {
    const existingUserVerifiedByUsername = await userModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        {
          status: false,
          message: "User name was already taken. ",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await userModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            status: false,
            message: "User already exists with this email. ",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiriyDate = new Date();
      expiriyDate.setHours(expiriyDate.getHours() + 1);

      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiriyDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: emailResponse.message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error Registering user: ${error}`);
    return NextResponse.json(
      { success: false, message: "Error registering user. " },
      { status: 500 }
    );
  }
}
