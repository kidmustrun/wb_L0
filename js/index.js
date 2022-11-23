var checkboxes = document.getElementsByClassName("item_check");

function selectAllItems(checked) {
  for (let checkbox of checkboxes) {
    checkbox.checked = checked;
  }
  calculateTotalCost();
}

function selectItem(checked, id) {
  document.getElementById(id).checked = checked;
  calculateTotalCost();
}

function prettify(num) {
  var n = (Math.round(num * 100)/100).toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}

function calculatePrices() {
  var counts = document.getElementsByClassName("item_count");
  let items__discount = document.getElementsByClassName("item-price__discount");
  var items__discount_array = [...items__discount].filter(
    (item) => item.tagName === "SPAN"
  );
  var prices_discount = [];
  for (var i = 0; i < items__discount_array.length; i++) {
    prices_discount.push(
      items__discount_array[i].innerHTML.replace(/\D/g, "") / counts[i].value
    );
  }
  var items__nodiscount = document.getElementsByClassName(
    "item-price__nodiscount"
  );
  var items__nodiscount_array = [...items__nodiscount].filter(
    (item) => item.tagName === "SPAN"
  );
  var prices_nodiscount = [];
  for (var i = 0; i < items__nodiscount_array.length; i++) {
    prices_nodiscount.push(
      items__nodiscount_array[i].innerHTML.replace(/\D/g, "") / counts[i].value
    );
  }
  return [prices_discount, prices_nodiscount];
}
var [prices_discount, prices_nodiscount] = calculatePrices();
function calculateTotalCost() {
  var sum = 0;
  var counts = document.getElementsByClassName("item_count");
  let items__discount = document.getElementsByClassName("item-price__discount");
  var items__discount_array = [...items__discount].filter(
    (item) => item.tagName === "SPAN"
  );
  for (var i = 0; i < items__discount_array.length; i++) {
    if (checkboxes[i].checked) {
      items__discount[i * 2].innerHTML =
      prettify(prices_discount[i] * counts[i].value) + " сом";
      items__discount[i * 2 + 1].innerHTML =
      prettify(prices_discount[i] * counts[i].value) + " сом";
      sum += prices_discount[i] * counts[i].value;
    }
  }

  var sum_nodiscount = 0;
  var items__nodiscount = document.getElementsByClassName(
    "item-price__nodiscount"
  );
  var items__nodiscount_array = [...items__nodiscount].filter(
    (item) => item.tagName === "SPAN"
  );
  for (var i = 0; i < items__nodiscount_array.length; i++) {
    if (checkboxes[i].checked) {
      items__nodiscount[i * 2].innerHTML =
      prettify(prices_nodiscount[i] * counts[i].value) + " сом";
      items__nodiscount[i * 2 + 1].innerHTML =
      prettify(prices_nodiscount[i] * counts[i].value) + " сом";
      sum_nodiscount += prices_nodiscount[i] * counts[i].value;
    }
  }

  var sum_discount = sum - sum_nodiscount;
  document.getElementById("sum").innerHTML = prettify(sum) + " сом";
  document.getElementById("sum_nodiscount").innerHTML =
    prettify(sum_nodiscount) + " сом";
  document.getElementById("sum_discount").innerHTML =
    prettify(sum_discount) + " сом";
}

function increaseQuantity(elem) {
  if (elem.parentNode.nextElementSibling) {
    if (
      +elem.parentNode.nextElementSibling.innerHTML.replace(/\D/g, "") >
      elem.previousElementSibling.value
    ) {
      ++elem.previousElementSibling.value;
      elem.style.color = "#000000";
      elem.previousElementSibling.previousElementSibling.style.color =
        "#000000";
    }
    if (
      +elem.parentNode.nextElementSibling.innerHTML.replace(/\D/g, "") ===
      +elem.previousElementSibling.value
    )
      elem.style.color = "rgba(0, 0, 0, 0.2)";
  } else ++elem.previousElementSibling.value;
  calculateTotalCost();
}

function subtractQuantity(elem) {
  if (elem.nextElementSibling.value > 0) {
    --elem.nextElementSibling.value;
    elem.style.color = "#000000";
    elem.nextElementSibling.nextElementSibling.style.color = "#000000";
  }
  if (+elem.nextElementSibling.value === 0)
    elem.style.color = "rgba(0, 0, 0, 0.2)";
  calculateTotalCost();
}

selectAllItems(true);
