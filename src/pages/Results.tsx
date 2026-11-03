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
import { useCatStore } from "../stores/catStore";
import { useMembersStore } from "../stores/membersStore";
import { usePreregisterStore } from "../stores/preregisterStore";
import { useResultsStore } from "../stores/resultsStore";

export default function Results() {
  const { preregisterState, bulkAddPreregisterItems } = usePreregisterStore();
  const { meetingId, event, gender } = useCatStore();
  const members = useMembersStore((s) => s.members);
  const results = useResultsStore((s) => s.results);
  const setResultsForScope = useResultsStore((s) => s.setResultsForScope);
  const [preregisterCheckedState, setPreregisterCheckedState] =
    React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");

  const scopeResults = React.useMemo(
    () => results?.[meetingId]?.[event]?.[gender] ?? [],
    [results, meetingId, event, gender],
  );

  const availableMembers = React.useMemo(() => {
    const filteredMembers = members
      .filter((member) => member.gender === gender)
      .filter(
        (member) => !scopeResults.some((title) => title === member.title),
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

  const addResult = (title: string) => {
    setResultsForScope(meetingId, event, gender, [...scopeResults, title]);
  };

  const trimmed = searchValue.trim();
  const hasExactMatch = availableMembers.some(
    (m) => m.title.toLowerCase() === trimmed.toLowerCase(),
  );
  const optionsData: { value: string; label: string; isCustom?: boolean }[] = [
    ...availableMembers.map((m) => ({ value: m.title, label: m.title })),
    ...(trimmed && !hasExactMatch
      ? [{ value: trimmed, label: trimmed, isCustom: true }]
      : []),
  ];

  const handleOptionSubmit = (value: string) => {
    addResult(value);
    setTimeout(() => setSearchValue(""), 0);
  };

  const renderOption = ({
    option,
  }: {
    option: { value: string; isCustom?: boolean };
  }) =>
    option.isCustom ? (
      <Text c="blue" fw={500}>
        Add “{option.value}”
      </Text>
    ) : (
      <Text>{option.value}</Text>
    );

  const addScopeToPreregister = () =>
    bulkAddPreregisterItems(
      scopeResults.map(
        (title) => members.find((j) => j.title === title) || null,
      ),
    );

  const preregisterSwitch = (
    <Switch
      label="Preregistered"
      checked={preregisterCheckedState}
      onChange={(e) => setPreregisterCheckedState(e.currentTarget.checked)}
    />
  );

  const removeResult = (index: number) => {
    setResultsForScope(
      meetingId,
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
    setResultsForScope(meetingId, event, gender, items);
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

      {meetingId && event && gender ? (
        <Stack gap={8} p={{ base: 4, sm: 8 }}>
          <Paper
            shadow="md"
            withBorder
            p={{ base: 6, sm: 8 }}
            pos="sticky"
            top="calc(var(--app-shell-header-height) + 8px)"
            style={{ zIndex: 100 }}
          >
            {/* Desktop: single row */}
            <Group align="flex-end" visibleFrom="sm">
              <Autocomplete
                style={{ flex: 1, minWidth: 0 }}
                data={optionsData}
                placeholder="Member"
                value={searchValue}
                onChange={setSearchValue}
                onOptionSubmit={handleOptionSubmit}
                renderOption={renderOption}
              />
              <Group>
                {preregisterSwitch}
                <Button
                  leftSection={<IconUserPlus size={16} />}
                  onClick={addScopeToPreregister}
                  size="sm"
                >
                  Add to Preregister
                </Button>
              </Group>
            </Group>

            {/* Mobile: stacked */}
            <Stack gap="xs" hiddenFrom="sm">
              <Autocomplete
                style={{ width: "100%" }}
                data={optionsData}
                placeholder="Member"
                value={searchValue}
                onChange={setSearchValue}
                onOptionSubmit={handleOptionSubmit}
                renderOption={renderOption}
              />
              <Group justify="space-between" wrap="nowrap">
                {preregisterSwitch}
                <Button
                  leftSection={<IconUserPlus size={16} />}
                  onClick={addScopeToPreregister}
                  size="sm"
                >
                  Add Preregister
                </Button>
              </Group>
            </Stack>
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
                  <Stack gap={8}>
                    {scopeResults.map((title, index) => (
                      <Draggable
                        key={title}
                        index={index}
                        draggableId={`${title}_id`}
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
                                {`${index + 1}. ${title}`}
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
