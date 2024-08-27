'use client'; 

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const router = useRouter();

  //Sign in function
  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push('/Dashboard'); //Reroutes user to dashboard after sign in
    } catch (error) {
      console.log(error);
    }
  };

  //Sign out function
  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/'); //reroutes user to homepage after sign out
    } catch (error) {
      console.log(error);
    }
  };

  //Navbar layout & components
  return (
    <div className="navbar flex justify-between items-center bg-gradient-to-b from-black to-gray-800 text-white">
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
      <div className="flex space-x-4">
        {!user ? (
          //Login and Sign up function (same thing)
          <>
            <li onClick={handleSignIn} className="p-2 cursor-pointer">Login</li> 
            <li onClick={handleSignIn} className="p-2 cursor-pointer">Sign Up</li>
          </>
        ) : (
          //Sign out function that only shows up once signed in
          <li className="cursor-pointer p-2" onClick={handleSignOut}>Sign Out</li>
        )}
      </div>
    </div>
  );
};

export default Navbar;