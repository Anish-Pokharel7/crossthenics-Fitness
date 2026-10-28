import React from "react";
import { RotateCcw, ShieldAlert, CheckCircle } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Customer Protection
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-none mb-6">
            REFUND &amp; <span className="text-[#E10600]">RETURNS</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto font-normal">
            We stand behind every piece of gear we manufacture with total confidence.
          </p>
        </div>

        {/* Policy Card Container */}
        <div className="rounded-3xl border border-[#414141] bg-[#2A2A2A] p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-10">
          
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#414141] bg-[#353535] text-[#E10600]">
              <RotateCcw size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                7-Day Exchange &amp; Return Window
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                If your belt sizing doesn&apos;t match or if you wish to swap gear models, you can initiate a return or size exchange within 7 days of receiving your package. Products must be unwashed, unworn in competition, and in original packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#414141] bg-[#353535] text-[#E10600]">
              <CheckCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                Instant Size Exchanges
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Need a smaller or larger belt size? Contact our support via WhatsApp or email, and we will arrange an exchange dispatch immediately.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#414141] bg-[#353535] text-[#E10600]">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                Manufacturing Warranty
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Our heavy-duty steel locking buckles and 900D stitching are guaranteed against structural defects. If you experience hardware failure during proper athletic usage, we will replace the component free of charge.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
