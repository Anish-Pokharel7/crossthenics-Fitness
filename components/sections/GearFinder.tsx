"use client";

import { useCart } from "@/lib/cartContext";
import { defaultGearFinderAnswers, getGearRecommendations, type GearFinderAnswers } from "@/lib/gearFinder";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, Target, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const trainingOptions = [
  "Powerlifting",
  "Weightlifting",
  "Calisthenics",
  "CrossFit / Functional Fitness",
  "General Gym Training",
  "Outdoor Training",
  "Everyday Carry / Gym Lifestyle",
];

const goalOptions = [
  "Lifting support",
  "Better grip",
  "Carrying gym equipment",
  "Training accessories",
  "Gym-to-work backpack",
  "Complete training setup",
  "Personalizing my gear",
];

const experienceOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Competitive Athlete",
];

const priorityOptions = [
  "Durability",
  "Performance",
  "Comfort",
  "Versatility",
  "Design and appearance",
  "Value for money",
];

const budgetOptions = [
  "Under Rs. 1,500",
  "Rs. 1,500–4,000",
  "Rs. 4,000–7,500",
  "Rs. 7,500–10,000",
  "No budget cap",
];

const steps = [
  { key: "trainingStyles", title: "What is your training style?", subtitle: "Pick the styles that match your routine." },
  { key: "goals", title: "What are you looking for?", subtitle: "Choose your main priorities." },
  { key: "experience", title: "What is your experience level?", subtitle: "This helps match your setup." },
  { key: "priorities", title: "What matters most to you?", subtitle: "Select the priorities that guide your purchase." },
  { key: "budget", title: "What is your approximate budget?", subtitle: "This keeps the recommendations realistic." },
];

const toggleSelection = (value: string, items: string[], setter: (next: string[]) => void) => {
  const next = items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];

  setter(next);
};

const getStepIsValid = (key: string, answers: GearFinderAnswers) => {
  if (key === "trainingStyles") return answers.trainingStyles.length > 0;
  if (key === "goals") return answers.goals.length > 0;
  if (key === "experience") return Boolean(answers.experience);
  if (key === "priorities") return answers.priorities.length > 0;
  if (key === "budget") return Boolean(answers.budget) || true;
  return true;
};

