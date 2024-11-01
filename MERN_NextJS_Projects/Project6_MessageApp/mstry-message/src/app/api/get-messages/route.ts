import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "../../../../models/User";
import { User } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 404 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await userModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "messages" } } },
    ]);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: true, message: user[0].messages },
      { status: 200 }
    );
  } catch (error) {
    console.log("There was some error when getting messages: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error get-message" },
      { status: 500 }
    );
  }
}
