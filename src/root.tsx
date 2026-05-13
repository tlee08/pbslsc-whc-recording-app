import {
  AppShell,
  Burger,
  Divider,
  Group,
  MantineProvider,
  NavLink,
  Notification,
  Stack,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import type { ReactNode } from "react";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import CatDropdownSet from "./components/shared/CatDropdownSet";
import { useErrorStore } from "./stores/errorStore";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Preregister", to: "/preregister" },
  { label: "Results", to: "/results" },
  { label: "Admin", to: "/admin" },
];

function ErrorNotifications() {
  const errors = useErrorStore((s) => s.errors);
  const dismiss = useErrorStore((s) => s.dismissError);

  if (errors.length === 0) return null;

  return (
    <Stack
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 9999,
        maxWidth: 360,
      }}
      gap="xs"
    >
      {errors.map((err) => (
        <Notification
          key={err.id}
          color="red"
          title={err.title}
          withCloseButton
          onClose={() => dismiss(err.id)}
        >
          {err.message}
        </Notification>
      ))}
    </Stack>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider>
          <ModalsProvider>
            <ErrorNotifications />
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 240,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
              }}
              padding={{ base: "xs", sm: "md" }}
            >
              <AppShell.Header>
                <Group h="100%" px="md">
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <Title order={4}>WHC Race Scorer</Title>
                </Group>
              </AppShell.Header>

              <AppShell.Navbar>
                <CatDropdownSet />
                <Divider />
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.label}
                    component={Link}
                    to={item.to}
                    label={item.label}
                    onClick={close}
                  />
                ))}
              </AppShell.Navbar>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </ModalsProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <Notification
      color="red"
      title="Something went wrong"
      withCloseButton={false}
    >
      {message}
    </Notification>
  );
}
