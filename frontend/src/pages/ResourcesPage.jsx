import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { featuredArticleData, DownloadableGuides } from "../constants";
import ScrollToTop from "../components/ScrollToTop";
import { downloadFile } from "../utils/download";
import { SubscribeForm } from "../components/SubscribeForm";
import VideoCarousel from "../components/VideoCarousel";
import DialogModal from "../components/DialogModal";

const handleDownloadButtonClick = (item) => {
  downloadFile(item.url, item.filename);
};

const ResourcesPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleReadArticle = (article) => {
    setSelectedArticle(article);
  };

  return (
    <section>
      <div className="container mx-auto py-25 px-6 md:px-20 lg:px-25 flex flex-col items-center bg-gray-50">
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

          {/* Article Card */}
          <div className="px-8 py-4 border border-green-500 bg-green-100 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row items-start p-4 gap-6">
              <img
                className="w-full sm:w-1/2 object-cover rounded-xl shadow-md border-8 border-gray-100"
                src={featuredArticleData.image}
                alt={featuredArticleData.category}
              />

              <div className="flex flex-col justify-between">
                <h3 className="px-6 py-2 w-fit text-sm mb-4 font-medium text-center rounded-xl border border-red-500 bg-red-100">
                  {featuredArticleData.category}
                </h3>

                <h3 className="py-4 text-lg font-semibold">
                  {featuredArticleData.title}
                </h3>
                <p className="text-sm text-left">
                  {featuredArticleData.description}
                </p>

                <p className="py-4 font-light text-sm text-gray-600 mt-2">
                  {featuredArticleData.author} · {featuredArticleData.readTime}{" "}
                  · {featuredArticleData.date}
                </p>

                <button
                  onClick={() => handleReadArticle(featuredArticleData)}
                  className="mt-4 px-8 py-2 w-fit text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-300 flex items-center gap-2"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Guides */}
        <div>
          <h2 className="p-4 mt-8 text-center text-3xl font-bold">
            Downloadable Guides
          </h2>
          <div className="p-8 border border-green-500 bg-green-100 rounded-xl shadow-md mb-4 w-full flex flex-col justify-center">
            <div className="flex flex-wrap justify-center gap-6">
              {DownloadableGuides.map((item, index) => (
                <div
                  key={index}
                  className="bg-white w-80 py-8 flex flex-col items-center text-center border border-gray-300 rounded-4xl p-4 shadow-lg hover:border hover:border-green-600 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="px-4 py-2 text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="p-4 text-sm text-gray-500">{item.text}</p>
                  <div className="w-full px-8 flex justify-center text-sm mt-2">
                    <span className="mr-1">{item.type}</span>-
                    <span className="ml-1">{item.pages} Pages</span>
                  </div>
                  <div className="flex items-center justify-center w-full mt-6">
                    <button
                      className="px-8 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-300"
                      onClick={() => handleDownloadButtonClick(item)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  Video Resources */}
        <div>
          <h2 className="p-4 mt-8 text-center text-3xl font-bold">
            Video Resources
          </h2>
          <div className="p-8 flex flex-col justify-center border border-green-500 bg-green-100 rounded-xl shadow-md mb-4 w-full">
            <VideoCarousel />
          </div>
        </div>

        {/* Subscribe Form */}
        <div className="p-8 flex flex-col justify-center w-full rounded-xl">
          <h2 className="p-4 text-center text-3xl font-bold">
            Stay Updated with Our Latest Resources
          </h2>
          <p className="p-4 text-center font-light text-md">
            Discover evidence-based articles, guides, and videos about
            regenerative faming, personalized nutrition, and holistic health
            approaches.
          </p>
          <div className="mt-4 flex justify-center">
            <SubscribeForm />
          </div>
        </div>
        <ScrollToTop />
      </div>

      {/* Dialog Box for Full Article */}
      <DialogModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title}
        subtitle={selectedArticle?.description}
        content={selectedArticle?.content}
      />
    </section>
  );
};

export default ResourcesPage;
