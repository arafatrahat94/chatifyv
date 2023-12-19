import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = DbConnect();
const PostCollection = (await db).collection("post");

export const GET = async (req, { params }) => {
  const id = await params.id;
  const filter = { _id: new ObjectId(id) };

  console.log(params.id);
  const res = await PostCollection.findOne(filter);
  if (res) {
    return new NextResponse(JSON.stringify(res));
  } else {
    return new NextResponse(JSON.stringify([]));
  }
};

export const PATCH = async (req, { params }) => {
  const id = await params.id;
  const body = await req.json();
  console.log(body);
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      likes: body.likesArray,
    },
  };
  const options = { upsert: true };

  const res = await PostCollection.updateOne(filter, updatedDoc, options);
  return new NextResponse(JSON.stringify(res));
};
