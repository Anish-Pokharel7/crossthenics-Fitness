import { FileText, Scale, Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Legal Terms
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-none mb-6">
            TERMS &amp; <span className="text-[#E10600]">CONDITIONS</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto font-normal">
            Standard user conditions and guidelines for purchasing Crossthenics
            equipment.
          </p>
        </div>

        {/* Terms Card Container */}
        <div className="rounded-3xl border border-border-subtle bg-surface-raised p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.18)] space-y-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated text-[#E10600]">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                1. General Agreement
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                By purchasing or using equipment manufactured and distributed by
                Crossthenics Fitness in Nepal, you agree to these operational
                terms and conditions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated text-[#E10600]">
              <Scale size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                2. Product Availability &amp; Pricing
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                All prices are listed in Nepalese Rupees (NPR) and include
                standard domestic sales taxes. Limited batch drops are produced
                in small artisanal runs and are sold on a first-come,
                first-served basis.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated text-[#E10600]">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                3. Proper Athletic Usage
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Crossthenics gear is designed specifically for weightlifting,
                powerlifting, bodybuilding, calisthenics, and fitness training.
                Users are responsible for inspecting locking mechanisms and
                buckles prior to heavy lifts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
