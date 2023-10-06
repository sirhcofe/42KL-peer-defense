import React from "react";

import { InputHTMLAttributes } from "react";
import { FieldErrors } from "react-hook-form";
import { FormValue } from "../eval-form/type";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors;
  id: string;
}

const TextInput = ({ errors, id, children, ...prop }: TextInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 font-bold mb-1">
        {children}
      </label>
      <input
        type="text"
        id="name"
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[id] ? "border-red-500" : ""
        }`}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs italic">This field is required</p>
      )}
    </div>
  );
};

export default TextInput;
