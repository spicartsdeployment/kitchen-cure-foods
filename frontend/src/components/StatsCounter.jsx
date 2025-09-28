import React from "react";
import CountUp from "react-countup";
import { stats } from "../constants";
import { Star } from "lucide-react";

const StatsCounter = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 py-16">
      {stats.map((item, index) => (
        <div
          key={index}
          className="p-6 flex flex-col items-center w-auto"
        >
          <h3 className="text-5xl text-green-800 mb-2">
            <span>
              <CountUp
                start={0}
                end={item.count}
                duration={4}
                decimals={item.count % 1 !== 0 ? 1 : 0}
                separator=""
              />
            </span>
            {item.title.toLowerCase().includes("rating") ? (
              <Star className="w-8 h-8 text-yellow-500 inline-block ml-2" />
            ) : (
              <span className="ml-1">+</span>
            )}
          </h3>
          <h2 className="text-3xl text-center">{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
