import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import { Button } from "react-day-picker";

type Props = {};

const UsersTableSkeleton = (props: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Skeleton className="max-w-sm w-full h-10" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(4)].map((_, i) => {
                return (
                  <TableHead key={i}>
                    <Skeleton className="h-5" />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(4)].map((_, j) => (
                  <TableCell key={`${i}-${j}`}>
                    <Skeleton
                    className="w-16 ml-auto h-3" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default UsersTableSkeleton;
