import React from "react";
import { useTasks } from "../context/TaskContext";
import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";

export default function Completed() {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <Layout title="Done">
      {completedTasks.length > 0 ? (
        <div className="space-y-1">
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-lg font-medium">No completed tasks yet.</p>
          <p className="text-sm mt-2">Complete some tasks to see them here!</p>
        </div>
      )}
    </Layout>
  );
}
