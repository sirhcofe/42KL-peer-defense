"use client";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormValue, Member } from "./type";
import { MembersNote } from "./MembersNote";
import { Button } from "@chakra-ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";

/**
 * Team, time, evaluator, member, notes
 */

const members: Member[] = [
  { name: "Asdf", intra: "asdfas" },
  { name: "Asdf2", intra: "asd3fas" },
  { name: "Asdf3", intra: "a2sdfas" },
];

export default function EvalForm() {
  const methods = useForm<FormValue>();
  const searchParam = useSearchParams();
  const teamId = searchParam.get("teamId");
  const [done, setDone] = useState(false);
  const router = useRouter();
  const { userKind, intraId } = useUserContext();

  const onSubmit = (data: FieldValues) => {
    const submit = {
      ...data,
      teamId,
      evaluator: intraId,
    };
    axios.post("/api/eval-form", submit).then((res) => setDone(true));
  };

  useEffect(() => {
    if (userKind != "cadet") router.push("/");
  });

  return done ? (
    <main className="w-full mt-40 flex flex-col justify-center items-center">
      <p className="mb-4 text-lg font-semibold">Eval form submitted!</p>
      <Button onClick={() => router.push("/")}>Back to Home</Button>
    </main>
  ) : (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-4">
          <h1 className="mb-2">Evaluation for {"Rush 00"}</h1>
          <p>
            {`You should be evaluating `}
            <span className="text-cyan-600">{teamId}</span>
            {` team`}
          </p>
        </div>

        {/* Members note component */}
        <MembersNote members={members} />
        {/* Members note component */}

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            Conclusion
          </label>
          <textarea
            id="notes"
            className={`shadow appearance-none border rounded w-full min-h-[120px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              methods.formState.errors.notes ? "border-red-500" : ""
            }`}
            {...methods.register("notes", { required: true })}
          ></textarea>
          {methods.formState.errors.notes && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {/* <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button> */}
          <Button colorScheme="teal" width="full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
