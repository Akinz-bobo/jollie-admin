import React from "react"

const AnimatedRoutes = () => {
  return (
    <div>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </div>
  )
}

export default AnimatedRoutes
