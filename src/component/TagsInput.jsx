import React from "react"
import { useTags } from "../contexts/MenuContext"

const TagsInput = () => {
  const { tags, removeTag, addTag } = useTags()
  const handleKeyDown = e => {
    if (e.key !== "Enter") return
    const value = e.target.value
    if (!value.trim()) return
    addTag(value)
    e.target.value = ""
  }

  return (
    <div className="">
      <div className="flex flex-wrap  rounded-md bg-[#EFF0F6] p-2 absolute shadow-sm z-10 w-[460px] overflow-y-auto h-[50px]">
        {tags.map(item => (
          <div
            className="flex rounded-full bg-slate-200 w-fit h-fit px-4 py-2 items-center gap-2 text-[18px] font-semibold"
            key={item.id}
          >
            <span>{item.tag}</span>
            <span
              className="bg-gray-950 rounded-full w-[20px] h-[20px] text-white flex items-center justify-center cursor-pointer"
              onClick={() => removeTag(item)}
            >
              &times;
            </span>
          </div>
        ))}
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className="border-none outline-none flex-grow bg-[#EFF0F6] "
          placeholder="type something"
        />
      </div>
    </div>
  )
}

export default TagsInput
