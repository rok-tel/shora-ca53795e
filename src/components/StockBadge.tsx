
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StockBadgeProps {
  symbol: string;
  price?: number;
  change?: number;
  className?: string;
  showChange?: boolean;
}

const StockBadge = ({ 
  symbol, 
  price, 
  change = 0, 
  className, 
  showChange = false 
}: StockBadgeProps) => {
  const isPositive = change >= 0;
  
  return (
    <Link 
      to={`/stocks/${symbol}`}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium",
        showChange ? (isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") : "bg-blue-100 text-blue-800",
        "transition-all hover:scale-105",
        className
      )}
    >
      <span className="font-semibold">{symbol}</span>
      {showChange && price && (
        <span className="ml-1.5 font-normal">
          ${price.toFixed(2)} 
          <span className={isPositive ? "text-finance-green" : "text-finance-red"}>
            {isPositive ? "+" : ""}{change.toFixed(2)}%
          </span>
        </span>
      )}
    </Link>
  );
};

export default StockBadge;
