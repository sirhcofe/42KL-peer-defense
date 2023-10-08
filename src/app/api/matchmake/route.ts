import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  writeBatch,
  doc,
  where,
} from "firebase/firestore";
import app from "@/../firebase";
import { NextRequest, NextResponse } from "next/server";

const firestore = getFirestore(app);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const batch = writeBatch(firestore);

  const cadetQ = query(
    collection(firestore, "cadet-slot"),
    orderBy("dateTime"),
  );

  const timeslotQ = query(
    collection(firestore, "rush-timetables"),
    orderBy("dateTime"),
  );

  const cadetDocs = await getDocs(cadetQ);
  const timetablesDocs = await getDocs(timeslotQ);

  let cadets = [];
  let timetables = [];

  cadetDocs.forEach((doc) => {
    cadets.push({ ...doc.data(), id: doc.id });
  });

  timetablesDocs.forEach((doc) => {
    timetables.push({ ...doc.data(), id: doc.id });
  });

  const ret = [];
  while (cadets.length) {
    let fCadets;
    let fTimetables;

    const currentSlot = cadets[0].dateTime.seconds;
    // get all the current cadet timetables
    fCadets = cadets.filter((each) => each.dateTime.seconds === currentSlot);
    // remove those slots from original array
    cadets = cadets.filter((each) => each.dateTime.seconds != currentSlot);

    // get all the selected current timeslot
    fTimetables = timetables.filter(
      (each) => each.dateTime.seconds === currentSlot,
    );
    // remove those slots from orignal array
    timetables = timetables.filter(
      (each) => each.dateTime.seconds != currentSlot,
    );

    if (fCadets.length < fTimetables.length) {
      return Response.json(
        { error: "Not enough evaluator slots", data: { fCadets, fTimetables } },
        { status: 500 },
      );
    }
    console.log("-----------------------------");
    console.log("matching time!!!!");

    // create a random sequence of number for matchmake
    let seq = Array.from(Array(fCadets.length).keys());
    shuffleArray(seq);

    if (fTimetables.length)
      fTimetables.forEach((n, i) => {
        const evaluator =
          seq[i] != null ? fCadets[seq[i]].evaluator : "Lacking evaluators";
        fTimetables[i] = {
          ...fTimetables[i],
          evaluator: evaluator,
        };
        const docRef = doc(firestore, "rush-timetables", fTimetables[i].id);
        batch.update(docRef, { evaluator: evaluator });
      });

    ret.push(...fTimetables);
  }
  try {
    await batch.commit();
  } catch (err) {
    return Response.json(
      { error: "batch update went wrong!" },
      { status: 500 },
    );
  }
  console.log(ret);

  return Response.json({
    message: "Successfully updated timeslots with evaluators",
    data: ret,
  });
}

export async function GET(req: NextRequest, res: NextResponse) {
<<<<<<< Updated upstream
  return Response.json({ message: "API working!" });
=======
  const searchParams = req.nextUrl.searchParams;
  const evaluator = searchParams.get("evaluator");

  // const body = await req.json();
  console.log(evaluator);
  const q = query(
    collection(firestore, "rush-timetables"),
    where("evaluator", "==", evaluator),
  );

  const snapshot = await getDocs(q);
  const ret = [];
  snapshot.forEach((doc) => {
    ret.push({ ...doc.data(), id: doc.id });
  });
  return Response.json(ret);
>>>>>>> Stashed changes
}
