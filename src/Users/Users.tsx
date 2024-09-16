import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { User } from "../types";
import { getUsers } from "../service";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<2 | 5 | 10>(5);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      setError(null);
      try {
        const userData = await getUsers(page, itemsPerPage);
        setUsers(userData.data);
        const calculatedTotal = userData.total;
        setTotal(userData.total);
        if (page > Math.ceil(calculatedTotal / itemsPerPage)) {
          setPage(1);
        }
        setLoading(false);
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, itemsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const logout = () => {
    window.location.href = "/";
  };

  return !loading ? (
    <div className="container">
      <div className="user-top-page">
        <div>
          <Typography color="primary" sx={{ textTransform: "uppercase" }}>
            Users page
          </Typography>
        </div>
        <Button
          type="submit"
          title="Logout"
          variant="outlined"
          color="error"
          disabled={loading}
          onClick={logout}
          sx={{ width: "195px", height: "56px" }}
        >
          Logout
        </Button>
      </div>
      {error && <Typography color="error">{error}</Typography>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt={user.first_name} width={50} />
              </td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormControl sx={{ width: "195px", height: "56px", marginTop: "30px" }}>
        <InputLabel htmlFor="items-per-page-select">
          Number of users per page
        </InputLabel>
        <Select
          id="items-per-page-select"
          value={itemsPerPage}
          label="Number of users per page"
          aria-label="Number of users per page"
          onChange={(event) =>
            setItemsPerPage(event.target.value as 2 | 5 | 10)
          }
          sx={{ width: "195px", height: "56px" }}
        >
          <MenuItem value={2}>2 Users</MenuItem>
          <MenuItem value={5}>5 Users</MenuItem>
          <MenuItem value={10}>10 Users</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        count={Math.ceil(total / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "30px" }}
      />
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Users;
