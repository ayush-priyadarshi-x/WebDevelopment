import dbConnect from "@/lib/dbConnect";
import userModel from "@/../../models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    console.log(`Username : ${decodedUsername}  ,  Code  :  ${code}`);
    const user = await userModel.findOne({ username: decodedUsername });
    console.log("User : ", user);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpirired = new Date(user.verifyCodeExpiry) > new Date();
    console.log("Real Code : ", user.verifyCode);

    if (user.isVerified) {
      return NextResponse.json(
        { success: true, message: "User already verified. " },
        { status: 200 }
      );
    }

    if (isCodeValid && isCodeNotExpirired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified. ",
        },
        { status: 200 }
      );
    }

    if (!isCodeNotExpirired) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code has expiried",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect verification code. ",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(`Error while verifying code: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message:
          "There was some internal server error while verifying the code.",
      },
      { status: 500 }
    );
  }
}
