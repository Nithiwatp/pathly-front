'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { mbtiQuestions } from '@/lib/mbti-questions';

export default function Assessment() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = (currentQuestion / mbtiQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
    
    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const result = calculateMBTI(answers);
      router.push(`/result?type=${result}`);
    }
  };

  const calculateMBTI = (answers: Record<number, string>): string => {
    // Simplified calculation for demo
    const traits = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    Object.values(answers).forEach((answer, index) => {
      if (index % 4 === 0) answer === 'a' ? traits.E++ : traits.I++;
      if (index % 4 === 1) answer === 'a' ? traits.S++ : traits.N++;
      if (index % 4 === 2) answer === 'a' ? traits.T++ : traits.F++;
      if (index % 4 === 3) answer === 'a' ? traits.J++ : traits.P++;
    });

    return `${traits.E > traits.I ? 'E' : 'I'}${traits.S > traits.N ? 'S' : 'N'}${traits.T > traits.F ? 'T' : 'F'}${traits.J > traits.P ? 'J' : 'P'}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Question {currentQuestion + 1} of {mbtiQuestions.length}</CardTitle>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-xl font-medium">{mbtiQuestions[currentQuestion].question}</h2>
          <RadioGroup onValueChange={handleAnswer} className="space-y-4">
            {mbtiQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(prev => prev - 1);
              }
            }}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (!answers[currentQuestion]) {
                toast.error('Please select an answer before continuing');
                return;
              }
              if (currentQuestion < mbtiQuestions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
              }
            }}
            disabled={currentQuestion === mbtiQuestions.length - 1}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}