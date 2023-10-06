import { useFormContext } from "react-hook-form";
import { FormValue, Member } from "./type";
import TextInput from "../common/TextInput";

type MembersNoteProps = {
  members: Member[];
};

export const MembersNote = ({ members }: MembersNoteProps) => {
  const { register, formState } = useFormContext<FormValue>();

  return members.map((member, index) => (
    <div key={index} className="mb-4 border rounded p-4">
      <h3>Member {index + 1}</h3>
      <div className="flex w-full gap-4">
        <TextInput
          id="name"
          errors={formState.errors}
          {...register(`members.${index}.name`)}
        >
          Name
        </TextInput>
        <TextInput
          id="intra"
          errors={formState.errors}
          {...register(`members.${index}.intra`)}
        >
          Intra
        </TextInput>
      </div>

      <label className="block text-gray-700 mb-2" htmlFor={`notes-${index}`}>
        Notes
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={`notes-${index}`}
        placeholder="Notes"
        {...register(`members.${index}.notes`)}
        defaultValue={member.notes}
      />
    </div>
  ));
};
