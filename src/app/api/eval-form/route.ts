import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";
import app from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

const firestore = getFirestore(app);

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const docRef = await addDoc(collection(firestore, "eval-form"), body);

  console.log(docRef.id);
  return Response.json({ id: docRef.id });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const snapshot = await getDocs(collection(firestore, "eval-form"));

  const ret = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return Response.json(ret);
}
