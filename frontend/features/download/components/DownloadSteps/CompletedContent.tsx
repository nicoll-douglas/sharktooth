import * as Ch from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * A card that shows the completed content when all download steps are completed.
 */
export default function CompletedContent() {
  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Header>
        <Ch.Card.Title>Download Queued</Ch.Card.Title>
      </Ch.Card.Header>

      <Ch.Card.Body>
        <Ch.Text>
          Your download has been queued and should start shortly, check your{" "}
          <Ch.Link asChild>
            <Link to={"/downloads"}>downloads</Link>
          </Ch.Link>{" "}
          for updates.
        </Ch.Text>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
