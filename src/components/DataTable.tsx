"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import { JSX, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "./EmptyState";
import Badge from "./Badge";

interface Column {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any) => JSX.Element;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  searchFields?: string[];
  actions?: (row: any) => JSX.Element[];
  pageSize?: number;
  CardComponent?: any;
  EmptyStateCard?: any;
}

export default function DataTable({
  data = [],
  columns = [],
  searchFields = [],
  actions = () => [],
  pageSize = 5,
  CardComponent,
  EmptyStateCard,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchFields.length
    ? data.filter((item) =>
        searchFields.some((field) =>
          item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const alignClasses: Record<string, string> = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  const totalColumns = columns.length;

  return (
    <div className="w-full h-screen mt-4">
      {/* Desktop Table */}
      <div className="rounded-[16px] bg-white overflow-x-auto hidden sm:block shadow-[0_4px_12px_0_rgba(238,243,255,0.5)]">
        <Table aria-label="Data Table" className="min-w-[600px]">
          <TableHeader>
            {columns.map((col, idx) => (
              <TableColumn
                key={col.key}
                className={`${alignClasses[col.align || "left"]} text-[13px] text-[#BFBFBF] font-normal p-2 ${
                  idx === 0 ? "first:rounded-l-[12px]" : ""
                } ${idx === columns.length - 1 ? "last:rounded-r-[12px]" : ""}`}
              >
                {col.label}
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id || Math.random()}>
                  {columns.map((col) =>
                    col.key === "status" ? (
                      <TableCell key={col.key} className="border-t border-[#F1F1F1]">
                        <Badge status={row[col.key]} />
                      </TableCell>
                    ) : (
                      <TableCell
                        key={col.key}
                        className={`${alignClasses[col.align || "left"]} text-[13px] text-[#BFBFBF] border-t border-[#F1F1F1]`}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={totalColumns} className="text-center text-gray-400">
                {EmptyStateCard}

                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile – CardInvoice */}
      <div className="flex flex-col gap-4 mt-8 sm:hidden">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            filteredData.map((row) => {
              if (!CardComponent) return null;

              return (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    height: 0,
                    marginBottom: 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <CardComponent item={row} row={row} actions={actions(row)} />
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400"
            >
          {EmptyStateCard}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
