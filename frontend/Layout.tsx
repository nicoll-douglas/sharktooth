import { Outlet, useLocation } from "react-router-dom";
import "./app.css";
import { Provider as ChProvider } from "@/components/chakra-ui/provider";
import * as Ch from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "./components/chakra-ui/toaster";

const queryClient = new QueryClient();

/**
 * The application layout.
 */
export default function Layout() {
  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ChProvider>
        <Ch.Container
          py={"4"}
          px={"4"}
          minHeight={"100dvh"}
          display={"flex"}
          gap={"4"}
          alignItems={"start"}
          fluid
        >
          <Sidebar />
          <Ch.Stack
            gap={"4"}
            pt={"8"}
            mt={"2px"}
            flex={1}
            overflow={pathname === "/" ? "inherit" : "auto"}
          >
            <Outlet />
          </Ch.Stack>
          <Toaster />
        </Ch.Container>
      </ChProvider>
    </QueryClientProvider>
  );
}
