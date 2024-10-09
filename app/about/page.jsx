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
            At Hephaestus, our mission is to revolutionize river pollution management 
            through innovative, real-time monitoring solutions. We are dedicated to preserving 
            our planet’s waterways by preventing plastic waste from entering our oceans and 
            protecting aquatic ecosystems for future generations. Utilizing battery-powered sensors 
            and a user-friendly dashboard, we offer accurate, real-time data on trash levels 
            in aquatic bins, empowering environmental organizations and municipalities to 
            make informed, efficient decisions in waste collection. With Hephaestus, we are 
            driving a smarter, more sustainable approach to combating river pollution.
            </p>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96">
            <Image 
              src="/maxresdefault.png"
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
            Hephaestus was founded by a team of Engineering and Computer Science students united by a 
            shared mission to combat river pollution at its source. With expertise ranging from hardware 
            design to software development, our team brings a multi-disciplinary approach to tackling 
            the global challenge of water pollution. Our innovative bin monitoring system utilizes 
            battery-powered sensors and real-time data monitoring to provide precise, actionable 
            insights for environmental agencies and municipalities.
            </p>
            <p className="text-lg leading-relaxed mb-6">
            Hephaestus enables environmental companies to optimize waste collection and significantly reduce 
            operational costs. With real-time data on trash levels, maintenance teams can eliminate unnecessary 
            trips to empty bins that aren’t full, saving time and resources. Furthermore, the system provides 
            a plethora of actionable data, helping companies identify high-pollution areas and refine their 
            resource allocation. This data-driven approach not only cuts down on operational inefficiencies 
            but also equips decision-makers with the insights they need to proactively tackle pollution at its source.
            </p>
            <p className="text-lg leading-relaxed">
            Our mission goes beyond monitoring—it's about driving real impact through automation, helping local communities, 
            governments, and industries prevent pollution before it reaches our oceans. Hephaestus strives to create cleaner, 
            healthier waterways for future generations by delivering practical, cost-effective solutions to protect our 
            environment while empowering companies to operate more efficiently.
            </p>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96">
            <Image 
              src="/BrettBaunton_NooksackRiver_CleanWater.png"
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