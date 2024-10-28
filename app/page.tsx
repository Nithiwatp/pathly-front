"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const handleResetAssessment = () => {
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("typeCount");
    localStorage.removeItem("dominantType");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-lg border-4 border-black rounded-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="rounded-full bg-yellow-300 w-24 h-24 flex items-center justify-center border-2 border-black">
                <span className="text-4xl">😎</span>
              </div>
              <div className="space-y-2">
                <h1
                  className="text-4xl font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Pathly
                </h1>
                <div className="w-16 h-1 bg-black mx-auto"></div>
              </div>
              <p
                className="text-lg text-black max-w-sm"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Is studying feeling more like a chore than a journey?
              </p>
              <p
                className="text-lg text-black max-w-sm"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                It could be how you are learning.
              </p>
              <div className="flex flex-col w-full gap-4 pt-4">
                <Link href="/assessment">
                  <Button
                    className="w-full bg-white hover:bg-yellow-100 text-black border-4 border-black rounded-md 
                             font-bold text-lg py-6 transform transition-all duration-200
                             hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                    onClick={handleResetAssessment}
                  >
                    Discover your right path!
                  </Button>
                </Link>
              </div>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                The journey to personalize your learning experience
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
