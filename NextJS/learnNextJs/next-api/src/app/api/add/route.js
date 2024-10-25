import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json(); // Parse the request body
    console.table(data); // Log data to the console for debugging
    return NextResponse.json(
      { message: "The data was successfully stored.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}
