"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Checkbox } from "@/components/ui/checkbox";
import {  SheetMusic } from "@/types";
import SheetMusicDropDownActions from "@/components/misc/SheetMusicDropDownActions";

export const columns: ColumnDef<SheetMusic>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Titulo" />
    ),
    cell: ({ row }) => {
      return <div className="flex justify-center">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "arranger",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Arreglado por.." />
    ),
    cell: ({ row }) => {
      return <p className="font-medium text-center">{row.original.arranger}</p>;
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Dificultad" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.difficulty}</p>
      );
    },
  },
  {
    accessorKey: "instrument",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Instrumento" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.instrument}</p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const sheetMusic = row.original;
      return <SheetMusicDropDownActions sheetMusic={sheetMusic} />;
    },
  },
];
