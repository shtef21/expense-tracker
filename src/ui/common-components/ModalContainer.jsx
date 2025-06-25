import { Modal, Box, Button, Typography } from "@mui/material";

export const ModalContainer = ({ open, setOpen, children }) => (
  <Modal open={open} onClose={() => setOpen(false)}>
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.paper',
        borderRadius: 2,
        width: 300,
        mx: 'auto',
        mt: '20%',
        boxShadow: 24,
      }}
    >
      { children }
      <Button onClick={() => setOpen(false)}>Close</Button>
    </Box>
  </Modal>
);
