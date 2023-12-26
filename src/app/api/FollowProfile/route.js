import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

const db = DbConnect();
const userCollection = (await db).collection("users");
export const PATCH = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const query = { email: email };
  const body = await req.json();
  let updatedDOC;
  if (body.following) {
    updatedDOC = {
      $set: {
        following: body.following,
      },
    };
  }
  if (body.followers) {
    updatedDOC = {
      $set: {
        followers: body.followers,
      },
    };
  }
  const options = { upsert: true };
  const res = await userCollection.updateOne(query, updatedDOC, options);
  return new NextResponse(JSON.stringify(res));
};
