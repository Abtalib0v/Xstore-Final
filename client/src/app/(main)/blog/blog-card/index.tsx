import Image from "next/image";
import Link from "next/link";

type Props = {
      item : any,
      idx: number,
      name: string,
      description: string,
      createdAtFormatted: string,
      categories: string,
      imageUrl: string,
      id:any
    }
    const blogCard = ({ item,id, idx,name,description,createdAtFormatted,categories,imageUrl}: Props) => {
    console.log("id",id);
  return (
    <div>
        <Link href={`/blog-detail/${id}`} prefetch>
      <div className="py-4 w-full flex ">
          <div className="mx-0 flex  w-full">
                <div>
                  <div className="px-[15px] flex flex-col z-20  bg-white">
                    <div className="flex flex-col rounded-[20px]  object-cover overflow-hidden">
                      <Image
                        className="hover:scale-105   h-[313px]  duration-300   flex object-cover"
                        width={500}
                        height={500}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="font-medium text-[#222222] text-[1.3rem]">{name}</div>
                    <div className="text-gray-500">{createdAtFormatted}</div>
                  </div>
                </div>
          </div>
          
        </div>
      </Link>
    </div>
  );
};

export default blogCard
