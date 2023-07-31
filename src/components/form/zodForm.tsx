"use client";

import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  phone: { number: string }[];
  dob: Date;
  address: {
    line1: string;
    line2: string;
  };
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const schema = z.object({
  username: z.string().nonempty("Username is required.").min(4, {}),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Email format is not valid."),
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .nonnegative("Age cannot be negative")
    .min(13, "Minimum age is 13")
    .max(23, "Max age is 23"),
  dob: z.coerce.date(),
  gender: z.string(),
  phone: z.array(
    z.object({
      number: z
        .string()
        .min(10, { message: "Invalid phone number" })
        .regex(phoneRegex, { message: "Invalid number" }),
    }),
  ),
  address: z.object({
    line1: z.string().nonempty("Address cannot be empty."),
    line2: z.string(),
  }),
});

const ZodForm = () => {
  const form = useForm<TFormInput>({
    defaultValues: {
      username: "Booi",
      email: "booi@gmail.com",
      age: 12,
      dob: new Date(),
      phone: [{ number: "" }],
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const {
    errors,
    isDirty,
    touchedFields,
    dirtyFields,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phone",
    control,
  });

  console.log({ errors });

  const handleGetValues = () => {
    console.log("Get values", getValues("username"));
  };

  const handleReset = () => {
    reset();
  };

  const handleSetValue = () => {
    // this will reset username
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="m-4 mx-auto max-w-[30rem] bg-gray-900 p-6">
      <h2 className=" text-xl font-bold uppercase">Hook Form + Zod</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="my-2 flex flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="username"> USER NAME </label>
          <input type="text" id="username" {...register("username")} />
          <p className="text-red-800">{errors.username?.message}</p>
        </div>

        {/* email */}

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2 [&>input]:valid:bg-slate-900  ">
          <label htmlFor="email"> EMAIL </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                // you can define any type of validation
              },
            })}
          />
          <p className="text-red-800">{errors.email?.message}</p>
        </div>

        {/* Phone Number */}

        <div className="">
          <label htmlFor="phone-number"> PHONE NUMBERS </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2"
            >
              <input type="tel" {...register(`phone.${index}.number`)} />
              <p className="text-red-800">
                {errors.phone?.[index]?.number?.message}
              </p>

              {index > 0 && (
                <button
                  type="button"
                  className="rounded bg-red-500 p-2 text-sm text-slate-900"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="w-full rounded bg-slate-300 p-2 text-sm text-slate-900"
            onClick={() =>
              append({
                number: "",
              })
            }
          >
            Add phone number
          </button>
        </div>

        {/* age */}

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="age"> AGE </label>
          <input type="number" id="age" {...register("age")} />
          <p className="text-red-800">{errors.age?.message}</p>
        </div>

        {/* DOB */}

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="dob"> DOG </label>
          <input type="date" id="dob" {...register("dob")} />
          <p className="text-red-800">{errors.dob?.message}</p>
        </div>

        {/* address */}

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="address-line1"> ADDRESS 1 </label>
          <input type="text" id="address" {...register("address.line1")} />
          <p className="text-red-800">{errors.address?.line1?.message}</p>
        </div>

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2">
          <label htmlFor="address-line2"> ADDRESS 2 </label>
          <input
            type="text"
            id="address-line2"
            {...register("address.line2")}
          />
          <p className="text-red-800">{errors.address?.line2?.message}</p>
        </div>

        <div className="my-2 flex  flex-col gap-1 [&>input]:rounded [&>input]:bg-slate-800 [&>input]:p-2 [&>select]:bg-slate-800 ">
          <label htmlFor="gender"> GENDER </label>
          <select
            id="gender"
            {...register("gender")}
            className="rounded p-2 text-lg"
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            type="submit"
            className=" mt-6 flex rounded bg-slate-200 p-2 text-sm font-bold text-slate-900"
          >
            Submit
          </button>

          <button
            className=" text mt-6 flex rounded bg-red-400 p-2 text-sm font-bold text-slate-900"
            onClick={handleReset}
          >
            Reset Form
          </button>
        </div>

        {isSubmitSuccessful && (
          <p className="mt-2 text-green-600">Form submitted</p>
        )}
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default ZodForm;
