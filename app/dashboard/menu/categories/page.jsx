"use client";

import { useEffect, useState } from "react";
import { motion, number } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  ArrowUpDown,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import NoCategoryContent from "./components/No-Categories";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function CategoriesManagement() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [categories, setCategories] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#4ECDC4",
    status: "Active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const router = useRouter();
  const categoryCount = Object.keys(categories || {}).length;

  const fetchCategories = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/menu/fetch-categories`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.data.length === 0) return setCategoryFlag(true);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  // Predefined color options

  // Filter categories based on search term
  // const filteredCategories = categories.filter((category) => {
  //   return (
  //     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     category.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  // // Sort categories
  // const sortedCategories = [...filteredCategories].sort((a, b) => {
  //   if (!sortConfig.key) return 0;

  //   if (a[sortConfig.key] < b[sortConfig.key]) {
  //     return sortConfig.direction === "ascending" ? -1 : 1;
  //   }
  //   if (a[sortConfig.key] > b[sortConfig.key]) {
  //     return sortConfig.direction === "ascending" ? 1 : -1;
  //   }
  //   return 0;
  // });

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Show toast notification (simplified version)
  const showToast = (message, type = "success") => {
    // Simple alert for now - in a real app you'd use a proper toast library
    if (type === "error") {
      toast.error(` ${message}`);
    } else {
      toast.success(`${message}`);
    }
  };

  // Delete category
  const deleteCategory = (id) => {
    const payload = {
      id,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/menu/delete-category`,
        payload,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // Toggle active status
  const toggleStatus = async (id) => {
    const payload = { id };
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/menu/update-category-status`,
        payload,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    // setCategories(
    //   categories.map((category) =>
    //     category.id === id
    //       ? {
    //           ...category,
    //           status: category.status === "Active" ? "Inactive" : "Active",
    //         }
    //       : category
    //   )
    // );
    // const category = categories.find((cat) => cat.id === id);
    // const newStatus = category.status === "Active" ? "Inactive" : "Active";
    // showToast(`Category "${category.name}" is now ${newStatus.toLowerCase()}`);
  };

  // Validate form

  // Handle add category
  const handleAddCategory = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      order: data.order,
      status: data.status,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/menu/add-category`,
        payload,
        { withCredentials: true }
      );
      showToast(res.data.message);
      fetchCategories();
      setIsAddDialogOpen(false);
      reset();
    } catch (err) {
      toast.error("Failed to add category");
      console.error(err);
    }
  };

  // Handle edit category
  const handleEditCategory = async () => {
    if (!validateForm(currentCategory)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCategories(
        categories.map((category) =>
          category.id === currentCategory.id
            ? { ...currentCategory, name: currentCategory.name.trim() }
            : category
        )
      );
      // setIsEditDialogOpen(false);
      showToast(`Category "${currentCategory.name}" updated successfully!`);
    } catch (error) {
      showToast("Failed to update category. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit dialog
  const openEditDialog = async (category) => {
    // setCurrentCategory({ ...category });
    setIsEditDialogOpen(true);
    console.log("edit button clicked ");
  };

  useEffect(() => {
    console.log("Edit dialog state changed:", isEditDialogOpen);
  }, [isEditDialogOpen]);

  // Reset form
  const resetForm = () => {
    setNewCategory({
      name: "",
      description: "",
      color: "#4ECDC4",
      status: "Active",
    });
  };

  useEffect(() => {
    if (isAddDialogOpen) {
      reset({
        name: "",
        description: "",
        order: categoryCount + 1,
      });
    }
  }, [isAddDialogOpen, categories, reset]);

  // Handle add button click
  const handleAddButtonClick = (data) => {
    console.log("Add button clicked"); // Debug log
    setIsAddDialogOpen(true);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (categoryFlag) return <NoCategoryContent />;
  console.log(typeof categories);
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-oswald">
            Menu Categories
          </h1>
          <p className="text-muted-foreground">
            Manage your restaurant's menu categories and organization.
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            onClick={handleAddButtonClick}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4 text-white" /> Add Category
          </Button>
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
              placeholder="Search categories by name or description..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Order</TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("itemCount")}
                  >
                    Items
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // categories.length > 0 ?
                // (
                categories?.map((category) => (
                  <TableRow key={category._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="w-8 h-8 rounded-lg border shadow-xs flex items-center justify-center font-semibold">
                        {category?.order}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium font-zilla-slab">
                      {category.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                      {category.description || "No description"}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {category.foodItems.length} items
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            category.status === true ? "default" : "secondary"
                          }
                          className={`cursor-pointer transition-colors ${
                            category.status === true
                              ? "bg-green-100 py-2 px-1 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => toggleStatus(category._id)}
                        >
                          {category.status === true ? (
                            <Eye className="w-3 h-3 mr-1" />
                          ) : (
                            <EyeOff className="w-3 h-3 mr-1" />
                          )}
                          {category.status === true ? "Active" : "InActive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(category)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleStatus(category._id)}
                            className="text-blue-600"
                          >
                            {category.status == 1 ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteCategory(category._id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
                // ) : (
                //   <TableRow>
                //     <TableCell colSpan={6} className="h-24 text-center">
                //       {searchTerm
                //         ? "No categories found matching your search."
                //         : "No categories found. Create your first category to get started."}
                //     </TableCell>
                //   </TableRow>
                // )
              }
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-oswald text-xl">
              Add New Category
            </DialogTitle>
            <DialogDescription>
              Create a new category to organize your menu items effectively.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Category Name *
              </Label>
              <Input
                id="name"
                {...register("name", "Category Name is required")}
                placeholder="e.g., Appetizers, Main Course, Desserts"
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-bold">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of this category"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-sm font-bold">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label className="text-sm font-medium"> Category Order * </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="order"
                  {...register("order", {
                    required: "Category Order is required",
                    value: number,
                    min: { value: 1, message: " min order value should be 1 " },
                  })}
                  placeholder="Sequencial Order of the Category"
                  className="w-full"
                  value={`${categories?.length}` + 1}
                  required
                />
              </div>
              {errors.order && (
                <p className="text-red-500 text-sm font-bold">{errors.order}</p>
              )}
            </div>
            <Controller
              control={control}
              name="status"
              defaultValue={1}
              render={({ field: { onChange, value } }) => (
                <div className="flex items-center justify-between">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Active Status
                  </Label>
                  <Switch
                    id="status"
                    checked={Boolean(value)}
                    onCheckedChange={(checked) => onChange(checked ? 1 : 0)}
                  />
                </div>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleAddCategory)}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
    </div>
  );
}
