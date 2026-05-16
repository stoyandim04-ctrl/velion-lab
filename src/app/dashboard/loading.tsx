import { AppShell } from "@/components/AppShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Hero skeleton */}
        <section className="mb-14">
          <Skeleton className="h-3 w-32 mb-5 bg-white/5" />
          <Skeleton className="h-14 md:h-16 w-3/4 max-w-xl bg-white/5 rounded-xl" />
          <Skeleton className="h-5 w-full max-w-2xl mt-4 bg-white/5" />
          <Skeleton className="h-5 w-2/3 max-w-xl mt-2 bg-white/5" />
        </section>

        {/* Progress widget skeleton */}
        <section className="card rounded-2xl p-8 md:p-10 mb-10">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <Skeleton className="h-3 w-28 mb-3 bg-white/5" />
              <Skeleton className="h-10 w-60 bg-white/5 rounded-lg" />
            </div>
            <div className="w-full md:w-auto md:text-right">
              <Skeleton className="h-3 w-24 mb-2 bg-white/5 md:ml-auto" />
              <Skeleton className="h-12 w-24 bg-white/5 rounded-lg md:ml-auto" />
            </div>
          </div>
          <Skeleton className="h-2 w-full rounded-full bg-white/5" />
          <Skeleton className="h-4 w-2/3 mt-5 bg-white/5" />
        </section>

        {/* Two cards skeleton */}
        <section className="grid md:grid-cols-2 gap-6 mb-14">
          {[1, 2].map((i) => (
            <div key={i} className="card rounded-2xl p-8">
              <Skeleton className="h-3 w-24 mb-5 bg-white/5" />
              <div className="flex items-center gap-4 mb-5">
                <Skeleton className="h-10 w-10 rounded-xl bg-white/5" />
                <Skeleton className="h-3 w-40 bg-white/5" />
              </div>
              <Skeleton className="h-7 w-3/4 mb-3 bg-white/5 rounded-md" />
              <Skeleton className="h-4 w-full mb-2 bg-white/5" />
              <Skeleton className="h-4 w-5/6 mb-6 bg-white/5" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-16 bg-white/5" />
                <Skeleton className="h-10 w-28 rounded-xl bg-white/5" />
              </div>
            </div>
          ))}
        </section>

        <div className="divider mb-12" />

        {/* Module cards skeleton */}
        <section>
          <Skeleton className="h-3 w-32 mb-3 bg-white/5" />
          <Skeleton className="h-10 w-60 mb-8 bg-white/5 rounded-lg" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card rounded-2xl p-7">
                <div className="flex items-center justify-between mb-5">
                  <Skeleton className="h-10 w-10 rounded-xl bg-white/5" />
                  <Skeleton className="h-3 w-16 bg-white/5" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2 bg-white/5 rounded-md" />
                <Skeleton className="h-3 w-1/2 mb-3 bg-white/5" />
                <Skeleton className="h-4 w-full mb-1 bg-white/5" />
                <Skeleton className="h-4 w-5/6 bg-white/5" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
