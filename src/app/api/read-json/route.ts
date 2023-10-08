import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "src/student-data");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/sample.json",
    "utf8",
  );
  //Return the content of the data file in json format
  return NextResponse.json(fileContents);
}
