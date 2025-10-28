import PageHeading from "@/components/PageHeading";
import * as Ch from "@chakra-ui/react";

export function meta() {
  return [{ title: `${import.meta.env.VITE_APP_NAME} | About` }];
}

export default function About() {
  return (
    <>
      <PageHeading>About</PageHeading>
      <Ch.Card.Root size={"sm"}>
        <Ch.Card.Header>
          <Ch.Card.Title>About the App</Ch.Card.Title>
        </Ch.Card.Header>
        <Ch.Card.Body>
          <Ch.Text>
            {import.meta.env.VITE_APP_NAME} is a free and open-source music
            downloader built with Electron, TypeScript, and Python.
          </Ch.Text>
        </Ch.Card.Body>
      </Ch.Card.Root>
    </>
  );
}
