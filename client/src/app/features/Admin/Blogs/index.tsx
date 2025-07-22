"use client";
import { deleteAPiWithParams, getAPi, postApi } from "@/app/http/api";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { use, useState } from "react";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BasicTable } from "@/app/common/Basictable";
import { CommonDialog } from "@/app/common/Dialog";
import { QueryKeys } from "@/app/constant/QueryKeys";
import CloudinaryNext from "@/app/components/CloudinaryNext/page";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BlogList = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: QueryKeys.blogs.All,
    queryFn: async () => {
      return await getAPi("/blogs");
    },
  });
  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsErr,
    error: categoryError,
  } = useQuery({
    queryKey: QueryKeys.blogs.categories,
    queryFn: async () => {
      return getAPi("/blogs/categories");
    },
  });
  const {
    mutate,
    isPending,
    isError: createIsErr,
    error: createErr,
  } = useMutation({
    mutationKey: QueryKeys.blogs.createBlog,
    mutationFn: async (data: any) => postApi("/blog/create", data),
    onSuccess: () => {
      formik.resetForm();
      refetch();
      setOpenAddDialog(false);
    },
    onError: () => {
      console.log(createErr);
    },
  });

  const colums = [
    "id",
    "name",
    "createdAt",
    "Desc",
    "image",
    "categories",
    "actions",
  ];

  const rows =
    data &&
    data?.data?.map((item: any) => {
      return {
        id: item?._id,
        name: item?.name,
        Desc: item?.description,
        categories: item?.categories?.name ?? "",
        createdAt: item?.createdAt,
        image: (
          <div>
            <img
              src={item?.imageUrl}
              alt={item?.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          </div>
        ),
        actions: (
          <div className="flex items-center gap-1.5">
            <Button variant="outline">Edit</Button>
            <Button
              onClick={async () => {
                await deleteAPiWithParams("blogs", item._id);
                await refetch();
              }}
              variant="outline"
            >
              Delete
            </Button>
          </div>
        ),
      };
    });
  const formik = useFormik({
    initialValues: {
      name: "",
      createdAt: "",
      description: "",
      imageUrl: "" as string | File,
      categories: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Size is required"),
      description: yup.string().required("Description is required"),
      categories: yup.string().required("Category is required"),
      createdAt: yup.string().required("createdAt is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("name", values?.name ?? "");
      formData.append("description", values?.description ?? "");
      formData.append("file", values?.imageUrl ?? "");
      formData.append("categories", values?.categories ?? "");
      formData.append("createdAt", values?.createdAt ?? "");
      mutate(formData);
      // mutate({
      //     name: values?.name ?? ""
      // })
    },
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Blogs Lists </h1>
        <div className="flex items-center justify-center w-full">
          {/* <CldUploadWidget
  signatureEndpoint="/api/sing-image"
  onUpload={(result) => {
    const imageUrl = result?.info?.secure_ur;
    formik.setFieldValue("imageUrl", imageUrl);
  }}
>
  {({ open }) => (
    <button type="button" onClick={() => open()}>
      Upload Image
    </button>
  )}
</CldUploadWidget> */}
        </div>
        <Button
          onClick={() => {
            setOpenAddDialog(true);
          }}
        >
          Add Blog
        </Button>
      </div>
      <BasicTable cols={colums} rows={rows} isLoading={isLoading} />
      {openAddDialog && (
        <CommonDialog
          open={openAddDialog}
          onClose={() => {
            setOpenAddDialog(false);
          }}
          title="Add Blog"
          desc="..."
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2" htmlFor="name">
                  {" "}
                  name
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
              </div>
              <div>
                <Label className="mb-2" htmlFor="description">
                  {" "}
                  description
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                  type="text"
                  placeholder="enter the description "
                />
                {formik.touched && formik.errors.description ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>

              <div>
                <Label className="mb-2" htmlFor="name">
                  {" "}
                  Select Category
                </Label>
                <Select
                  name="categories"
                  onValueChange={(value) => {
                    formik.setFieldValue("categories", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories &&
                        categories?.data?.map((category: any) => (
                          <SelectItem key={category?._id} value={category?._id}>
                            {category?.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.touched && formik.errors.name ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div>
                <DatePicker
  selected={selectedDate}
  onChange={(date: any) => {
    setSelectedDate(date);
    formik.setFieldValue("createdAt", date.toISOString());
  }}
  dateFormat="yyyy-MM-dd"
/>
              </div>
            </div>
            <div></div>
            <div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-10 h-10 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue("imageUrl", file);
                      }
                    }}
                  />
                </label>
              </div>
              {formik.values.imageUrl &&
                typeof formik.values.imageUrl !== "string" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {formik.values.imageUrl.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(formik.values.imageUrl.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                )}
            </div>
            <Button disabled={isPending} className="my-4 w-full" type="submit">
              {isPending ? "creating..." : "Create"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};
export default BlogList;
