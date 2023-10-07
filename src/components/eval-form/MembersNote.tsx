import { useFormContext } from "react-hook-form";
import { FormValue, Member } from "./type";
import TextInput from "../common/TextInput";

type MembersNoteProps = {
  members: Member[];
};

export const MembersNote = ({ members }: MembersNoteProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValue>();

  console.log(errors);

  return members.map((member, index) => (
    <div key={index} className="mb-4 border rounded p-4">
      <h3 className="mb-2">
        Member {index + 1}
        <span className="font-normal text-base ml-3">
          {member.name} | {member.intra}
        </span>
      </h3>

      <label className="block text-gray-700 mb-2" htmlFor={`notes-${index}`}>
        Notes
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={`notes-${index}`}
        {...register(`members.${index}.notes`, { required: true })}
        defaultValue={member.notes}
      />
      {errors.members && errors.members[index]?.notes && (
        <p className="text-red-500 text-xs italic">This field is required</p>
      )}
    </div>
  ));
};
