"use client";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormValue, Member } from "./type";
import { MembersNote } from "./MembersNote";

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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-4">
          <h1 className="mb-2">Evaluation for {"Rush 00"}</h1>
          <p>
            {`You should be evaluating `}
            <span className="text-cyan-600">{"chenlee"}</span>
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
