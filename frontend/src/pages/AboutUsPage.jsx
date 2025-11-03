import React from "react";
import { Differences } from "../constants";
import ScrollToTop from "../components/ScrollToTop";

const AboutUsPage = () => {
  return (
    <section>
      <div className="container mx-auto py-25 px-6 md:px-20 lg:px-25 flex flex-col items-center bg-gray-50">
        <div className="px-6 py-2 flex flex-col justify-center">
          <h2 className="px-4 py-4 text-center text-4xl font-bold">
            How It Works
          </h2>
        </div>

        <div className="px-6 py-6 flex flex-col justify-center">
          <h2 className="px-4 py-4 text-center text-2xl font-bold">
            We started with a simple but powerful belief:
          </h2>

            <h3 className="px-4 py-4 mb-4 font-medium text-xl text-center rounded-xl border border-green-500 bg-green-100">
            Real health begins with real food, grown in real soil.
          </h3>
          <p className="px-4 text-center font-light text-md">
            Founded by health-conscious thinkers, regenerative farming
            advocates, and nutrition professionals, KCF exists to bridge the gap
            between nutrition science, traditional wisdom, and sustainable
            agriculture.
          </p>

          
          <p className="px-12 text-center font-light text-md">
            <h2 className="px-4 py-4 text-center text-2xl font-bold text-black-700">
              Healing Through Food, Work, and Wisdom
            </h2>
            At Kitchen Cure Foods, we are not just a food company. We are a
            purpose driven movement committed to healing poeple and the planet -
            holistically.
          </p>

            {/* Vision, Mission, Core Philosophy Section */}
            <div className="mt-8 mb-8 flex flex-wrap justify-center items-center gap-8 w-full p-12">
              {/* Single row: Vision, Mission, Core Philosophy */}
              <div className="w-full flex flex-row flex-wrap justify-center items-stretch gap-8">
                {/* Vision */}
                <div className="basis-[30%] max-w-[30%] min-w-[300px] bg-blue-50 border-l-4 border-blue-400 rounded-xl shadow p-8 flex flex-col justify-between h-[470px]">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">🪷 Vision</h2>
                  <blockquote className="italic text-lg text-center text-blue-900 mb-4">“To make holistic healing accessible, joyful, and sustainable —<br />where every meal heals the body, balances the mind, and uplifts the spirit.”</blockquote>
                  <p className="text-md text-center text-blue-800">KitchenCure Foods aims to become the world’s first healing ecosystem where food, yoga, Ayurveda, and Panchagavya are integrated into a seamless daily rhythm — beginning in Indian gated communities and expanding globally.</p>
                </div>
                {/* Mission */}
                <div className="basis-[30%] max-w-[30%] min-w-[300px] bg-green-50 border-l-4 border-green-400 rounded-xl shadow p-8 flex flex-col justify-between h-[470px]">
                  <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">🌼 Mission</h2>
                  <blockquote className="italic text-lg text-center text-green-900 mb-4">“To empower every individual to reclaim their health and happiness —<br />by integrating personalized food care, mindful living, and meaningful work.”</blockquote>
                  <p className="text-md text-center text-green-800">KitchenCure Foods is committed to reversing lifestyle diseases through a holistic approach. We integrate personalized nutrition, mindful living, and meaningful employment for women as holistic healers.</p>
                </div>
                {/* Core Philosophy */}
                <div className="basis-[30%] max-w-[30%] min-w-[300px] bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow p-8 flex flex-col justify-between h-[470px]">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-2 text-center">🌿 Core Philosophy</h2>
                  <blockquote className="italic text-lg text-center text-yellow-900 mb-4">“Healing is a journey of balance —<br />where nature, science, and community unite to nurture body, mind, and spirit.”</blockquote>
                  <p className="text-md text-center text-yellow-800">We believe true healing happens when natural food, timely habits, and peace of mind are woven into daily life. Our philosophy blends science and spirituality, tradition and modernity, individuality and community. </p>
                </div>
              </div>
            </div>

        
        </div>



        <div className="px-6 py-6 flex flex-col justify-center">
          <h4 className="px-4 py-4 text-center text-2xl font-bold">
            What Makes Us Different
          </h4>

          <div className="px-8 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Differences.map((service, index) => (
              <div
                key={index}
                className="flex items-start border border-green-500 bg-green-100 rounded-2xl p-4 shadow-md"
              >
                {/* Image on the left */}
                <img
                  className="w-16 h-16 object-contain mr-4"
                  src={service.image}
                  alt={service.title}
                />

                {/* Text content on the right */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-justify mt-2">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-6 mb-3 flex flex-col justify-center items-center rounded-xl border border-green-500 bg-green-100">
          <div className="w-16 h-16 flex justify-center items-center bg-green-600 rounded-full">
            <img
              className="w-12 h-12 object-contain"
              src="src/assets/globe.png"
              alt=""
            />
          </div>
          <h2 className="px-4 py-4 text-center text-2xl font-bold">Our Goal</h2>
          <p className="w-full px-8 py-4 font-light text-xl text-center rounded-xl border border-green-500 bg-white">
            To become India's most trusted health -first food brand, one that
            feeds bodies, rebuilds land, and empowers farmers - without ever
            asking for donations and always being true to our values.
          </p>
        </div>

        <div className="px-6 py-6 flex flex-col justify-center items-center">
          <h2 className="px-4 py-4 text-center text-4xl font-bold">
            Message from the Founder
          </h2>
          <h3 className="px-8 py-2 w-fit text-sm mb-2 font-medium text-center rounded-xl border border-red-500 bg-red-100">
            Kiriti Reddy Mandyam
          </h3>
        </div>

        <div className="px-4 py-4 flex flex-col text-justify justify-center rounded-xl border-2 border-green-800 bg-green-100">
          <p className="w-full px-4 py-2 font-light text-lg">
            "At Kitchen Cure Foods, our mission is deeply personal."
          </p>
          <p className="w-full px-4 py-2 font-light text-lg">
            We are not here to sell meals. We are here to restore what truly
            matters - your health, the soil that feeds us, and the future we
            leave behind.
          </p>
          <p className="w-full px-4 py-2 font-light text-lg">
            My journey began as a data scientist and a strategic planner. but
            witnessing how disconnected food, farming, and health have become, I
            felt a clear calling:
          </p>
          <p className="w-full px-4 py-4 mt-4 font-semibold text-2xl text-center rounded-xl border border-green-800 bg-green-50 text-green-800">
            To build a system where food heals, farming sustains, and every
            rupee spent becomes a seed for impact.
          </p>

          <div className="w-full px-4 py-4 mt-4 mb-4 font-light text-lg">
            <p>That's why we've created a model where:</p>
            <ul className="px-6 list-disc">
              <li>
                Every meal is fresh and tailored to your health condition.
              </li>
              <li>
                Every ingredient is grown in soil made rifher through
                regeberative pracices - not chemicals.
              </li>
              <li>
                Every farmer we work with is respected, paid fairly, and trained
                in sustainable mothods.
              </li>
              <li>
                Every rupee you spend is used transparently - for real serviced,
                not donations.
              </li>
            </ul>
          </div>

          <p className="w-full px-4 py-4 font-semibold text-2xl text-center rounded-xl border border-red-500 bg-red-200 text-green-800">
            We don't believe in marketing noise.
            <br />
            We don't push for referals or fake offers.
            <br />
            We only ask one thing:
            <br />
            <span className="text-3xl font-bold italic py-6 block">
              "If you feel better, if you heal - share our story, as your own."
            </span>
          </p>
          <p className="w-full px-4 py-2 font-light text-lg">
            Kitchen Cure Foods is more than a brand. It's a living system - made
            to heal holistically - from your plate, to the planet, to the people
            who grow your food.
          </p>
          <p className="w-full px-4 py-2 font-light text-lg">
            Thank you for being part of this journey. Let's heal together.
          </p>
          <hr />
          <p className="w-full px-4 py-4 font-light text-lg">
            <span className="font-semibold text-lg">Warmly,</span>
            <br />
            Kiriti Redy Mandyam
            <br />
            Founder, Kitchen Cure Foods
            <br />
            Heals Holistically
          </p>
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
};

export default AboutUsPage;
