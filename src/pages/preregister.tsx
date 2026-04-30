import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useCatContext } from "../hooks/useCatContext";
import { usePreregisterContext } from "../hooks/usePreregisterContext";
import { readMembers } from "../utils/storageUtils";

export default function Preregister() {
  const { gender: genderState } = useCatContext();
  const {
    preregisterState,
    setPreregisterState,
    addPreregisterItem,
    removePreregisterItem,
  } = usePreregisterContext();
  const [clearDialogOpen, setClearDialogOpen] = React.useState(false);
  const members = React.useMemo(() => readMembers(), []);

  const filteredPreregisterState = React.useMemo(
    () => preregisterState.filter((member) => member.gender === genderState),
    [preregisterState, genderState],
  );
  const availableMembers = React.useMemo(
    () =>
      members
        .filter((member) => member.gender === genderState)
        .filter(
          (member) =>
            !preregisterState.some((prereg) => prereg.id === member.id),
        ),
    [members, genderState, preregisterState],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}>
            <PersonAddIcon /> Preregister
          </Typography>
        </Toolbar>
      </AppBar>

      {genderState ? (
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
                if (value) {
                  addPreregisterItem(value);
                }
              }}
            />
            <Button
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={() => setClearDialogOpen(true)}
              sx={{ whiteSpace: "nowrap" }}
            >
              Clear
            </Button>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              p: { xs: 1, sm: 2 },
              gap: { xs: 1, sm: 2 },
            }}
          >
            {filteredPreregisterState.map((member, index) => (
              <Card key={member.id} variant="outlined">
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
                    {member.title}
                  </Typography>
                  <IconButton
                    edge="end"
                    onClick={() => removePreregisterItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Paper>

          <Dialog
            open={clearDialogOpen}
            onClose={() => setClearDialogOpen(false)}
          >
            <DialogTitle>Clear Preregistered List</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This will clear the preregistered list for both genders. Are you
                sure you want to continue?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setPreregisterState([]);
                  setClearDialogOpen(false);
                }}
                variant="contained"
                color="error"
              >
                Clear All
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Please select the gender
          </Typography>
        </Box>
      )}
    </Box>
  );
}
