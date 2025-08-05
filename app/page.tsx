"use client";
import React from "react";
import HeroSection from "./sections/HeroSection";
import MidPageSection from "./sections/MidPageSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MidPageSection />
    </div>
  );
}
