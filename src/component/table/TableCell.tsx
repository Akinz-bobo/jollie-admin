import React, { ChangeEvent, useEffect, useState } from "react"

type Option = {
  id: string
  menuItem?: string
  price?: string
}

export const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const [menuOPtions, setMenuOptions] = useState<Option[] | []>([])
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initialValue)
  const [visibility, setVisibility] = useState(false)
  const OPTIONS: Option[] = row.getValue("menu") || []
  useEffect(() => {
    setValue(initialValue)
    setMenuOptions([...OPTIONS])
  }, [initialValue])

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    tableMeta?.updateData(row.index, column.id, value)
  }

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <div className="w-[200px]">
        <h2
          onClick={handleVisibility}
          className="cursor-pointer border py-2 px-3 rounded-sm"
        >
          See Menu
        </h2>

        <div
          className={`${
            visibility ? "flex flex-col items-center gap-2" : "hidden"
          }   absolute w-[200px] bg-[#EFF0F6] h-[80px] overflow-y-auto border`}
        >
          {OPTIONS?.length > 0
            ? menuOPtions.map((option: Option, ind) => (
                <div
                  key={ind}
                  className="text-[#d17842] flex items-center justify-between hover:bg-[#d17842] w-full hover:text-white p-2 "
                >
                  <span>{option.menuItem}</span>
                  <span>{`$${option.price}`}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    ) : (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    )
  }
  if (columnMeta?.type !== "select") {
    return <span>{value}</span>
  }
  return (
    <div className="w-[200px]">
      <h2
        onClick={handleVisibility}
        className="cursor-pointer border py-2 px-3 rounded-sm"
      >
        See Menu
      </h2>

      <div
        className={`${
          visibility ? "flex flex-col items-center gap-2" : "hidden"
        }   absolute w-[200px] bg-[#EFF0F6] h-[80px] overflow-y-auto border`}
      >
        {OPTIONS?.length > 0
          ? menuOPtions.map((option: Option) => (
              <div
                key={option.id}
                className="text-[#d17842] flex items-center justify-between hover:bg-[#d17842] w-full hover:text-white p-2 "
              >
                <span>{option.menuItem}</span>
                <span>{`$${option.price}`}</span>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
