// resources: https://muhimasri.com/blogs/add-remove-react-table-rows/
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table"
import React, { useState } from "react"

import "./table.css"
import { columns } from "./column"
import { useTableData } from "../../contexts/TableContext"
import { useNavigate } from "react-router-dom"

export type TShop = {
  shop_name: string
  address: string
  opening_hour: string
  closing_hour: string
  isSpecial: boolean
  description: string
  coffee_types: string
  social_link: string
  menu: string
}

export const Table = () => {
  const navigate = useNavigate()
  const { shopData } = useTableData()
  const [data, setData] = useState(() => [...shopData])
  const [originalData, setOriginalData] = useState(() => [...shopData])
  const [editedRows, setEditedRows] = useState({})
  const [filtering, setFiltering] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const Table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData(old =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          )
        } else {
          setOriginalData(old =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          )
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },

      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: TShop[]) =>
          old.filter((_row: TShop, index: number) => index !== rowIndex)
        setData(setFilterFunc)
        setOriginalData(setFilterFunc)
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: TShop[]) =>
          old.filter((_row, index) => !selectedRows.includes(index))
        setData(setFilterFunc)
        setOriginalData(setFilterFunc)
      },
    },
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })
  return (
    <article className="table-container w-[90%] mx-auto mt-3">
      <div className="flex items-center w-full">
        <button
          onClick={() => navigate("/home")}
          className="border-none shadow-sm text-[#d17842] bg-[#EFF0F6] py-2 px-6 text-xl font-semibold transition-all duration-200 rounded-md hover:bg-[#d17842] hover:text-white outline-none"
        >
          Back
        </button>
        <h3 className="text-center text-2xl font-semibold mt-2 w-full">
          Shop Tabble
        </h3>
      </div>
      <div className="mt-8 mb-2">
        <input
          type="text"
          onChange={e => setFiltering(e.target.value)}
          placeholder="Seach for entries..."
          className="border outline-none p-2 rounded-md w-[30%] text-xl"
        />
      </div>
      <table>
        <thead>
          {Table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {Table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-4 mt-4">
        <button
          className={`py-2 px-6 rounded-md outline-none border-none cursor-pointer font-semibold ${
            Table.getCanPreviousPage()
              ? "bg-[#D17842] text-white"
              : "bg-[#EFF0F6]"
          }`}
          disabled={!Table.getCanPreviousPage()}
          onClick={() => {
            Table.previousPage()
          }}
        >
          Previous Page
        </button>
        <button
          className={`py-2 px-6 rounded-md outline-none border-none cursor-pointer font-semibold ${
            Table.getCanNextPage() ? "bg-[#D17842] text-white" : "bg-[#EFF0F6]"
          }`}
          disabled={!Table.getCanNextPage()}
          onClick={() => {
            Table.nextPage()
          }}
        >
          Next Page
        </button>
      </div>
    </article>
  )
}
