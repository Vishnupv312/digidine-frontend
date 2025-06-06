"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, Upload, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NewMenuItem() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryFlag, setCategoryFlag] = useState(false);
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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: true,
    price: "",
    image: null,
    category: "",
    isVegeterian: false,
    isNonVegetarian: false,
    isSpicy: false,
    ingredients: [],
    preparationTime: "",
    featured: false,
    status: "active",
  });
  const [tagInput, setTagInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredients = () => {
    if (tagInput.trim() && !formData.ingredients.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((t) => t !== tag),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = formData;
    console.log(payload);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/menu/add-food-item`,
        payload,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        router.push("/dashboard/menu");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (categoryFlag)
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>No Category Found !!</DialogTitle>

            <DialogDescription>
              You have to add a category to your menu
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button>
              <Link
                href="/dashboard/menu/categories"
                className="cursor-pointer"
              >
                Add Category
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/menu">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Menu Item</h1>
          <p className="text-muted-foreground">
            Create a new item for your restaurant's menu
          </p>
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Grilled Salmon"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your menu item..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/*Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ingredients</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.ingredients.map((ingredient) => (
                        <Badge
                          key={ingredient}
                          variant="secondary"
                          className="flex py-2 px-3 items-center text-white gap-1"
                        >
                          {ingredient}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(ingredient)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add The main Ingredients (e.g. Paneer, Spices, Chicken )"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddIngredients();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={handleAddIngredients}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Preparation Time">Preparation Time</Label>
                    <Input
                      id="preparationTime"
                      name="preparationTime"
                      type="number"
                      min="1"
                      placeholder="1.00 in Mins"
                      value={formData.preparationTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Item Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    {previewImage ? (
                      <div className="relative w-full max-w-md">
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPreviewImage(null);
                            setFormData((prev) => ({ ...prev, image: null }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <div className="bg-primary/10 rounded-full p-4 mb-4">
                          <ImageIcon className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-lg font-medium mb-1">Upload Image</p>
                        <p className="text-sm text-gray-500 mb-4">
                          Drag and drop or click to browse
                        </p>
                        <Button type="button" variant="outline">
                          <Upload className="h-4 w-4 mr-2" /> Select Image
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Featured Item</p>
                      <p className="text-sm text-gray-500">
                        Highlight this item on your menu
                      </p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("featured", checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Tabs
                      defaultValue={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                        {previewImage ? (
                          <img
                            src={previewImage || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {formData.name || "Item Name"}
                          {formData.featured && (
                            <Badge className="ml-2 bg-secondary text-white">
                              Featured
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                          {formData.description ||
                            "Item description will appear here..."}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-primary">
                            $
                            {formData.price
                              ? Number.parseFloat(formData.price).toFixed(2)
                              : "0.00"}
                          </p>
                          <div className="flex gap-1">
                            {formData.ingredients.map((ingredient) => (
                              <Badge
                                key={ingredient}
                                variant="outline"
                                className="text-xs"
                              >
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Link href="/dashboard/menu">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Save Menu Item</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
