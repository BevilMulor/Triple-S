import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile: React.FC = () => {
  const [profile, setProfile] = useState({ name: "", skills: [], team: "", videoContent: "", imageContent: "" });
  
  useEffect(() => {
    axios.get("/api/talent/profile").then((response) => setProfile(response.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/talent/profile", profile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="team" value={profile.team} onChange={handleChange} placeholder="Team/Organization" />
      <textarea name="skills" value={profile.skills.join(", ")} onChange={handleChange} placeholder="Skills (comma-separated)" />
      <input type="text" name="videoContent" value={profile.videoContent} onChange={handleChange} placeholder="Video URL" />
      <input type="text" name="imageContent" value={profile.imageContent} onChange={handleChange} placeholder="Image URL" />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
