import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

const db = DbConnect();
const PostCollection = (await db).collection("post");
export const GET = async (req) => {
  const res = await PostCollection.find({}).toArray();
  return NextResponse(JSON.stringify(res));
};
export const POST = async (req) => {
  const body = await req.json();
  console.log(body);
  const res = await PostCollection.insertOne(body);
  return new NextResponse(JSON.stringify(res));
};
