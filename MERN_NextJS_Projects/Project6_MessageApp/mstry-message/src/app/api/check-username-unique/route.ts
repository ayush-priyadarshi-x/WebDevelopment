import dbConnect from "@/lib/dbConnect";
import userModel from "../../../../models/User";
import { z } from "zod";
import { userNameValiditation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
  username: userNameValiditation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    console.log("SearchParams : ", searchParams);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log("result : ", result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }
    const { username } = await result.data;
    const existingUser = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken. ",
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "User name is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    NextResponse.json({ success: false, message: "Error checking username" });
  }
}
