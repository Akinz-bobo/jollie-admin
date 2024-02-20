import axios from "axios"
const baseURL = "https://coffee-shop-backend-hbss.onrender.com"
// const baseURL = "http://localhost:3000"

const request = axios.create({
  baseURL,
  headers: {
    authorization: "Bearer " + import.meta.env.VITE_AUTH_HEADER,
  },
})

const getPrediction = async address => {
  try {
    const response = await request.get(
      `/autocompleteaddress?address=${address}`
    )
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

const getLocation = async place_id => {
  try {
    const response = await request.get(`/findplace?place_id=${place_id}`)
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

const postShop = async data => {
  try {
    const response = await request.post("/shops", data)
    return response.data
  } catch (error) {
    return { error }
  }
}

const getShops = async () => {
  try {
    const response = await request.get("/shops")

    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

const updateShop = async data => {
  try {
    const response = await request.patch("/shops", data)
  } catch (error) {
    return { error: error.message }
  }
}
const deleteShop = async id => {
  try {
    const response = await request.delete(`/shops/?id=${id}`)
    console.log(response)
  } catch (error) {
    return { error: error.message }
  }
}

const postOrigin = async data => {
  try {
    const response = await request.post("/coffeebeans", data)
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

export const useFetch = () => {
  return {
    postOrigin,
    postShop,
    getShops,
    deleteShop,
    updateShop,
    getPrediction,
    getLocation,
  }
}
