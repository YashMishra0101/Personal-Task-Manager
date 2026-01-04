import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { format } from "date-fns";
import { endOfDay } from "date-fns";

export default function EditTask() {
  const { tasks, updateTask } = useTasks();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState(false);

  useEffect(() => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTitle(task.title);
      if (task.deadline) {
        const deadlineDate = new Date(task.deadline);
        setDate(format(deadlineDate, "yyyy-MM-dd"));
        // Only set time if it's not end of day
        const hours = deadlineDate.getHours();
        const minutes = deadlineDate.getMinutes();
        if (hours !== 23 || minutes !== 59) {
          setTime(format(deadlineDate, "HH:mm"));
        }
      }
    } else if (tasks.length > 0) {
      // Tasks are loaded but task not found
      setTaskNotFound(true);
    }
  }, [id, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    let deadline = null;
    if (date) {
      if (time) {
        deadline = new Date(`${date}T${time}`).toISOString();
      } else {
        deadline = endOfDay(new Date(date)).toISOString();
      }
    }

    await updateTask(id, {
      title,
      deadline,
    });

    setIsSubmitting(false);
    navigate("/");
  };

  if (taskNotFound) {
    return (
      <Layout title="Edit Task">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-primary mb-2">
            Task Not Found
          </h3>
          <p className="text-muted-foreground max-w-xs mx-auto mb-6">
            The task you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="edit-title"
            className="text-sm font-medium text-muted-foreground"
          >
            What needs to be done?
          </label>
          <input
            id="edit-title"
            type="text"
            placeholder="e.g. Update documentation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-muted/50 border border-transparent focus:border-border focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-muted-foreground/50 text-primary transition-all"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="edit-date"
              className="text-sm font-medium text-muted-foreground"
            >
              Date
            </label>
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-muted/50 border border-transparent focus:border-border focus:ring-2 focus:ring-primary/20 text-primary"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="edit-time"
              className="text-sm font-medium text-muted-foreground"
            >
              Time (Optional)
            </label>
            <input
              id="edit-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={!date}
              className="w-full p-3 rounded-xl bg-muted/50 border border-transparent focus:border-border focus:ring-2 focus:ring-primary/20 text-primary disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-8 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 py-4 bg-surface border border-border text-primary rounded-xl font-bold hover:bg-surface-hover transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title}
            className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
