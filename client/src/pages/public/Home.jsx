import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  AdBanners,
  FeaturedProducts,
  BigAdBanners,
  NewArrivals,
  HotCollections,
  BlogPost,
} from "../../components";

const Home = () => {
  return (
    <>
      <div className="w-main flex gap-5 relative">
        <div className="w-[20%] flex flex-col">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="w-[80%] flex flex-col gap-5">
          <Banner />
          <BestSeller />
          <AdBanners />
        </div>
      </div>
      <div className="w-main mt-5">
        <FeaturedProducts />
      </div>
      <div className="w-main mt-5">
        <BigAdBanners />
      </div>
      <div className="w-main mt-5">
        <NewArrivals />
      </div>
      <div className="w-main mt-5">
        <HotCollections />
      </div>
      {/* <div className="w-main mt-5">
        <BlogPost />
      </div> */}
    </>
  );
};

export default Home;
