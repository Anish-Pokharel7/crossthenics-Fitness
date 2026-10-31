import { AlertCircle, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export function UnavailableModule({
  title,
  description,
  requirements,
}: {
  title: string;
  description: string;
  requirements: string[];
}) {
  return (
    <section
      aria-labelledby="admin-unavailable-title"
      className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8"
    >
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-muted text-muted-foreground">
        <AlertCircle size={21} aria-hidden="true" />
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
        Module unavailable
      </p>
      <h2
        id="admin-unavailable-title"
        className="mt-2 text-2xl font-bold tracking-tight"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4">
        <h3 className="text-sm font-semibold">Required before this is usable</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        No sample records are shown and no changes have been saved.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/admin/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#B80500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to overview
        </Link>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View storefront
          <ExternalLink size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
