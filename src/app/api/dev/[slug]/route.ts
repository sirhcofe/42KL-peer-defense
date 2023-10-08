import app from "@/firebase";
import {
  collection,
  addDoc,
  getFirestore,
  writeBatch,
  doc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const firestore = getFirestore(app);

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("amount");
  const body = await req.json();

  if (slug === "cadet-slot") {
    const colRef = collection(firestore, slug);
    const batch = writeBatch(firestore);
    const amount = parseInt(query);
    const dateTime = new Date(2023, 9, body.day, body.hour);

    for (var i = 0; i < amount; i++) {
      const data = {
        dateTime,
        evaluator: `${body.evaluator}${Math.floor(Math.random() * 100)}`,
        isDefault: body.isDefault,
      };
      var docRef = doc(colRef); //automatically generate unique id
      batch.set(docRef, data);
    }

    try {
      await batch.commit();
      return Response.json({
        message: "Successfully create multiple document",
      });
    } catch (err) {
      console.error(err);
      return Response.json(
        { error: "Failed to add documemt" },
        { status: 500 },
      );
    }
  }

  if (slug === "rush-timetables") {
    const colRef = collection(firestore, slug);
    const batch = writeBatch(firestore);
    const amount = parseInt(query);
    const dateTime = new Date(2023, 9, body.day, body.hour);

    for (var i = 0; i < amount; i++) {
      const data = {
        customReason: "",
        dateTime,
        evaluator: "",
        isDefault: body.isDefault,
        teamId: "",
      };
      var docRef = doc(colRef); //automatically generate unique id
      batch.set(docRef, data);
    }

    try {
      await batch.commit();
      return Response.json({
        message: "Successfully create multiple document",
      });
    } catch (err) {
      console.error(err);
      return Response.json(
        { error: "Failed to add documemt" },
        { status: 500 },
      );
    }
  }

  return Response.json({ slug });
}
