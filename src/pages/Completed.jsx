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
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p>No completed tasks yet.</p>
        </div>
      )}
    </Layout>
  );
}
