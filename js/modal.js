var scrollbar = document.body.clientWidth - window.innerWidth + "px";
document
  .querySelector('[href="#openModalDeliveryMethod"]')
  .addEventListener("click", function () {
    document.body.style.overflowY = "hidden";
    document.querySelector("#openModalDeliveryMethod").style.marginLeft =
      scrollbar;
  });
document
  .getElementById("closeDeliveryMethod")
  .addEventListener("click", function () {
    document.body.style.overflowY = "auto";
    console.log("scroll")
    document.querySelector("#openModalDeliveryMethod").style.marginLeft = "0px";
  });

  document
  .querySelector('[href="#openModalPaymentMethod"]')
  .addEventListener("click", function () {
    document.body.style.overflowY = "hidden";
    document.querySelector("#openModalPaymentMethod").style.marginLeft =
      scrollbar;
  });
document
  .getElementById("closePaymentMethod")
  .addEventListener("click", function () {
    document.body.style.overflowY = "auto";
    console.log("scroll")
    document.querySelector("#openModalPaymentMethod").style.marginLeft = "0px";
  });