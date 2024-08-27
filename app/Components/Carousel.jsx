'use client'; 

import React, { useState, useEffect, useRef } from 'react';

const VideoCarousel = ({ videos }) => {
  // State to track the current video index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Ref to store references to each video element
  const videoRefs = useRef(videos.map(() => React.createRef()));
  // Ref to store the timer for video transitions
  const timerRef = useRef(null);

  // Function to play the next video in the carousel
  const playNextVideo = () => {
    // Pause the current video before switching
    videoRefs.current[currentIndex].current.pause();
    // Update the index to the next video, looping back to the first video if at the end
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to start the timer for the next video transition
  const startTimer = () => {
    // Clear any existing timer
    clearTimeout(timerRef.current);
    // Set a new timer to transition to the next video after 5 seconds
    timerRef.current = setTimeout(playNextVideo, 5000);
  };

  // useEffect to handle video playback and transitions when the currentIndex or videos change
  useEffect(() => {
    const playCurrentVideo = () => {
      // Get the current video element and reset its playback
      const video = videoRefs.current[currentIndex].current;
      video.currentTime = 0;
      video.play(); // Start playing the current video
      startTimer(); // Start the timer for the next video
    };

    playCurrentVideo(); // Play the current video when component mounts or currentIndex changes

    return () => clearTimeout(timerRef.current); // Cleanup the timer when the component unmounts or updates
  }, [currentIndex, videos]);

  // Function to handle manual video switching when a video is clicked
  const handleVideoClick = () => {
    playNextVideo();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {videos.map((video, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleVideoClick} // Switch video on click
        >
          <video
            ref={videoRefs.current[index]} // Reference to the video element
            src={video} // Video source
            className="w-full h-full object-cover cursor-pointer" // Styling for the video element
            muted
            playsInline
          />
        </div>
      ))}
    </div>
  );
};

export default VideoCarousel; 
