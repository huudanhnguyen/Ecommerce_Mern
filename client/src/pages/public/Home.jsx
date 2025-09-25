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
      {/* Main Content - Responsive Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block w-full lg:w-[20%] flex flex-col gap-4">
            <Sidebar />
            <DealDaily />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-[80%] flex flex-col gap-4 lg:gap-6">
            <Banner />
            <BestSeller />
            <AdBanners />
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8">
        <FeaturedProducts />
      </div>

      {/* Big Ad Banners */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8">
        <BigAdBanners />
      </div>

      {/* New Arrivals */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8">
        <NewArrivals />
      </div>

      {/* Hot Collections */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8">
        <HotCollections />
      </div>

      {/* Blog Post - Optional */}
      {/* <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8">
        <BlogPost />
      </div> */}
    </>
  );
};

export default Home;
