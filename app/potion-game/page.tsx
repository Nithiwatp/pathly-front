"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RecipeBook } from "@/components/recipe-book";
import { PotionMission } from "@/components/potion-mission";
import { Beaker, Sparkles, XCircle } from "lucide-react";

type Ingredient = "A" | "B" | "C" | "D";
type PotionResult = {
  ingredients: [Ingredient, Ingredient];
  result: string;
  color: string;
  emoji: string;
  isWrongCombination?: boolean;
};

type InteractionType = "MIXED_FIRST" | "BOOK_FIRST" | null;

type TypeCount = {
  S: number;
  N: number;
  A: number;
  R: number;
  V: number;
  T: number;
  C: number;
  I: number;
};

const INITIAL_TYPE_COUNT: TypeCount = {
  S: 0,
  N: 0,
  A: 0,
  R: 0,
  V: 0,
  T: 0,
  C: 0,
  I: 0,
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

const INGREDIENT_DETAILS = {
  A: { name: "Red Crystal", color: "bg-red-200 hover:bg-red-300", emoji: "🔮" },
  B: { name: "Blue Herb", color: "bg-blue-200 hover:bg-blue-300", emoji: "🌿" },
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

export default function PotionGame() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [typeCount, setTypeCount] = useState<TypeCount>(INITIAL_TYPE_COUNT);
  const [dominantType, setDominantType] = useState<string>("");
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [hasOpenedBook, setHasOpenedBook] = useState(false);
  const [hasStartedMixing, setHasStartedMixing] = useState(false);
  const [hasMadeFirstPotion, setHasMadeFirstPotion] = useState(false);
  const [currentPotionColor, setCurrentPotionColor] = useState(
    "from-emerald-200 to-emerald-400"
  );
  const [currentPotion, setCurrentPotion] = useState<PotionResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTempModal, setShowTempModal] = useState(false);
  const [tempPotion, setTempPotion] = useState<PotionResult | null>(null);
  const [firstInteraction, setFirstInteraction] =
    useState<InteractionType>(null);

  useEffect(() => {
    if (showTempModal) {
      const timer = setTimeout(() => {
        setShowTempModal(false);
        setSelectedIngredients([]);
        setCurrentPotionColor("from-emerald-200 to-emerald-400");
        setCurrentPotion(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showTempModal]);

  useEffect(() => {
    // Retrieve stored values from localStorage
    const savedTypeCount = localStorage.getItem("typeCount");
    const savedFirstInteraction = localStorage.getItem("firstInteraction");
    const savedHasMadeFirstPotion = localStorage.getItem("hasMadeFirstPotion");
    const savedDominantType = localStorage.getItem("dominantType");

    if (savedTypeCount) {
      const parsedTypeCount = JSON.parse(savedTypeCount);
      console.log("typecount:", parsedTypeCount);
      setTypeCount(parsedTypeCount);
      calculateAndSetDominantType(parsedTypeCount);
    } else {
      localStorage.setItem("typeCount", JSON.stringify(INITIAL_TYPE_COUNT));
    }

    if (savedFirstInteraction) {
      setFirstInteraction(savedFirstInteraction as InteractionType);
    }
    if (savedHasMadeFirstPotion) {
      setHasMadeFirstPotion(true);
    }
    if (savedDominantType) {
      setDominantType(savedDominantType);
    }
  }, []);

  const calculateAndSetDominantType = (counts: TypeCount) => {
    let dominantType = "";
    let maxCount = -1;

    // Find the type with the highest count
    for (const [type, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        dominantType = type;
      }
    }

    // Update the dominantType state and localStorage
    setDominantType(dominantType);
    localStorage.setItem("dominantType", dominantType);

    return dominantType;
  };

  const updateTypeCount = (learningType: "A" | "R") => {
    setTypeCount((prevCount) => {
      const newCount = {
        ...prevCount,
        [learningType]: (prevCount[learningType] || 0) + 1,
      };

      // Store updated counts
      localStorage.setItem("typeCount", JSON.stringify(newCount));

      // Calculate and store new dominant type
      const newDominantType = calculateAndSetDominantType(newCount);

      return newCount;
    });
  };

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (!hasStartedMixing) {
      setHasStartedMixing(true);
    }

    let newIngredients: Ingredient[];
    if (selectedIngredients.length === 2) {
      newIngredients = [ingredient];
    } else {
      newIngredients = [...selectedIngredients, ingredient];
    }
    setSelectedIngredients(newIngredients);

    if (newIngredients.length === 2) {
      const recipe = POTION_RECIPES.find(
        (p) =>
          (p.ingredients[0] === newIngredients[0] &&
            p.ingredients[1] === newIngredients[1]) ||
          (p.ingredients[0] === newIngredients[1] &&
            p.ingredients[1] === newIngredients[0])
      );

      // Track first complete potion creation if book hasn't been opened
      if (!hasMadeFirstPotion && !hasOpenedBook && !firstInteraction) {
        setFirstInteraction("MIXED_FIRST");
        localStorage.setItem("firstInteraction", "MIXED_FIRST");
        setHasMadeFirstPotion(true);
        localStorage.setItem("hasMadeFirstPotion", "true");
      }

      if (recipe) {
        setCurrentPotionColor(recipe.color);
        setCurrentPotion(recipe);

        if (recipe.result === "Health Potion") {
          const learningType = firstInteraction === "BOOK_FIRST" ? "R" : "A";
          updateTypeCount(learningType);
          setShowSuccess(true);
          localStorage.setItem("potionGameComplete", "true");
        } else {
          setTempPotion({
            ...recipe,
            isWrongCombination: true,
          });
          setShowTempModal(true);
        }
      } else {
        const failedPotion = {
          ingredients: newIngredients as [Ingredient, Ingredient],
          result: "Failed Mixture",
          color: "from-gray-400 to-gray-600",
          emoji: "💨",
          isWrongCombination: true,
        };
        setTempPotion(failedPotion);
        setShowTempModal(true);
      }
    }
  };

  const handleBookClick = () => {
    if (!hasMadeFirstPotion && !firstInteraction) {
      setFirstInteraction("BOOK_FIRST");
      localStorage.setItem("firstInteraction", "BOOK_FIRST");
    }

    if (!hasOpenedBook) {
      setHasOpenedBook(true);
    }
    setIsBookOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-xl mx-auto mb-12 flex items-center justify-center gap-6">
          <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0">
            <Beaker className="w-12 h-12 text-yellow-800" />
          </div>
          <h1 className="text-4xl font-bold">Pathly Potions</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex flex-col items-center">
            <PotionMission />
          </div>
          <div className="md:w-1/2">
            <Card className="p-8 rounded-3xl shadow-xl bg-white">
              <CardContent className="space-y-8">
                <div className="flex justify-center">
                  <div
                    className={`w-64 h-64 rounded-full bg-gradient-to-b ${currentPotionColor} shadow-lg flex items-center justify-center relative overflow-hidden transition-all duration-500`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <Beaker className="w-32 h-32 text-white/80" />
                      {currentPotion && (
                        <div className="text-center bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm">
                          <p className="font-medium text-white text-xl">
                            {currentPotion.emoji} {currentPotion.result}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(Object.keys(INGREDIENT_DETAILS) as Ingredient[]).map(
                    (ingredient) => (
                      <Button
                        key={ingredient}
                        onClick={() => handleIngredientClick(ingredient)}
                        className={`h-24 rounded-2xl text-lg font-medium transition-all duration-300 
                        ${INGREDIENT_DETAILS[ingredient].color}
                        ${
                          selectedIngredients.includes(ingredient)
                            ? "ring-4 ring-yellow-400"
                            : ""
                        }
                        transform hover:scale-105`}
                        variant="outline"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">
                            {INGREDIENT_DETAILS[ingredient].emoji}
                          </span>
                          <span>{INGREDIENT_DETAILS[ingredient].name}</span>
                        </div>
                      </Button>
                    )
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleBookClick}
                    className="px-8 py-6 text-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-2xl transform transition-all duration-300 hover:scale-105"
                  >
                    📖 Discover Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Modal */}
        <Dialog open={showSuccess}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center space-y-4 p-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center animate-bounce">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-green-600 flex items-center gap-2">
                🎉 Success!
              </DialogTitle>
              <p className="text-center text-lg">
                You created a Health Potion!
              </p>
              <DialogFooter>
                <Link href="/result">
                  <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:opacity-90">
                    See the result
                  </Button>
                </Link>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Temporary Modal */}
        <Dialog open={showTempModal}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center space-y-4 p-4">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-b ${
                  tempPotion?.color || "from-gray-400 to-gray-600"
                } 
                flex items-center justify-center ${
                  tempPotion?.result === "Failed Mixture"
                    ? "animate-pulse"
                    : "animate-bounce"
                }`}
              >
                <Beaker className="w-12 h-12 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {tempPotion?.emoji} {tempPotion?.result}
              </DialogTitle>
              <div className="text-center space-y-2">
                <p className="text-lg">
                  {tempPotion?.result === "Failed Mixture"
                    ? "The potion fizzles and fails."
                    : `You created a ${tempPotion?.result}!`}
                </p>
                {tempPotion?.isWrongCombination && (
                  <>
                    <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg mt-2">
                      <XCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">
                        Remember, make a Health Potion 💚
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Hint: Check the recipe book for the correct ingredients!
                    </p>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <RecipeBook isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
      </div>
    </div>
  );
}
