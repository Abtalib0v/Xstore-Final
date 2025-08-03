"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { PiMinusThin } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { getAPi } from "@/app/http/api";
import Card from "../cart";
import AddToCartButton from "@/components/ui/addToCartButton";
import { Button } from "@/components/ui/button";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

const ShopDetailUp = () => {
  // *** Gerçek filtreler: API çağrısı için kullanılır ***
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
const [filterColor, setFilterColor] = useState<string[]>([]);
  const [filterStar, setFilterStar] = useState<number[]>([]);
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  // *** Geçici filtreler: UI'da seçilen değerler burada tutulur ***
  const [tempCategory, setTempCategory] = useState<string[]>([]);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [tempStar, setTempStar] = useState<number[]>([]);
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // API sorgusu
  const { data: products, refetch } = useQuery({
    queryKey: [
      "Product",
      filterCategory,
      filterStar,
      filterColor,
      filterMinPrice,
      filterMaxPrice,
    ],
    queryFn: () => {
      // Eğer filtreler boşsa tüm ürünler için parametre yollama
      const isFilterEmpty =
        filterCategory.length === 0 &&
        filterStar.length === 0 &&
        filterColor.length === 0 &&
        filterMinPrice === "" &&
        filterMaxPrice === "";

      return getAPi("products", isFilterEmpty
        ? {}
        : {
            ...(filterCategory.length > 0 && {
              category: filterCategory.join(","),
            }),
            ...(filterStar.length > 0 && { star: filterStar.join(",") }),
            ...(filterColor && { color: filterColor }),
            ...(filterMinPrice && { minPrice: filterMinPrice }),
            ...(filterMaxPrice && { maxPrice: filterMaxPrice }),
          });
    },
    enabled: false, // otomatik fetch yok, manuel refetch kullanacağız
  });

  // Kategoriler ve renkler sorgusu otomatik
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAPi("products/categories?"),
  });

  const { data: colors } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getAPi("products/colors?"),
  });

  // Sayfa yüklendiğinde tüm ürünleri getirmek için
  useEffect(() => {
    refetch();
  }, []);
  

  const SetByColorWithName = (name: any) => {
    switch (name) {
      case "Black":
        return "bg-[#000000]";
      case "Blue":
        return "bg-[#1e73be]";
      case "Red":
        return "bg-[#dd3333]";
      case "White":
        return "bg-[#ffffff]";
      default:
        return "";
    }
  };

  const toggleAccordion = (panel: string) => {
    setOpenAccordion((prev) => (prev === panel ? null : panel));
  };

  // UI seçimleri için toggle fonksiyonları (temp state)
  const toggleTempStar = (star: number) => {
    setTempStar((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const toggleTempCategory = (category: string) => {
    setTempCategory((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };
  const toggleTempColor = (color: string) => {
  setTempColor((prev) =>
    prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
  );
};

  // Search butonuna basılınca temp filtreler gerçek filtrelere atanır ve sorgu tetiklenir
  const handleSearchClick = () => {
    setFilterCategory(tempCategory);
    setFilterStar(tempStar);
    setFilterColor(tempColor);
    setFilterMinPrice(tempMinPrice);
    setFilterMaxPrice(tempMaxPrice);

    refetch();
  };

  return (
    <div className="container-fluid px-[80px] w-full">
      <div className="mx-[60px] border-[#12121230] border-b-[1px] border-solid flex items-center justify-between pb-[30px] mb-[60px]">
        <div>
          {/* Butonlar */}
          <button className="p-2 " aria-label="submit">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.5 12.5"
              className="h-[15px]"
            >
              <path d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
              <path d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
            </svg>
          </button>
          <button className="p-2" aria-label="submit">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 9.5 12.5"
              className="h-[15px]"
            >
              <path d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
              <path d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
              <path d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
            </svg>
          </button>
          <button className="p-2" aria-label="submit">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13.5 12.5"
              className="h-[15px]"
            >
              <path d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
              <path d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
              <path d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
              <path d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11z"></path>
            </svg>
          </button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <label className="font-bold text-[#121212bf] text-[14px]">
              Sort by:{" "}
              <select className="outline-0 border-[1px] border-[#12121225] font-normal rounded-[5px] pt-2 pb-[7px] pl-3 text-[#121212ab] w-[165px]">
                <option>Alphabetically, A-Z</option>
                <option>Featured</option>
              </select>
            </label>
            <h1 className="text-[14px] font-medium">
              {products?.data?.length || 0} products
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-[60px]">
        <div className="grid grid-cols-12 gap-5">
          <div className="grid col-span-10">
            <div className="grid grid-cols-12 gap-[30px] !font-dm">
              {/* Kategori Accordion */}
              <div className="grid col-span-3 relative">
                <button
                  onClick={() => toggleAccordion("category")}
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-[100] text-[14px] bg-white"
                >
                  CATEGORIES
                  <span>{openAccordion === "category" ? <GoChevronUp /> : <GoChevronDown />}</span>
                </button>
                {openAccordion === "category" && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e1e1e1] rounded-md shadow-lg z-10 overflow-hidden max-h-[300px] overflow-auto p-3">
                    {categories?.data?.map((item: any, index: number) => (
                      <label
                        key={item._id ?? index}
                        className="flex justify-between py-[10px] text-[14px] text-[#121212bf]"
                      >
                        <div>
                          <input
                            type="checkbox"
                            className="mr-[10px] accent-blue-500"
                            onChange={() => toggleTempCategory(item.name)}
                            checked={tempCategory.includes(item.name)}
                          />
                          {item?.name}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Accordion */}
              <div className="grid col-span-3 relative">
                <button
                  onClick={() => toggleAccordion("price")}
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-[100] text-[14px] bg-white"
                >
                  Price
                  <span>{openAccordion === "price" ? <GoChevronUp /> : <GoChevronDown />}</span>
                </button>
                {openAccordion === "price" && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e1e1e1] rounded-md shadow-lg z-10 overflow-hidden p-4">
                    <div className="flex text-[14px] text-[#121212bf] gap-3">
                      <label className="w-full flex rounded-[5px] border">
                        <div className="flex items-center">
                          <h1 className="text-[18px] ml-2.5">$</h1>
                          <input
                            type="number"
                            placeholder="0"
                            className="py-2 w-[100px] mr-[10px] outline-0"
                            value={tempMinPrice}
                            onChange={(e) => setTempMinPrice(e.target.value)}
                          />
                        </div>
                      </label>
                      <div className="flex items-center justify-center">
                        <PiMinusThin className="text-[#000]" />
                      </div>
                      <label className="w-full flex rounded-[5px] border">
                        <div className="flex items-center">
                          <h1 className="text-[18px] ml-2.5">$</h1>
                          <input
                            type="number"
                            placeholder="876.00"
                            className="py-2 mr-[10px] w-[100px] outline-0"
                            value={tempMaxPrice}
                            onChange={(e) => setTempMaxPrice(e.target.value)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Color Accordion */}
              <div className="grid col-span-3 relative">
                <button
  onClick={() => toggleAccordion("color")}
  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-[100] text-[14px] bg-white"
>
  <div className="flex items-center gap-2 flex-wrap">
    <span>Color</span>
    {tempColor.length > 0 && tempColor.map(color => (
      <span
        key={color}
        className="text-xs text-[#555] bg-[#f2f2f2] px-2 py-1 rounded-full"
      >
        {color}
      </span>
    ))}
  </div>
  <span>{openAccordion === "color" ? <GoChevronUp /> : <GoChevronDown />}</span>
</button>

                {openAccordion === "color" && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e1e1e1] rounded-md shadow-lg z-10 overflow-hidden p-3 max-h-[300px] overflow-auto">
                    {colors?.data?.map((item: any, index: number) => (
                      <button
                        key={item._id ?? index}
                        onClick={() => toggleTempColor(item.name)
                        }
                        className="flex justify-between cursor-pointer w-full text-[14px] text-[#121212bf] items-center py-[10px]"
                      >
                        <div className="flex items-center">
                          <div
                            className={clsx(
                              "w-[24px] h-[24px] border-[2px] rounded-full",
                              SetByColorWithName(item.name)
                            )}
                          ></div>
                          <h1 className="ml-2">{item?.name}</h1>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Star Accordion */}
              <div className="grid col-span-3 relative">
                <button
                  onClick={() => toggleAccordion("star")}
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-[100] text-[14px] bg-white"
                >
                  Star
                  <span>{openAccordion === "star" ? <GoChevronUp /> : <GoChevronDown />}</span>
                </button>
                {openAccordion === "star" && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e1e1e1] rounded-md shadow-lg z-10 overflow-hidden p-4">
                    <div className="flex flex-col gap-2">
                      {[5, 4, 3, 2, 1].map((star: number) => (
                        <label
                          key={star}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="star"
                            value={star.toString()}
                            checked={tempStar.includes(star)}
                            onChange={() => toggleTempStar(star)}
                          />
                          <span className="flex">
                            {Array.from({ length: 5 }).map((_, i: number) => (
                              <FaStar
                                key={i}
                                color={i < star ? "#FFD700" : "#e0e0e0"}
                              />
                            ))}
                          </span>
                        </label>
                      ))}
                      <button
                        className="text-xs text-blue-500 mt-2"
                        onClick={() => setTempStar([])}
                      >
                        Filtreyi Temizle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Butonu */}
          <div className="col-span-2 flex items-center">
            <Button className="w-full h-[40px]" onClick={handleSearchClick}>
              Search
            </Button>
          </div>
        </div>

        {/* Ürün listesi */}
        <div className="mt-6">
          <div className="grid grid-cols-12 gap-5">
            {products?.data?.map((item: any, idx: number) => (
              <div className="col-span-3" key={item._id ?? idx}>
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
