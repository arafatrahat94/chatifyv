import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

const db = DbConnect();
const PostCollection = (await db).collection("post");

export const GET = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const query = searchParams.get("email");
  const res = await PostCollection.find({ email: query })
    .sort({ _id: -1 })
    .toArray();

  return new NextResponse(JSON.stringify(res));
};
