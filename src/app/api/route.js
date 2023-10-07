import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../firebase";

const firestore = getFirestore(app);

export async function GET(req, res) {
  const { collectionName } = req.query;
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json(data);
}

export async function POST(req, res) {
  if (req.method === "POST") {
    const { collectionName } = req.query;
    const { data } = req.body;

    try {
      const docRef = await addDoc(collection(firestore, collectionName), data);
      res.status(200).json({ id: docRef.id, ...data });
    } catch (error) {
      res.status(500).json({ error: "Failed to add document" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
