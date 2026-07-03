import {
  Button,
  Code,
  FileButton,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconDownload,
  IconSettings,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { useCatStore } from "../stores/catStore";
import { useMembersStore } from "../stores/membersStore";
import { usePreregisterStore } from "../stores/preregisterStore";
import { useResultsStore } from "../stores/resultsStore";
import {
  downloadJson,
  uploadMembers,
  uploadResults,
} from "../utils/storageUtils";

export default function Admin() {
  const members = useMembersStore((s) => s.members);
  const results = useResultsStore((s) => s.results);

  return (
    <Stack>
      <Title order={2}>
        <IconSettings
          size={28}
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />
        Admin
      </Title>

      <Stack gap={{ base: 4, sm: 8 }} p={{ base: 4, sm: 8 }}>
        <Paper shadow="md" withBorder p={{ base: 6, sm: 8 }}>
          <Group gap={{ base: 4, sm: 8 }} justify="center">
            <FileButton onChange={uploadMembers} accept=".json">
              {(props) => (
                <Button
                  {...props}
                  leftSection={<IconUpload size={16} />}
                  size="sm"
                >
                  Upload members
                </Button>
              )}
            </FileButton>
            <FileButton onChange={uploadResults} accept=".json">
              {(props) => (
                <Button
                  {...props}
                  leftSection={<IconUpload size={16} />}
                  size="sm"
                >
                  Upload Results
                </Button>
              )}
            </FileButton>
          </Group>
        </Paper>

        <Paper shadow="md" withBorder p={{ base: 6, sm: 8 }}>
          <Group gap={{ base: 4, sm: 8 }} justify="center">
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={() => downloadJson(results, "whc_results.json")}
              size="sm"
            >
              Download Results
            </Button>
            <Button
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={() => {
                useMembersStore.getState().reset();
                useResultsStore.getState().reset();
                useCatStore.getState().reset();
                usePreregisterStore.getState().reset();
              }}
              size="sm"
            >
              Clear All Data
            </Button>
          </Group>
        </Paper>

        <Group grow align="flex-start" gap={{ base: 4, sm: 8 }} wrap="wrap">
          {[
            { title: "members", data: members },
            { title: "results", data: results },
          ].map(({ title, data }) => (
            <Paper key={title} shadow="md" withBorder p={{ base: 6, sm: 8 }}>
              <Text fw={700} mb="xs">
                {title}
              </Text>
              <ScrollArea h={{ base: 200, sm: 400 }} bg="gray.0" p={2}>
                <Code block style={{ wordBreak: "break-all" }}>
                  {JSON.stringify(data, null, 2)}
                </Code>
              </ScrollArea>
            </Paper>
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}
