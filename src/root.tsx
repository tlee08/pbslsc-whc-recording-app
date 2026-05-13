import "@mantine/core/styles.css";
import { AppShell, Burger, Divider, Group, MantineProvider, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import type { ReactNode } from "react";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import CatDropdownSet from "./components/shared/CatDropdownSet";

const NAV_ITEMS = ["Preregister", "Results", "Admin"];

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
          <AppShell
            header={{ height: 60 }}
            navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
            padding={{ base: "xs", sm: "md" }}
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Title order={4}>WHC Race Scorer</Title>
              </Group>
            </AppShell.Header>

            <AppShell.Navbar>
              <CatDropdownSet />
              <Divider />
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item}
                  component={Link}
                  to={`/${item}`}
                  label={item}
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
  return <div>Error</div>;
}
