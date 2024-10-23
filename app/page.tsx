import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl sm:text-4xl mb-2">Discover Your Personality Type</CardTitle>
          <CardDescription className="text-lg">
            Take our comprehensive MBTI® assessment to understand your unique personality traits and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Quick Assessment</h3>
                <p>Complete a series of carefully crafted questions</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Instant Results</h3>
                <p>Get detailed insights about your personality type</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Deep Understanding</h3>
                <p>Learn about your strengths and growth areas</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Personal Growth</h3>
                <p>Get recommendations for personal development</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <Link href="/assessment">
              <Button size="lg" className="text-lg px-8">
                Start Assessment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}