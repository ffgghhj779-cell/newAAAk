export default function Loading() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* Hero Skeleton */}
      <div className="bg-[#1F2937] text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="h-12 w-64 bg-white/10 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-[#7C3AED]/5 border border-gray-100 flex flex-col">
              <div className="h-56 bg-gray-200 animate-pulse w-full" />
              <div className="p-8 flex flex-col flex-grow">
                <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded-lg mb-2 animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded-lg mb-6 animate-pulse" />
                
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
