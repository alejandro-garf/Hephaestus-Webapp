'use client';

import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="about-page bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">About Hephaestus</h1>
        
        {/* Mission Statement Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              At Hephaestus, our mission is to revolutionize river pollution monitoring and management 
              through cutting-edge automation solutions. We are committed to preserving our planet's 
              precious water resources and protecting aquatic ecosystems for future generations. 
              By harnessing the power of advanced sensors and AI-driven analytics, we aim to provide 
              real-time, accurate data on water quality, empowering environmental agencies and local 
              authorities to take swift, informed action against pollution.
            </p>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96">
            <Image 
              src="/api/placeholder/800/600"
              alt="River pollution monitoring"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
        
        {/* About Us Section */}
        <section className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 md:pl-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-semibold mb-6">About Us</h2>
            <p className="text-lg leading-relaxed mb-6">
              Hephaestus was founded in 2020 by a team of environmental scientists, software engineers, 
              and data analysts united by a common goal: to combat river pollution effectively and 
              efficiently. Our diverse expertise allows us to approach the complex challenge of water 
              pollution from multiple angles, resulting in innovative, comprehensive solutions.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our River Pollution Automation Solutions combine state-of-the-art sensor technology with 
              sophisticated machine learning algorithms. This powerful combination enables us to detect 
              and predict pollution trends, identify potential sources of contamination, and provide 
              actionable insights to decision-makers.
            </p>
            <p className="text-lg leading-relaxed">
              We believe that by providing accurate, timely data and analysis, we can foster a more 
              proactive approach to environmental protection. Our goal is not just to monitor pollution, 
              but to prevent it, working hand in hand with local communities, governments, and industries 
              to create cleaner, healthier rivers for all.
            </p>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96">
            <Image 
              src="/api/placeholder/800/600"
              alt="Hephaestus team"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;