import { UnavailableModule } from "@/components/admin/UnavailableModule";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Store settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Store details, delivery, payments, and policies.
        </p>
      </header>
      <UnavailableModule
        title="Store settings cannot be saved"
        description="No persistent settings store or update API is configured. The previous settings screen used example values and a simulated save, so it has been removed rather than implying those changes were applied."
        requirements={[
          "Define an authoritative settings store shared with the public storefront.",
          "Connect only payment and shipping options that are actually configured, and keep private credentials server-side.",
        ]}
      />
    </div>
  );
}
