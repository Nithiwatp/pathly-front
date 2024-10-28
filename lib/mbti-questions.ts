export const questions = [
  {
    id: 1,
    text: "You’re picking your dream destination. What sounds most appealing?",
    options: [
      {
        text: "Jumping right in to explore the sights and sounds.",
        value: "A",
      },
      { text: "Taking it in slowly and observing the details", value: "R" },
    ],
  },
  {
    id: 2,
    text: "The plane shakes with turbulence. How do you respond?",
    options: [
      { text: "Prepare for what’s next and hold tight", value: "A" },
      { text: "Stay calm, assessing what’s happening", value: "R" },
    ],
  },
  {
    id: 3,
    text: "You’ve landed on a deserted island. What’s your first instinct?",
    options: [
      { text: "Start searching for essentials right away", value: "A" },
      { text: "Look around and take in the surroundings", value: "R" },
    ],
  },
  {
    id: 4,
    text: "You find an old cottage on the island. What do you do first?",
    options: [
      { text: "Go in and check it out immediately", value: "A" },
      { text: "Pause to consider what this place might hold", value: "R" },
    ],
  },
];

export const learningElements = {
  S: {
    title: "Sensing",
    description:
      "Prefers concrete, detailed information, facts, and sensory data",
    traits: [
      "Detail-oriented",
      "Fact-focused",
      "Practical",
      "Experience-based",
    ],
  },
  N: {
    title: "Intuition",
    description:
      "Prefers abstract, theoretical concepts, patterns, and possibilities",
    traits: [
      "Pattern-seeking",
      "Big-picture oriented",
      "Theory-focused",
      "Future-oriented",
    ],
  },

  A: {
    title: "Active",
    description:
      "Prefers hands-on learning, experimentation, and active engagement",
    traits: ["Experimental", "Learning by doing", "Interactive", "Energetic"],
  },
  R: {
    title: "Reflective",
    description:
      "Prefers thinking, reflecting, and absorbing information before acting",
    traits: ["Contemplative", "Analytical", "Thoughtful", "Observant"],
  },

  V: {
    title: "Visual",
    description:
      "Prefers learning through images, diagrams, charts, and spatial understanding",
    traits: [
      "Visually oriented",
      "Spatial awareness",
      "Graph/chart preference",
      "Image-based memory",
    ],
  },
  T: {
    title: "Verbal",
    description: "Prefers learning through written and spoken words",
    traits: [
      "Text-oriented",
      "Auditory learning",
      "Reading preference",
      "Discussion-based",
    ],
  },

  C: {
    title: "Collaborative",
    description: "Prefers group learning, discussions, and teamwork",
    traits: [
      "Team-oriented",
      "Discussion-based",
      "Socially engaged",
      "Group synergy",
    ],
  },
  I: {
    title: "Independent",
    description:
      "Prefers working alone, self-paced study, and individual projects",
    traits: ["Self-directed", "Autonomous", "Individual focus", "Self-paced"],
  },
};

