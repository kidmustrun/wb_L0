var checkboxes = document.getElementsByClassName("item_check");

var counts = document.getElementsByClassName("item_count");
var items__discount = document.getElementsByClassName("item-price__discount");
var items__discount_array = [...items__discount].filter(
  (item) => item.tagName === "SPAN"
);
var items__nodiscount = document.getElementsByClassName(
  "item-price__nodiscount"
);
var items__nodiscount_array = [...items__nodiscount].filter(
  (item) => item.tagName === "SPAN"
);
var pay_now = document.getElementById("pay_now");

function selectAllItems(checked) {
  for (let checkbox of checkboxes) {
    checkbox.checked = checked;
  }
  calculateTotalCost();
}

function selectItem(checked, id) {
  var select_all = document.getElementById("select_all");
  document.getElementById(id).checked = checked;
  let sum_checkboxes = 0;
  for (let checkbox of checkboxes) {
    if (checkbox.checked) sum_checkboxes++;
  }
  sum_checkboxes === checkboxes.length
    ? (select_all.checked = true)
    : (select_all.checked = false);
  calculateTotalCost();
}

function prettify(num) {
  let n = (Math.round(num * 100) / 100).toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}

function calculatePrices() {
  let prices_discount = [];
  for (let i = 0; i < items__discount_array.length; i++) {
    prices_discount.push(
      items__discount_array[i].innerHTML.replace(/\D/g, "") / counts[i].value
    );
  }

  let prices_nodiscount = [];
  for (let i = 0; i < items__nodiscount_array.length; i++) {
    prices_nodiscount.push(
      items__nodiscount_array[i].innerHTML.replace(/\D/g, "") / counts[i].value
    );
  }
  return [prices_discount, prices_nodiscount];
}

var [prices_discount, prices_nodiscount] = calculatePrices();

function morph(int, array) {
  return (
    (array = array || ["товар", "товара", "товаров"]) &&
    array[
      int % 100 > 4 && int % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
    ]
  );
}

function calculateTotalCost() {
  let sum = 0;
  for (let i = 0; i < items__discount_array.length; i++) {
    if (counts[i].value <= 1) {
      counts[i].value = 1;
      counts[i].previousElementSibling.style.color = "rgba(0, 0, 0, 0.2)";
      counts[i].nextElementSibling.style.color = "#000000";
    }
    if (checkboxes[i].checked) {
      items__discount[i * 2].innerHTML =
        prettify(prices_discount[i] * counts[i].value) + " сом";
      items__discount[i * 2 + 1].innerHTML =
        prettify(prices_discount[i] * counts[i].value) + " сом";
      sum += prices_discount[i] * counts[i].value;
    }
  }

  let sum_nodiscount = 0;
  let sum_count = 0;
  for (let i = 0; i < items__nodiscount_array.length; i++) {
    if (checkboxes[i].checked) {
      items__nodiscount[i * 2].innerHTML =
        prettify(prices_nodiscount[i] * counts[i].value) + " сом";
      items__nodiscount[i * 2 + 1].innerHTML =
        prettify(prices_nodiscount[i] * counts[i].value) + " сом";
      sum_nodiscount += prices_nodiscount[i] * counts[i].value;
      sum_count += 1;
    }
  }
  let sum_discount = sum - sum_nodiscount;
  document.getElementById("sum").innerHTML = prettify(sum) + " сом";
  document.getElementById("sum_nodiscount").innerHTML =
    prettify(sum_nodiscount) + " сом";
  document.getElementById("sum_discount").innerHTML =
    prettify(sum_discount) + " сом";
  document.getElementById("sum_count").innerHTML =
    sum_count + " " + morph(sum_count);
    if(sum_count){
document.getElementById("menu-links__count").style.display = "block"
  document.getElementById("menu-links__count").innerHTML = sum_count;
}
  else document.getElementById("menu-links__count").style.display = "none"
  changeOrderButtonMessage(pay_now.checked, sum);
}

function changeOrderButtonMessage(pay_now_checked, sum) {
  pay_now_checked
    ? (document.getElementById(
        "order_creation_button"
      ).innerHTML = `Оплатить ${prettify(sum)} сом`)
    : (document.getElementById("order_creation_button").innerHTML = `Заказать`);
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
  if (elem.nextElementSibling.value > 1) {
    --elem.nextElementSibling.value;
    elem.style.color = "#000000";
    elem.nextElementSibling.nextElementSibling.style.color = "#000000";
  }
  if (+elem.nextElementSibling.value === 1)
    elem.style.color = "rgba(0, 0, 0, 0.2)";
  calculateTotalCost();
}

selectAllItems(true);
