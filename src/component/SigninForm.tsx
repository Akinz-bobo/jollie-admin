// FormComponent.js
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const formSchema = z.object({
  email: z.string().email("Invalid email format").min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const SigninForm = () => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = data => {
    console.log(data)
    setLoading(true)
    setTimeout(() => {
      // send api reques
      navigate("/home")
      setLoading(false)
    }, 2000)
    // Handle form submission logic here
    reset()
  }

  console.log(isSubmitting)
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

      <button
        disabled={isSubmitting}
        type="submit"
        className={`bg-[#D17842] text-white mt-4 py-4 rounded w-full text-xl ${
          isSubmitting && " cursor-not-allowed"
        } `}
      >
        {`${loading ? "Logging In ..." : "Login"}`}
      </button>
    </form>
  )
}

export default SigninForm
