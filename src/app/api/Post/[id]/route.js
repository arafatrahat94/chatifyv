import DbConnect from "@/services/DbConnect";
import { ObjectId } from "mongodb";
import Error from "next/error";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const db = await DbConnect();
    if (!db) {
      throw new Error("Database connection error");
    }
    const PostCollection = await db.collection("post");
    const id = await params.id;
    const filter = { _id: new ObjectId(id) };

    console.log(params.id);
    const res = await PostCollection.findOne(filter);
    if (res) {
      return new NextResponse(JSON.stringify(res));
    } else {
      return new NextResponse(JSON.stringify([]));
    }
  } catch (error) {
    console.error("GET Error", error);
    return new NextResponse(JSON.stringify({ error: error.message }));
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const db = await DbConnect();
    if (!db) {
      throw new Error("Database connection error");
    }
    const PostCollection = await db.collection("post");
    const id = await params.id;
    const body = await req.json();
    console.log(body);
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        likes: body.likesArray,
      },
    };
    const options = { upsert: true };

    const res = await PostCollection.updateOne(filter, updatedDoc, options);
    return new NextResponse(JSON.stringify(res));
  } catch (error) {
    console.error("GET Error", error);
    return new NextResponse(JSON.stringify({ error: error.message }));
  }
};
