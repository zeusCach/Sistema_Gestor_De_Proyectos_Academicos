import { useMemo } from "react";

const calculateDuration = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate - startDate;
  return Math.round(diff / (1000 * 60 * 60 * 24)); // días
};

export const useProjectMetrics = (projects = []) => {
  const metrics = useMemo(() => {
    if (projects.length === 0) {
      return {
        total: 0,
        avgDuration: 0,
        completed: 0,
      };
    }

    const total = projects.length;

    const completed = projects.filter((p) => p.status === "completed").length;

    const durations = projects.map((p) =>
      calculateDuration(p.startDate, p.endDate)
    );

    const avgDuration =
      durations.reduce((sum, d) => sum + d, 0) / durations.length;

    return {
      total,
      avgDuration: Math.round(avgDuration),
      completed,
    };
  }, [projects]);

  return { metrics };
};
