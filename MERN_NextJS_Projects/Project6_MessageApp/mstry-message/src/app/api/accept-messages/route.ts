import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "../../../../models/User";
import { User } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated. ",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { acceptingMessages } = await request.json();

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptingMessages },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update user to accepting messages. ",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Message acceptance status updated successfully. ",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user to accepting messages. ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user to accepting messages. ",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated. ",
      },
      { status: 401 }
    );
  }
  const userId = user._id;

  try {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found for accept-messages",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while accept-message", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "There was some error while handling the route, accept-messages",
      },
      { status: 500 }
    );
  }
}
