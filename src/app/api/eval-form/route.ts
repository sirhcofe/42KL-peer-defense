import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

const firestore = getFirestore(app);

// export async function GET(req: NextRequest, res: NextResponse) {
//   const param = req.nextUrl.searchParams;
//   const collectionName = param.get("collectionName");
//   const snapshot = await getDocs(collection(firestore, collectionName || ""));

//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return Response.json("hello");
// }

export async function POST(req: NextRequest, res: NextResponse) {
  const param = req.nextUrl.searchParams;
  const collectionName = param.get("collectionName");
  const snapshot = await getDocs(collection(firestore, collectionName || ""));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json("hello");
}
