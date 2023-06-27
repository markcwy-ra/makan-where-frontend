//----------- React -----------//

import { Navigate, Route, Routes } from "react-router-dom";

//---------- Pages ----------//

import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen";
import LoginScreen from "./Pages/LoginScreen/LoginScreen";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import MapScreen from "./Pages/MapScreen/MapScreen";
import SearchScreen from "./Pages/SearchScreen/SearchScreen";
import ProfileScreen from "./Pages/ProfileScreen/ProfileScreen";
import RestaurantScreen from "./Pages/Restaurant/RestaurantScreen/RestaurantScreen";
import RestaurantReview from "./Pages/Restaurant/RestaurantReview/RestaurantReview";
import MakanlistScreen from "./Pages/MakanlistScreen/MakanlistScreen";

//---------- Components ----------//

import SplashOutlet from "./Outlets/SplashOutlet";
import MainOutlet from "./Outlets/MainOutlet";

//---------- Others ----------//

import "./App.css";
import ResetPassword from "./Pages/LoginScreen/ResetPassword";

//------------------------------//

function App() {
  return (
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
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/places">
            <Route index element={<Navigate to="/" />} />
            <Route path=":placeId">
              <Route index element={<RestaurantScreen />} />
              <Route path=":reviewId" element={<RestaurantReview />} />
            </Route>
          </Route>
          <Route path="makanlists">
            <Route index element={<Navigate to="/" />} />
            <Route path=":listId" element={<MakanlistScreen />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
