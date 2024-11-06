import userModel from "models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username }: { username: string } = await request.json();

  if (!username) {
    return NextResponse.json(
      {
        success: false,
        message: "User name was not given.  ",
      },
      { status: 200 }
    );
  }
  const user = await userModel.findOne({ username });
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "User is not longer active in the platform.  ",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Successfully retrieved data.  ",
      isAcceptingMessages: user.isAcceptingMessage,
    },
    { status: 200 }
  );
}
