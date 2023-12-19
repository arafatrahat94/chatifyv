import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const db = DbConnect();
  const userCollection = (await db).collection("users");
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("email");
  // console.log(searchParams.get("email"));
  if (query) {
    const user = await userCollection.findOne({ email: query });
    if (user) {
      return new NextResponse(JSON.stringify(user));
    } else {
      return new NextResponse(JSON.stringify([]));
    }
  } else if (!query) {
    const users = await userCollection.find({}).toArray();

    if (users) {
      return NextResponse.json(users);
    } else {
      return new NextResponse(JSON.stringify([]));
    }
  }
};
export const POST = async (req) => {
  const body = await req.json();
  const db = DbConnect();
  const userCollection = (await db).collection("users");
  const findUser = await userCollection.findOne({ email: body.email });
  if (findUser) {
    return NextResponse.json({ message: "User already exists" });
  }
  const users = await userCollection.insertOne(body);
  return NextResponse.json(users);
};
