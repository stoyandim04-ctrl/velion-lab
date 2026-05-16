import { AppShell } from "@/components/AppShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function ModulesLoading() {
  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Hero skeleton */}
        <section className="mb-14">
          <Skeleton className="h-3 w-32 mb-5 bg-white/5" />
          <Skeleton className="h-14 md:h-16 w-2/3 max-w-md bg-white/5 rounded-xl mb-3" />
          <Skeleton className="h-14 md:h-16 w-1/2 max-w-sm bg-white/5 rounded-xl" />
          <Skeleton className="h-5 w-full max-w-2xl mt-4 bg-white/5" />
          <Skeleton className="h-5 w-3/4 max-w-xl mt-2 bg-white/5" />
        </section>

        <div className="divider mb-12" />

        {/* Module accordion items skeleton */}
        <section className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card rounded-2xl p-6 md:p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-xl bg-white/5" />
                  <div>
                    <Skeleton className="h-3 w-20 mb-2 bg-white/5" />
                    <Skeleton className="h-3 w-16 bg-white/5" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
              </div>
              <Skeleton className="h-7 w-3/4 mb-2 bg-white/5 rounded-md" />
              <Skeleton className="h-3 w-1/2 mb-3 bg-white/5" />
              <Skeleton className="h-4 w-full mb-1 bg-white/5" />
              <Skeleton className="h-4 w-5/6 mb-5 bg-white/5" />
              <Skeleton className="h-1.5 w-full rounded-full bg-white/5" />
            </div>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
