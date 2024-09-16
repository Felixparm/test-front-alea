import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../Login/Login";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing
import service from "../service";
import { useAuth } from "../authProvider";

jest.mock("../service");
jest.mock("../authProvider");

const mockSetIsAuthenticated = jest.fn();

(useAuth as jest.Mock).mockReturnValue({
  setIsAuthenticated: mockSetIsAuthenticated,
});

describe("Login pages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Login pages DOM", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("success login", async () => {
    (service.login as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@success.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(service.login).toHaveBeenCalledWith(
        "test@success.com",
        "password12345"
      );
    });
    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    });
  });
});

test("error login", async () => {
  const errorMessage = "user not found";
  (service.login as jest.Mock).mockRejectedValueOnce({ error: errorMessage });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@fail.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password12345" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  await waitFor(() => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
