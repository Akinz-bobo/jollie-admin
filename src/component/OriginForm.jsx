import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import InputFieldWraper from "./InputFieldWraper"
import CustomSelect from "./CustomSelect"
import ImageUpload from "./ImageUpload"
import { useTableData } from "../contexts/TableContext"

const OriginForm = ({ selected, setSelected, CATEGORIES }) => {
  const navigate = useNavigate()
  const { setOriginData } = useTableData()
  const methods = useForm({
    defaultValues: {
      origin: "",
      description: "",
      cover_image: "",
    },
  })

  const { errors } = methods.formState
  const onSubmit = data => {
    setOriginData(prev => [...prev, data])
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    methods.reset()
    navigate("/tables")
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white w-full mx-auto my-8 grid grid-cols-2 gap-x-8"
      >
        <InputFieldWraper title="Category" name="category" errors={errors}>
          <CustomSelect
            data={CATEGORIES}
            title={"Select Category"}
            setSelected={setSelected}
            selected={selected}
          />
        </InputFieldWraper>

        <InputFieldWraper
          title={`${selected} Name`}
          errors={errors}
          name="origin"
        >
          <input
            type="text"
            id="origin"
            placeholder="Origin Name"
            className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl `}
            {...methods.register("origin")}
          />
        </InputFieldWraper>
        <InputFieldWraper
          title="Cover Image"
          errors={errors}
          name="cover_image"
        >
          <ImageUpload name={"cover_image"} />
        </InputFieldWraper>
        <InputFieldWraper
          title="Description"
          name="description"
          errors={errors}
        >
          <textarea
            rows={6}
            id="decription"
            required
            placeholder="Description..."
            className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl `}
            {...methods.register("description")}
          />
        </InputFieldWraper>
        <div className="col-span-2 flex justify-center ">
          <button
            type="submit"
            className="py-2 px-8 w-[100%]  my-8 rounded-md border outline-none cursor-pointer h-14  text-xl bg-[#D17842] text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default OriginForm