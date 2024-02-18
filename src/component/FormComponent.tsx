// FormComponent.js
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const formSchema = z
  .object({
    email: z.string().email("Invalid email format").min(1),
    companyName: z
      .string()
      .min(5, "Company name must be at least 5 characters"),
    phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  })

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      companyName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = data => {
    console.log(data)
    // Handle form submission logic here
    reset()
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          type="text"
          id="email"
          className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl ${
            errors.email ? "border-red-500" : ""
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="companyName" className="block text-gray-600">
          Company Name
        </label>
        <input
          aria-invalid={errors.companyName ? "true" : "false"}
          type="text"
          id="companyName"
          className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl ${
            errors.companyName ? "border-red-500" : ""
          }`}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-600">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl ${
            errors.password ? "border-red-500" : ""
          }`}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className={`bg-[#D17842] text-white py-4 rounded w-full text-xl ${
          isSubmitting && " cursor-not-allowed"
        } `}
      >
        Submit
      </button>
    </form>
  )
}

export default FormComponent
