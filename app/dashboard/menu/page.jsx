"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function MenuManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Sample menu items data
  const fetchFoodItems = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/menu/fetch-food-items`, {
        withCredentials: true,
      })
      .then((res) => {
        setMenuItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const fetchCategories = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/menu/fetch-categories`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchFoodItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!menuItems) return;
    let updatedItems = [...menuItems];
    if (statusFilter == "Active") {
      updatedItems = menuItems.filter((item) => item.status == true);
      console.log(filteredItems);
    }
    if (statusFilter == "Inactive") {
      updatedItems = menuItems.filter((item) => item.status == false);
      console.log(filteredItems);
    }
    if (categoryFilter !== "all") {
      let category = categories.filter(
        (item) => item.category == categoryFilter
      );
      console.log(category);
      updatedItems = menuItems.filter((item) => item.category == category._id);
      console.log(updatedItems);
    }
    if (searchTerm.trim()) {
      console.log(searchTerm);
      updatedItems = menuItems.filter((item) => {
        console.log(item);
        return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredItems(updatedItems);
    console.log(filteredItems);
  }, [statusFilter, categoryFilter, menuItems, searchTerm]);

  // Delete menu item
  const deleteMenuItem = (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  // Toggle featured status
  const toggleFeatured = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  // Toggle active status
  const toggleStatus = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's menu items, categories, and pricing.
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href="/dashboard/menu/new">
            <Button className="text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Menu Item
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-white p-6 rounded-lg shadow-xs border"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search Food items..."
              className="pl-8 w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>
                    {categoryFilter === "all"
                      ? "All Categories"
                      : categoryFilter}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item._id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>{statusFilter || "All Status"}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("category")}
                  >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("price")}
                  >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === true ? "default" : "secondary"}
                        className="cursor-pointer py-3 px-1 text-white font-semibold"
                        onClick={() => toggleStatus(item._id)}
                      >
                        <p>{item.status === true ? "Active" : "InActive"}</p>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.category.description}
                      {/* <Badge
                        variant={item.featured ? "secondary" : "outline-solid"}
                        className="cursor-pointer py-2 px-1 text-white font-semibold"
                        onClick={() => toggleFeatured(item.id)}
                      >
                        {item.featured ? "Featured" : "Regular"}
                      </Badge> */}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/menu/${item.id}`}
                              className="flex w-full items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/menu/${item._id}/edit`}
                              className="flex w-full items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteMenuItem(item.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No menu items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {/* Showing {sortedItems.length} of {menuItems.length} items */}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
