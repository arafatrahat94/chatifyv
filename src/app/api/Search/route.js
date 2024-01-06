import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";
const db = DbConnect();
const userCollection = (await db).collection("users");

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("search");
  if (query === "") {
    return new NextResponse(JSON.stringify([]));
  }
  const querys = {
    userName: { $regex: query, $options: "i" },
  };
  const res = await userCollection.find(querys).toArray();
  return new NextResponse(JSON.stringify(res));
};
