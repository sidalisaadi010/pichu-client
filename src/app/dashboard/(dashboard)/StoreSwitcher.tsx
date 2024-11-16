"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown, Plus, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetStores from "@/hooks/useGetStores";
import CreateStoreDialog from "./CreateStoreDialog";

type Store = {
  id: string;
  name: string;
  category: string;
};

export default function StoreSwitcher({ className }: { className?: string }) {
  const q = useGetStores();
  console.log(q.data);

  const stores: Store[] = [
    { id: "1", name: "Electronics Hub", category: "Electronics" },
    { id: "2", name: "Fashion Emporium", category: "Clothing" },
    { id: "3", name: "Gourmet Delights", category: "Food" },
    { id: "4", name: "Home Essentials", category: "Home & Garden" },
    { id: "5", name: "Sports World", category: "Sports & Outdoors" },
  ];
  const [open, setOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store>(stores[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {selectedStore.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="your stores">
              {stores?.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => {
                    setSelectedStore(store);
                    setOpen(false);
                  }}
                >
                  <Store className="mr-2 h-4 w-4" />
                  <span>{store.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedStore.id === store.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <CreateStoreDialog
                  trigger={
                    <Button className="w-full" variant={"outline"}>
                      <Plus className="mr-2 h-4 w-4" />
                      <span className="mr-2">Create new store</span>
                    </Button>
                  }
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
