//----------- React -----------//

import { Route, Routes } from "react-router-dom";

//---------- Pages ----------//

import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import MapScreen from "./Pages/MapScreen/MapScreen";
import SearchScreen from "./Pages/SearchScreen/SearchScreen";
import ProfileScreen from "./Pages/ProfileScreen/ProfileScreen";

//---------- Components ----------//

import MainOutlet from "./Outlets/MainOutlet";

//---------- Others ----------//

import "./App.css";

//------------------------------//

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainOutlet />}>
        <Route index element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
