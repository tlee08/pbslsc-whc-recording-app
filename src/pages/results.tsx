import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useCatContext } from "../hooks/useCatContext";
import { usePreregisterContext } from "../hooks/usePreregisterContext";
import type Member from "../models/Member";
import type MemberShort from "../models/MemberShort";
import { readMembers, readResults, writeResults } from "../utils/storageUtils";

export default function Results() {
  const { preregisterState, bulkAddPreregisterItems } = usePreregisterContext();
  const { date, event, gender } = useCatContext();
  const [preregisterCheckedState, setPreregisterCheckedState] =
    React.useState<boolean>(false);
  const members = React.useMemo(() => readMembers(), []);

  const [resultsState, setResultsState] = React.useState<MemberShort[]>(() => {
    if (!date || !event || !gender) return [];
    return readResults()?.[date]?.[event]?.[gender] ?? [];
  });

  React.useEffect(() => {
    if (!date || !event || !gender) return;
    setResultsState(readResults()?.[date]?.[event]?.[gender] ?? []);
  }, [date, event, gender]);

  React.useEffect(() => {
    if (!date || !event || !gender) return;
    writeResults(date, event, gender, resultsState);
  }, [date, event, gender, resultsState]);

  const availableMembers = React.useMemo(() => {
    const filteredMembers = members
      .filter((member) => member.gender === gender)
      .filter(
        (member) => !resultsState.some((result) => result.id === member.id),
      );
    return preregisterCheckedState
      ? filteredMembers.filter((i) =>
          preregisterState.some((j) => j.title === i.title),
        )
      : filteredMembers;
  }, [
    members,
    resultsState,
    gender,
    preregisterState,
    preregisterCheckedState,
  ]);

  const addResult = (member: Member) => {
    const newResult: MemberShort = { id: member.id, title: member.title };
    setResultsState([...resultsState, newResult]);
  };

  const removeResult = (index: number) => {
    setResultsState(resultsState.filter((_, i) => i !== index));
  };

  const reorderResults: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const resultsTemp = [...resultsState];
    const [removed] = resultsTemp.splice(startIndex, 1);
    resultsTemp.splice(endIndex, 0, removed);
    setResultsState(resultsTemp);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}>
            <ListIcon /> Results
          </Typography>
        </Toolbar>
      </AppBar>

      {date && event && gender ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            p: { xs: 1, sm: 2 },
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              p: { xs: 1, sm: 2 },
              gap: { xs: 1, sm: 2 },
              position: { xs: "static", sm: "sticky" },
              top: { sm: 8 },
              zIndex: 100,
            }}
          >
            <Autocomplete
              sx={{ display: "flex", flex: 1, minWidth: 0 }}
              options={availableMembers}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Member" />}
              onChange={(_, value) => {
                if (value !== null) addResult(value);
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                alignItems: { sm: "center" },
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={preregisterCheckedState}
                    onChange={(e) =>
                      setPreregisterCheckedState(e.target.checked)
                    }
                  />
                }
                label={<Typography variant="body2">Preregistered</Typography>}
                sx={{ mr: { sm: 1 } }}
              />
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={() =>
                  bulkAddPreregisterItems(
                    resultsState.map(
                      (i) => members.find((j) => j.title === i.title) || null,
                    ),
                  )
                }
                size="small"
              >
                Add
              </Button>
            </Box>
          </Paper>

          <DragDropContext onDragEnd={reorderResults}>
            <Droppable droppableId="results_id">
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  elevation={3}
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    p: { xs: 1, sm: 2 },
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  {resultsState.map((result, index) => (
                    <Draggable
                      key={result.id}
                      index={index}
                      draggableId={`${result.id}_id`}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          variant="outlined"
                          sx={{ display: "flex", flex: 1 }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                              py: { xs: 1, sm: 2 },
                              "&:last-child": { pb: { xs: 1, sm: 2 } },
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                display: "flex",
                                flex: 1,
                                fontSize: { xs: "0.875rem", sm: "1rem" },
                              }}
                            >
                              {`${index + 1}. ${result.title}`}
                            </Typography>
                            <IconButton onClick={() => removeResult(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Please select the date, event, and gender
          </Typography>
        </Box>
      )}
    </Box>
  );
}
