'use client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { FaPen, FaTrash } from 'react-icons/fa6';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { Pencil, Trash } from 'lucide-react';
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    editComponent: (props: any) => ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onEdit,
    onDelete,
    editComponent: EditComponent,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleOnEdit = (rowId: string) => {
        onEdit(table.getRowModel().rowsById[rowId].original);
    };

    const handleOnDelete = (rowId: string) => {
        onDelete(table.getRowModel().rowsById[rowId].original);
    };
    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            <>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                            </>
                            <TableHead key="edit"/>
                            <TableHead key="delete"/>
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}>
                                <>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        key={`edit-${row.id}`}
                                        className='w-8'>
                                        <EditComponent item={row.original}>
                                            <Button variant='ghost'>
                                                <Pencil size={18} />
                                            </Button>
                                        </EditComponent>
                                    </TableCell>
                                    <TableCell
                                        key={`edit-${row.id}`}
                                        className='w-8'>
                                        <Button variant='ghost'>
                                            <Trash
                                                size={18}
                                                onClick={() =>
                                                    handleOnDelete(row.id)
                                                }
                                            />
                                        </Button>
                                    </TableCell>
                                </>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className='h-24 text-center'>
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
