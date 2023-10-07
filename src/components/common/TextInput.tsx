import React from "react";

import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors: FieldError | undefined;
  register: any;
}

const TextInput = ({
  errors = undefined,
  children,
  register,
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
          errors ? "border-red-500" : ""
        }`}
        {...register}
      />
      {errors && (
        <p className="text-red-500 text-xs italic">This field is required</p>
      )}
    </div>
  );
};

export default TextInput;
