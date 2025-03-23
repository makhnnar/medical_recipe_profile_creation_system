import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { saveIdentityToFirestore } from "./FirebaseService";

export interface Identity {
  identityId: string;
  fullname: string;
  role: number | "";
  privateKey: string;
  photo: string;
}

export default function IdentitySaver() {
  const [identity, setIdentity] = useState<Identity>({
    identityId: "",
    fullname: "",
    role: "",
    privateKey: "",
    photo: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdentity((prev) => ({ ...prev, [name]: name === "role" ? Number(value) || "" : value }));
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
          <TextField fullWidth margin="normal" label="Identity ID" name="identityId" value={identity.identityId} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Full Name" name="fullname" value={identity.fullname} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Role (integer)" name="role" type="number" value={identity.role} onChange={handleChange} />
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
