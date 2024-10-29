"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subjects, type Subject, type Topic } from "@/lib/subjects";
import * as AntIcons from "@ant-design/icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type IconType = keyof typeof AntIcons;

const getIconComponent = (iconName: string) => {
  const iconKey = `${iconName}Outlined` as IconType;
  return AntIcons[iconKey] || AntIcons["QuestionCircleOutlined"];
};

export default function LearnPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  useEffect(() => {
    const mbtiType = localStorage.getItem("mbtiType");
    if (!mbtiType) {
      router.push("/");
    }
  }, [router]);

  const durations = [5, 15, 30];

  const handleTrainAI = () => {
    router.push("/train-ai");
  };

  const handleStartLearning = () => {
    if (selectedSubject && selectedTopic) {
      router.push(`/learn/${selectedSubject.id}/${selectedTopic.id}`);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            Choose Your Interest
          </h1>
          <div className="flex items-center gap-4">
            <span
              className="text-gray-600 text-sm"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Learn more about yourself
            </span>
            <Button
              onClick={handleTrainAI}
              className="bg-white hover:bg-yellow-100 text-black border-4 border-black rounded-lg
                       font-bold transform transition-all duration-200
                       hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Discovery
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Subject Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const IconComponent = getIconComponent(subject.icon);
              return (
                <Card
                  key={subject.id}
                  className={cn(
                    "cursor-pointer transition-all hover:-translate-y-1 border-4 border-black rounded-lg",
                    selectedSubject?.id === subject.id
                      ? "bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  )}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setSelectedTopic(null);
                    setSelectedDuration(null);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* <div className="rounded-full bg-yellow-300 w-16 h-16 flex items-center justify-center border-2 border-black">
                        <IconComponent />
                      </div> */}
                      <div>
                        <h2
                          className="text-xl font-bold"
                          style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                          {subject.title}
                        </h2>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                          {subject.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Topic Selection */}
          {selectedSubject && (
            <div className="mt-4">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Select a Topic
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedSubject.topics.map((topic) => (
                  <Card
                    key={topic.id}
                    className={cn(
                      "cursor-pointer transition-all hover:-translate-y-1 border-4 border-black rounded-lg",
                      selectedTopic?.id === topic.id
                        ? "bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    )}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <CardContent className="p-6">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                      >
                        {topic.title}
                      </h3>
                      <p
                        className="text-sm text-gray-600 mb-4"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                      >
                        {topic.description}
                      </p>
                      <div className="space-y-2">
                        {topic.subtopics.map((subtopic) => (
                          <div
                            key={subtopic.id}
                            className="p-3 bg-yellow-50 rounded-lg border-2 border-black"
                          >
                            <h4
                              className="font-bold"
                              style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                              {subtopic.title}
                            </h4>
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                              {subtopic.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Duration Selection */}
          {selectedTopic && (
            <div className="mt-4">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Select Duration
              </h2>
              <div className="flex gap-4 justify-center">
                {durations.map((duration) => (
                  <Button
                    key={duration}
                    variant="chosen"
                    onClick={() => setSelectedDuration(duration)}
                    className={cn(
                      "w-24 transition-all hover:-translate-y-1 border-4 border-black rounded-lg font-bold",
                      selectedDuration === duration
                        ? "bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white hover:bg-yellow-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    )}
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    {duration} mins
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Start Learning Button */}
          {selectedTopic && selectedDuration && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleStartLearning}
                className="bg-white hover:bg-yellow-100 text-black border-4 border-black rounded-lg
                         font-bold text-lg px-8 py-6 transform transition-all duration-200
                         hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Start Learning
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { subjects, type Subject, type Topic } from "@/lib/subjects";
// import * as AntIcons from "@ant-design/icons";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";

// // Define a type for the Ant Design icon components
// type IconType = keyof typeof AntIcons;

// const getIconComponent = (iconName: string) => {
//   const iconKey = `${iconName}Outlined` as IconType;
//   return AntIcons[iconKey] || AntIcons["QuestionCircleOutlined"];
// };

// export default function LearnPage() {
//   const router = useRouter();
//   const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
//   const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

//   useEffect(() => {
//     const mbtiType = localStorage.getItem("mbtiType");
//     if (!mbtiType) {
//       router.push("/");
//     }
//   }, [router]);

//   const durations = [5, 15, 30]; // Available durations

//   const handleTrainAI = () => {
//     router.push("/train-ai");
//   };

//   const handleStartLearning = () => {
//     if (selectedSubject && selectedTopic) {
//       router.push(`/learn/${selectedSubject.id}/${selectedTopic.id}`);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex justify-between items-center mb-12">
//           <h1 className="text-4xl font-bold">Choose Your Interest</h1>
//           <div className="flex items-center gap-4">
//             <span className="text-muted-foreground text-sm">
//               Learn more about yourself
//             </span>
//             <Button
//               variant="chosen"
//               className={`flex items-center gap-2 w-24 transition-all hover:scale-105 hover:shadow-lg`}
//               onClick={handleTrainAI}
//             >
//               Discovery
//             </Button>
//           </div>
//         </div>

//         <div className="grid gap-8">
//           {/* Subject Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {subjects.map((subject) => {
//               const IconComponent = getIconComponent(subject.icon);
//               return (
//                 <Card
//                   key={subject.id}
//                   className={cn(
//                     "cursor-pointer transition-all hover:scale-105 hover:shadow-lg",
//                     selectedSubject?.id === subject.id &&
//                       "ring-2 ring-yellow-500"
//                   )}
//                   onClick={() => {
//                     setSelectedSubject(subject);
//                     setSelectedTopic(null);
//                     setSelectedDuration(null);
//                   }}
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-4">
//                       <div
//                         className="flex justify-center items-center rounded-full bg-primary/10"
//                         style={{
//                           padding: "16px",
//                           width: "64px",
//                           height: "64px",
//                         }}
//                       >
//                         <IconComponent className="w-15 h-15 text-primary" />
//                       </div>
//                       <div>
//                         <h2 className="text-xl font-semibold">
//                           {subject.title}
//                         </h2>
//                         <p className="text-sm text-muted-foreground">
//                           {subject.description}
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Topic Selection */}
//           {selectedSubject && (
//             <div className="mt-8">
//               <h2 className="text-2xl font-semibold mb-6">Select a Topic</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {selectedSubject.topics.map((topic) => (
//                   <Card
//                     key={topic.id}
//                     className={cn(
//                       "cursor-pointer transition-all hover:scale-105 hover:shadow-lg",
//                       selectedTopic?.id === topic.id &&
//                         "ring-2 ring-2 ring-yellow-500"
//                     )}
//                     onClick={() => setSelectedTopic(topic)}
//                   >
//                     <CardContent className="p-6">
//                       <h3 className="text-xl font-semibold mb-2">
//                         {topic.title}
//                       </h3>
//                       <p className="text-sm text-muted-foreground mb-4">
//                         {topic.description}
//                       </p>
//                       <div className="space-y-2">
//                         {topic.subtopics.map((subtopic) => (
//                           <div
//                             key={subtopic.id}
//                             className="p-3 bg-secondary/50 rounded-lg"
//                           >
//                             <h4 className="font-medium">{subtopic.title}</h4>
//                             <p className="text-sm text-muted-foreground">
//                               {subtopic.description}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Duration Selection */}
//           {selectedTopic && (
//             <div className="mt-8">
//               <h2 className="text-2xl font-semibold mb-6">Select Duration</h2>
//               <div className="flex gap-4 justify-center">
//                 {durations.map((duration) => (
//                   <Button
//                     key={duration}
//                     variant={
//                       selectedDuration === duration ? "chosen" : "secondary"
//                     }
//                     size="lg"
//                     onClick={() => setSelectedDuration(duration)}
//                     className={cn(
//                       "w-24 transition-all hover:scale-105 hover:shadow-lg",
//                       selectedDuration === duration && "ring-2 ring-primary"
//                     )}
//                   >
//                     {duration} mins
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Start Learning Button */}
//           {selectedTopic && selectedDuration && (
//             <div className="mt-8 flex justify-center">
//               <Button
//                 size="lg"
//                 className="text-lg px-8 transition-all hover:scale-105 hover:shadow-lg"
//                 onClick={handleStartLearning}
//               >
//                 Start Learning
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
