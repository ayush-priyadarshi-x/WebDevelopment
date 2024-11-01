import dbConnect from "@/lib/dbConnect";
import userModel from "@/../../models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await userModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpirired = new Date(user.verifyCodeExpiry) > new Date();

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
      return Response.json(
        {
          success: false,
          message: "Verification code has expiried",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
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
