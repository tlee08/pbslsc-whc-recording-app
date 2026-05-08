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
import { useCatStore } from "../stores/catStore";
import { useMembersStore } from "../stores/membersStore";
import { usePreregisterStore } from "../stores/preregisterStore";
import { useResultsStore } from "../stores/resultsStore";
import type Member from "../models/Member";
import type MemberShort from "../models/MemberShort";

export default function Results() {
  const { preregisterState, bulkAddPreregisterItems } = usePreregisterStore();
  const { date, event, gender } = useCatStore();
  const members = useMembersStore((s) => s.members);
  const results = useResultsStore((s) => s.results);
  const setResultsForScope = useResultsStore((s) => s.setResultsForScope);
  const [preregisterCheckedState, setPreregisterCheckedState] =
    React.useState<boolean>(false);

  const scopeResults = React.useMemo(
    () => results?.[date]?.[event]?.[gender] ?? [],
    [results, date, event, gender],
  );

  const availableMembers = React.useMemo(() => {
    const filteredMembers = members
      .filter((member) => member.gender === gender)
      .filter(
        (member) => !scopeResults.some((result) => result.id === member.id),
      );
    return preregisterCheckedState
      ? filteredMembers.filter((i) =>
          preregisterState.some((j) => j.title === i.title),
        )
      : filteredMembers;
  }, [
    members,
    scopeResults,
    gender,
    preregisterState,
    preregisterCheckedState,
  ]);

  const addResult = (member: Member) => {
    const newResult: MemberShort = { id: member.id, title: member.title };
    setResultsForScope(date, event, gender, [...scopeResults, newResult]);
  };

  const removeResult = (index: number) => {
    setResultsForScope(
      date,
      event,
      gender,
      scopeResults.filter((_, i) => i !== index),
    );
  };

  const reorderResults: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const items = [...scopeResults];
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);
    setResultsForScope(date, event, gender, items);
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
                if (value) addResult(value);
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
                    scopeResults.map(
                      (i) => members.find((j) => j.title === i.title) || null,
                    ),
                  )
                }
                size="small"
              >
                Add to Preregister
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
                  {scopeResults.map((result, index) => (
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
