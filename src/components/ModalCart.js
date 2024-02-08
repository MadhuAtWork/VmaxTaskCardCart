import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "80vh",
  overflow: "scroll",
  p: 4,
};

export default function BasicModal({ length, addCartdData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className="bg-primary text-white me-3">
        {length}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {addCartdData.map((value, index) => {
            return (
              <div key={index} className="row d-flex ">
                <Card sx={{ width: 200 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={value?.thumbnail}
                    title="green iguana"
                  />
                  <CardContent>
                    <h3>Title: {value?.title}</h3>
                  </CardContent>
                  <CardContent>
                    <h3>Title: {value?.price}</h3>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </div>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
