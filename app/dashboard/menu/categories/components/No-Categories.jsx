import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NoCategoryContent = () => {
  const {
    register,
    handleSubmit,
    formState: { error, isSubmitting },
    reset,
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/menu/add-category`,
      data,
      { withCredentials: true }
    );
    if (response.status == 200) {
      toast.success(response.data.message);
      router.refresh();

      reset();
    } else {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center top-10  ">
      <Card className="w-[350px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
            <CardDescription>Add your menu category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Name of your Cateogry"
                  {...register("name", {
                    required: "Category name is required",
                  })}
                  required
                />
                {error?.name && <p>{error.name.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Category Description</Label>
                <textarea
                  placeholder="Add your Category Description "
                  className="bg-white py-2 px-3"
                  {...register("description", {
                    required: "category description is required",
                  })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? " Submitting... " : "Add Category"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NoCategoryContent;
