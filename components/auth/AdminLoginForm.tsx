"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import athleteImage from "@/public/web images/bag.jpg";
import Logo from "@/public/logo/ct-logo01.png";

export default function AdminLoginForm({
  returnTo,
}: {
  returnTo: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Unable to sign in. Please check your credentials.");
        return;
      }

      // Only allow internal application redirects.
      const safeReturnTo =
        returnTo.startsWith("/") && !returnTo.startsWith("//")
          ? returnTo
          : "/admin/dashboard";

      window.location.assign(safeReturnTo);
    } catch {
      setError(
        "Could not reach the sign-in service. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[55%_45%]">

      {/* LEFT SIDE — BRAND IMAGE PANEL */}
      <section className="relative flex min-h-[280px] overflow-hidden bg-[#202020] sm:min-h-[360px] lg:min-h-screen">

        <Image
          src={athleteImage}
          alt="Athlete carrying Crossthenics training gear at an outdoor track"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
        />

        {/* Dark image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

        {/* Brand logo */}
        <div className="absolute left-7 top-7 z-10 sm:left-10 sm:top-10">
          <Link href="/" aria-label="Crossthenics storefront">
            <Image
              src={Logo}
              alt="Crossthenics Fitness"
              width={170}
              height={60}
              priority
              className="h-10 w-auto object-contain brightness-0 invert sm:h-12"
            />
          </Link>
        </div>

        {/* Decorative red accent */}
        <div className="absolute bottom-0 right-0 z-10 h-1 w-1/3 bg-[#E10600]" />
      </section>

      {/* RIGHT SIDE — LOGIN FORM */}
      <section className="flex min-h-[600px] items-center justify-center bg-white px-6 py-12 sm:px-12 lg:min-h-screen lg:px-12 xl:px-20">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link
            href="/"
            aria-label="Crossthenics Fitness storefront"
            className="mb-9 flex justify-center lg:hidden"
          >
            <Image
              src={Logo}
              alt="Crossthenics Fitness"
              width={150}
              height={55}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Form heading */}
          <div className="mb-9">

            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E10600]" />
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E10600]">
                Authorized Access Only
              </p>
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight text-[#202020] sm:text-4xl">
              ADMIN
              <span className="text-[#E10600]"> SIGN IN.</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#777777]">
              Welcome back. Sign in to access your Crossthenics
              store management workspace.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-[11px] font-black uppercase tracking-[0.12em] text-[#333333]"
              >
                Email Address
              </label>

              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                autoFocus
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-13 w-full rounded-lg border border-[#DADADA] bg-[#FAFAFA] px-4 text-sm font-medium text-[#202020] outline-none transition-all placeholder:font-normal placeholder:text-[#AAAAAA] hover:border-[#AAAAAA] focus:border-[#E10600] focus:bg-white focus:ring-4 focus:ring-[#E10600]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="block text-[11px] font-black uppercase tracking-[0.12em] text-[#333333]"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-13 w-full rounded-lg border border-[#DADADA] bg-[#FAFAFA] px-4 pr-14 text-sm font-medium text-[#202020] outline-none transition-all placeholder:font-normal placeholder:text-[#AAAAAA] hover:border-[#AAAAAA] focus:border-[#E10600] focus:bg-white focus:ring-4 focus:ring-[#E10600]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#777777] transition-colors hover:text-[#E10600]"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                      <path d="M9.9 5.2A10.7 10.7 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.3 3.2" />
                      <path d="M6.2 6.2C3.9 7.7 2.7 9.8 2.5 12c1 2.5 4.5 7 9.5 7 1.2 0 2.3-.2 3.3-.7" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#E10600] px-5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#E10600]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#BE0500] hover:shadow-xl hover:shadow-[#E10600]/20 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      opacity=".25"
                    />
                    <path
                      d="M21 12a9 9 0 00-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  SIGN IN TO ADMIN
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-9 border-t border-[#EEEEEE] pt-6">

            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-xs font-semibold text-[#777777] transition-colors hover:text-[#E10600]"
            >
              <span aria-hidden="true">←</span>
              Return to Crossthenics storefront
            </Link>

            <div className="mt-8 flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#AAAAAA]">
                CROSSTHENICS FITNESS
              </p>

              <p className="text-[9px] font-medium text-[#AAAAAA]">
                PRIVATE ADMIN WORKSPACE
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}