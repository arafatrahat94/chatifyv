import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

const db = DbConnect();
const storyCollection = (await db).collection("story");
export const POST = async (req) => {
  const body = await req.json();
  const users = await storyCollection.insertOne(body);
  return NextResponse.json(users);
};
export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("email");
  if (query) {
    const res = await storyCollection
      .find({ email: query })
      .sort({ _id: -1 })
      .toArray();
    return new NextResponse(JSON.stringify(res));
  } else {
    const res = await storyCollection.find({}).toArray();
    return new NextResponse(JSON.stringify(res));
  }
};
