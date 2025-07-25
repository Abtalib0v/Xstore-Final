async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const response = await fetch("https://api.cloudinary.com/v1_1/dgkr2zrhi/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return data.secure_url;
}
