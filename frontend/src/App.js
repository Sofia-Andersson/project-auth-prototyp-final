import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { WelcomeGratitude } from "./components/WelcomeGratitude"
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";

import { user } from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeGratitude />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
