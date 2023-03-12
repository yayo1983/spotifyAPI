import NavBar from "./components/NavBar";
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewReleases from "./components/spotify/NewReleases";

const SearchByArtist = React.lazy(() => import('./components/spotify/SearchByArtist'));

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid my-4">
          <Routes>
            <Route exact path="/" element={<NewReleases  />} />
            <Route exact path="/search/artist" element={<Suspense fallback={<div>Loading...</div>}> <SearchByArtist />  </Suspense>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
