import React from "react"
import Navbar from "./Navbar"
import coffe2 from "../assets/coffee2.jpg"
import coffe1 from "../assets/coffee1.jpg"
import coffe3 from "../assets/coffee3.jpg"

const Home = () => {
  return (
    <div className="bg-gray-200">
      <Navbar />
      <div
        className="w-[80%] mx-auto mt-10 p-[2rem] rounded-md"
        style={{
          background: `url(${coffe2})`,
          objectFit: "cover",
          backgroundOrigin: "border-box",
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[80%] mx-auto mt-10">
          <h2 className="text-4xl font-semibold mb-2 text-[#2e0606de]">
            Coffe Map Africa.
          </h2>
          <p className="text-center text-white text-xl">
            <span className="text-3xl font-semibold leading-loose">
              Welcome
            </span>
            to Coffee Map Africa, your passport to the rich and diverse world of
            African coffee! We take pride in bringing the finest coffee beans
            from multiple African countries straight to the heart of Europe. Our
            mission is to connect coffee enthusiasts with the unique flavors and
            aromas that each region of Africa has to offer.
          </p>
        </div>
        <div className="w-[80%] mx-auto mt-10">
          <h2 className="text-4xl font-semibold mb-2 text-[#2e0606de]">
            What We DO.
          </h2>
          <p className="text-center text-white text-xl">
            At Coffee Map Africa, we source premium coffee seeds from renowned
            coffee-producing nations such as Ethiopia, Kenya, Rwanda, Tanzania,
            and more. Our commitment to quality ensures that every batch of
            coffee beans we provide is carefully selected, roasted to
            perfection, and packed with the distinctive characteristics that
            make African coffee truly exceptional.
          </p>
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-8">
        <h2 className="text-4xl  font-semibold  text-[#2e0606de] mb-4">
          Gallery
        </h2>
        <div className="grid grid-cols-4 gap-2">
          <img src={coffe1} alt="" />
          <img src={coffe2} alt="" className="h-[200px] w-full" />
          <img src={coffe3} alt="" />
          <img src={coffe1} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
