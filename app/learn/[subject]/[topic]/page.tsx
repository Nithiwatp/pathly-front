"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { subjects } from "@/lib/subjects";
import { Brain, Clock, ArrowLeft } from "lucide-react";
import { QuizDialog } from "@/components/quiz-dialog";
import { MindMap } from "@/components/mind-map";

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showQuizButton, setShowQuizButton] = useState(false);

  const subject = subjects.find((s) => s.id === params.subject);
  const topic = subject?.topics.find((t) => t.id === params.topic);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuizButton(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!subject || !topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-2xl p-6 mx-4">
          <CardContent className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Topic Not Found
            </h1>
            <p className="text-gray-600">
              The requested topic could not be found.
            </p>
            <Button
              onClick={() => router.push("/learn")}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Topics
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {topic.title}
                </h1>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            </div>
            <MindMap topic={topic} />
          </CardContent>
        </Card>

        {showQuizButton && (
          <div className="flex justify-center">
            <Button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black text-lg px-8 py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
              size="lg"
            >
              <Brain className="w-6 h-6" />
              Take Quiz
            </Button>
          </div>
        )}

        {isQuizOpen && (
          <QuizDialog
            open={isQuizOpen}
            onOpenChange={setIsQuizOpen}
            topic={topic}
            subject={subject}
          />
        )}
      </div>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { subjects } from "@/lib/subjects";
// import { Brain } from "lucide-react";
// import { QuizDialog } from "@/components/quiz-dialog";
// import { MindMap } from "@/components/mind-map";

// export default function StudyPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [isQuizOpen, setIsQuizOpen] = useState(false);
//   const [showQuizButton, setShowQuizButton] = useState(false);

//   const subject = subjects.find((s) => s.id === params.subject);
//   const topic = subject?.topics.find((t) => t.id === params.topic);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowQuizButton(true);
//     }, 5000); // 5 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   if (!subject || !topic) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen p-4">
//         <Card className="w-full max-w-md">
//           <CardContent className="flex flex-col items-center p-6 space-y-4">
//             <h1 className="text-2xl font-bold">Topic Not Found</h1>
//             <p className="text-center text-gray-600">
//               The requested topic could not be found.
//             </p>
//             <Button onClick={() => router.push("/learn")}>
//               Return to Topics
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="w-full">
//         <CardContent className="p-6 relative">
//           <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
//           <p className="text-gray-600 mb-6">{topic.description}</p>

//           <div className="mt-8">
//             <MindMap topic={topic} />
//           </div>

//           <div className="flex justify-center mt-12">
//             {showQuizButton && (
//               <Button
//                 onClick={() => setIsQuizOpen(true)}
//                 className="gap-3 animate-[shake_0.5s_ease-in-out_1] hover:bg-yellow-400 transition-colors duration-200"
//                 size="lg"
//                 variant="default"
//               >
//                 <Brain className="w-6 h-6" />
//                 <span className="text-lg font-semibold">Take Quiz</span>
//               </Button>
//             )}
//           </div>

//           <style jsx global>{`
//             @keyframes shake {
//               0%,
//               100% {
//                 transform: translateX(0);
//               }
//               25% {
//                 transform: translateX(-5px);
//               }
//               50% {
//                 transform: translateX(5px);
//               }
//               75% {
//                 transform: translateX(-5px);
//               }
//             }
//           `}</style>

//           {isQuizOpen && (
//             <QuizDialog
//               open={isQuizOpen}
//               onOpenChange={setIsQuizOpen}
//               topic={topic}
//               subject={subject}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
