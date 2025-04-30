"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

export default function MenuManagement() {
  // Sample menu items data
  const initialMenuItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Main Course",
      price: 24.99,
      status: "Active",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Appetizers",
      price: 12.99,
      status: "Active",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      category: "Desserts",
      price: 9.99,
      status: "Active",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Beef Burger",
      category: "Main Course",
      price: 18.99,
      status: "Active",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Mojito",
      category: "Beverages",
      price: 8.99,
      status: "Active",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Garlic Bread",
      category: "Appetizers",
      price: 6.99,
      status: "Inactive",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Pasta Carbonara",
      category: "Main Course",
      price: 19.99,
      status: "Active",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Cheesecake",
      category: "Desserts",
      price: 8.99,
      status: "Active",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Iced Tea",
      category: "Beverages",
      price: 4.99,
      status: "Active",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 10,
      name: "Seasonal Soup",
      category: "Appetizers",
      price: 7.99,
      status: "Inactive",
      featured: false,
      image: "/placeholder.svg",
    },
  ]

  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })

  // Filter menu items based on search term and filters
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter
    const matchesStatus = statusFilter === "" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort menu items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Delete menu item
  const deleteMenuItem = (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id))
    }
  }

  // Toggle featured status
  const toggleFeatured = (id) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item)))
  }

  // Toggle active status
  const toggleStatus = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item,
      ),
    )
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant's menu items, categories, and pricing.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href="/dashboard/menu/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Menu Item
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search menu items..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>{categoryFilter || "All Categories"}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Appetizers">Appetizers</SelectItem>
                <SelectItem value="Main Course">Main Course</SelectItem>
                <SelectItem value="Desserts">Desserts</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
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
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort("name")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort("category")}>
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort("price")}>
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
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <TableRow key={item.id}>
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
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === "Active" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleStatus(item.id)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.featured ? "secondary" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFeatured(item.id)}
                      >
                        {item.featured ? "Featured" : "Regular"}
                      </Badge>
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
                            <Link href={`/dashboard/menu/${item.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/dashboard/menu/${item.id}/edit`} className="flex w-full items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => deleteMenuItem(item.id)}>
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
            Showing {sortedItems.length} of {menuItems.length} items
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
  )
}
