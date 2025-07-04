import { useDashboardFilterStore } from "@/store/dashboardFilterStore";
import { useResultStore } from "@/store/resultStore";
import { useExerciseStore } from "@/store/useExerciseStore";
import { useMemo } from "react";
import { isWithinInterval, parseISO } from "date-fns";
import { ResultResponse } from "@/infra/api/resultsApi";

export const useFilteredResults = (): {
  filteredResults: ResultResponse[];
} => {
  const { records } = useResultStore();
  const { dateRange, selectedExercises, onlyFavorites } =
    useDashboardFilterStore();
  const { favorites } = useExerciseStore();

  const filteredResults = useMemo(() => {
    return records.filter((res) => {
      const date = parseISO(res.timestamp);

      // Filtro por fecha
      if (
        dateRange[0] &&
        dateRange[1] &&
        !isWithinInterval(date, { start: dateRange[0], end: dateRange[1] })
      ) {
        return false;
      }

      // Filtro por ejercicios seleccionados
      if (
        selectedExercises.length > 0 &&
        !selectedExercises.includes(res.exercise_id)
      ) {
        return false;
      }

      // Filtro por favoritos
      if (onlyFavorites && !favorites.includes(res.exercise_id)) {
        return false;
      }

      return true;
    });
  }, [records, dateRange, selectedExercises, onlyFavorites, favorites]);

  return { filteredResults };
};
