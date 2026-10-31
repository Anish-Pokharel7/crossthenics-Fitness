import { UnavailableModule } from "@/components/admin/UnavailableModule";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Customers
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Customer profiles and purchase history.
        </p>
      </header>
      <UnavailableModule
        title="Customer records are not connected"
        description="There is no customer database or customer API in this project. Personal details, account status, order history, and spending cannot be loaded or changed here."
        requirements={[
          "Connect authenticated customer records to the same backend used by checkout.",
          "Restrict profile access and updates to authorized admin roles on the server.",
        ]}
      />
    </div>
  );
}
