// ✅ src/features/dashboard/components/DashboardFilters.tsx
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDashboardFilterStore } from "@/store/dashboardFilterStore";
import { useExerciseStore } from "@/store/useExerciseStore";

export const DashboardFilters = () => {
  const {
    dateRange,
    selectedExercises,
    onlyFavorites,
    setDateRange,
    setSelectedExercises,
    setOnlyFavorites,
  } = useDashboardFilterStore();

  const { favorites } = useExerciseStore();
  const allExercises = [
    { id: "pushups", name: "Flexiones" },
    { id: "pullups", name: "Dominadas" },
    { id: "squats", name: "Sentadillas" },
    { id: "running", name: "6 KM" },
    { id: "plank", name: "Plancha" },
  ];

  const [open, setOpen] = useState(false);

  const handleSelectAll = () => {
    setSelectedExercises(allExercises.map((e) => e.id));
  };

  const handleClearAll = () => {
    setSelectedExercises([]);
  };

  return (
    <>
      <Box mb={2} textAlign="right">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Filtros
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Filtros del Dashboard</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} mt={1}>
              <Box display="flex" gap={2}>
                <DatePicker
                  label="Desde"
                  value={dateRange[0]}
                  onChange={(newValue) =>
                    setDateRange([newValue, dateRange[1]])
                  }
                  sx={{ flex: 1 }}
                />
                <DatePicker
                  label="Hasta"
                  value={dateRange[1]}
                  onChange={(newValue) =>
                    setDateRange([dateRange[0], newValue])
                  }
                  sx={{ flex: 1 }}
                />
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={500} mb={1}>
                  Ejercicios
                </Typography>
                <Box display="flex" gap={1} mb={1}>
                  <Button size="small" onClick={handleSelectAll}>
                    Seleccionar todos
                  </Button>
                  <Button size="small" onClick={handleClearAll}>
                    Limpiar selección
                  </Button>
                </Box>
                <Select
                  multiple
                  fullWidth
                  value={selectedExercises}
                  onChange={(e) =>
                    setSelectedExercises(
                      typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value
                    )
                  }
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    Selecciona ejercicios
                  </MenuItem>
                  {allExercises.map((ex) => (
                    <MenuItem key={ex.id} value={ex.id}>
                      {ex.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={onlyFavorites}
                    onChange={(e) => setOnlyFavorites(e.target.checked)}
                  />
                }
                label="Solo ejercicios favoritos"
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
