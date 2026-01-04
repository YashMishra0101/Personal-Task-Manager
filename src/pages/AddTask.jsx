import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ArrowLeft } from "lucide-react";
import { endOfDay, format } from "date-fns";

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    let deadline = null;
    if (date) {
      if (time) {
        deadline = new Date(`${date}T${time}`).toISOString();
      } else {
        // Default to end of day if time is missing
        deadline = endOfDay(new Date(date)).toISOString();
      }
    }

    await addTask({
      title,
      deadline,
    });

    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <Layout title="New Task">
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            What needs to be done?
          </label>
          <input
            type="text"
            placeholder="e.g. Add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-muted/50 border border-transparent focus:border-border focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-muted-foreground/50 text-primary transition-all"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              value={date}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-muted/50 border border-transparent focus:border-border focus:ring-2 focus:ring-primary/20 text-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Time (Optional)
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={!date}
              className="w-full p-3 rounded-xl bg-muted/50 border border-transparent focus:border-border focus:ring-2 focus:ring-primary/20 text-primary disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-8">
          <button
            type="submit"
            disabled={isSubmitting || !title}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
