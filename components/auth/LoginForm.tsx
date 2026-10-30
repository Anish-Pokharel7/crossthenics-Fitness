"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { cn } from "@/lib/utils";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAdmin } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ mode: "onSubmit" });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!", {
        description: "Signed into your Crossthenics account.",
        style: {
          background: "var(--surface-raised)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-primary)",
        },
      });

      if (isAdmin) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (error) {
      toast.error("Login failed", {
        description:
          error instanceof Error ? error.message : "Invalid credentials",
        style: {
          background: "var(--surface-raised)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-primary)",
        },
      });
    }
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
            <span>Athlete Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-text-primary leading-none">
            ATHLETE <span className="text-[#E10600]">ACCESS</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-text-muted font-normal">
            Sign in to access your orders, saved gear &amp; VIP drops.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
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

            <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-border-subtle bg-page text-[#E10600] focus:ring-0"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-[#E10600] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group/btn mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E10600] py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#B80500]"
          >
            <span>{isSubmitting ? "Authenticating..." : "Sign In"}</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>
        </div>

        {/* Footer Link Navigation */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
          <p>
            New athlete?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-[#E10600] hover:underline transition-colors"
            >
              Create Account
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
