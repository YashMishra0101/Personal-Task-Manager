import React, { useState, useRef } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ArrowLeft, Clock, Calendar as CalendarIcon } from "lucide-react";
import { endOfDay, format } from "date-fns";

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

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
      description: description.trim(),
      deadline,
    });

    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <Layout title="Add New Task">
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        {/* Heading Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Heading <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Complete project proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-muted-foreground/50 text-primary transition-all"
            required
            autoFocus
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Description <span className="text-xs">(Optional)</span>
          </label>
          <textarea
            placeholder="Add more details about this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base placeholder:text-muted-foreground/50 text-primary transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Date Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <div className="relative">
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                min={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 pr-10 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-primary transition-all"
              />
              <CalendarIcon
                size={18}
                onClick={() => dateInputRef.current?.showPicker()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              />
            </div>
          </div>

          {/* Time Field with Clock Icon */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Time (Optional)
            </label>
            <div className="relative">
              <input
                ref={timeInputRef}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!date}
                className="w-full p-3 pr-10 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-primary disabled:opacity-50 transition-all"
              />
              <Clock
                size={18}
                onClick={() => timeInputRef.current?.showPicker()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors disabled:opacity-50"
              />
            </div>
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
