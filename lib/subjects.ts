import {
  CalculatorOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

export interface Subtopic {
  id: string;
  title: string;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
}

export const subjects: Subject[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Explore numbers, patterns, and problem-solving",
    icon: "Calculator",
    topics: [
      {
        id: "algebra",
        title: "Algebra",
        description: "Master equations and variables",
        subtopics: [
          {
            id: "linear-equations",
            title: "Linear Equations",
            description: "Solve first-degree equations with one variable",
          },
          {
            id: "quadratic-equations",
            title: "Quadratic Equations",
            description: "Work with second-degree polynomial equations",
          },
        ],
      },
      {
        id: "geometry",
        title: "Geometry",
        description: "Study shapes, sizes, and spatial relationships",
        subtopics: [
          {
            id: "triangles",
            title: "Triangles",
            description:
              "Learn about different types of triangles and their properties",
          },
          {
            id: "circles",
            title: "Circles",
            description:
              "Explore circumference, area, and properties of circles",
          },
        ],
      },
    ],
  },
  {
    id: "science",
    title: "Science",
    description: "Discover the natural world through experimentation",
    icon: "Experiment",
    topics: [
      {
        id: "physics",
        title: "Physics",
        description: "Study matter, energy, and their interactions",
        subtopics: [
          {
            id: "mechanics",
            title: "Mechanics",
            description: "Learn about forces, motion, and energy",
          },
          {
            id: "waves",
            title: "Waves",
            description: "Explore sound, light, and wave phenomena",
          },
        ],
      },
      {
        id: "chemistry",
        title: "Chemistry",
        description: "Understand matter and chemical reactions",
        subtopics: [
          {
            id: "atomic-structure",
            title: "Atomic Structure",
            description: "Learn about atoms, elements, and the periodic table",
          },
          {
            id: "chemical-reactions",
            title: "Chemical Reactions",
            description: "Study different types of chemical reactions",
          },
        ],
      },
    ],
  },
  {
    id: "history",
    title: "History",
    description: "Journey through time and human civilization",
    icon: "ClockCircle",
    topics: [
      {
        id: "world-wars",
        title: "World Wars",
        description: "Study the global conflicts that shaped modern history",
        subtopics: [
          {
            id: "ww1",
            title: "World War I",
            description: "Explore the causes and impact of the Great War",
          },
          {
            id: "ww2",
            title: "World War II",
            description: "Learn about the largest conflict in human history",
          },
        ],
      },
      {
        id: "ancient-civilizations",
        title: "Ancient Civilizations",
        description: "Discover the foundations of human society",
        subtopics: [
          {
            id: "egypt",
            title: "Ancient Egypt",
            description: "Study the civilization of the Nile",
          },
          {
            id: "greece",
            title: "Ancient Greece",
            description: "Learn about the birthplace of democracy",
          },
        ],
      },
    ],
  },
];
