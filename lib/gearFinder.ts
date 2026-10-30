import { unifiedCatalog, type UnifiedProduct } from "@/lib/catalog";

export type GearFinderAnswers = {
  trainingStyles: string[];
  goals: string[];
  experience: string;
  priorities: string[];
  budget: string;
};

export type GearFinderRecommendation = {
  product: UnifiedProduct;
  score: number;
  reason: string;
};

const productTagMap: Record<string, {
  trainingStyles: string[];
  goals: string[];
  experienceLevels: string[];
  priorities: string[];
}> = {
  "1": {
    trainingStyles: ["Powerlifting", "Weightlifting", "General Gym Training"],
    goals: ["Lifting support", "Complete training setup"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Performance", "Comfort"],
  },
  "2": {
    trainingStyles: ["General Gym Training", "Outdoor Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Carrying gym equipment", "Gym-to-work backpack", "Training accessories"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Versatility", "Durability", "Design and appearance"],
  },
  "3": {
    trainingStyles: ["Calisthenics", "CrossFit / Functional Fitness", "General Gym Training"],
    goals: ["Training accessories", "Complete training setup"],
    experienceLevels: ["Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Performance", "Comfort", "Versatility"],
  },
  "4": {
    trainingStyles: ["Calisthenics", "Weightlifting", "CrossFit / Functional Fitness"],
    goals: ["Better grip", "Training accessories", "Complete training setup"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Performance", "Comfort", "Value for money"],
  },
  "5": {
    trainingStyles: ["General Gym Training", "Outdoor Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Carrying gym equipment", "Gym-to-work backpack"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced"],
    priorities: ["Versatility", "Comfort", "Design and appearance"],
  },
  "6": {
    trainingStyles: ["Calisthenics", "CrossFit / Functional Fitness"],
    goals: ["Better grip", "Training accessories"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Performance", "Value for money", "Comfort"],
  },
  "7": {
    trainingStyles: ["Powerlifting", "Weightlifting", "General Gym Training"],
    goals: ["Lifting support", "Complete training setup"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Performance", "Design and appearance"],
  },
  "8": {
    trainingStyles: ["Powerlifting", "Weightlifting", "General Gym Training"],
    goals: ["Lifting support", "Complete training setup"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced"],
    priorities: ["Comfort", "Durability", "Performance"],
  },
  "9": {
    trainingStyles: ["Weightlifting", "Powerlifting", "General Gym Training"],
    goals: ["Lifting support", "Complete training setup"],
    experienceLevels: ["Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Performance", "Value for money"],
  },
  "10": {
    trainingStyles: ["Powerlifting", "Weightlifting"],
    goals: ["Lifting support", "Complete training setup"],
    experienceLevels: ["Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Performance", "Comfort"],
  },
  "11": {
    trainingStyles: ["Powerlifting", "Weightlifting"],
    goals: ["Lifting support", "Complete training setup"],
    experienceLevels: ["Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Performance", "Design and appearance"],
  },
  "bag-1": {
    trainingStyles: ["General Gym Training", "Outdoor Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Carrying gym equipment", "Gym-to-work backpack", "Training accessories"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Versatility", "Durability", "Comfort"],
  },
  "bag-2": {
    trainingStyles: ["General Gym Training", "Outdoor Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Gym-to-work backpack", "Carrying gym equipment"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced"],
    priorities: ["Design and appearance", "Versatility", "Comfort"],
  },
  "bag-3": {
    trainingStyles: ["Outdoor Training", "General Gym Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Carrying gym equipment", "Gym-to-work backpack"],
    experienceLevels: ["Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Versatility", "Performance"],
  },
  "bag-4": {
    trainingStyles: ["General Gym Training", "Outdoor Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Gym-to-work backpack", "Carrying gym equipment"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Design and appearance", "Durability", "Versatility"],
  },
  "bag-5": {
    trainingStyles: ["General Gym Training", "Outdoor Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Gym-to-work backpack", "Carrying gym equipment"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced"],
    priorities: ["Design and appearance", "Versatility", "Comfort"],
  },
  "bag-6": {
    trainingStyles: ["Outdoor Training", "General Gym Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Gym-to-work backpack", "Carrying gym equipment"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced"],
    priorities: ["Comfort", "Versatility", "Durability"],
  },
  "bag-7": {
    trainingStyles: ["Outdoor Training", "General Gym Training", "Everyday Carry / Gym Lifestyle"],
    goals: ["Gym-to-work backpack", "Carrying gym equipment"],
    experienceLevels: ["Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Design and appearance", "Durability", "Versatility"],
  },
  "latest-6": {
    trainingStyles: ["Calisthenics", "CrossFit / Functional Fitness", "General Gym Training"],
    goals: ["Training accessories", "Complete training setup"],
    experienceLevels: ["Beginner", "Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Performance", "Comfort", "Versatility"],
  },
  "latest-7": {
    trainingStyles: ["Calisthenics", "CrossFit / Functional Fitness"],
    goals: ["Training accessories", "Complete training setup"],
    experienceLevels: ["Intermediate", "Advanced", "Competitive Athlete"],
    priorities: ["Durability", "Performance", "Versatility"],
  },
};

const budgetCaps: Record<string, number> = {
  "Under Rs. 1,500": 1500,
  "Rs. 1,500–4,000": 4000,
  "Rs. 4,000–7,500": 7500,
  "Rs. 7,500–10,000": 10000,
  "No budget cap": Number.POSITIVE_INFINITY,
};

export const defaultGearFinderAnswers: GearFinderAnswers = {
  trainingStyles: [],
  goals: [],
  experience: "",
  priorities: [],
  budget: "",
};

export function getGearRecommendations(answers: GearFinderAnswers): GearFinderRecommendation[] {
  const selectedStyles = new Set(answers.trainingStyles);
  const selectedGoals = new Set(answers.goals);
  const selectedPriorities = new Set(answers.priorities);
  const budgetCap = answers.budget ? budgetCaps[answers.budget] ?? Number.POSITIVE_INFINITY : Number.POSITIVE_INFINITY;

  const scoredProducts = unifiedCatalog
    .map((product) => {
      const tags = productTagMap[String(product.id)] ?? {
        trainingStyles: [],
        goals: [],
        experienceLevels: [],
        priorities: [],
      };

      const styleMatches = tags.trainingStyles.filter((style) => selectedStyles.has(style)).length;
      const goalMatches = tags.goals.filter((goal) => selectedGoals.has(goal)).length;
      const priorityMatches = tags.priorities.filter((priority) => selectedPriorities.has(priority)).length;
      const experienceMatch = tags.experienceLevels.includes(answers.experience) ? 2 : 0;
      const budgetMatch = product.price <= budgetCap ? 2 : 0;
      const score = styleMatches * 5 + goalMatches * 4 + priorityMatches * 3 + experienceMatch + budgetMatch;

      const reasonBits: string[] = [];
      if (styleMatches > 0) {
        reasonBits.push(`Matches your ${answers.trainingStyles.slice(0, 2).join(" + ") || "training focus"}.`);
      }
      if (goalMatches > 0) {
        reasonBits.push(`Built for ${tags.goals[0] ?? answers.goals[0] ?? "multi-use training"}.`);
      }
      if (priorityMatches > 0) {
        reasonBits.push(`Strong fit for ${answers.priorities[0] ?? "your priorities"}.`);
      }
      if (reasonBits.length === 0) {
        reasonBits.push("A dependable all-rounder for your setup.");
      }

      return {
        product,
        score,
        reason: reasonBits.join(" "),
      };
    })
    .filter((entry) => entry.score > 0 || entry.product.price <= budgetCap)
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .slice(0, 3);

  return scoredProducts;
}
