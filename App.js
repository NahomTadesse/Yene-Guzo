import { React, useEffect, useState } from "react";
import MainContainer from "./navigation/MainContainer";

import SplashScreen from "react-native-splash-screen";

import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import "react-native-gesture-handler";
import { DataProvider } from "./navigation/DataContext";
import Tele from "./navigation/Tele";
function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <DataProvider>

      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {/* <Tele/> */}
        <MainContainer />
   
      </ApplicationProvider>

    </DataProvider>
  );
}

export default App;
