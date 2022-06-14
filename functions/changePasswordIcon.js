export const changeIcon = (e) => {
  const pass = e.target.parentElement.firstChild;
  pass.type == "password" ? (pass.type = "text") : (pass.type = "password");
  e.target.classList.toggle("fa-eye-slash");
  e.target.classList.toggle("fa-eye");
};
