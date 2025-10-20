import React from "react";

function ServicesPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* ================= Plans Section ================= */}
      <section className="py-16 px-6 text-center ">
        <h2 className="text-4xl font-bold mb-4 pt-10">
          Personalized Meals That Heal
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Fresh, science-backed meals tailored to your health needs, grown
          through regenerative farming practices that heal both you and the
          planet.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-green-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-green-600 text-5xl mb-4">🍏</div>
            <h3 className="text-xl font-bold mb-2">Healing Essentials</h3>
            <p className="text-gray-600 mb-4">
              Perfect for those starting their health journey with basic
              nutritional support
            </p>
            <p className="font-semibold mb-4">₹2,999 / month</p>
            <ul className="text-left space-y-2 mb-6">
              <li>✔ 15 personalized meals per month</li>
              <li>✔ Basic health consultation</li>
              <li>✔ Regeneratively grown ingredients</li>
              <li>✔ Weekly nutrition tracking</li>
              <li>✔ Email support</li>
            </ul>
            <button className="bg-red-500 text-white px-6 py-3 rounded-xl shadow hover:bg-red-800 transition">
              Get Started
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-green-100 p-8 rounded-2xl shadow-lg border-2 border-green-600 relative hover:shadow-xl transition">
            <span className="absolute -top-3 right-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
              Most Popular
            </span>
            <div className="text-green-700 text-5xl mb-4">💚</div>
            <h3 className="text-xl font-bold mb-2">Complete Wellness</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive plan for active health transformation and sustained
              healing
            </p>
            <p className="font-semibold mb-4">₹4,999 / month</p>
            <ul className="text-left space-y-2 mb-6">
              <li>✔ 30 personalized meals per month</li>
              <li>✔ Detailed health consultation</li>
              <li>✔ Custom nutrition planning</li>
              <li>✔ Bi-weekly progress reviews</li>
              <li>✔ Priority support</li>
              <li>✔ Supplement guidance</li>
            </ul>
            <button className="bg-green-700 text-white px-6 py-3 rounded-xl shadow hover:bg-green-800 transition">
              Get Started
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-green-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-green-600 text-5xl mb-4">🌿</div>
            <h3 className="text-xl font-bold mb-2">Holistic Healing</h3>
            <p className="text-gray-600 mb-4">
              Premium plan with comprehensive health restoration & intensive
              support
            </p>
            <p className="font-semibold mb-4">₹7,999 / month</p>
            <ul className="text-left space-y-2 mb-6">
              <li>✔ 45 personalized meals per month</li>
              <li>✔ Weekly 1-on-1 consultations</li>
              <li>✔ Advanced health analytics</li>
              <li>✔ Custom meal modifications</li>
              <li>✔ 24/7 nutritionist support</li>
              <li>✔ Family meal planning</li>
              <li>✔ Lifestyle coaching</li>
            </ul>
            <button className="bg-red-500 text-white px-6 py-3 rounded-xl shadow hover:bg-red-600 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ================= Services Section ================= */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Holistic Services</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Every aspect of our service is designed to heal you, support farmers,
          and restore the environment.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          <div className="bg-green-50 p-10 rounded-2xl shadow">
            <h3 className="font-bold text-lg mb-2">🩺 Health Consultation</h3>
            Comprehensive health assessment with certified nutritionists to
            create your personalized healin plan.
            <ul className="list-disc pl-10 text-gray-600 space-y-1 margin-top-2">
              <li>60-minute consultation</li>
              <li>Health history analysis</li>
              <li>Custom meal planning</li>
              <li>Follow-up support</li>
            </ul>
          </div>
          <div className="bg-green-50 p-10 rounded-2xl shadow">
            <h3 className="font-bold text-lg mb-2">🌱 Regenerative Farming</h3>
            Ingredients grown using bio-carbon, vermicompost, and Goshala-based
            inputs for maximum nutrition.
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Soil health restoration</li>
              <li>Chemical-free growing</li>
              <li>Carbon sequestration</li>
              <li>Biodiversity enhancement</li>
            </ul>
          </div>
          <div className="bg-green-50 p-10 rounded-2xl shadow">
            <h3 className="font-bold text-lg mb-2">🍲 Fresh Daily Cooking</h3>
            Comprehensive health assessment with certified nutritionists to
            create your personalized healin plan.
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Same-day preparation</li>
              <li>Local community pods</li>
              <li>Quality ingredients</li>
              <li>Preservative-free</li>
            </ul>
          </div>
          <div className="bg-green-50 p-10 rounded-2xl shadow">
            <h3 className="font-bold text-lg mb-2">🌍 Transparent Impact</h3>
            Comprehensive health assessment with certified nutritionists to
            create your personalized healin plan.
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Payment transparency</li>
              <li>Farmer impact reports</li>
              <li>Environmental metrics</li>
              <li>Community updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= How It Works Section ================= */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          Your journey to healing starts with these simple steps
        </p>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              num: 1,
              title: "Health Consultation",
              desc: "Book a consultation with our certified nutritionists",
            },
            {
              num: 2,
              title: "Personalized Plan",
              desc: "Receive your custom meal plan based on your health needs",
            },
            {
              num: 3,
              title: "Fresh Meals",
              desc: "Get fresh meals prepared daily in your local community pod",
            },
            {
              num: 4,
              title: "Ongoing Support",
              desc: "Monitor your health improvements with ongoing support",
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold mb-4">
                {step.num}
              </div>
              <h4 className="font-bold text-lg mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Healing Stories ================= */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-4">Healing Stories</h2>
        <p className="text-lg text-gray-600 mb-12">
          Real results from real people who chose to heal holistically
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-green-50 p-6 rounded-2xl shadow text-left">
            <p className="text-yellow-500 text-2xl mb-2">★★★★★</p>
            <p className="text-gray-700 italic mb-4">
              "After 3 months with Kitchen Cure Foods, my diabetes is under
              control and I have more energy than I’ve had in years. The
              personalized meals made all the difference."
            </p>
            <p className="font-semibold">
              RS <span className="text-gray-500">– Rajesh S., Bangalore</span>
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl shadow text-left">
            <p className="text-yellow-500 text-2xl mb-2">★★★★★</p>
            <p className="text-gray-700 italic mb-4">
              "The transparency in their process and the quality of ingredients
              is unmatched. I can taste the difference and feel the healing in
              every meal."
            </p>
            <p className="font-semibold">
              PM <span className="text-gray-500">– Priya M., Mumbai</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
