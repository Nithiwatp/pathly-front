"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Subject, Topic } from "@/lib/subjects";
import { Card } from "@/components/ui/card";
import {
  Brain,
  CheckCircle2,
  ArrowRight,
  RefreshCcw,
  BookOpen,
} from "lucide-react";

interface QuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: Subject;
  topic: Topic;
}

interface Question {
  id: number;
  text: string;
  options: { text: string; correct: boolean }[];
}

export function QuizDialog({
  open,
  onOpenChange,
  subject,
  topic,
}: QuizDialogProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      text: `What is the main focus of ${topic.title}?`,
      options: [
        { text: topic.description, correct: true },
        { text: "Unrelated concept 1", correct: false },
        { text: "Unrelated concept 2", correct: false },
        { text: "Unrelated concept 3", correct: false },
      ],
    },
    ...topic.subtopics.slice(0, 4).map((subtopic, index) => ({
      id: index + 2,
      text: `Which statement best describes ${subtopic.title}?`,
      options: [
        { text: subtopic.description, correct: true },
        { text: "Incorrect description 1", correct: false },
        { text: "Incorrect description 2", correct: false },
        { text: "Incorrect description 3", correct: false },
      ],
    })),
  ];

  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    if (correct) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gray-50 p-0 rounded-xl">
        {!showResults ? (
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-gray-200"
                style={
                  {
                    "--progress-background": "#facc15",
                  } as React.CSSProperties
                }
              />
            </div>

            <div className="py-6">
              <h3 className="text-xl mb-8 text-center text-gray-800 font-semibold">
                {questions[currentQuestion].text}
              </h3>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full py-6 text-lg justify-between group hover:bg-yellow-400 hover:text-black hover:border-yellow-500 transition-all duration-200"
                    onClick={() => handleAnswer(option.correct)}
                  >
                    <span className="flex-1 text-left">{option.text}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 p-8 bg-white rounded-xl">
            <div className="flex justify-center">
              <div className="rounded-full bg-yellow-400 p-4">
                {score === questions.length ? (
                  <CheckCircle2 className="w-12 h-12 text-black" />
                ) : (
                  <Brain className="w-12 h-12 text-black" />
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Quiz Complete!
              </h2>
              <p className="text-xl text-yellow-600 font-semibold">
                You scored {score} out of {questions.length}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600">
                {score === questions.length
                  ? "Perfect score! You've mastered this topic!"
                  : score > questions.length / 2
                  ? "Good job! Keep practicing to improve further."
                  : "Keep studying and try again to improve your score."}
              </p>

              {score === questions.length ? (
                <div className="flex justify-center gap-4">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2"
                    onClick={() => router.push(`/learn`)}
                  >
                    <ArrowRight className="w-5 h-5" />
                    New Topic
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center gap-4">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2"
                    onClick={resetQuiz}
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-yellow-400 text-black hover:bg-yellow-50 font-semibold px-6 py-2 rounded-lg flex items-center gap-2"
                    onClick={() => onOpenChange(false)}
                  >
                    <BookOpen className="w-5 h-5" />
                    Review
                  </Button>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2">
                    Analysis
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Subject, Topic } from "@/lib/subjects";
// import { Card } from "@/components/ui/card";
// import { Brain, CheckCircle2 } from "lucide-react";

// interface QuizDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   subject: Subject;
//   topic: Topic;
// }

// interface Question {
//   id: number;
//   text: string;
//   options: { text: string; correct: boolean }[];
// }

// export function QuizDialog({
//   open,
//   onOpenChange,
//   subject,
//   topic,
// }: QuizDialogProps) {
//   const router = useRouter();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResults, setShowResults] = useState(false);
//   const [answers, setAnswers] = useState<boolean[]>([]);

//   // Generate questions based on the topic
//   const questions: Question[] = [
//     {
//       id: 1,
//       text: `What is the main focus of ${topic.title}?`,
//       options: [
//         { text: topic.description, correct: true },
//         { text: "Unrelated concept 1", correct: false },
//         { text: "Unrelated concept 2", correct: false },
//         { text: "Unrelated concept 3", correct: false },
//       ],
//     },
//     ...topic.subtopics.slice(0, 4).map((subtopic, index) => ({
//       id: index + 2,
//       text: `Which statement best describes ${subtopic.title}?`,
//       options: [
//         { text: subtopic.description, correct: true },
//         { text: "Incorrect description 1", correct: false },
//         { text: "Incorrect description 2", correct: false },
//         { text: "Incorrect description 3", correct: false },
//       ],
//     })),
//   ];

//   const progress = (currentQuestion / questions.length) * 100;

//   const handleAnswer = (correct: boolean) => {
//     const newAnswers = [...answers, correct];
//     setAnswers(newAnswers);

//     if (correct) {
//       setScore(score + 1);
//     }

//     if (currentQuestion === questions.length - 1) {
//       setShowResults(true);
//     } else {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowResults(false);
//     setAnswers([]);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-2xl">
//         {!showResults ? (
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <h2 className="text-2xl font-semibold text-center">
//                 Question {currentQuestion + 1} of {questions.length}
//               </h2>
//               <Progress value={progress} className="h-2" />
//             </div>

//             <div className="py-8">
//               <h3 className="text-xl mb-8 text-center">
//                 {questions[currentQuestion].text}
//               </h3>

//               <div className="space-y-4">
//                 {questions[currentQuestion].options.map((option, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="w-full py-6 text-lg justify-between group hover:border-primary"
//                     onClick={() => handleAnswer(option.correct)}
//                   >
//                     {option.text}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center space-y-6 py-8">
//             <div className="flex justify-center">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <Brain className="w-12 h-12 text-primary" />
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
//               <p className="text-xl text-primary">
//                 You scored {score} out of {questions.length}
//               </p>
//             </div>

//             <div className="space-y-4">
//               <p className="text-muted-foreground">
//                 {score === questions.length
//                   ? "Perfect score! You've mastered this topic!"
//                   : score > questions.length / 2
//                   ? "Good job! Keep practicing to improve further."
//                   : "Keep studying and try again to improve your score."}
//               </p>

//               {score === questions.length ? (
//                 <div className="flex justify-center gap-4">
//                   <Button
//                     variant="chosen"
//                     onClick={() => router.push(`/learn`)}
//                   >
//                     New Topic
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="flex justify-center gap-4">
//                   <Button onClick={resetQuiz}>Try Again</Button>
//                   <Button variant="outline" onClick={() => onOpenChange(false)}>
//                     Review
//                   </Button>
//                   <Button variant="chosen">Analysis</Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
