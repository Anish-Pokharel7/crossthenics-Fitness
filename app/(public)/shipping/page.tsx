import { Clock, ShieldCheck, Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Dispatch Logistics
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-none mb-6">
            SHIPPING <span className="text-[#E10600]">POLICY</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto font-normal">
            Reliable, insured nationwide shipping across all provinces of Nepal.
          </p>
        </div>

        {/* Policy Card Container */}
        <div className="rounded-3xl border border-border-subtle bg-surface-raised p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.18)] space-y-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated text-[#E10600]">
              <Clock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                Order Processing &amp; Delivery Times
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                All orders are dispatched from our Pokhara facility within 24–48
                hours via insured domestic courier. Inside Pokhara &amp;
                Kathmandu Valley: 1–2 business days. All other districts
                (Chitwan, Butwal, Biratnagar, Dharan, Nepalgunj, etc.): 2–4
                business days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated text-[#E10600]">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                Shipping Rates &amp; Free Delivery
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Standard flat-rate delivery across Nepal is Rs. 150. Orders over
                Rs. 3,000 qualify for complimentary insured shipping nationwide.
                Cash on Delivery (COD) is available in all major hubs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface-elevated text-[#E10600]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">
                Damaged or Lost Shipments
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Every item is rigorously packaged in high-grade tamper-resistant
                bags. In the rare event of transit damage or delays, our
                dispatch support team provides instantaneous tracking updates
                and free replacements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