export default function GearFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<GearFinderAnswers>(defaultGearFinderAnswers);
  const { addToCart } = useCart();

  const recommendations = useMemo(() => getGearRecommendations(answers), [answers]);
  const currentConfig = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const showResults = currentStep >= steps.length;

  const updateValue = (key: keyof GearFinderAnswers, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const moveNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setCurrentStep(steps.length);
  };

  const moveBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const restartFinder = () => {
    setCurrentStep(0);
    setAnswers(defaultGearFinderAnswers);
  };

  const renderOptions = () => {
    const stepKey = currentConfig.key;

    if (stepKey === "experience") {
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {experienceOptions.map((option) => {
            const active = answers.experience === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => updateValue("experience", option)}
                className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "border-[#E10600] bg-[#E10600]/10 text-text-primary shadow-[0_10px_20px_rgba(225,6,0,0.12)]"
                    : "border-border-subtle bg-surface-raised text-text-secondary hover:border-[#C0C0C0] hover:bg-surface-elevated"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    if (stepKey === "budget") {
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {budgetOptions.map((option) => {
            const active = answers.budget === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => updateValue("budget", option)}
                className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "border-[#E10600] bg-[#E10600]/10 text-text-primary shadow-[0_10px_20px_rgba(225,6,0,0.12)]"
                    : "border-border-subtle bg-surface-raised text-text-secondary hover:border-[#C0C0C0] hover:bg-surface-elevated"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    const options = stepKey === "trainingStyles" ? trainingOptions : stepKey === "goals" ? goalOptions : priorityOptions;
    const selectedItems = stepKey === "trainingStyles" ? answers.trainingStyles : stepKey === "goals" ? answers.goals : answers.priorities;

    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = selectedItems.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() =>
                stepKey === "trainingStyles"
                  ? toggleSelection(option, answers.trainingStyles, (next) => updateValue("trainingStyles", next))
                  : stepKey === "goals"
                    ? toggleSelection(option, answers.goals, (next) => updateValue("goals", next))
                    : toggleSelection(option, answers.priorities, (next) => updateValue("priorities", next))
              }
              className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                active
                  ? "border-[#E10600] bg-[#E10600]/10 text-text-primary shadow-[0_10px_20px_rgba(225,6,0,0.12)]"
                  : "border-border-subtle bg-surface-raised text-text-secondary hover:border-[#C0C0C0] hover:bg-surface-elevated"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-page py-24 sm:py-32">
      <div className="container-page relative z-10">
        <div className="w-full rounded-[28px] border border-border-subtle bg-surface-raised/90 p-5 shadow-[0_18px_56px_rgba(0,0,0,0.12)] sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 border-b border-border-subtle pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E10600]/25 bg-[#E10600]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-text-primary">
                Gear Finder
              </span>
              <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl">
                FIND YOUR <span className="text-[#E10600]">EDGE.</span>
              </h2>
            </div>

            {!showResults && (
              <div className="w-full max-w-md">
                <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                  <span>Step {Math.min(currentStep + 1, steps.length)}</span>
                  <span>{steps.length} steps</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-section-alt">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-full rounded-full bg-[#E10600]"
                  />
                </div>
              </div>
            )}
          </div>

          {!showResults ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-5">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary sm:text-3xl">
                    {currentConfig.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{currentConfig.subtitle}</p>
                </div>

                {renderOptions()}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={moveBack}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-raised px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowRight size={12} className="rotate-180" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={moveNext}
                    disabled={!getStepIsValid(currentConfig.key, answers)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E10600] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#B80500] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                  >
                    {currentStep === steps.length - 1 ? "See my recommendations" : "Next"}
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              <aside className="rounded-3xl border border-border-subtle bg-section-alt p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                  <Target size={13} className="text-[#E10600]" />
                  Your profile
                </div>

                <div className="space-y-3 text-sm text-text-primary">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Training</p>
                    <p className="mt-1 text-sm text-text-primary">
                      {answers.trainingStyles.length ? answers.trainingStyles.join(", ") : "Select one or more styles"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Goals</p>
                    <p className="mt-1 text-sm text-text-primary">
                      {answers.goals.length ? answers.goals.join(", ") : "Choose your needs"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Level</p>
                    <p className="mt-1 text-sm text-text-primary">{answers.experience || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Priority</p>
                    <p className="mt-1 text-sm text-text-primary">
                      {answers.priorities.length ? answers.priorities.join(", ") : "Pick a priority"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Budget</p>
                    <p className="mt-1 text-sm text-text-primary">{answers.budget || "No cap selected"}</p>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E10600]/25 bg-[#E10600]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-text-primary">
                    <Trophy size={12} className="text-[#E10600]" />
                    Your setup
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary sm:text-4xl">
                    YOUR TRAINING. YOUR SETUP.
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={restartFinder}
                  className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-raised px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-surface-elevated"
                >
                  <RotateCcw size={12} />
                  Restart
                </button>
              </div>

              <p className="max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">
                {recommendations.length
                  ? `Based on your ${answers.trainingStyles.join(" + ") || "training preferences"}, we recommend gear that supports your routine and budget.`
                  : "We couldn’t match your answers to a precise setup. Try widening your style or budget selection."}
              </p>
              {recommendations.length > 0 && (
                <Link
                  href="/build-setup"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-subtle bg-surface-raised px-4 text-xs font-bold uppercase tracking-wider text-text-primary transition-colors hover:border-[#929292]"
                >
                  Build a complete setup
                  <ArrowRight size={14} />
                </Link>
              )}

              <div className="grid gap-5 lg:grid-cols-3">
                {recommendations.length ? (
                  recommendations.map(({ product, reason }) => (
                    <motion.article
                      key={product.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface-raised shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
                    >
                      <div className="relative aspect-square overflow-hidden border-b border-border-subtle bg-section-alt">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {product.badge ? (
                          <span className="absolute left-3 top-3 rounded-md border border-[#E10600]/30 bg-[#E10600]/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-text-primary">
                            {product.badge}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                            {product.category}
                          </span>
                          <span className="text-xs font-bold text-text-muted">
                            Rs. {product.price.toLocaleString("en-US")}
                          </span>
                        </div>

                        <Link href={`/products/${product.id}`} className="group">
                          <h4 className="text-xl font-black uppercase tracking-tight text-text-primary transition-colors group-hover:text-[#E10600]">
                            {product.name}
                          </h4>
                        </Link>

                        <p className="mt-3 text-sm leading-relaxed text-text-muted">{reason}</p>

                        <div className="mt-4 flex gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E10600] px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#B80500]"
                          >
                            View Product
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                category: product.category,
                              })
                            }
                            className="rounded-xl border border-border-subtle bg-surface-raised px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-surface-elevated"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-border-subtle bg-section-alt p-8 text-center text-sm text-text-muted lg:col-span-3">
                    No direct match yet. Try a wider budget or add more training styles to see the stronger recommendations.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
