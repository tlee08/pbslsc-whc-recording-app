import {
  ActionIcon,
  Autocomplete,
  Button,
  Card,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash, IconUserPlus, IconX } from "@tabler/icons-react";
import React from "react";
import { useCatStore } from "../stores/catStore";
import { useMembersStore } from "../stores/membersStore";
import { usePreregisterStore } from "../stores/preregisterStore";

export default function Preregister() {
  const { gender: genderState } = useCatStore();
  const {
    preregisterState,
    setPreregisterState,
    addPreregisterItem,
    removePreregisterItem,
  } = usePreregisterStore();
  const members = useMembersStore((s) => s.members);

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

  const openClearConfirm = () =>
    modals.openConfirmModal({
      title: "Clear Preregistered List",
      children: (
        <Text size="sm">
          This will clear the preregistered list for both genders. Are you sure
          you want to continue?
        </Text>
      ),
      labels: { confirm: "Clear All", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => setPreregisterState([]),
    });

  return (
    <Stack>
      <Title order={2}>
        <IconUserPlus
          size={28}
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />
        Preregister
      </Title>

      {genderState ? (
        <Stack gap={{ base: 4, sm: 8 }} p={{ base: 4, sm: 8 }}>
          <Paper
            shadow="md"
            withBorder
            p={{ base: 6, sm: 8 }}
            pos={{ base: "static", sm: "sticky" }}
            top={{ sm: 8 }}
            style={{ zIndex: 100 }}
          >
            <Group>
              <Autocomplete
                style={{ flex: 1, minWidth: 0 }}
                data={availableMembers.map((m) => ({
                  value: m.title,
                  label: m.title,
                }))}
                placeholder="Member"
                onChange={(_value, option) => {
                  if (option) {
                    const member = availableMembers.find(
                      (m) => m.title === option.value,
                    );
                    if (member) addPreregisterItem(member);
                  }
                }}
              />
              <Button
                leftSection={<IconX size={16} />}
                onClick={openClearConfirm}
                style={{ whiteSpace: "nowrap" }}
              >
                Clear
              </Button>
            </Group>
          </Paper>

          <Paper shadow="md" withBorder p={{ base: 6, sm: 8 }}>
            <Stack gap={{ base: 4, sm: 8 }}>
              {filteredPreregisterState.map((member, index) => (
                <Card key={member.id} withBorder>
                  <Group justify="space-between" wrap="nowrap" py={4}>
                    <Text fz={{ base: "sm", sm: "md" }} style={{ flex: 1 }}>
                      {member.title}
                    </Text>
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => removePreregisterItem(index)}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Stack>
      ) : (
        <Text c="dimmed" ta="center" size="xl" p="xl">
          Please select the gender
        </Text>
      )}
    </Stack>
  );
}
