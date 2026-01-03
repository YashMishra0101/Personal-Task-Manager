import React from "react";
import { useTasks } from "../context/TaskContext";
import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { isCreatedToday } from "../lib/timeUtils";

export default function Home() {
  const { tasks, loading } = useTasks();

  const activeTasks = tasks.filter((t) => !t.completed);

  // Group tasks
  const createdToday = activeTasks.filter((t) => isCreatedToday(t.createdAt));
  const remaining = activeTasks.filter((t) => !isCreatedToday(t.createdAt));

  return (
    <Layout title="Tasks Manager">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground animate-pulse">
          <div className="h-4 w-32 bg-surface-hover rounded mb-2"></div>
          <div className="h-4 w-24 bg-surface-hover rounded"></div>
        </div>
      ) : activeTasks.length > 0 ? (
        <div className="space-y-8">
          {/* Section 1: Created Today */}
          {createdToday.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-primary/80 mb-4 px-1">
                Created Today
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {createdToday.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {/* Section 2: Remaining */}
          {remaining.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-primary/80 mb-4 px-1">
                Remaining Tasks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {remaining.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-48 h-48 mb-6 bg-surface-hover rounded-full flex items-center justify-center border border-border">
            <div className="text-6xl">✨</div>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">
            All Caught Up!
          </h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            You have no active tasks. Tap the + button to add a new one.
          </p>

          <Link
            to="/add"
            className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <Plus className="mr-2" size={20} /> Add Task
          </Link>
        </div>
      )}
    </Layout>
  );
}
