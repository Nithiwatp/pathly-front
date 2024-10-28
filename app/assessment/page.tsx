"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  questions,
  calculateType,
  calculateElement,
} from "@/lib/mbti-questions";
import { ArrowRight } from "lucide-react";

export default function Assessment() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    const savedQuestion = localStorage.getItem("currentQuestion");
    if (savedQuestion) {
      setCurrentQuestion(parseInt(savedQuestion));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion.toString());
  }, [currentQuestion]);

  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion === questions.length - 1) {
      const typeCount = calculateElement(newAnswers);
      localStorage.setItem("typeCount", JSON.stringify(typeCount));
      router.push(`/potion-game`);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-xl mx-auto border-4 border-black rounded-lg">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2
                  className="text-xl font-bold text-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="w-full h-4 border-2 border-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-300 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="py-6">
                <h3
                  className="text-lg mb-8 text-center font-medium px-4"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  {questions[currentQuestion].text}
                </h3>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full py-6 px-6 text-base justify-between group
                               border-4 border-black rounded-lg
                               bg-white hover:bg-yellow-100
                               transform transition-all duration-200
                               hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      style={{ fontFamily: "Comic Sans MS, cursive" }}
                      onClick={() => handleAnswer(option.value)}
                    >
                      <span>{option.text}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
