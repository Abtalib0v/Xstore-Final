"use client";
import { BasicTable } from "@/app/_common/Basictable";
import { CommonDialog } from "@/app/_common/Dialog";
import { QueryKeys } from "@/app/_constant/QueryKeys";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/lib/check-status";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAPi, patchApi, patchOrderApi } from "@/app/_http/api";


const OrderList = () => {
  const [openModalIsEditStatus, setIsOpenModalIsEditStatus] =
    useState<boolean>(false);
  const [orderstatus, setStatus] = useState<string>("");
  const [selectOrderId, setSelectOrderId] = useState<string>("");
  const [formStatus, setFormStatus] = useState<string>("");
  const {
  data,
  isLoading,
  isError: dataIsErr,
  error: dataErr,
  refetch,
} = useQuery({
  queryKey: QueryKeys.orders.all,
  queryFn: async () => {
    return getAPi("/admin/orders"); // admin siparişleri
  },
});


  const colums = [
    "id",
    "user",
    "address",
    "totalAmount",
    "products",
    "status",
    "actions",
  ];

  const rows =
    data &&
    data?.data?.map((item: any) => {
      return {
        id: item?._id,
        user: item?.user?.name || item?.user?.email,
        status: (
          <Button
            onClick={() => {
              setIsOpenModalIsEditStatus(true);
              setStatus(item?.status);
              setSelectOrderId(item?._id);
            }}
            disabled={item.status === "delivered"}
            className={`mt-2 ${OrderStatus(item?.status)}`}
          >
            {item?.status}
          </Button>
        ),
        address: item?.address,
        totalAmount: item?.totalAmount,
        products: item?.products
          .map(
            (product: any) => `${product.product.name} (${product.quantity})`
          )
          .join(", "),
        actions: (
          <div className="flex items-center gap-1.5">
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Delete</Button>
          </div>
        ),
      };
    });

  const status = [
    {
      id: 1,
      value: "paid",
      name: "paid",
    },
    {
      id: 2,
      name: "shipped",
      value: "shipped",
    },
    {
      id: 3,
      name: "delivered",
      value: "delivered",
    },
    {
      id: 4,
      name: "cancelled",
      value: "cancelled",
    },
  ];

  const disabledSelect = status.find((item: any) => item.value === orderstatus);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: async (data: any) => {
      return patchOrderApi(`/orders/${selectOrderId}/status`, data);
    },
    mutationKey: QueryKeys.orders.updateOrderStatus(orderstatus),
    onSuccess: () => {
      selectOrderId && refetch();
      setIsOpenModalIsEditStatus(false);
      setStatus("");
      setSelectOrderId("");
    },
  });

  const handleUpdateStatus = () => {
    mutate({
      status: formStatus,
    });
  };
  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Orders Lists</h1>
      </div>
      <BasicTable cols={colums} rows={rows} isLoading={isLoading} />
      {openModalIsEditStatus && (
        <CommonDialog
          open={openModalIsEditStatus}
          onClose={() => {
            setIsOpenModalIsEditStatus(false);
            setStatus("");
            selectOrderId && setSelectOrderId("");
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateStatus();
            }}
          >
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Change Order Status
            </Label>
            <Select
              onValueChange={(value: string) => {
                setFormStatus(value);
              }}
              //   disabled={disabledSelect ? true : false}
            >
              <SelectTrigger className="w-[520px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {status?.map((item: any) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button disabled={isPending} className="mt-3">
              {isPending ? "Updating..." : "Update Status"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};

export default OrderList;
