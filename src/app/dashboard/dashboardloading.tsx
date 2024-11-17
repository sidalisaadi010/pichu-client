import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboardloading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-[80%]" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-6 w-[360px]" />
        </div>

        {/* Metric Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="border-b p-4">
                <Skeleton className="h-5 w-[120px]" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-7 w-[140px]" />
                <Skeleton className="h-4 w-[100px]" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart and Recent Sales */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="border-b p-4">
              <Skeleton className="h-5 w-[120px]" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Chart Skeleton */}
                <div className="flex h-[200px] items-end gap-2 pb-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-full"
                      style={{
                        height: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
                {/* X-axis labels */}
                <div className="flex justify-between">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-8" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b p-4">
              <Skeleton className="h-5 w-[120px]" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[160px]" />
                    </div>
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="border-b p-4">
            <Skeleton className="h-5 w-[140px]" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 items-center gap-4 border-b p-4 last:border-0"
                >
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[140px]" />
                  <Skeleton className="h-4 w-[160px]" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
