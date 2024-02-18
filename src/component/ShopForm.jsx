import { useForm, FormProvider } from "react-hook-form"
import React, { useState } from "react"
import InputFieldWraper from "./InputFieldWraper"
import CustomSelect from "./CustomSelect"
import TagsInput from "./TagsInput"
import MenuComponent from "./MenuComponent"
import ImageUpload from "./ImageUpload"
import { useShopFormMetaData } from "../contexts/FormContext"
import { useTags } from "../contexts/MenuContext"
import { useTableData } from "../contexts/TableContext"
import { useNavigate } from "react-router-dom"

const ShopForm = ({ selected, setSelected, CATEGORIES }) => {
  const [isSpecial, setIsSpecial] = useState(false)
  const [focused, setFocused] = useState(false)
  const { tags, menuItems, clearEntries } = useTags()
  const { setShopData } = useTableData()

  const navigate = useNavigate()
  const ctx = useShopFormMetaData()
  const methods = useForm({
    defaultValues: {
      shop_name: "",
      description: "",
      opening_hour: "",
      closing_hour: "",
      address: "",
      cover_image: [],
      images: [],
      coffee_types: [],
      social_link: "",
      menu: [],
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods

  const onSubmit = data => {
    data = { ...data, menu: menuItems, coffee_types: tags, isSpecial }
    setShopData(prev => [...prev, data])
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    clearEntries()
    reset()
    navigate("/tables")
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  mx-auto my-8 grid grid-cols-2 gap-x-8"
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
          name="shop_name"
        >
          <input
            type="text"
            id="shop_name"
            placeholder="Shop Name"
            className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl `}
            {...register("shop_name")}
          />
        </InputFieldWraper>

        <InputFieldWraper title="Address" errors={errors} name="address">
          <input
            type="text"
            id="address"
            placeholder="Shop Address"
            className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl `}
            {...register("address")}
          />
        </InputFieldWraper>

        <InputFieldWraper
          title="Coffee Type"
          name="coffee_type"
          errors={errors}
        >
          <TagsInput />
        </InputFieldWraper>

        <InputFieldWraper
          errors={errors}
          name="opening_hour"
          title="Opening Hour"
        >
          <input
            {...register("opening_hour")}
            type="time"
            id="opening_hour"
            name="opening_hour"
            className={`border bg-[#EFF0F6] py-2 px-4 rounded-md cursor-pointer `}
          />
        </InputFieldWraper>

        <InputFieldWraper
          errors={errors}
          name="closing_hour"
          title="Closing Hour"
        >
          <input
            {...register("closing_hour")}
            type="time"
            id="closing_hour"
            name="closing_hour"
            className={`border bg-[#EFF0F6] py-2 px-4 rounded-md cursor-pointer `}
          />
        </InputFieldWraper>

        <InputFieldWraper title="Social Link" errors={errors} name="socialLink">
          <input
            type="text"
            id="social_link"
            placeholder="
            Instagram Handle"
            className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl `}
            {...register("social_link")}
          />
        </InputFieldWraper>
        <InputFieldWraper title="Menu" name="menu" errors={errors}>
          <MenuComponent />
        </InputFieldWraper>

        <InputFieldWraper
          title="Cover Image"
          name="cover_image"
          errors={errors}
        >
          <ImageUpload name={"cover_image"} />
        </InputFieldWraper>
        <InputFieldWraper title="Images" errors={errors} name="images">
          <ImageUpload name={"images"} />
        </InputFieldWraper>
        <InputFieldWraper
          title="Description"
          name="description"
          errors={errors}
        >
          <textarea
            rows={6}
            required
            id="decription"
            placeholder="Description..."
            className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl`}
            {...register("description")}
          />
        </InputFieldWraper>
        <div>
          <div className="flex flex-col gap-4 my-6">
            <p className="text-xl text-gray-600">Speciality Coffee</p>
            <div className="flex items-center gap-4 text-white">
              <span
                onClick={() => {
                  setFocused("true")
                  setIsSpecial(true)
                }}
                className={`border py-2 px-4  ${
                  focused ? "bg-[#D17842]" : "bg-gray-200 text-[#D17842]"
                } font-semibold rounded-md cursor-pointer`}
              >
                Yes
              </span>
              <span
                onClick={() => {
                  setIsSpecial(false)
                  setFocused(false)
                }}
                className={`border py-2 px-4  ${
                  !focused ? "bg-[#D17842]" : "bg-gray-200 text-[#D17842]"
                } font-semibold rounded-md cursor-pointer`}
              >
                No
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-8 w-full my-8 rounded-md border outline-none cursor-pointer h-14  text-xl bg-[#D17842] text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ShopForm
