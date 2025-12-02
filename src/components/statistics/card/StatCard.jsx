export const StatCard = ({ title, value, color, subtitle }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="flex items-baseline gap-2">
        <p 
          className="text-3xl font-bold" 
          style={{ color: color }}
        >
          {value}
        </p>
        {subtitle && (
          <span className="text-xs text-gray-500">{subtitle}</span>
        )}
      </div>
    </div>
  );
};