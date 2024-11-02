import userModel from "../../../../models/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/../../models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't exist",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't accept messages. ",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully. ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("There was some error sending message: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "User doesn't exist",
      },
      { status: 500 }
    );
  }
}
