import { useForm, FormProvider } from "react-hook-form"
import React, { useRef, useState } from "react"
import InputFieldWraper from "./InputFieldWraper"
import CustomSelect from "./CustomSelect"
import TagsInput from "./TagsInput"
import MenuComponent from "./MenuComponent"
import ImageUpload from "./ImageUpload"
import { useShopFormMetaData } from "../contexts/FormContext"
import { useTags } from "../contexts/MenuContext"
import { useTableData } from "../contexts/TableContext"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import Modal from "./Modal"
import Lottie from "lottie-react"
import LoadingSpinner from "../loading.json"
import { debounce } from "lodash"

const ShopForm = ({ selected, setSelected, CATEGORIES }) => {
  const [isSpecial, setIsSpecial] = useState(false)
  const [focused, setFocused] = useState(false)
  const [prediction, setPrediction] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { tags, menuItems, clearEntries } = useTags()
  const { setShopData } = useTableData()
  const nameRef = useRef()
  const navigate = useNavigate()
  const { getPrediction, getLocation, postShop } = useFetch()
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
      long: "",
      lat: "",
      rating: 0,
      ratingCount: 0,
      name: "",
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods

  const onSubmit = async data => {
    setLoading(true)
    try {
      data = {
        ...data,
        menu: menuItems,
        coffee_types: tags,
        isSpecial,
        name: data.shop_name,
      }
      console.log(data)
      // console.log(dataToSend)
      const response = await postShop(data)
      if (response) {
        setLoading(false)
        // navigate("/tables")
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleChangeEvent = async event => {
    setIsOpen(true)
    try {
      const result = await getPrediction(event.target.value)
      if (result?.predictions?.length > 0) {
        setPrediction(prv => [...result.predictions])
      }
    } catch (error) {
      console.log(error)
      setIsOpen(false)
    }
  }

  const handleSelectedPrediction = async item => {
    if (item.place_id) {
      const response = await getLocation(item.place_id)
      console.log("res", item)
      const { geometry, rating, reviews } = response.result
      setValue("long", geometry.location.lng)
      setValue("lat", geometry.location.lat)
      setValue("address", item.description)
      setValue("rating", rating || 5.0)
      setValue("ratingCount", reviews.length || 30)
    }
    setIsOpen(false)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  mx-auto my-8 grid grid-cols-2 gap-x-8 w-full border"
        onClick={() => {
          setIsOpen(false)
        }}
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
          <div className="relative w-full">
            <input
              ref={nameRef}
              type="text"
              id="address"
              placeholder="Shop Address"
              className={`form-input bg-[#EFF0F6] px-4 py-3 rounded-md w-full outline-none text-xl `}
              {...register("address", {
                onChange: debounce(handleChangeEvent, 500),
              })}
            />
            {isOpen ? (
              <Modal>
                {prediction.length > 0 &&
                  prediction.map(item => (
                    <div
                      onClick={() => {
                        handleSelectedPrediction(item)
                      }}
                      className="hover:bg-[#D17842] w-full p-4 rounded-md hover:text-white"
                    >
                      {item.description.slice(0, 50)}
                    </div>
                  ))}
              </Modal>
            ) : null}
          </div>
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
            name="social_link"
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
          {loading ? (
            <Lottie
              animationData={LoadingSpinner}
              loop={true}
              size={100}
              // style={{ height: "80px" }}
              className="border p-0 h-[80px] rounded-md cursor-pointer"
            />
          ) : (
            <button
              type="submit"
              className="py-2 px-8 w-full my-8 rounded-md border outline-none cursor-pointer h-14  text-xl bg-[#D17842] text-white"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default ShopForm
