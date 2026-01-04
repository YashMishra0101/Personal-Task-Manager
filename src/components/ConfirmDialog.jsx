import React from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // danger, warning, default
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantStyles = {
    danger: {
      icon: "text-red-500",
      button: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/25",
    },
    warning: {
      icon: "text-yellow-500",
      button:
        "bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/25",
    },
    default: {
      icon: "text-primary",
      button:
        "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25",
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-surface rounded-2xl shadow-2xl border border-border max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-surface-hover"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              variant === "danger"
                ? "bg-red-500/10"
                : variant === "warning"
                ? "bg-yellow-500/10"
                : "bg-primary/10"
            }`}
          >
            <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary mb-1">{title}</h3>
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl font-medium bg-surface-hover text-primary hover:bg-border transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all shadow-lg ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
