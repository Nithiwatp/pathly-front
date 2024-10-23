'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { mbtiTypes } from '@/lib/mbti-types';
import { Brain, Heart, Lightbulb, Users } from 'lucide-react';
import { useEffect } from 'react';

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');

  useEffect(() => {
    if (!type || !mbtiTypes[type]) {
      router.push('/');
    }
  }, [type, router]);

  if (!type || !mbtiTypes[type]) {
    return null;
  }

  const personalityType = mbtiTypes[type];

  const traits = [
    {
      icon: Brain,
      title: 'Cognitive Style',
      description: personalityType.cognitive
    },
    {
      icon: Heart,
      title: 'Core Values',
      description: personalityType.values
    },
    {
      icon: Users,
      title: 'Relationships',
      description: personalityType.relationships
    },
    {
      icon: Lightbulb,
      title: 'Career Path',
      description: personalityType.career
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2">{type} - {personalityType.name}</CardTitle>
            <p className="text-xl text-muted-foreground">{personalityType.description}</p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traits.map((trait, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <trait.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{trait.title}</h3>
                    <p className="text-muted-foreground">{trait.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Strengths</h3>
              <ul className="list-disc pl-5 space-y-2">
                {personalityType.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold pt-4">Growth Areas</h3>
              <ul className="list-disc pl-5 space-y-2">
                {personalityType.growthAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Link href="/">
            <Button size="lg">
              Take Test Again
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}