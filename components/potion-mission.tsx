import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, Heart } from "lucide-react";

export function PotionMission() {
  return (
    <div className="max-w-xl mx-auto mb-8">
      <Card className="rounded-3xl shadow-lg border-2 border-green-200">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ScrollText className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold">
                Current Mission
              </CardTitle>
            </div>
            <div className="text-sm font-medium text-green-600 bg-green-100 px-4 py-1 rounded-full">
              Active
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-green-700" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Create a Health Potion</h3>
              <p className="text-gray-600">
                Master the art of healing by discovering the correct combination
                of ingredients to brew a powerful Health Potion. Each attempt
                brings you closer to unlocking this vital knowledge.
              </p>
            </div>
          </div>

          {/* <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Tips for Success:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-lg">🧪</span>
                <span>Experiment with different ingredient combinations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📖</span>
                <span>Consult the recipe book for guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <span>Pay attention to the results of each mixture</span>
              </li>
            </ul>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
