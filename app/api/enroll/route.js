import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({ headers: headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, courseTitle } = await request.json();

    const client = await clientPromise;
    const db = client.db("skillsphere");
    const enrollments = db.collection("enrollments");

    const existing = await enrollments.findOne({
      userId: session.user.id,
      courseId,
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already enrolled in this course!" },
        { status: 200 }
      );
    }

    await enrollments.insertOne({
      userId: session.user.id,
      userEmail: session.user.email,
      courseId,
      courseTitle,
      enrolledAt: new Date(),
    });

    return NextResponse.json({ message: "Successfully enrolled!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Enrollment failed", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth.api.getSession({ headers: headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("skillsphere");
    const enrollments = db.collection("enrollments");

    const userEnrollments = await enrollments
      .find({ userId: session.user.id })
      .toArray();

    return NextResponse.json(
      userEnrollments.map((e) => ({ ...e, _id: e._id.toString() }))
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch enrollments", details: error.message },
      { status: 500 }
    );
  }
}
