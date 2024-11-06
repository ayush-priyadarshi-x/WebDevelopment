import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import userModel, { User } from "models/User";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  await dbConnect();

  const messageId = params.messageid;
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

  try {
    const updatedUser = await userModel.updateOne(
      {
        _id: user._id,
      },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updatedUser.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Message unavailable or already deleted. ",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        sucess: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, message: "Error deleting messages ." },
      { status: 500 }
    );
  }
}
