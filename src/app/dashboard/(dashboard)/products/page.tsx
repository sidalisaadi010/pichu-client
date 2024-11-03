"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProductVariation = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  variations: ProductVariation[];
  discount: number | null;
  image: string;
};

const data: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt",
    category: "Apparel",
    variations: [
      { id: "1a", name: "Small", price: 19.99, stock: 50 },
      { id: "1b", name: "Medium", price: 19.99, stock: 100 },
      { id: "1c", name: "Large", price: 19.99, stock: 75 },
    ],
    discount: 10,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    description: "High-quality sound with long battery life",
    category: "Electronics",
    variations: [
      { id: "2a", name: "Black", price: 89.99, stock: 200 },
      { id: "2b", name: "White", price: 89.99, stock: 150 },
    ],
    discount: null,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Leather Wallet",
    description: "Sleek and durable leather wallet",
    category: "Accessories",
    variations: [
      { id: "3a", name: "Brown", price: 49.99, stock: 100 },
      { id: "3b", name: "Black", price: 49.99, stock: 120 },
    ],
    discount: 15,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Smart Watch",
    description: "Feature-packed smartwatch with health tracking",
    category: "Electronics",
    variations: [
      { id: "4a", name: "Black", price: 199.99, stock: 50 },
      { id: "4b", name: "Silver", price: 199.99, stock: 75 },
      { id: "4c", name: "Rose Gold", price: 219.99, stock: 25 },
    ],
    discount: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat",
    category: "Fitness",
    variations: [
      { id: "5a", name: "Purple", price: 29.99, stock: 100 },
      { id: "5b", name: "Blue", price: 29.99, stock: 80 },
      { id: "5c", name: "Green", price: 29.99, stock: 90 },
    ],
    discount: null,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <img
            src={row.original.image}
            alt={row.getValue("name")}
            className="mr-2 h-8 w-8 rounded-full"
          />
          <div className="font-medium">{row.getValue("name")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "variations",
    header: "Variations",
    cell: ({ row }) => {
      const variations = row.original.variations;
      return (
        <div className="flex flex-wrap gap-1">
          {variations.map((variation) => (
            <Badge key={variation.id} variant="secondary">
              {variation.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const lowestPrice = Math.min(
        ...row.original.variations.map((v) => v.price)
      );
      const highestPrice = Math.max(
        ...row.original.variations.map((v) => v.price)
      );
      return (
        <div>
          ${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.getValue("discount") as number | null;
      return discount ? (
        <Badge variant="destructive">{discount}% OFF</Badge>
      ) : (
        <span className="text-muted-foreground">No discount</span>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalStock = row.original.variations.reduce(
        (sum, v) => sum + v.stock,
        0
      );
      return <div>{totalStock}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProductsPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <SidebarTrigger />
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Products</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-10">
          <Card className="mb-6">
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Product Summary</h2>
                <p className="text-muted-foreground">
                  Manage your product catalog
                </p>
              </div>
              <Button>Add New Product</Button>
            </CardContent>
          </Card>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter products..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
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
          </div>
        </div>
      </main>
    </div>
  );
}
