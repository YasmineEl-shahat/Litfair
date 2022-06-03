export const backgroundSelect = (id) => {
  const el = document.getElementById(id);
  el.classList.add("selectedBack");
  el.firstChild.style.color = "white";
  el.onmouseover = () => {
    el.style.background = "#5c46f9";
  };
};
