import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  where,
  query,
  getDoc,
  limit,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
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
      if (time.time === timeString) {
        time.availability -= 1;
      }
    });
  });

  const result = [];
  if (collectionName === "cadet-slot") {
    const filterData = data.filter((item) => !item.isDefault);
    let filteredData = filterData.filter((item) => !item.taken);

    while (filteredData.length) {
      console.log("indeex 0", filteredData[0]);
      const curr = filteredData[0].dateTime;

      const count = filteredData.filter(
        (data) => data.dateTime.seconds === curr.seconds,
      ).length;
      filteredData = filteredData.filter(
        (data) => data.dateTime.seconds !== curr.seconds,
      );

      result.push({ dateTime: curr.seconds, count });
    }
  }

  if (collectionName === "rush-timetables") {
    return Response.json({ data, timeSlots });
  } else if (collectionName === "cadet-slot") {
    return Response.json({ data, timeSlots, result });
  } else {
    return Response.json({ error: "Failed to add document" }, { status: 500 });
  }
}

type SelectTimeslotBody = {
  dateTime: Date;
  isDefault: boolean;
  teamId: string;
  customReason: string;
};

type CadetSlotBody = {
  evaluator: string;
  dateTime: Date;
  isDefault: boolean;
};

/**
 * Handles HTTP POST requests to add a new timeslot document to the specified Firestore collection.
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 * @returns A JSON response containing the ID and data of the newly added document, or an error message with a 500 status code if the operation fails.
 */
/**
 * Handles POST requests to add a new timeslot to the "rush-timetables" collection.
 * @param {NextRequest} req - The Next.js request object.
 * @param {NextResponse} res - The Next.js response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const collectionName = req.nextUrl.searchParams.get("collection");

  let colRef;
  if (collectionName) colRef = collection(firestore, collectionName);
  else
    return Response.json(
      { error: "Missing param: collection" },
      { status: 500 },
    );

  if (collectionName === "rush-timetables") {
    const data: SelectTimeslotBody = await req.json();

    if (!data.dateTime || !data.teamId)
      return Response.json({ error: "Invalid body" }, { status: 500 });

    // convert strigify string to Date
    data.dateTime = new Date(data.dateTime);
    try {
      const docRef = await addDoc(colRef, data);
      return Response.json({ id: docRef.id, data });
    } catch (error) {
      console.error(error);
      return Response.json(
        { error: "Failed to add document" },
        { status: 500 },
      );
    }
  }

  if (collectionName === "cadet-slot") {
    const body: CadetSlotBody = await req.json();

    if (!body.dateTime || !body.evaluator || body.isDefault === null)
      return Response.json({ error: "Invalid body" }, { status: 500 });

    body.dateTime = new Date(body.dateTime);

    const data = {
      dateTime: body.dateTime,
      evaluator: body.evaluator,
      isDefault: body.isDefault,
    };

    try {
      const docRef = await addDoc(colRef, data);
      return Response.json({
        message: "Successfully add document",
        id: docRef.id,
      });
    } catch (err) {
      console.error(err);
      return Response.json(
        { error: "Failed to add documemt" },
        { status: 500 },
      );
    }
  }

  return Response.json({ error: "Invalid collection name" }, { status: 500 });
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const collectionName = req.nextUrl.searchParams.get("collection");
  const body = await req.json();

  let colRef;
  if (collectionName) colRef = collection(firestore, collectionName);
  else
    return Response.json(
      { error: "Missing param: collection" },
      { status: 500 },
    );

  console.log("DATEEEEE", Date.parse(body.dateTime) / 1000);
  try {
    const q = query(
      colRef,
      where(
        "dateTime",
        "==",
        Timestamp.fromDate(new Date(body.dateTime.seconds * 1000)),
      ),
      where("taken", "==", false),
      limit(1),
    );
    const docs = await getDocs(q);

    console.log("DOCS", docs);

    let docId: any;

    docs.forEach((doc) => {
      docId = doc.id;
    });

    console.log("INDEX", docId);

    const docRef = doc(firestore, collectionName, docId);
    await updateDoc(docRef, {
      taken: true,
    });
  } catch (err) {
    console.log(err);
  }
}
