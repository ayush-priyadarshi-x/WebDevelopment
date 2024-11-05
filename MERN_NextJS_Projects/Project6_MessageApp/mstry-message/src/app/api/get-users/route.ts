import userModel from "models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  const users = await userModel.find({}).lean();
  return NextResponse.json({ users: users }, { status: 200 });
}
