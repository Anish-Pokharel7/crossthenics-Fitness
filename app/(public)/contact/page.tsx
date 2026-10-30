"use client";

import { cn } from "@/lib/utils";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ mode: "onSubmit" });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted", data);
    toast.success("Message sent successfully!", {
      description: "Our athlete support team will contact you within 24 hours.",
      style: {
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-primary)",
      },
    });
    reset();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <section className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Direct Transmission
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-none mb-5">
            <span className="text-[#E10600]">GET</span> IN TOUCH
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal max-w-xl mx-auto">
            Questions regarding sizing, bulk gym orders, or customized belts?
            Speak directly with our gear specialists in Pokhara.
          </p>
        </div>

        {/* Split Surfaces */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* ─── LEFT: Contact Info Panel ─── */}
          <div className="lg:col-span-5 rounded-3xl border border-border-subtle bg-surface-raised p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.18)] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-text-primary mb-2">
                Headquarters & Dispatch
              </h2>
              <p className="text-xs text-text-muted mb-8">
                Operating directly out of Pokhara, delivering nationwide.
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated text-[#E10600] transition-all group-hover:border-[#C0C0C0]/50">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Location
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      Pokhara, Gandaki, Nepal
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated text-[#E10600] transition-all group-hover:border-[#C0C0C0]/50">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Direct Line
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      <a
                        href="tel:+9779804165664"
                        className="hover:text-text-primary transition-colors"
                      >
                        +977 9804165664
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated text-[#E10600] transition-all group-hover:border-[#C0C0C0]/50">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Email Address
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed break-all">
                      <a
                        href="mailto:crossthenicfitness522@gmail.com"
                        className="hover:text-text-primary transition-colors"
                      >
                        crossthenicfitness522@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated text-text-muted">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Response Time
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      Same day response • Mon - Sat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-10 pt-6 border-t border-border-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-3">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/crossthenicsfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-section-alt text-text-primary/80 transition-all duration-200 hover:border-[#C0C0C0]/60 hover:text-text-primary"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/crossthenicsfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-section-alt text-text-primary/80 transition-all duration-200 hover:border-[#C0C0C0]/60 hover:text-text-primary"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/9779804165664"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-section-alt text-text-primary/80 transition-all duration-200 hover:border-[#C0C0C0]/60 hover:text-text-primary"
                  aria-label="WhatsApp"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Contact Form Panel ─── */}
          <div className="lg:col-span-7 rounded-3xl border border-border-subtle bg-surface-raised p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-black uppercase tracking-tight text-text-primary mb-2">
              Send Transmission
            </h2>
            <p className="text-xs text-text-muted mb-8">
              Fill out the form below and an equipment specialist will get back
              to you promptly.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5"
            >
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-text-muted"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="e.g. Alex Sharma"
                    {...register("name", { required: "Full name is required" })}
                    aria-invalid={!!errors.name}
                    className={cn(
                      "w-full rounded-xl border border-border-subtle bg-page px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                      errors.name && "border-red-500",
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-text-muted"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. alex@gmail.com"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    aria-invalid={!!errors.email}
                    className={cn(
                      "w-full rounded-xl border border-border-subtle bg-page px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                      errors.email && "border-red-500",
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-text-muted"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+977 98..."
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    aria-invalid={!!errors.phone}
                    className={cn(
                      "w-full rounded-xl border border-border-subtle bg-page px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                      errors.phone && "border-red-500",
                    )}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-text-muted"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Product Inquiry / Sizing"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    aria-invalid={!!errors.subject}
                    className={cn(
                      "w-full rounded-xl border border-border-subtle bg-page px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0]",
                      errors.subject && "border-red-500",
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label
                  htmlFor="message"
                  className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-text-muted"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us what you're looking for, question about gear, or custom order request..."
                  {...register("message", { required: "Message is required" })}
                  aria-invalid={!!errors.message}
                  className={cn(
                    "w-full rounded-xl border border-border-subtle bg-page p-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-[#C0C0C0] resize-y min-h-32",
                    errors.message && "border-red-500",
                  )}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#E10600] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#B80500] w-full sm:w-auto mt-2"
              >
                <Send size={14} />
                <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
