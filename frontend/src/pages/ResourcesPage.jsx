import React from "react";
import { ArrowRight } from "lucide-react";
import { DownloadableGuides } from "../constants";
import ScrollToTop from "../components/ScrollToTop";
import { downloadFile } from "../utils/download";
import { SubscribeForm } from "../components/SubscribeForm";
import VideoCarousel from "../components/VideoCarousel";

const handleDownloadButtonClick = (item) => {
  downloadFile(item.url, item.filename);
};

const ResourcesPage = () => {
  return (
    <section>
      <div className="container mx-auto py-25 px-6 md:px-20 lg:px-25 flex flex-col items-center">
        <div className="px-8 py-8 flex flex-col justify-center">
          <h2 className="px-6 py-4 text-center text-4xl font-bold">
            Knowledge Center Resources for Your Healing Journey
          </h2>
          <p className="px-6 py-4 text-center font-light text-md">
            Discover evidence-based articles, guides, and videos about
            regenerative faming, personalized nutrition, and holistic health
            approaches.
          </p>
        </div>

        <div className="px-6 py-6 flex flex-col justify-center">
          <h2 className="px-4 py-4 text-center text-3xl font-bold">
            Featured Article
          </h2>

          <div className="px-8 py-4 border border-green-500 bg-green-100 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-start p-4 gap-6">
              {/* Image on the left */}
              <img
                className="w-full sm:w-1/2 object-cover rounded-lg shadow-md"
                src="src/assets/farming.jpg"
                alt="Farming"
              />

              {/* Text content on the right */}
              <div className="flex flex-col justify-between">
                <h3 className="px-6 py-2 w-fit text-sm mb-4 font-medium text-center rounded-xl border border-red-500 bg-red-100">
                  Farming
                </h3>
                <h3 className="py-4 text-lg font-semibold">
                  Understanding Regenerative Farming: A Complete Guide
                </h3>
                <p className="text-sm text-justify mt-2">
                  Learn how regenerative farming practices restore soil health
                  and create nutrient-dense food.
                </p>
                <p className="py-4 text-sm text-gray-600 mt-2">
                  Dr. Priya Sharma · 8 min read · Dec 15, 2024
                </p>
                <button
                  className="mt-4 px-8 py-2 w-fit text-sm border border-green-800 bg-green-800 text-white rounded-lg 
             hover:text-green-800 hover:bg-white transition-colors duration-300 
             flex items-center gap-2"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 w-full flex flex-col justify-center bg-green-100">
          <h4 className="px-4 py-4 text-4xl text-center font-semibold leading-tight">
            Downloadable Guides
          </h4>
          <div className="px-8 py-4 flex flex-wrap justify-center gap-6">
            {DownloadableGuides.map((item, index) => (
              <div
                key={index}
                className="w-64 flex flex-col border items-center rounded-2xl p-4 shadow-md bg-green-100"
              >
                <h3 className="px-4 py-4 text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="px-4 py-4 text-sm">{item.text}</p>
                <div className="w-full px-2 py-2 flex justify-between text-sm mt-2">
                  <span>{item.type}</span>.<span>{item.pages} Pages</span>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button
                    className="px-8 py-2 text-sm border border-green-800 bg-green-800 text-white rounded-lg hover:text-green-800 hover:bg-white transition-colors duration-300"
                    onClick={() => handleDownloadButtonClick(item)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-8 flex flex-col justify-center">
          <h2 className="px-6 py-4 text-center text-4xl font-bold">
            Video Resources
          </h2>
          <VideoCarousel />
        </div>

        <div className="px-8 py-8 flex flex-col justify-center bg-gray-100 w-full rounded-lg">
          <h2 className="px-6 py-4 text-center text-4xl font-bold">
            Stay Updated with Our Latest Resources
          </h2>
          <p className="px-6 py-4 text-center font-light text-md">
            Discover evidence-based articles, guides, and videos about
            regenerative faming, personalized nutrition, and holistic health
            approaches.
          </p>
          <SubscribeForm />
        </div>
      </div>
            <ScrollToTop />
    </section>
  );
};

export default ResourcesPage;
