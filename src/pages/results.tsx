import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
} from "@hello-pangea/dnd";
import {
  ActionIcon,
  Autocomplete,
  Button,
  Card,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { IconList, IconTrash, IconUserPlus } from "@tabler/icons-react";
import React from "react";
import type Member from "../models/Member";
import type MemberShort from "../models/MemberShort";
import { useCatStore } from "../stores/catStore";
import { useMembersStore } from "../stores/membersStore";
import { usePreregisterStore } from "../stores/preregisterStore";
import { useResultsStore } from "../stores/resultsStore";

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
    <Stack>
      <Title order={2}>
        <IconList
          size={28}
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />
        Results
      </Title>

      {date && event && gender ? (
        <Stack gap={{ base: 4, sm: 8 }} p={{ base: 4, sm: 8 }}>
          <Paper
            shadow="md"
            withBorder
            p={{ base: 6, sm: 8 }}
            pos={{ base: "static", sm: "sticky" }}
            top={{ sm: "calc(var(--app-shell-header-height) + 8px)" }}
            style={{ zIndex: 100 }}
          >
            <Group align="flex-end">
              <Autocomplete
                style={{ flex: 1, minWidth: 0 }}
                data={availableMembers.map((m) => ({
                  value: m.title,
                  label: m.title,
                }))}
                placeholder="Member"
                onOptionSubmit={(value) => {
                  const member = availableMembers.find(
                    (m) => m.title === value,
                  );
                  if (member) addResult(member);
                }}
              />
              <Group>
                <Switch
                  label="Preregistered"
                  checked={preregisterCheckedState}
                  onChange={(e) =>
                    setPreregisterCheckedState(e.currentTarget.checked)
                  }
                />
                <Button
                  leftSection={<IconUserPlus size={16} />}
                  onClick={() =>
                    bulkAddPreregisterItems(
                      scopeResults.map(
                        (i) => members.find((j) => j.title === i.title) || null,
                      ),
                    )
                  }
                  size="sm"
                >
                  Add to Preregister
                </Button>
              </Group>
            </Group>
          </Paper>

          <DragDropContext onDragEnd={reorderResults}>
            <Droppable droppableId="results_id">
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  shadow="md"
                  withBorder
                  p={{ base: 6, sm: 8 }}
                >
                  <Stack gap={{ base: 4, sm: 8 }}>
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
                            withBorder
                          >
                            <Group justify="space-between" wrap="nowrap" py={4}>
                              <Text fz={{ base: "sm", sm: "md" }}>
                                {`${index + 1}. ${result.title}`}
                              </Text>
                              <ActionIcon
                                variant="subtle"
                                color="gray"
                                onClick={() => removeResult(index)}
                              >
                                <IconTrash size={20} />
                              </ActionIcon>
                            </Group>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Paper>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
      ) : (
        <Text c="dimmed" ta="center" size="xl" p="xl">
          Please select the date, event, and gender
        </Text>
      )}
    </Stack>
  );
}
