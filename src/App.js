import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchByArtist from "./components/spotify/SearchByArtist";
import NewReleases from "./components/spotify/NewReleases";

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid my-4">
          <Routes>
            <Route exact path="/" element={<NewReleases  />} />
            <Route exact path="/search/artist" element={<SearchByArtist />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
