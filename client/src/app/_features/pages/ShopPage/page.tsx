"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { PiMinusThin } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { getAPi } from "@/app/_http/api";
import AddToCartButton from "@/components/ui/addToCartButton";
import { Button } from "@/components/ui/button";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import { TfiViewGrid } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import BreadCrumbShop from "@/app/_features/sections/ShopSection/BreadCrumbShop";
import Card from "@/app/(main)/cart";
import { HeadSec } from "../../sections/ShopSection/HeadSec";
import Banner from "../../sections/ShopSection/BannerSection";


const ShopPage = () => {
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

      return getAPi(
        "products",
        isFilterEmpty
          ? {}
          : {
              ...(filterCategory.length > 0 && {
                category: filterCategory.join(","),
              }),
              ...(filterStar.length > 0 && { star: filterStar.join(",") }),
              ...(filterColor && { color: filterColor }),
              ...(filterMinPrice && { minPrice: filterMinPrice }),
              ...(filterMaxPrice && { maxPrice: filterMaxPrice }),
            }
      );
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

  const cards = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
  }));
  const [visibleCount, setVisibleCount] = useState(cards.length);
  const [showDropdown, setShowDropdown] = useState(false);
  const options = [1, 4, 7, 10, cards.length];
  const handleChange = (e: any) => {
    const value = e.target.value;
    setVisibleCount(value === "all" ? cards.length : parseInt(value));
  };
  const [isGrid, setIsGrid] = useState(true);
  const cardsGrid = Array.from({ length: 12 }, (_, i) => `Card ${i + 1}`);
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
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
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
      <div >
        <BreadCrumbShop/>
      </div>
      <div>
        <HeadSec/>
      </div>
      <div className="flex flex-col mx-[60px]">
        <div className="grid 2xl:grid-cols-12 grid-cols-1 gap-5 mb-[25px]">
          <div className="grid col-span-10">
            <div className="grid 2xl:grid-cols-12 grid-cols-1 gap-[30px] !font-dm">
              {/* Kategori Accordion */}
              <div className="grid col-span-3 relative">
                <button
                  onClick={() => toggleAccordion("category")}
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-normal text-[14px] bg-white"
                >
                  CATEGORIES
                  <span>
                    {openAccordion === "category" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>
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
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-normal text-[14px] bg-white"
                >
                  PRICE
                  <span>
                    {openAccordion === "price" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>
                </button>
                {openAccordion === "price" && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e1e1e1] rounded-md shadow-lg z-10 p-4">
                    <div className="flex text-[14px] text-[#121212bf] gap-3">
                      <label className="w-full flex rounded-[5px] border">
                        <div className="flex items-center">
                          <h1 className="text-[18px] ml-2.5">$</h1>
                          <input
                            type="number"
                            placeholder="0"
                            className="py-2 w-full mr-[10px] outline-0"
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
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-normal text-[14px] bg-white"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>COLOR</span>
                    {tempColor.length > 0 &&
                      tempColor.map((color) => (
                        <span
                          key={color}
                          className="text-xs text-[#555] bg-[#f2f2f2] px-2 py-1 rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                  </div>
                  <span>
                    {openAccordion === "color" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>
                </button>

                {openAccordion === "color" && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e1e1e1] rounded-md shadow-lg z-10 overflow-hidden p-3 max-h-[300px] overflow-auto">
                    {colors?.data?.map((item: any, index: number) => (
                      <button
                        key={item._id ?? index}
                        onClick={() => toggleTempColor(item.name)}
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
                  className="w-full text-left min-h-[48px] py-3 px-4 border border-[#e5e5e5] rounded-[50px] flex justify-between items-center font-normal text-[14px] bg-white"
                >
                  STAR
                  <span>
                    {openAccordion === "star" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>
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
            <Button
              className="w-full h-[40px] rounded-[50px] bg-[#2a74ed]"
              onClick={handleSearchClick}
            >
              <h1 className="text-[16px] items-center gap-1 flex">
                <IoSearchOutline /> Search
              </h1>
            </Button>
          </div>
        </div>
        <div><Banner/></div>
        <div className="flex items-center justify-between mt-[10px]">
          <div className="2xl:flex hidden ">
          {/* Grid Butonu (sol) */}
          <button
            aria-label="Grid View"
            onClick={() => setIsGrid(true)}
            className={`p-2 text-[18px] ${
              isGrid ? "text-[#2A74ED]" : "text-[#000]"
            }`}
          >
            <TfiLayoutGrid4 />
          </button>

          {/* List Butonu (sağ) */}
          <button
            aria-label="List View"
            onClick={() => setIsGrid(false)}
            className={`p-2 text-[18px] ${
              !isGrid ? "text-[#2A74ED]" : "text-[#000]"
            }`}
          >
            <TfiViewGrid />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <div className="relative inline-block text-left mb-4">
              <label htmlFor="cardCount" className="font-medium mr-2">
                Show
              </label>
              <select
                id="cardCount"
                value={visibleCount === cards.length ? "all" : visibleCount}
                onChange={handleChange}
                className="px-3 py-2 border rounded bg-white pl-[18px] pr-[52.2px] focus:outline-none text-[#888]"
              >
                {[1, 4, 7, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value="all">All</option>
              </select>

              {showDropdown && (
                <div className="absolute z-10 mt-2 w-32 bg-white border rounded shadow-lg">
                  {options.map((count, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setVisibleCount(count);
                        setShowDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {count === cards.length ? "All" : count}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
        

        {/* Ürün listesi */}
        <div>
          <div className="grid grid-cols-12 gap-5 w-full h-full">
            {products?.data
              ?.slice(0, visibleCount)
              .map((item: any, idx: number) => (
                <div
                  className={`grid gap-4 ${
                    isGrid ? "2xl:col-span-3" : "2xl:col-span-6 h-[302px]"
                  } col-span-12 h-full`}
                  key={item._id ?? idx}
                >
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
                    viewMode={isGrid ? "grid" : "list"}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
