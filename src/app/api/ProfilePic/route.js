import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";
const db = DbConnect();
const userCollection = (await db).collection("users");
export const PATCH = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("email");
  const filter = { email: query };
  const body = await req.json();
  const updatedDoc = {
    $set: {
      profileImg: body?.profileImg,
      coverImg: body?.coverImg,
    },
  };
  console.log(body);
  const options = { upsert: true };
  const res = await userCollection.updateOne(filter, updatedDoc, options);

  return new NextResponse(JSON.stringify(res));
};
