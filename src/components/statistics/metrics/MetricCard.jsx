export const MetricCard = ({ title, value, icon, color = "#3B82F6", subtitle }) => (
  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {icon && (
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
      )}
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