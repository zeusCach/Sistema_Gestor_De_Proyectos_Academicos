import { useState, useMemo } from "react";

export const useFilteredProjects = (initialProjects = []) => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((p) =>
        status ? p.status === status : true
      )
      .filter((p) =>
        search 
          ? p.title.toLowerCase().includes(search.toLowerCase()) || 
            p.folio.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((p) =>
        selectedDate ? p.creation_date >= selectedDate : true
      );
  }, [initialProjects, status, search, selectedDate]);

  return {
    filteredProjects,
    status,
    setStatus,
    search,
    setSearch,
    selectedDate,
    setSelectedDate,
  };
};