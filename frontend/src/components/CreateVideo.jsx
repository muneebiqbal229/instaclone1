

import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

const UploadReel = ({isDialogOpen, setDialogOpen}) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setErrorMessage("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("tags", tags);

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await axios.post("http://localhost:3000/api/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSuccessMessage("Video uploaded successfully!");
      } else {
        setErrorMessage(response.data.message || "Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button to Open Dialog */}
   

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Upload Your Reel</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="file-input w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  className="input w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., travel, food, vlog"
                  className="input w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

            {/* Close Button */}
            <button
              onClick={() => setDialogOpen(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UploadReel;
