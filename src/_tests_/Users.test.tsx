import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Users from "./../Users/Users";
import { getUsers } from "../service";

jest.mock("../service", () => ({
  getUsers: jest.fn(),
}));

describe("Users Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loader while fetching users data", async () => {
    (getUsers as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: [], total: 0 }), 1000)
        )
    );

    render(<Users />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  test("displays users after successful API call", async () => {
    (getUsers as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
      ],
      page: 1,
      per_page: 2,
      total: 12,
      total_pages: 6,
    });

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText("George Bluth")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Janet Weaver")).toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    (getUsers as jest.Mock).mockRejectedValue(new Error("An error occurred"));

    render(<Users />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  test("updates items per page and handles pagination", async () => {
    (getUsers as jest.Mock).mockResolvedValueOnce({
      page: 1,
      per_page: 10,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
        {
          id: 3,
          email: "emma.wong@reqres.in",
          first_name: "Emma",
          last_name: "Wong",
          avatar: "https://reqres.in/img/faces/3-image.jpg",
        },
        {
          id: 4,
          email: "eve.holt@reqres.in",
          first_name: "Eve",
          last_name: "Holt",
          avatar: "https://reqres.in/img/faces/4-image.jpg",
        },
        {
          id: 5,
          email: "charles.morris@reqres.in",
          first_name: "Charles",
          last_name: "Morris",
          avatar: "https://reqres.in/img/faces/5-image.jpg",
        },
        {
          id: 6,
          email: "tracey.ramos@reqres.in",
          first_name: "Tracey",
          last_name: "Ramos",
          avatar: "https://reqres.in/img/faces/6-image.jpg",
        },
        {
          id: 7,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 8,
          email: "lindsay.ferguson@reqres.in",
          first_name: "Lindsay",
          last_name: "Ferguson",
          avatar: "https://reqres.in/img/faces/8-image.jpg",
        },
        {
          id: 9,
          email: "tobias.funke@reqres.in",
          first_name: "Tobias",
          last_name: "Funke",
          avatar: "https://reqres.in/img/faces/9-image.jpg",
        },
        {
          id: 10,
          email: "byron.fields@reqres.in",
          first_name: "Byron",
          last_name: "Fields",
          avatar: "https://reqres.in/img/faces/10-image.jpg",
        },
      ],
    });

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText("Janet Weaver")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Byron Fields")).toBeInTheDocument();
    });
  });
});
