"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const onSubmit = (data: SignupFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log("Signup data:", data);
    toast.success("Account created successfully!", {
      description: "Welcome to Crossthenics Fitness.",
      style: {
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-primary)",
      },
    });
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-3xl border border-border-subtle bg-surface-raised p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.22)] transition-all"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-text-primary mb-3">
            <span>Join The Ranks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-text-primary leading-none">
            FORGE YOUR <span className="text-[#E10600]">PROFILE</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-text-muted font-normal">
            Create your athlete account for expedited delivery &amp; exclusive
            drops.
          </p>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-muted">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Alex Sharma"
                {...register("fullName", { required: "Full name is required" })}
                aria-invalid={!!errors.fullName}
                className={cn(
                  "w-full rounded-xl border border-border-subtle bg-page px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                  errors.fullName && "border-red-500",
                )}
              />
              <User
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-muted">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="athlete@domain.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                aria-invalid={!!errors.email}
                className={cn(
                  "w-full rounded-xl border border-border-subtle bg-page px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                  errors.email && "border-red-500",
                )}
              />
              <Mail
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-muted">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                aria-invalid={!!errors.password}
                className={cn(
                  "w-full rounded-xl border border-border-subtle bg-page px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                  errors.password && "border-red-500",
                )}
              />
              <Lock
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-muted">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                aria-invalid={!!errors.confirmPassword}
                className={cn(
                  "w-full rounded-xl border border-border-subtle bg-page px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                  errors.confirmPassword && "border-red-500",
                )}
              />
              <Lock
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group/btn mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E10600] py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#B80500]"
          >
            <span>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>
        </div>

        {/* Footer Link Navigation */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
          <p>
            Already registered?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#E10600] hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
          <Link
            href="/"
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}
