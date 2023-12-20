import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
const db = DbConnect();
const commentsCollection = (await db).collection("comments");

export const GET = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const filter = { PostId: id };
  const res = await commentsCollection.find(filter).toArray();
  return new NextResponse(JSON.stringify(res));
};
export const POST = async (req) => {
  const body = await req.json();
  const res = await commentsCollection.insertOne(body);

  return new NextResponse(JSON.stringify(res));
};

export const DELETE = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const filter = { _id: new ObjectId(id) };
  const res = await commentsCollection.deleteOne(filter);
  return new NextResponse(JSON.stringify(res));
};
