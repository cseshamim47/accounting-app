'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getAllItems } from "@/utils/db";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Item {
  id: number;
  description: string;
  type: string;
  price: number;
}

const page = () => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getAllItems();
        setItems(result.data || []);
        setFilteredItems(result.data || []);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = () => {
    const filtered = items.filter(item => 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().includes(searchTerm)
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredItems(items);
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id);

    if (!error) {
      toast.success('Item deleted successfully');
      // Update local state
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      setFilteredItems(updatedItems);
    } else {
      toast.error('Failed to delete item');
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/edit-item/${id}`);
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="m-6 w-full space-y-8">
      <div className="w-full flex justify-between items-center">
        <p className="text-5xl font-bold">Items</p>
        <Button>
          <Link href="/add-item">Add New Item</Link>
        </Button>
      </div>
      <div className="w-full dark:bg-slate-900 bg-gray-100 rounded-lg p-6 space-y-4">
        <p className="font-bold">Search</p>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Search"
            className="bg-white dark:bg-inherit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={handleClear}>Clear</Button>
        </div>

        <div className="rounded-md border bg-white dark:bg-inherit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>                          
                          <DropdownMenuItem 
                            className="hover:cursor-pointer"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="hover:cursor-pointer text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} entries
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <Button
                          key={number}
                          variant={currentPage === number ? "default" : "outline"}
                          onClick={() => paginate(number)}
                        >
                          {number}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
