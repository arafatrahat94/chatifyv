import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

const db = DbConnect();
const PostCollection = (await db).collection("post");
export const GET = async (req) => {
  const res = await PostCollection.find({}).sort({ _id: -1 }).toArray();

  if (res) {
    return new NextResponse(JSON.stringify(res));
  } else {
    return new NextResponse(JSON.stringify([]));
  }
};
export const POST = async (req) => {
  const body = await req.json();
  console.log(body);
  const res = await PostCollection.insertOne(body);
  return new NextResponse(JSON.stringify(res));
};
