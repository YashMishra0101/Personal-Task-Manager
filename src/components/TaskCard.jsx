import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { getRemainingTime, formatDeadlineDisplay } from "../lib/timeUtils";
import {
  Check,
  Clock,
  Calendar,
  Trash2,
  Pencil,
  Circle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { isPast, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import { toast } from "sonner";

export default function TaskCard({ task }) {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const timeLeft = getRemainingTime(task.deadline);
  const isOverdue = task.deadline && isPast(parseISO(task.deadline));

  const handleToggleComplete = async () => {
    try {
      await toggleTaskCompletion(task.id, task.completed);
      toast.success(
        task.completed ? "Task moved to active" : "Task completed! 🎉"
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className={cn(
          "group flex items-center p-4 mb-3 bg-surface hover:bg-surface-hover rounded-2xl shadow-sm border border-border transition-all active:scale-[0.98] relative overflow-hidden",
          task.completed ? "opacity-60" : ""
        )}
      >
        <button
          onClick={handleToggleComplete}
          className={cn(
            "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mr-4 z-10",
            task.completed
              ? "bg-primary border-primary"
              : "border-muted-foreground/30 group-hover:border-primary"
          )}
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {task.completed && (
            <Check
              size={14}
              className="text-primary-foreground"
              strokeWidth={3}
            />
          )}
        </button>

        <div className="flex-1 min-w-0 z-10">
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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1">
              <span
                className={cn(
                  "flex items-center space-x-1",
                  isOverdue ? "text-red-500 font-semibold" : "text-accent"
                )}
              >
                <Clock size={12} aria-label="Time remaining" />
                <span>{timeLeft}</span>
              </span>
              <span className="text-muted-foreground flex items-center space-x-1">
                <Calendar size={12} aria-label="Deadline" />
                <span>{formatDeadlineDisplay(task.deadline)}</span>
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-1 shrink-0 ml-2">
          {task.completed ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleComplete();
              }}
              className="p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
              title="Move back to tasks"
              aria-label="Move back to active tasks"
            >
              <RotateCcw size={16} />
            </button>
          ) : (
            <>
              <Link
                to={`/edit/${task.id}`}
                className="p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                title="Edit"
                aria-label="Edit task"
              >
                <Pencil size={16} />
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
                className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </motion.div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}
