import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const client = await clientPromise;
    const db = client.db("skillsphere");
    const collection = db.collection("courses");

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const courses = await collection.find(query).toArray();

    return NextResponse.json(
      courses.map((c) => ({ ...c, _id: c._id.toString() }))
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses", details: error.message },
      { status: 500 }
    );
  }
}
