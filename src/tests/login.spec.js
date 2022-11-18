import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";

describe("Verifica a página de Login", () => {
  test("Verifica se os inputs são renderizados na tela", () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    expect(name).toHaveValue("");
    expect(email).toHaveValue("");
  });

  test("Verifica se o botão é habilitado após preencher os inputs", () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByTestId("btn-play");

    expect(button).toBeDisabled();

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(name, "meunome");
    userEvent.type(email, "meuemail");

    expect(button).toBeEnabled();
  });
  
});