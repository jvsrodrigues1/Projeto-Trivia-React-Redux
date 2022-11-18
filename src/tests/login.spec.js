import React from "react";
import App from "../App";
import tokenResponse from "./mocks/token";
import questionsResponse from "./mocks/questions";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";