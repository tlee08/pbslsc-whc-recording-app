import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, Button, Paper, Toolbar, Typography } from "@mui/material";
import { useCatStore } from "../stores/catStore";
import { useEventStructureStore } from "../stores/eventStructureStore";
import { useMembersStore } from "../stores/membersStore";
import { usePreregisterStore } from "../stores/preregisterStore";
import { useResultsStore } from "../stores/resultsStore";
import {
  downloadJson,
  uploadEventStructure,
  uploadMembers,
  uploadResults,
} from "../utils/storageUtils";

export default function Admin() {
  const eventStructure = useEventStructureStore((s) => s.eventStructure);
  const members = useMembersStore((s) => s.members);
  const results = useResultsStore((s) => s.results);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}>
            <SettingsIcon /> Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="small"
          >
            Upload eventStructure
            <input
              type="file"
              onChange={uploadEventStructure}
              style={{ clip: "rect(0 0 0 0)", width: 1 }}
            />
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="small"
          >
            Upload members
            <input
              type="file"
              onChange={uploadMembers}
              style={{ clip: "rect(0 0 0 0)", width: 1 }}
            />
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="small"
          >
            Upload Results
            <input
              type="file"
              onChange={uploadResults}
              style={{ clip: "rect(0 0 0 0)", width: 1 }}
            />
          </Button>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            p: { xs: 1, sm: 2 },
            gap: { xs: 1, sm: 2 },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            onClick={() => downloadJson(results, "whc_results.json")}
            fullWidth={false}
            size="small"
          >
            Download Results
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              useEventStructureStore.getState().reset();
              useMembersStore.getState().reset();
              useResultsStore.getState().reset();
              useCatStore.getState().reset();
              usePreregisterStore.getState().reset();
            }}
            startIcon={<DeleteIcon />}
            color="error"
            size="small"
          >
            Clear All Data
          </Button>
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 2 },
          }}
        >
          {[
            { title: "eventStructure", data: eventStructure },
            { title: "members", data: members },
            { title: "results", data: results },
          ].map(({ title, data }) => (
            <Paper
              key={title}
              elevation={3}
              sx={{
                p: { xs: 1, sm: 2 },
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {title}
              </Typography>
              <Box
                sx={{
                  maxHeight: { xs: "200px", sm: "400px" },
                  overflow: "auto",
                  backgroundColor: "grey.100",
                  p: 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    margin: 0,
                    fontSize: { xs: "0.625rem", sm: "0.75rem" },
                    wordBreak: "break-all",
                  }}
                >
                  {JSON.stringify(data, null, 2)}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
