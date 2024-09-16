import axios from "axios";
import { UserResponseWithPagination } from "./types";

const API_URL = "https://reqres.in/api";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Erreur réseau");
  }
};

export const getUsers = async (
  page: number = 1,
  perPage: number = 10
): Promise<UserResponseWithPagination> => {
  try {
    const response = await axios.get<UserResponseWithPagination>(
      `${API_URL}/users?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default { login, getUsers };
