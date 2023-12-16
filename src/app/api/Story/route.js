import DbConnect from "@/services/DbConnect";
import { NextResponse } from "next/server";
import { IoBodySharp } from "react-icons/io5";

const db = DbConnect();
const storyCollection = (await db).collection("story");
export const PATCH = async (req) => {
  const body = await req.json();
  const filter = { email: body.email };
  // console.log(body);
  const updatedDoc = {
    $set: {
      email: body.email,
      profileId: body.profileId,
      profileImg: body.profileImg,
      name: body.name,
      storyImage: body.storyImage,
    },
  };
  const options = { upsert: true };
  const users = await storyCollection.updateOne(filter, updatedDoc, options);
  return NextResponse.json(users);
};
export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("email");
  if (query) {
    const res = await storyCollection.findOne({ email: query });
    const res2 = await storyCollection.find({}).toArray();
    const filter = res2.filter((x) => x.email !== query);
    if (res) {
      return new NextResponse(
        JSON.stringify({ signedEmail: res, allUser: filter })
      );
    } else {
      return new NextResponse(JSON.stringify(null));
    }
  } else {
    const res = await storyCollection.find({}).toArray();
    return new NextResponse(JSON.stringify(res));
  }
};
