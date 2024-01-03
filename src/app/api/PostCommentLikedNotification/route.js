import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";
const db = DbConnect();
const PostNotifications = (await db).collection("postNotifications");
export const GET = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const query = searchParams.get("email");

  const res = await PostNotifications.find({ posterEmail: query })
    .sort({ _id: -1 })
    .toArray();
  if (res.length === undefined) {
    return new NextResponse(JSON.stringify([]));
  }
  return new NextResponse(JSON.stringify(res));
};

export const POST = async (req) => {
  const body = await req.json();
  const res = await PostNotifications.insertOne(body);
  return new NextResponse(JSON.stringify(res));
};
export const DELETE = async (req) => {
  const body = await req.json();
  const filter = { postId: body.postId, liker: body.liker, type: body.type };
  const res = await PostNotifications.deleteOne(filter);
  return new NextResponse(JSON.stringify(res));
};

export const PATCH = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const query = searchParams.get("id");
  const filter = { _id: new ObjectId(query) };
  console.log(query);
  const updatedDOc = {
    $set: {
      status: "read",
    },
  };
  const res = await PostNotifications.updateOne(filter, updatedDOc);
  return new NextResponse(JSON.stringify(res));
};
