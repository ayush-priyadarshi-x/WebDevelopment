import userModel from "models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  try {
    // Fetch verified users
    let users = await userModel.find({ isVerified: true }).lean();

    // Filter out the current user from the list
    users = users.filter(
      (userObj) => (userObj._id as string).toString() !== user._id
    );

    // Return the filtered list of users
    return NextResponse.json({ users: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error. Failed to fetch users.",
      },
      { status: 500 }
    );
  }
}
