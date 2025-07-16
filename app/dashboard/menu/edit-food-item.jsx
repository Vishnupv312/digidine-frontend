import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditFoodItem({ editStatus, setEditStatus }) {
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitted, isLoading },
    reset,
  } = useForm();

  const handleSubmit = async () => {};

  const [imagePreview, setImagePreview] = useState();

  const handleImageUpload = () => {};
  return (
    <Dialog open={editStatus} onOpenChange={setEditStatus}>
      <DialogContent className="sm:max-w-[425px]">
        <button
          onClick={() => setEditStatus(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
          <DialogDescription>Edit your Food Item Details.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid  grid-cols-2 gap-3">
            <div>
              <label htmlFor="img">Select image:</label>

              <input type="file" id="img" name="img" accept="image/*" />
            </div>
            <div></div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Food Item *</Label>
            <Input
              name="name"
              {...register("name", { required: "Food name is required" })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="Description-1">Description</Label>
            <textarea name="Description" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Price </Label>
            <Input
              type="number"
              name="price"
              {...register("price", { required: "price is required" })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditStatus(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
