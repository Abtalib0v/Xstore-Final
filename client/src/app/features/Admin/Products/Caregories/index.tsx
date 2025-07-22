"use client";
import { deleteAPiWithParams, getAPi, postApi } from "@/app/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { QueryKeys } from "@/app/constant/QueryKeys";
import { on } from "events";
import { Button } from "@/components/ui/button";
import { BasicTable } from "@/app/common/Basictable";
import { CommonDialog } from "@/app/common/Dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const ProductCategoryList = () => {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] =
    useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: QueryKeys.products.categories,
    queryFn: async () => {
      return getAPi("/products/categories");
    },
  });
  const {
    mutate,
    isPending,
    isError: createIsErr,
    error: createErr,
  } = useMutation({
    mutationKey: QueryKeys.products.createCategory,
    mutationFn: async (data: any) => postApi("/products/create/category", data),
    onSuccess: () => {
      formik.resetForm();
      refetch();
      setOpenAddCategoryDialog(false);
    },
    onError: () => {
      console.log(createErr);
    },
  });

  const colums = ["id", "name", "actions"];
  const rows =
    data &&
    data?.data?.map((item: any) => {
      return {
        id: item?._id,
        name: item?.name,
        actions: (
          <div className="flex items-center gap-2">
            <Button variant="outline">Edit</Button>
            <Button onClick={async() => {
await deleteAPiWithParams("products/categories", item._id);
              await refetch();
            }} variant="outline">Delete</Button>
          </div>
        ),
      };
    });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Category name is required"),
    }),
    onSubmit: (values) => {
      mutate({
        name: values?.name ?? "",
      });
    },
  });
  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Products Category Lists
        </h1>
        <Button
          onClick={() => {
            setOpenAddCategoryDialog(true);
          }}
        >
          Add Category
        </Button>
      </div>
      <BasicTable cols={colums} rows={rows} isLoading={isLoading} />
      {openAddCategoryDialog && (
        <CommonDialog
          open={openAddCategoryDialog}
          onClose={() => {
            setOpenAddCategoryDialog(false);
          }}
          title="add Category"
          desc="Category salamm"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {createIsErr && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4">
                {createErr?.message}
              </div>
            )}
            <Label className="mb-2" htmlFor="name">
              Category name
            </Label>
            <Input
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              type="text"
              placeholder="enter the Category name"
            />
            {formik.touched && formik.errors.name ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {formik.errors.name}
              </div>
            ) : null}
            <Button disabled={isPending} className="my-4 w-full" type="submit">
              {isPending ? "creating..." : "Create"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};

export default ProductCategoryList;
