import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Beaker, X } from "lucide-react";

type Ingredient = "A" | "B" | "C" | "D";

type PotionResult = {
  ingredients: [Ingredient, Ingredient];
  result: string;
  color: string;
  emoji: string;
};

type IngredientDetail = {
  name: string;
  color: string;
  emoji: string;
};

type RecipeBookProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RecipeBook({ isOpen, onClose }: RecipeBookProps) {
  const INGREDIENT_DETAILS: Record<Ingredient, IngredientDetail> = {
    A: {
      name: "Red Crystal",
      color: "bg-red-200 hover:bg-red-300",
      emoji: "🔮",
    },
    B: {
      name: "Blue Herb",
      color: "bg-blue-200 hover:bg-blue-300",
      emoji: "🌿",
    },
    C: {
      name: "Green Mushroom",
      color: "bg-green-200 hover:bg-green-300",
      emoji: "🍄",
    },
    D: {
      name: "Purple Flower",
      color: "bg-purple-200 hover:bg-purple-300",
      emoji: "🌸",
    },
  };

  const POTION_RECIPES: PotionResult[] = [
    {
      ingredients: ["A", "B"],
      result: "Poison Potion",
      color: "from-purple-400 to-purple-600",
      emoji: "☠️",
    },
    {
      ingredients: ["B", "C"],
      result: "Health Potion",
      color: "from-green-400 to-green-600",
      emoji: "💚",
    },
    {
      ingredients: ["C", "D"],
      result: "Sleep Potion",
      color: "from-blue-400 to-blue-600",
      emoji: "💤",
    },
    {
      ingredients: ["A", "D"],
      result: "Invisibility Potion",
      color: "from-gray-400 to-gray-600",
      emoji: "👻",
    },
    {
      ingredients: ["A", "C"],
      result: "Strength Potion",
      color: "from-red-400 to-red-600",
      emoji: "💪",
    },
    {
      ingredients: ["B", "D"],
      result: "Speed Potion",
      color: "from-yellow-400 to-yellow-600",
      emoji: "⚡",
    },
  ];

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-800">
              📖 Magic Recipe Book
            </h2>
            <p className="text-gray-600 mt-2">
              Ancient secrets of potion-making
            </p>
          </div>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {POTION_RECIPES.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-b ${recipe.color} flex items-center justify-center`}
                    >
                      <span className="text-2xl">{recipe.emoji}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{recipe.result}</h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600 font-medium">
                      Ingredients needed:
                    </p>
                    <div className="flex gap-4">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 ${INGREDIENT_DETAILS[ingredient].color} rounded-lg p-3 text-center transition-transform hover:scale-105`}
                        >
                          <div className="text-2xl mb-1">
                            {INGREDIENT_DETAILS[ingredient].emoji}
                          </div>
                          <div className="text-sm font-medium">
                            {INGREDIENT_DETAILS[ingredient].name}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 text-sm text-gray-500 italic text-center">
                      ✨ Mix these ingredients in your cauldron ✨
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="text-center mt-6 text-sm text-gray-500">
            Tip: Some ingredients may create unexpected results when mixed
            incorrectly!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeBook;
