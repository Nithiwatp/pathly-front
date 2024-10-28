"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { learningElements } from "@/lib/mbti-questions"; // Assuming this contains learning element data
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Result() {
  const [dominantType, setDominantType] = useState<string>("");

  // Retrieve the personality based on the dominantType from learningElements
  const personality = learningElements[
    dominantType as keyof typeof learningElements
  ] || {
    title: "Unknown Type",
    description: "No description available.",
    traits: [],
  };

  useEffect(() => {
    const savedDominantType = localStorage.getItem("dominantType");
    if (savedDominantType) {
      setDominantType(savedDominantType);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto border-4 border-black">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                CONGRATS!
              </h1>
              <div className="flex justify-center">
                <div className="rounded-full bg-yellow-300 p-6 w-24 h-24 flex items-center justify-center border-2 border-black">
                  <span className="text-3xl">😎</span>
                </div>
              </div>

              {/* Display the dominant type and its title */}
              <div className="space-y-2">
                <h1
                  className="text-4xl font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  {dominantType || "Your Type"}
                </h1>
                <div className="border-t-2 border-b-2 border-black py-2 my-4">
                  <p className="font-semibold">{personality.title}</p>
                </div>
              </div>

              {/* Description text */}
              <p
                className="text-lg"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {personality.description}
              </p>

              {/* Traits section */}
              <div className="flex flex-wrap justify-center gap-2">
                {personality.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 rounded-full border-2 border-black text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Sign up button */}
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Wanna know more?
              </p>
              <div className="pt-6">
                <Link href="/learn">
                  <Button
                    className="w-full bg-white hover:bg-yellow-100 text-black border-4 border-black rounded-md font-bold text-lg transform transition hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    START LEARNING!
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
