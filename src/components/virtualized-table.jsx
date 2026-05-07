"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function VirtualizedTable({
  columns,
  data,
  containerHeight = "400px",
  estimateRowHeight = 45,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  // The container that handles the scroll
  const parentRef = React.useRef(null);

  // The virtualizer instance
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // Calculate spacers to keep the scrollbar accurate
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div
      ref={parentRef}
      className="rounded-md border overflow-auto relative"
      style={{ height: containerHeight }}
    >
      <Table>
        <TableHeader className="sticky top-0 bg-background z-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* Top padding row */}
          {paddingTop > 0 && (
            <TableRow>
              <TableCell
                style={{ height: `${paddingTop}px` }}
                colSpan={columns.length}
                className="p-0 border-0"
              />
            </TableRow>
          )}

          {/* Actual visible rows */}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <TableRow
                key={row.id}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement} // Measures dynamic row heights
                className="flex-1"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          {/* Bottom padding row */}
          {paddingBottom > 0 && (
            <TableRow>
              <TableCell
                style={{ height: `${paddingBottom}px` }}
                colSpan={columns.length}
                className="p-0 border-0"
              />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
