import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
const db = DbConnect();
const PostCollection = (await db).collection("post");
const userCollection = (await db).collection("users");
export const GET = async (req) => {
  if (db) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const findPost = await PostCollection.findOne({ _id: new ObjectId(id) });
    const users = await userCollection.find().toArray();
    const sendingArray = [];
    if (findPost?.likes?.length > 0) {
      findPost?.likes?.map((x) => {
        const filtering = users.find((y) => y.email === x.likerEmail);
        sendingArray.push(filtering);
      });
      return new NextResponse(JSON.stringify(sendingArray));
    }
    return new NextResponse(JSON.stringify([]));
  }
};
