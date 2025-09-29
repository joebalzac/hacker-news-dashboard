const StorySkeleton = () => {
  return (
    <div className="bg-gray-950 rounded-lg p-6 mb-4 animate-pulse">
      <div className="space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-800 rounded w-3/4"></div>

        {/* Meta information skeleton */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-12"></div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-20"></div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySkeleton;
