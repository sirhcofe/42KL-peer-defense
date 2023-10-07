import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import app from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

const firestore = getFirestore(app);

export async function GET(req: NextRequest, res: NextResponse) {
  const collectionName = req.nextUrl.searchParams.get("collection");
  const snapshot = await getDocs(collection(firestore, collectionName ?? ""));

  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let timeSlots = [
    {
      time: "10 00",
      availability: 4,
    },
    {
      time: "11 00",
      availability: 4,
    },
    {
      time: "14 00",
      availability: 4,
    },
    {
      time: "15 00",
      availability: 4,
    },
    {
      time: "16 00",
      availability: 4,
    },
    {
      time: "17 00",
      availability: 4,
    },
  ];

  data.map((document, i) => {
    const date = new Date(document.dateTime.seconds * 1000);
    const hours = date.getHours();
    const timeString = `${hours < 10 ? "0" : ""}${hours} 00`;
    timeSlots.map((time, i) => {
      if (time.time == timeString) {
        time.availability -= 1;
      }
    });
  });

  return Response.json({ data, timeSlots });
}

type AddTimeslotBody = {
  dateTime: Date;
  evaluator: string;
  isDefault: boolean;
  teamId: string;
};
export async function POST(req: NextRequest, res: NextResponse) {
  const collectionName = req.nextUrl.searchParams.get("collection");
  const data: AddTimeslotBody = await req.json();

  // convert strigify string to Date
  data.dateTime = new Date(data.dateTime);

  try {
    const docRef = await addDoc(
      collection(firestore, collectionName ?? ""),
      data,
    );
    return Response.json({ id: docRef.id, data });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to add document" }, { status: 500 });
  }
}
