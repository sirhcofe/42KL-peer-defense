import React from "react";

import { InputHTMLAttributes } from "react";
import { FieldErrors } from "react-hook-form";
import { FormValue } from "../eval-form/type";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors | null;
  id: string;
}

const TextInput = ({
  errors = null,
  id,
  children,
  className,
  ...props
}: TextInputProps) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor="name" className="block text-gray-700 mb-1">
        {children}
      </label>
      <input
        type="text"
        id="name"
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors && errors[id] ? "border-red-500" : ""
        }`}
        {...props}
      />
      {errors && errors[id] && (
        <p className="text-red-500 text-xs italic">This field is required</p>
      )}
    </div>
  );
};

export default TextInput;
