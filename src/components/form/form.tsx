"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

enum EGenders {
  female = "female",
  maleL = "male",
  other = "other",
}

type TFormInput = {
  username: string;
  email: string;
  age: number;
  gender: EGenders;
};

const ReactForm = () => {
  const { register, handleSubmit, control, formState } = useForm<TFormInput>();
  const { errors, isSubmitSuccessful } = formState;

  console.log({ errors });

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2>Hook Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-6 max-w-[30rem]"
        noValidate
      >
        <div className="my-2 flex flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="username"> USER NAME </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Name is required" },
              minLength: {
                value: 4,
                message: "Minimum characters should be four",
              },
            })}
          />
          <p className="text-red-800">{errors.username?.message}</p>
        </div>

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2 [&>input]:valid:bg-slate-900  ">
          <label htmlFor="email"> EMAIL </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required.",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email is required",
              },
            })}
          />
          <p className="text-red-800">{errors.email?.message}</p>
        </div>

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="email"> AGE </label>
          <input
            type="text"
            id="age"
            {...register("age", {
              required: { value: true, message: "Age is required." },
              min: { value: 13, message: "Minimum age is 13" },
              max: { value: 23, message: "Maximum age is 23" },
            })}
          />
          <p className="text-red-800">{errors.age?.message}</p>
        </div>

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2 [&>select]:bg-slate-800 ">
          <label htmlFor="gender"> GENDER </label>
          <select
            id="gender"
            {...register("gender", {
              required: {
                value: true,
                message: "Gender is required",
              },
            })}
            className="rounded p-2 text-lg"
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>

        <button
          type="submit"
          className=" mt-6 flex rounded bg-slate-200 p-2 text-sm font-bold text-slate-900"
        >
          Submit
        </button>
        {isSubmitSuccessful && (
          <p className="mt-2 text-green-600">Form submitted</p>
        )}
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ReactForm;
