import { UnavailableModule } from "@/components/admin/UnavailableModule";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Orders
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Order records and fulfillment status.
        </p>
      </header>
      <UnavailableModule
        title="Order management is not connected"
        description="This project has no persistent order database or order API, so there are no real orders to display or safely update."
        requirements={[
          "Connect checkout to a persistent order service shared with this admin workspace.",
          "Store payment and fulfillment status separately so changing delivery progress cannot alter payment records.",
        ]}
      />
    </div>
  );
}
