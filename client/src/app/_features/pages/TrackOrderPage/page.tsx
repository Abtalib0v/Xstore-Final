import React from "react";
import TrackSection from "../../sections/TrackOrderSection/TrackSection";
import BreadCrumbTrackOrder from "../../sections/TrackOrderSection/BreadCrumbShop";

const TrackOrderPage = () => {
  return (
    <div>
      <div className="container-fluid 2xl:px-[95px] pt-[10px] mb-[85px] px-0 w-full flex flex-col justify-center  ">
        <BreadCrumbTrackOrder />
      </div>
      <TrackSection />
    </div>
  );
};

export default TrackOrderPage;
