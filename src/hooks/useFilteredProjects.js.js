import { useState, useMemo } from "react";

export const useFilteredProjects = () => {
  const [projects, setProjects] = useState([]); // aquí tú puedes cargar proyectos desde supabase o props
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) =>
        status ? p.status === status : true
      )
      .filter((p) =>
        search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((p) =>
        selectedDate ? p.startDate >= selectedDate : true
      );
  }, [projects, status, search, selectedDate]);

  return {
    projects,
    setProjects,
    filteredProjects,
    status,
    setStatus,
    search,
    setSearch,
    selectedDate,
    setSelectedDate,
  };
};
