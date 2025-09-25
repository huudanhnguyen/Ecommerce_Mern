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
          <div className="hidden lg:block w-full lg:w-[25%] flex flex-col gap-4">
            <Sidebar />
            <DealDaily />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-[75%] flex flex-col gap-4 lg:gap-6">
            <BestSeller />
          </div>
        </div>
      </div>

      {/* Banner chính - Full width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <Banner />
      </div>

      {/* Ad Banners - Full width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:mt-6">
        <AdBanners />
      </div>

      {/* Featured Products */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <FeaturedProducts />
      </div>

      {/* Big Ad Banners */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <BigAdBanners />
      </div>

      {/* New Arrivals */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <NewArrivals />
      </div>

      {/* Hot Collections */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
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
