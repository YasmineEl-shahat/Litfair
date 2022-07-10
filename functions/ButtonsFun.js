export const disableBtn = (id) => {
  const btn = document.getElementById(id);
  btn.style.background = "#9C93F8";
  btn.style.cursor = "auto";
  btn.disabled = true;
};

export const EnableBtn = (id) => {
  const btn = document.getElementById(id);
  btn.style.background = "#5c46f9";
  btn.style.cursor = "pointer";
  btn.disabled = false;
};
