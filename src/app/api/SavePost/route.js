import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const db = DbConnect();
const SavedPostCollection = (await db).collection("SavedPost");
const PostCollection = (await db).collection("post");
export const POST = async (req) => {
  const body = await req.json();
  const find = await SavedPostCollection.findOne({
    PostId: body.PostId,
    UserEmail: body.UserEmail,
  });

  if (find) {
    return new NextResponse(
      JSON.stringify({ message: "already document exist" })
    );
  }
  const res = await SavedPostCollection.insertOne(body);
  console.log(res);
  return new NextResponse(JSON.stringify(res));
};

export const GET = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const query = searchParams.get("email");

  const find = await SavedPostCollection.find({ UserEmail: query }).toArray();
  const postCollections = await PostCollection.find({ email: query }).toArray();
  console.log(find);
  if (find) {
    let allpost = [];
    if (postCollections.length > 0) {
      allpost = [...postCollections];
    }
    let datas = [];
    find.map(async (x) => {
      const filtering = allpost.filter((y) => y._id == x?.PostId);
      datas = [...filtering];
    });
    if (datas.length > 0) {
      return new NextResponse(JSON.stringify(datas));
    } else {
      return new NextResponse(JSON.stringify([]));
    }
  }
};

export const DELETE = async (req) => {
  const searchParams = await req.nextUrl.searchParams;
  const query = searchParams.get("id");
  const filter = { _id: new ObjectId(query) };
  const res = await PostCollection.deleteOne(filter);

  return new NextResponse(JSON.stringify(res));
};
