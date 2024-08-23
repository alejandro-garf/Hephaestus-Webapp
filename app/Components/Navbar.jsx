'use client'; 

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to handle sign-in using Google authentication
  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push('/Dashboard'); // Redirect to Dashboard after successful sign-in
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/'); // Redirect to home page after sign-out
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to check authentication status and update loading state
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  // render the navbar
  return (
    <div className="navbar flex justify-between items-center">
      <ul className="flex space-x-4">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        {user && (
          <li className="p-2 cursor-pointer">
            <Link href="/Dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
      {!loading && (
        <div className="flex space-x-4">
          {!user ? (
            <>
              <li onClick={handleSignIn} className="p-2 cursor-pointer">Login</li>
              <li onClick={handleSignIn} className="p-2 cursor-pointer">Sign Up</li>
            </>
          ) : (
            <li className="cursor-pointer" onClick={handleSignOut}>Sign Out</li>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;