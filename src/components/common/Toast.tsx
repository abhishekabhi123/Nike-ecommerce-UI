import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useUiStore } from "@/store";
import { cn } from "@/utils/cn";

export const Toast = () => {
  const { toast, hideToast } = useUiStore();

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, hideToast]);
  if (!toast.isVisible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green" />,
    error: <AlertCircle className="w-5 h-5 text-red" />,
    warning: <AlertTriangle className="w-5 h-5 text-orange" />,
    info: <Info className="w-5 h-5 text-dark-900" />,
  };

  const backgrounds = {
    success: "bg-green/10 border-green",
    error: "bg-red/10 border-red",
    warning: "bg-orange/10 border-orange",
    info: "bg-light-300 border-dark-400",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg",
          "min-w-[300px] max-w-md",
          backgrounds[toast.type]
        )}
      >
        {icons[toast.type]}
        <p className="flex-1 text-sm font-medium text-dark-900">
          {toast.message}
        </p>
        <button
          onClick={hideToast}
          className="p-1 hover:bg-white/50 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
