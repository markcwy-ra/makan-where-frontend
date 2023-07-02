//----------- React -----------//

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//---------- Pages ----------//

import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen";
import LoginScreen from "./Pages/LoginScreen/LoginScreen";
import ResetPassword from "./Pages/LoginScreen/ResetPassword";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import MapScreen from "./Pages/MapScreen/MapScreen";
import SearchScreen from "./Pages/SearchScreen/SearchScreen";
import ProfileScreen from "./Pages/Profile/ProfileScreen/ProfileScreen";
import FavouritesScreen from "./Pages/Profile/FavouritesScreen/FavouritesScreen";
import RestaurantScreen from "./Pages/Restaurant/RestaurantScreen/RestaurantScreen";
import RestaurantReview from "./Pages/Restaurant/RestaurantReview/RestaurantReview";
import MakanlistScreen from "./Pages/MakanlistScreen/MakanlistScreen";

//---------- Components ----------//

import SplashOutlet from "./Outlets/SplashOutlet";
import MainOutlet from "./Outlets/MainOutlet";

//---------- Others ----------//

import "./App.css";
import FollowsScreen from "./Pages/Profile/FollowsScreen/FollowsScreen";

//---------- Context ----------//

const UserContext = React.createContext(null);

//------------------------------//

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/">
          <Route element={<SplashOutlet />}>
            <Route index element={<SplashScreen />} />
            <Route path="/login">
              <Route index element={<LoginScreen />} />
              <Route path="reset" element={<ResetPassword />} />
            </Route>
            <Route path="/signup" element={<SignUpScreen />} />
          </Route>
          <Route element={<MainOutlet />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/profile">
              <Route index element={<ProfileScreen />} />
              <Route path="favourites" element={<FavouritesScreen />} />
              <Route path="follows" element={<FollowsScreen />} />
            </Route>
            <Route path="/user/:userId">
              <Route index element={<ProfileScreen />} />
              <Route path="follows" element={<FollowsScreen />} />
            </Route>
            <Route path="/places">
              <Route index element={<Navigate to="/" />} />
              <Route path=":placeId">
                <Route index element={<RestaurantScreen />} />
                <Route path=":userId" element={<RestaurantReview />} />
              </Route>
            </Route>
            <Route path="makanlists">
              <Route index element={<Navigate to="/" />} />
              <Route path=":userId/:listId" element={<MakanlistScreen />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
