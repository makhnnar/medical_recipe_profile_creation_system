import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { saveIdentityToFirestore } from "./FirebaseService";

export interface Identity {
  id: string;
  name: string;
  tipo: string;
  privateKey: string;
  photo: string;
  dir: string;
}

const roles = [
  { value: "0", label: "DOCTOR" },
  { value: "1", label: "PACIENTE" },
  { value: "2", label: "FAMACEUTA" }
];

export default function App() {

  const [identity, setIdentity] = useState<Identity>({
    id: "",
    name: "",
    tipo: "",
    privateKey: "",
    photo: "",
    dir: ""
  });

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }> | React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as { name: string; value: string };
    setIdentity((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = 128;
        canvas.height = 128;
        ctx.drawImage(img, 0, 0, 128, 128);
        setIdentity((prev) => ({ ...prev, photo: canvas.toDataURL("image/jpeg") }));
      };
    };
  };

  const handleSave = async () => {
    try {
      await saveIdentityToFirestore(identity);
      alert("Identity saved successfully!");
    } catch (error) {
      console.error("Error saving identity:", error);
      alert("Failed to save identity.");
    }
  };

  return (
    <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
      <Card style={{ padding: "16px", maxWidth: "400px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Identity Saver
          </Typography>
          <TextField fullWidth margin="normal" label="Identity ID" name="id" value={identity.id} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Full Name" name="name" value={identity.name} onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select name="tipo" value={identity.tipo} onChange={handleChange}>
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField fullWidth margin="normal" label="Private Key" name="privateKey" value={identity.privateKey} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ marginTop: "16px" }} />
          {identity.photo && <img src={identity.photo} alt="Uploaded" style={{ width: "128px", height: "128px", objectFit: "cover", display: "block", margin: "16px auto" }} />}
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: "16px" }}>
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
