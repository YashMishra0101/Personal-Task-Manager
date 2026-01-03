import React from "react";
import { NavLink } from "react-router-dom";
import { ListTodo, PlusCircle, CheckCircle } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const navItems = [
    { to: "/", icon: ListTodo, label: "Tasks" },
    { to: "/add", icon: PlusCircle, label: "Add" },
    { to: "/completed", icon: CheckCircle, label: "Done" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:static md:w-64 md:h-screen bg-surface border-t md:border-t-0 md:border-r border-border pb-safe pt-2 md:pt-6 px-6 md:px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-none z-50 flex-shrink-0">
      <div className="max-w-md md:max-w-none mx-auto md:mx-0 flex md:flex-col justify-between md:justify-start items-center md:items-stretch h-16 md:h-full md:space-y-2">
        {/* Helper for desktop logo area if needed, or just spacers */}
        <div className="hidden md:block mb-8 px-4">
          {/* Logo placeholder if needed, currently header handles title */}
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Menu
          </span>
        </div>

        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col md:flex-row items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-3 w-full h-full md:h-auto md:py-3 md:px-4 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary md:bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-surface-hover"
              )
            }
          >
            <Icon size={24} strokeWidth={2.5} className="md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
