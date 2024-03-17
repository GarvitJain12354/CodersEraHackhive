"use client";

import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

const Wrapper = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <div className="w-full">{children}</div>
      </Provider>
    </>
  );
};

export default Wrapper;
