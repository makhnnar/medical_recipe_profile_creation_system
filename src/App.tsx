import React, { useState } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";

export default function App() {
  const [identity, setIdentity] = useState({
    identityId: "",
    fullname: "",
    role: "",
    privateKey: "",
    photo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdentity({ ...identity, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event!.target!.result as string ?? "";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 128;
        canvas.height = 128;
        ctx!.drawImage(img, 0, 0, 128, 128);
        setIdentity({ ...identity, photo: canvas.toDataURL("image/jpeg") });
      };
    };
  };

  return (
    <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
      <Card style={{ padding: "16px", maxWidth: "400px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Identity Saver
          </Typography>
          <TextField fullWidth margin="normal" label="Identity ID" name="identityId" value={identity.identityId} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Full Name" name="fullname" value={identity.fullname} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Role (integer)" name="role" type="number" value={identity.role} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Private Key" name="privateKey" value={identity.privateKey} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ marginTop: "16px" }} />
          {identity.photo && <img src={identity.photo} alt="Uploaded" style={{ width: "128px", height: "128px", objectFit: "cover", display: "block", margin: "16px auto" }} />}
          <Button variant="contained" color="primary" onClick={() => console.log(identity)} style={{ marginTop: "16px" }}>
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}