import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

const db = DbConnect();
const messageCollection = (await db).collection("message");

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("email");
  const check = { Messagefrom: query };
  const res = await messageCollection.find(check).toArray();
  console.log(res);
  // if(res.length === 0){
  //     const check2
  // }
  if (res === undefined) {
    return new NextResponse(JSON.stringify([]));
  }
  return new NextResponse(JSON.stringify(res));
};
export const POST = async (req) => {
  const body = await req.json();
  const res = await messageCollection.insertOne(body);
  return new NextResponse(JSON.stringify(res));
};
// const searchParams = req.nextUrl.searchParams;
// const query = searchParams.get("email");
