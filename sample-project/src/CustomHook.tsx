import { useEffect, useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [fetchingTasks, setFetchingTasks] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const data: string[] = [];

      setTasks(data);
      setFetchingTasks(false);
    }

    if (fetchingTasks) {
      fetchTasks();
    }
  }, [fetchingTasks]);

  return [tasks, fetchingTasks];
};
