import app from "@/firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextRequest } from "next/server";

const firestore = getFirestore(app);

type CadetSelection = {
  evaluator: string;
  day: number;
  timeslot: number;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug; // 'a', 'b', or 'c'
  const sParam = request.nextUrl.searchParams;

  if (slug === "cadet-selection") {
    const body: CadetSelection = await request.json();

    // console.log(body);

    const time = new Date(2023, 10, body.day, body.timeslot);

    const data = { evaluator: body.evaluator, time };

    // console.log(data);
    try {
      const docRef = await addDoc(
        collection(firestore, "cadet-selection"),
        data,
      );
      return Response.json({
        message: "Successfully add document",
        id: docRef.id,
      });
    } catch (err) {}
  }
  // return Response.json({ time: time, timeslot: body.timeslot });

  return Response.json(slug);
}
