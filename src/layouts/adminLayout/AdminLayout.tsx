import { MantineProvider } from "@mantine/core";

export default function AdminLayout({ children }) {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}
