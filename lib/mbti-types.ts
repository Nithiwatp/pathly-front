export const mbtiTypes: Record<string, {
  name: string;
  description: string;
  cognitive: string;
  values: string;
  relationships: string;
  career: string;
  strengths: string[];
  growthAreas: string[];
}> = {
  "INFJ": {
    name: "The Counselor",
    description: "Insightful, creative, and driven by deep personal values",
    cognitive: "Combines intuition with deep emotional understanding",
    values: "Personal growth, authenticity, and meaningful connections",
    relationships: "Seeks deep, authentic connections and values harmony",
    career: "Counseling, writing, teaching, or any role helping others grow",
    strengths: [
      "Deep insight into others",
      "Strong creative abilities",
      "Clear sense of purpose",
      "Dedicated to growth"
    ],
    growthAreas: [
      "Can be overly perfectionist",
      "May struggle with criticism",
      "Tendency to overthink",
      "Need to maintain boundaries"
    ]
  },
  "INTJ": {
    name: "The Architect",
    description: "Strategic thinkers with a focus on innovation and improvement",
    cognitive: "Analytical and forward-thinking approach to problem-solving",
    values: "Knowledge, competence, and systematic improvement",
    relationships: "Values intellectual connections and shared goals",
    career: "Strategic planning, research, or system architecture",
    strengths: [
      "Strategic thinking",
      "Independent problem-solving",
      "High standards",
      "Innovation focus"
    ],
    growthAreas: [
      "May appear overly critical",
      "Can be too perfectionistic",
      "Difficulty with emotional expression",
      "May overlook others' feelings"
    ]
  },
  "ENTP": {
    name: "The Innovator",
    description: "Quick-thinking innovators who love intellectual challenges",
    cognitive: "Pattern recognition and creative problem-solving",
    values: "Innovation, knowledge, and intellectual growth",
    relationships: "Enjoys debate and intellectual discourse",
    career: "Entrepreneurship, consulting, or creative direction",
    strengths: [
      "Creative problem-solving",
      "Quick thinking",
      "Adaptability",
      "Strong debating skills"
    ],
    growthAreas: [
      "May leave projects unfinished",
      "Can be argumentative",
      "Difficulty with routine",
      "May overlook details"
    ]
  }
};