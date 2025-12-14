import React, { useEffect } from 'react';
import Banner from './Banner';

const Home = () => {
     useEffect(() => {
    document.title = "NestCloth";
  }, []);
  const steps = [
    {
      title: "Place Your Order",
      description: "Select the products you want and submit your order through our system."
    },
    {
      title: "Production Process",
      description: "Our team cuts, sews, and finishes the garments as per your order details."
    },
    {
      title: "Quality Check",
      description: "Every product goes through a strict quality check before shipment."
    },
    {
      title: "Delivery",
      description: "Your order is packed and delivered to your doorstep on time."
    }
  ];
    return (
        <div>
            <h2 className='section-title'>Streamline Your Production Workflow</h2>
            <Banner />

            <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 mb-4 text-xl font-bold">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-base leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
        </div>
    );
};

export default Home;