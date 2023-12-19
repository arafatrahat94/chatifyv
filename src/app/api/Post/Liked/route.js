import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
const db = DbConnect();
export const GET = async (req) => {
  const PostCollection = (await db).collection("post");
  const userCollection = (await db).collection("users");
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  console.log(searchParams);
  const findPost = await PostCollection.findOne({ _id: new ObjectId(id) });
  const users = await userCollection.find().toArray();
  const sendingArray = [];
  findPost?.likes.map((x) => {
    const filtering = users.find((y) => y.email === x.likerEmail);
    sendingArray.push(filtering);
  });

  return new NextResponse(JSON.stringify(sendingArray));
};
