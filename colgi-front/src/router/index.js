import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AutoSearch from "../pages/AutoSearch";
import SwitchPrompt from "../pages/SwitchPrompt";
import Rating from "../pages/Rating";
import Generator from "../pages/Generator";
import TreePrompt from "../pages/TreePrompt";
import Helper from "../pages/Helper";
import HelperBase from "../pages/HelperBase";

const Router = () => {
  return(
    <Suspense>
      <Routes>
        <Route exact path="/" element={<Helper />} />
        <Route exact path="/auto-search" element={<AutoSearch />} />
        <Route exact path="/switch-prompt" element={<SwitchPrompt />} />
        <Route exact path="/rating" element={<Rating />} />
        <Route exact path="/generator" element={<Generator />} />
        <Route exact path="/tree-prompt" element={<TreePrompt />} />
        <Route exact path="/helper" element={<Helper />} />
        <Route exact path="/helper-base" element={<HelperBase />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  )
};

export default Router;
