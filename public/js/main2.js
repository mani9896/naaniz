const socket = io();
const addImage = document.getElementById("compose");
const images = document.querySelector(".fieldS");
socket.on("field", function () {
  var div = document.createElement("div");
  div.classList.add("field");
  div.innerHTML =
    "<div class='form-row'><div class='col-md-6 mb-3'><label for='dish'>Dish name</label><input type='text' class='form-control' name='dish' placeholder='Dish Name'></div><div class='col-md-6 mb-3'><label for='qty'>Quantity</label><input type='text' class='form-control' name='qty' placeholder='Quantity'></div></div>";
  document.querySelector(".fieldS").appendChild(div);
});
addImage.addEventListener("submit", function (e) {
  e.preventDefault();

  socket.emit("add");
});
