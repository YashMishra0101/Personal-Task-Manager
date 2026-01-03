import React from "react";
import { useTasks } from "../context/TaskContext";
import { getRemainingTime, formatDeadlineDisplay } from "../lib/timeUtils";
import { Check, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { isPast, parseISO } from "date-fns";

export default function TaskCard({ task }) {
  const { toggleTaskCompletion } = useTasks();
  const timeLeft = getRemainingTime(task.deadline);
  const isOverdue = task.deadline && isPast(parseISO(task.deadline));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "group flex items-center p-4 mb-3 bg-surface hover:bg-surface-hover rounded-2xl shadow-sm border border-border transition-all active:scale-[0.98]",
        task.completed ? "opacity-60" : ""
      )}
    >
      <button
        onClick={() => toggleTaskCompletion(task.id, task.completed)}
        className={cn(
          "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mr-4",
          task.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 group-hover:border-primary"
        )}
      >
        {task.completed && (
          <Check
            size={14}
            className="text-primary-foreground"
            strokeWidth={3}
          />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "text-base font-medium truncate mb-1",
            task.completed
              ? "line-through text-muted-foreground"
              : "text-primary"
          )}
        >
          {task.title}
        </h3>

        {!task.completed && task.deadline && (
          <div className="flex items-center space-x-3 text-xs">
            <span
              className={cn(
                "flex items-center space-x-1",
                isOverdue ? "text-red-500 font-semibold" : "text-accent"
              )}
            >
              <Clock size={12} />
              <span>{timeLeft}</span>
            </span>
            <span className="text-muted-foreground flex items-center space-x-1">
              <Calendar size={12} />
              <span>{formatDeadlineDisplay(task.deadline)}</span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
