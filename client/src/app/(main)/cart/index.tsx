import Link from "next/link";

type Props = {
      item : any,
      idx: number,
      name: string,
      star: string,
      price: string,
      categories: string,
      imageUrl: string,
      id:any
    }
    const Card = ({ item,id, idx,name,star,price,categories,imageUrl}: Props) => {
    console.log("id",id);
  return (
    <div>
        <Link href={`/detail/${id}`}>
      <div className="w-full py-4 flex justify-center">
        <div className="group ">
          <div className="mx-0 flex  w-full">
            
                <div>
                  <div className="p-[15px] flex flex-col z-20 hover:scale-105 hover:shadow-[0px_0px_11px_1px_rgba(0,_0,_0,_0.1)] duration-300 bg-white border border-[#e1e1e1] rounded-[20px]">
                    <div className="flex flex-col  object-cover aspect-square items-center justify-center  rounded-xl">
                      <img
                        className=" w-[345px] flex object-cover"
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="font-medium">{name}</div>
                    <div>{star}</div>
                    <div>{price}</div>
                  </div>
                </div>
          </div>
          
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Card
