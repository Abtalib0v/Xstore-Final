"use client";
import { useQuery } from "@tanstack/react-query";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PiMinusThin } from "react-icons/pi";
import { useState } from "react";
import clsx from "clsx"
import { getAPi } from "@/app/http/api";
import Card from "../cart";
import AddToCartButton from "@/components/ui/addToCartButton";

const ShopDetailUp = () => {
  const [selectCardCategory, setSelectCardCategory] = useState("");
  const [selectCardAvailability, setSelectCardAvailability] = useState("");
  const [selectCardMaterial, setSelectCardMaterial] = useState("");
const [selectCardColor,setSelectCardColor] = useState("")
  const { data: products } = useQuery({
    queryKey: [
      "Product",
      selectCardCategory,
      selectCardAvailability,
      selectCardMaterial,
      selectCardColor,
    ],
    queryFn: () =>
       getAPi(
    `products?populate=*` +
    (selectCardCategory ? `&filters[categories][name][$eq]=${selectCardCategory}` : "") +
    (selectCardAvailability ? `&filters[availabilities][name][$eq]=${selectCardAvailability}` : "") +
    (selectCardMaterial ? `&filters[materials][name][$eq]=${selectCardMaterial}` : "") +
    (selectCardColor ? `&filters[colors][name][$eq]=${selectCardColor}` : "")
  ),
  });
  const  {data: categories}  = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAPi("products/categories?populate=*"),
  });
  const { data: cardsAvailabilities } = useQuery({
    queryKey: ["cardAvailabilities"],
    queryFn: () => getAPi("availabilities?populate=*"),
  });
  const { data: cardsMaterials } = useQuery({
    queryKey: ["cardMaterials"],
    queryFn: () => getAPi("materials?populate=*"),
  });
  const { data: colors } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getAPi("products/colors?populate=*"),
  });
  const SetByColorWithName = (name:any) =>{
    switch (name){
        case "Black":
        return "bg-[#000000]"
        case "Blue":
        return "bg-[#1e73be]"
        case "Red":
        return "bg-[#dd3333]"
        case "White":
        return "bg-[#ffffff]"
    }
  }

  return (
    <div className="mt-[60px] container mx-auto ">
      <div className="mx-[60px] border-[#12121230] border-b-[1px] border-solid flex items-center justify-between pb-[30px] mb-[60px]">
        <div>
          <button className="p-2 " aria-label="submit">
            <span>
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5.5 12.5"
                className="h-[15px]"
              >
                <path
                  id="Rectangle"
                  d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                  className="cls-1"
                ></path>
                <path
                  id="Rectangle-2"
                  d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                  className="cls-1"
                  data-name="Rectangle"
                ></path>
              </svg>
            </span>
          </button>
          <button className="p-2" aria-label="submit">
            <span>
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9.5 12.5"
                className="h-[15px]"
              >
                <path
                  id="Rectangle"
                  d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                  className="cls-1"
                ></path>
                <path
                  id="Rectangle-2"
                  d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                  className="cls-1"
                  data-name="Rectangle"
                ></path>
                <path
                  id="Rectangle-3"
                  d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z"
                  className="cls-1"
                  data-name="Rectangle"
                ></path>
              </svg>
            </span>
          </button>
          <button className="p-2" aria-label="submit">
            <span>
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 13.5 12.5"
                className="h-[15px]"
              >
                <path
                  id="Rectangle"
                  d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                  className="cls-1"
                ></path>
                <path
                  id="Rectangle-2"
                  d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                  className="cls-1"
                  data-name="Rectangle"
                ></path>
                <path
                  id="Rectangle-3"
                  d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z"
                  className="cls-1"
                  data-name="Rectangle"
                ></path>
                <path
                  id="Rectangle-4"
                  d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z"
                  className="cls-1"
                  data-name="Rectangle"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <label className="font-bold text-[#121212bf] text-[14px]">
              Sort by:{" "}
              <select className=" outline-0 border-[1px] border-[#12121225] font-normal rounded-[5px] pt-2 pb-[7px] pl-3 text-[#121212ab] w-[165px]">
                <option>Alphabetically, A-Z</option>
                <option>Featured</option>
              </select>
            </label>
            <h1 className="text-[14px] font-medium">
              {" "}
              {products?.data?.length || 0} products
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mx-[60px]">
        <div className="col-span-3">
          <div>
            <Accordion
              defaultExpanded
              sx={{
                fontFamily: "jost",
                boxShadow: "none",
                "&::before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                sx={{
                  minHeight: 48,
                  paddingY: 0,
                  "&.Mui-expanded": {
                    minHeight: 48, // Aynı kalsın
                  },
                  "& .MuiAccordionSummary-content": {
                    marginY: 0,
                    "&.Mui-expanded": {
                      marginY: 0,
                    },
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  sx={{ fontFamily: "jost", fontCategory: "20px" }}
                  component="span"
                >
                  Availability
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {cardsAvailabilities &&
                  cardsAvailabilities?.data?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col text-[14px] text-[#121212bf] "
                    >
                      <label className="w-full flex justify-between py-[10px]">
                        <div>
                          <input
                            type="checkbox"
                            className="mr-[10px] border-2 border-[#121212bf]"
                            onChange={(e) => {
                              setSelectCardAvailability(
                                e.target.checked ? item.name : ""
                              );
                            }}
                          />
                          {item?.name}
                        </div>
                        <span>({item.cards.length})</span>
                      </label>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded
              sx={{
                boxShadow: "none",
                "&::before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  minHeight: "unset",
                },
              }}
            >
              <AccordionSummary
                sx={{
                  minHeight: 48,
                  paddingY: 0,
                  "&.Mui-expanded": {
                    minHeight: 48, // Aynı kalsın
                  },
                  "& .MuiAccordionSummary-content": {
                    marginY: 0,
                    "&.Mui-expanded": {
                      marginY: 0,
                    },
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography
                  sx={{ fontFamily: "jost", fontCategory: "20px" }}
                  component="span"
                >
                  Price
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex text-[14px] text-[#121212bf] gap-3 ">
                  <label className="w-full flex  rounded-[5px] border">
                    <div className="flex items-center">
                      <h1 className="text-[18px] ml-2.5">$</h1>
                      <input
                        type="number"
                        placeholder="0"
                        className=" py-2 w-[100px] mr-[10px] outline-0"
                      />
                    </div>
                  </label>
                  <div className="flex items-center  justify-center">
                    <PiMinusThin className="text-[#000]" />
                  </div>
                  <label className="w-full flex rounded-[5px] border">
                    <div className="flex items-center">
                      <h1 className="text-[18px] ml-2.5">$</h1>
                      <input
                        type="number"
                        placeholder="876.00"
                        className="py-2 mr-[10px] w-[100px] outline-0"
                      />
                    </div>
                  </label>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded
              sx={{
                boxShadow: "none",
                "&::before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  minHeight: "unset",
                },
              }}
            >
              <AccordionSummary
                sx={{
                  minHeight: 48,
                  paddingY: 0,
                  "&.Mui-expanded": {
                    minHeight: 48, // Aynı kalsın
                  },
                  "& .MuiAccordionSummary-content": {
                    marginY: 0,
                    "&.Mui-expanded": {
                      marginY: 0,
                    },
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography
                  sx={{ fontFamily: "jost", fontCategory: "20px" }}
                  component="span"
                >
                  Color
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {colors &&
                  colors?.data?.map((item: any, index: any) => (
                <button key={index} className="flex justify-between cursor-pointer w-full text-[14px] text-[#121212bf] items-center py-[10px]"  onClick={() => {
    setSelectCardColor(prev =>
      prev === item.name ? "" : item.name
    );
  }}>
                  <div className="flex items-center">
                    <div key={index} className={clsx('w-[24px] h-[24px] border-[2px] rounded-full  ',SetByColorWithName(item.name))} ></div>
                    <h1 className="ml-2">{item?.name}</h1>
                  </div>
                  {/* <h1>({item.cards.length})</h1> */}
                </button>
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded
              sx={{
                boxShadow: "none",
                "&::before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  minHeight: "unset",
                },
              }}
            >
              <AccordionSummary
                sx={{
                  minHeight: 48,
                  paddingY: 0,
                  "&.Mui-expanded": {
                    minHeight: 48, // Aynı kalsın
                  },
                  "& .MuiAccordionSummary-content": {
                    marginY: 0,
                    "&.Mui-expanded": {
                      marginY: 0,
                    },
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography
                  sx={{ fontFamily: "jost", fontCategory: "20px" }}
                  component="span"
                >
                  Material
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {cardsMaterials &&
                  cardsMaterials?.data?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col text-[14px] text-[#121212bf] "
                    >
                      <label className="w-full flex justify-between py-[10px]">
                        <div>
                          <input
                            type="checkbox"
                            className="mr-[10px] border-2 border-[#121212bf]"
                            onChange={(e) => {
                              setSelectCardMaterial(
                                e.target.checked ? item.name : ""
                              );
                            }}
                          />
                          {item?.name}
                        </div>
                        <span>({item.cards.length})</span>
                      </label>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded
              sx={{
                boxShadow: "none",
                "&::before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  minHeight: "unset",
                },
              }}
            >
              <AccordionSummary
                sx={{
                  minHeight: 48,
                  paddingY: 0,
                  "&.Mui-expanded": {
                    minHeight: 48, // Aynı kalsın
                  },
                  "& .MuiAccordionSummary-content": {
                    marginY: 0,
                    "&.Mui-expanded": {
                      marginY: 0,
                    },
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography
                  sx={{ fontFamily: "jost", fontCategory: "20px" }}
                  component="span"
                >
                  Category
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {categories &&
                  categories?.data?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col text-[14px] text-[#121212bf] "
                    >
                      <label className="w-full flex justify-between py-[10px]">
                        <div>
                          <input
                            type="checkbox"
                            className="mr-[10px] border-2 border-[#121212bf]"
                            onChange={(e) => {
                              setSelectCardCategory(
                                e.target.checked ? item.name : ""
                              );
                            }}
                          />
                          {item?.name}
                        </div>
                        {/* <span>({item.categories.length})</span> */}
                      </label>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-12 gap-5">
            {products &&
              products?.data?.map((item: any, idx: any) => (
                <div className="col-span-3">
                  <Card
                     addToCart={() => AddToCartButton(item)}
                     id={item._id}
                item={item._id} 
                idx={idx} 
                name={item?.name ?? ""}
                star={item?.star ?? ""}
                price={item?.price ?? ""}
                categories={item?.categories?.name ?? ""}
                imageUrl={item?.imageUrl}
                
                />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailUp;
