
import React, { useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Features2 from "./Features2";
import Contact from "./Contact";

export function Landing() {
  return (
    <div className="flex flex-col z-10 relative">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Features2/>
      <Contact />
    </div>
  );
}

