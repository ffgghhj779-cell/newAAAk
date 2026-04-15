export default function LoadingVisas() {
  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-96"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Tabs Skeleton */}
          <div className="flex gap-2 mb-8 border-b border-gray-100 pb-4 animate-pulse">
            <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
            <div className="h-9 w-24 bg-gray-100 rounded-lg"></div>
            <div className="h-9 w-28 bg-gray-100 rounded-lg"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
                {/* Image area */}
                <div className="h-48 bg-gray-200 w-full"></div>
                {/* Content area */}
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-5/6 mb-6"></div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <div className="h-4 bg-gray-100 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex justify-between items-center py-2 pt-4">
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                  </div>
                  
                  <div className="h-11 bg-gray-200 rounded-xl w-full mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
