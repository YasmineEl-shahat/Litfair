export const uploadImg = (e, setImage) => {
  const img = {};
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    img.src = uploaded_image;
    img.image = e.target.files[0];
    setImage(img);
  });
  reader.readAsDataURL(e.target.files[0]);
};
