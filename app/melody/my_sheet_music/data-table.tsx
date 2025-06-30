"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import CreateSheetMusicDialog from "@/components/misc/CreateSheetMusicDialog";
import { DataTablePagination } from "@/components/tables/DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Asumo que estas son componentes de shadcn/ui o similares con estilos base.
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    // Contenedor principal para centrar y dar espaciado
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-inner">
      {/* Sección del título y descripción */}
      <div className="flex flex-col gap-4 mb-8 p-6 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center tracking-tight drop-shadow-lg">
          Partituras Musicales
        </h1>
        <p className="text-base sm:text-lg italic text-white text-center opacity-90">
          Explora y gestiona tu colección de partituras guardadas.
        </p>
      </div>

      {/* Contenedor para el botón de nueva partitura */}
      <div className="flex items-center justify-end py-4">
        {/* El componente CreateSheetMusicDialog debería tener sus propios estilos Tailwind para el botón */}
        <CreateSheetMusicDialog title="Nueva Partitura" />
      </div>

      {/* Contenedor de la tabla con estilos mejorados */}
      <div className="rounded-xl border border-gray-200 shadow-xl overflow-hidden bg-white">
        <Table className="min-w-full divide-y divide-gray-200">
          {/* Encabezado de la tabla */}
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-gray-200 transition-colors duration-150"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* Cuerpo de la tabla */}
          <TableBody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-blue-50 transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Mensaje cuando no hay resultados
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-gray-500 text-lg font-medium bg-gray-50 rounded-b-xl"
                >
                  <p className="p-4">
                    No se ha encontrado ninguna partitura. ¡Crea una nueva!
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Paginación de la tabla */}
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
