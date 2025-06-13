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
import { useForm } from "react-hook-form";

export default function EditFoodItem({ editStatus, setEditStatus }) {
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitted, isLoading },
    reset,
  } = useForm();

  const handleSubmit = async () => {};
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
          <DialogTitle>View Food Item</DialogTitle>
          <DialogDescription>
            This is where you can view item details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name *</Label>
            <Input
              name="name"
              {...register("name", { required: "Food name is required" })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Username</Label>
            <Input name="username" />
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
