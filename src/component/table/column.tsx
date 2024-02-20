import { createColumnHelper } from "@tanstack/react-table"
import { TableCell } from "./TableCell"
import { EditCell } from "./EditCell"
import { TShop } from "."
const columnHelper = createColumnHelper<TShop>()
export const columns = [
  columnHelper.accessor("shop_name", {
    header: "Shop Name",
  }),
  columnHelper.accessor("address", {
    header: "Address",
  }),
  columnHelper.accessor("social_link", {
    header: "Social Link",
  }),
  columnHelper.accessor("opening_hour", {
    header: "Opening Hour",
    cell: TableCell,
    meta: {
      type: "time",
    },
  }),
  columnHelper.accessor("closing_hour", {
    header: "Closing Hour",
    cell: TableCell,
    meta: {
      type: "time",
    },
  }),
  columnHelper.accessor("isSpecial", {
    header: "Special Shop",
    cell: TableCell,
    enableColumnFilter: true,
    meta: {
      type: "text",
      sorting: true,
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("menu", {
    header: "Menu",
    cell: TableCell,

    meta: {
      type: "select",
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
]
