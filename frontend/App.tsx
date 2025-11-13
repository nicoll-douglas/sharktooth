import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import About from "./routes/about";
import Download from "./routes/download";
import Downloads from "./routes/downloads";
import Settings from "./routes/settings";
import SpotifyLibrary from "./routes/spotify-library";
import "./app.css";

/**
 * The main application.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Download />} />
          <Route path="about" element={<About />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="spotify-library" element={<SpotifyLibrary />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