export const learningStyles = {
  SAVC: {
    title: "Hands-On Collaborator",
    description:
      "Prefers hands-on, visual learning in group settings with detailed and concrete information.",
    traits: ["Practical", "Engaging", "Team-oriented", "Detail-focused"],
  },
  SAVI: {
    title: "Independent Doer",
    description:
      "Learns best with hands-on, visual methods but prefers working alone with factual data.",
    traits: ["Focused", "Self-reliant", "Observant", "Precise"],
  },
  SATC: {
    title: "Verbal Collaborator",
    description:
      "Engages with learning actively through discussions, with a focus on concrete, verbal material.",
    traits: ["Communicative", "Enthusiastic", "Pragmatic", "Group-oriented"],
  },
  SATI: {
    title: "Solo Listener",
    description:
      "Active learner who prefers reading or listening to concrete information independently.",
    traits: ["Independent", "Curious", "Analytical", "Resourceful"],
  },
  SRVC: {
    title: "Reflective Visual Team Player",
    description:
      "Reflective learner who absorbs detailed visual information best when working with others.",
    traits: ["Patient", "Collaborative", "Thoughtful", "Detail-oriented"],
  },
  SRVI: {
    title: "Visual Analyzer",
    description:
      "Prefers reflecting on visual details and working alone to absorb concrete data.",
    traits: ["Introspective", "Detail-focused", "Methodical", "Independent"],
  },
  SRTC: {
    title: "Verbal Reflector",
    description:
      "Learns best by reflecting on written or spoken factual material in group settings.",
    traits: ["Analytical", "Supportive", "Reliable", "Reflective"],
  },
  SRTI: {
    title: "Independent Reflector",
    description:
      "Absorbs information by reflecting on concrete, verbal material alone.",
    traits: ["Introspective", "Logical", "Focused", "Self-driven"],
  },
  NAVC: {
    title: "Collaborative Visual Explorer",
    description:
      "Thrives on active learning through visuals and abstract concepts, enjoys working with others.",
    traits: ["Creative", "Innovative", "Adaptable", "Team-oriented"],
  },
  NAVI: {
    title: "Independent Visual Innovator",
    description:
      "Prefers exploring abstract concepts actively using visual aids, while working independently.",
    traits: ["Inventive", "Resourceful", "Autonomous", "Curious"],
  },
  NATC: {
    title: "Discussion Leader",
    description:
      "Active learner who enjoys discussions about abstract concepts in a collaborative environment.",
    traits: ["Engaging", "Insightful", "Open-minded", "Energetic"],
  },
  NATI: {
    title: "Abstract Independent Thinker",
    description:
      "Prefers to work independently, engaging with abstract concepts through reading and discussions.",
    traits: ["Intuitive", "Analytical", "Self-motivated", "Philosophical"],
  },
  NRVC: {
    title: "Reflective Abstract Collaborator",
    description:
      "Reflective learner who prefers abstract, visual information in group environments.",
    traits: ["Thoughtful", "Perceptive", "Supportive", "Creative"],
  },
  NRVI: {
    title: "Abstract Visual Thinker",
    description:
      "Learns by reflecting on abstract visuals alone, connecting patterns and ideas independently.",
    traits: ["Visionary", "Independent", "Curious", "Innovative"],
  },
  NRTC: {
    title: "Collaborative Idea Generator",
    description:
      "Reflects on abstract ideas and enjoys discussing these concepts in a collaborative setting.",
    traits: ["Open-minded", "Insightful", "Supportive", "Philosophical"],
  },
  NRTI: {
    title: "Independent Conceptualizer",
    description:
      "Reflects on abstract, verbal information independently, preferring solo learning.",
    traits: ["Independent", "Analytical", "Intuitive", "Self-reliant"],
  },
};

export const calculateElement = (
  answers: Record<number, string>
): Record<string, number> => {
  let a = 0,
    r = 0;

  Object.values(answers).forEach((answer) => {
    switch (answer) {
      case "A":
        a++;
        break;
      case "R":
        r++;
        break;
    }
  });

  return {
    A: a,
    R: r,
  };
};

export const calculateType = (
  answers: Record<number, string>
): Record<string, number> => {
  let s = 0,
    n = 0,
    a = 0,
    r = 0,
    v = 0,
    t = 0,
    c = 0,
    i = 0;

  Object.values(answers).forEach((answer) => {
    switch (answer) {
      case "S":
        s++;
        break;
      case "N":
        n++;
        break;
      case "A":
        a++;
        break;
      case "R":
        r++;
        break;
      case "V":
        v++;
        break;
      case "T":
        t++;
        break;
      case "C":
        c++;
        break;
      case "I":
        i++;
        break;
    }
  });

  return {
    S: s,
    N: n,
    A: a,
    R: r,
    V: v,
    T: t,
    C: c,
    I: i,
  };

  // return `${s > n ? "S" : "N"}${a > r ? "A" : "R"}${v > t ? "V" : "T"}${
  //   c > i ? "C" : "I"
  // }`;
};
