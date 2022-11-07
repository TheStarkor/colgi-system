import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AutoSearch from "../pages/AutoSearch";
import SwitchPrompt from "../pages/SwitchPrompt";
import Rating from "../pages/Rating";

const Router = () => {
  return(
    <Suspense>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auto-search" element={<AutoSearch />} />
        <Route exact path="/switch-prompt" element={<SwitchPrompt />} />
        <Route exact path="/rating" element={<Rating />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  )
};

export default Router;
