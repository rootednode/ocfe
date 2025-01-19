import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import surveysReducer from "./surveys";
import tablesReducer from "./tables";
import resultsReducer from "./results";
import usersReducer from "./users";

const rootReducer = (history: History) =>
  combineReducers({
    surveys: surveysReducer,
    tables: tablesReducer,
    results: resultsReducer,
    users: usersReducer,
    router: connectRouter(history),
  });

export default rootReducer;
