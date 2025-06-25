/* eslint-disable no-debugger */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

export const ExpenseTable = ({ data, onEdit, onDelete }) => {
  const [sendingEdit, setSendingEdit] = useState(false);
  const [sendingDelete, setSendingDelete] = useState(false);
  const [isEditingId, setIsEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ monthIso: "", amountStr: "" });

  const startEditing = (item) => {
    setIsEditingId(item.id);
    setEditValues({ monthIso: item.monthIso, amountStr: item.amount });
  };

  const handleConfirmEdit = (id) => {
    setSendingEdit(true);
    onEdit({ id, ...editValues })
      .then(() => {
        setIsEditingId(null);
      })
      .finally(() => {
        setSendingEdit(false);
      });
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = (id) => {
    setSendingDelete(true);
    onDelete(id)
      .finally(() => {
        setSendingDelete(false);
      })
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Month (YYYY-MM)</TableCell>
            <TableCell>Amount (€)</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => {
            const isEditing = isEditingId === item.id;

            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>

                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      value={editValues.monthIso}
                      onChange={(e) => handleChange("monthIso", e.target.value)}
                    />
                  ) : (
                    `${item.monthIso} (${item.monthStr})`
                  )}
                </TableCell>

                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      type="number"
                      value={editValues.amountStr}
                      onChange={(e) => handleChange("amountStr", e.target.value)}
                    />
                  ) : (
                    `€${item.amount}`
                  )}
                </TableCell>

                <TableCell align="center">
                  {isEditing ? (
                    <IconButton
                      onClick={() => handleConfirmEdit(item.id)}
                      disabled={sendingEdit}
                    >
                      <CheckIcon
                        color="success"
                        sx={{ opacity: sendingEdit ? '0.5' : '1' }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => startEditing(item)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  )}

                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    disabled={sendingDelete}
                  >
                    <DeleteIcon
                      color="error"
                      sx={{ opacity: sendingDelete ? '0.5' : '1' }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
