var checkboxes = document.getElementsByClassName("item_check");
var counts = document.getElementsByClassName("item_count");
var items__discount = document.getElementsByClassName("item-price__discount");
var items__discount_array = [...items__discount].filter(function (
  element,
  index,
  array
) {
  return index % 2 === 0;
});
var items__nodiscount = document.getElementsByClassName(
  "item-price__nodiscount"
);
var items__nodiscount_array = [...items__nodiscount].filter(function (
  element,
  index,
  array
) {
  return index % 2 === 0;
});
var pay_now = document.getElementById("pay_now");
var order_creation_button = document.getElementById("order_creation_button");
var errors = document.getElementsByClassName("error-label");
let inputs = document.getElementsByClassName("recipient__input");
var inputs_array = [...inputs];
var card_item__titles = document.getElementsByClassName("card-item__title");
var card_item__titles_array = [...card_item__titles];
var menu_links__count = document.getElementsByClassName("menu-links__count");
var payments = document.getElementsByClassName("payment-radio");
var addresses = document.getElementsByClassName("address-radio");
var total_address_headings = document.getElementsByClassName(
  "total__delivery total__heading"
);
var total_address_spans = document.getElementsByClassName(
  "total__delivery total__span"
);
var delivery_methods = document.getElementsByClassName(
  "delivery-method__method"
);
var delivery_addresses = document.getElementsByClassName(
  "delivery-method__address_table"
);
var tab_buttons = document.getElementsByClassName("tab-btn");
var titles = [];
for (let title of card_item__titles) {
  titles.push(title.innerHTML);
  if (title.innerHTML.length > 45 && window.innerWidth <= 576)
    title.innerHTML = title.innerHTML.substring(0, 45) + "…";
}
window.addEventListener(
  "resize",
  function (event) {
    for (let i = 0; i < card_item__titles_array.length; i++) {
      if (
        card_item__titles_array[i].innerHTML.length > 45 &&
        window.innerWidth <= 576
      )
        card_item__titles_array[i].innerHTML = titles[i].substring(0, 45) + "…";
      else card_item__titles_array[i].innerHTML = titles[i];
    }
  },
  true
);

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
  if (sum_count) {
    for (let menu_link__count of menu_links__count) {
      menu_link__count.style.display = "block";
      menu_link__count.innerHTML = sum_count;
    }
  } else
    for (let menu_link__count of menu_links__count) {
      menu_link__count.style.display = "none";
    }
  changeOrderButtonMessage(pay_now.checked, sum);
}

function changeOrderButtonMessage(pay_now_checked, sum) {
  pay_now_checked
    ? (order_creation_button.innerHTML = `Оплатить ${prettify(sum)} сом`)
    : (order_creation_button.innerHTML = `Заказать`);
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
  } else if (elem.previousElementSibling.value === 1) {
    elem.previousElementSibling.previousElementSibling.style.color =
      "rgba(0, 0, 0, 0.2)";
    ++elem.previousElementSibling.value;
  } else {
    ++elem.previousElementSibling.value;
    elem.previousElementSibling.previousElementSibling.style.color = "#000000";
  }
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

function checkQuantity(elem) {
  if (elem.value === 1)
    elem.previousElementSibling.style.color = "rgba(0, 0, 0, 0.2)";
  calculateTotalCost();
}
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
const validatePhone = (phone) => {
  return phone.match(/^[\d\+][\d\(\)\ -]{15}\d$/);
};

function validateForm() {
  for (let input of inputs) {
    window["first_validation_" + input.id] = false;
  }
  for (let i = 0; i < inputs_array.length; i++) {
    switch (inputs_array[i].id) {
      case "name":
        if (!inputs_array[i].value) {
          errors[i].innerHTML = "Укажите имя";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else {
          errors[i].innerHTML = "";
          inputs_array[i].classList.remove("recipient__input_invalid");
        }
        break;

      case "surname":
        if (!inputs_array[i].value) {
          errors[i].innerHTML = "Укажите фамилию";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else {
          errors[i].innerHTML = "";
          inputs_array[i].classList.remove("recipient__input_invalid");
        }
        break;

      case "email":
        if (!inputs_array[i].value) {
          errors[i].innerHTML = "Укажите электронную почту";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else if (!validateEmail(inputs_array[i].value)) {
          errors[i].innerHTML = "Проверьте адрес электронной почты";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else {
          errors[i].innerHTML = "";
          inputs_array[i].classList.remove("recipient__input_invalid");
        }
        break;

      case "phone":
        if (!inputs_array[i].value) {
          errors[i].innerHTML = "Укажите номер телефона";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else if (!validatePhone(inputs_array[i].value)) {
          errors[i].innerHTML = "Формат: +9 999 999 99 99";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else {
          errors[i].innerHTML = "";
          inputs_array[i].classList.remove("recipient__input_invalid");
        }
        break;

      case "inn":
        if (!inputs_array[i].value) {
          errors[i].innerHTML = "Укажите ИНН";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else if (inputs_array[i].value.length > 10) {
          errors[i].innerHTML = "Формат: 1234567";
          inputs_array[i].classList.add("recipient__input_invalid");
          inputs_array[0].scrollIntoView();
        } else {
          errors[i].innerHTML = "";
          inputs_array[i].classList.remove("recipient__input_invalid");
        }
        break;
    }
  }
}

for (let input of inputs) {
  window["first_validation_" + input.id] = true;
  input.addEventListener("blur", () => {
    if (
      (input.id != "phone" && input.value) ||
      (input.id === "phone" && input.value.length > 3)
    ) {
      window["first_validation_" + input.id] = false;
      validateInput(input);
    }
  });
}
function validateInput(input) {
  let i = inputs_array.indexOf(input);
  switch (input.id) {
    case "name":
      if (input.value) {
        errors[i].innerHTML = "";
        input.classList.remove("recipient__input_invalid");
      }
      break;
    case "surname":
      if (input.value) {
        errors[i].innerHTML = "";
        input.classList.remove("recipient__input_invalid");
      }
      break;
    case "email":
      if (!first_validation_email && input.value)
        if (!validateEmail(input.value)) {
          errors[i].innerHTML = "Проверьте адрес электронной почты";
          input.classList.add("recipient__input_invalid");
        } else {
          errors[i].innerHTML = "";
          input.classList.remove("recipient__input_invalid");
        }
      break;

    case "phone":
      if (!first_validation_phone && input.value.length > 3)
        if (!validatePhone(input.value)) {
          errors[i].innerHTML = "Формат: +9 999 999 99 99";
          input.classList.add("recipient__input_invalid");
        } else {
          errors[i].innerHTML = "";
          input.classList.remove("recipient__input_invalid");
        }
      break;

    case "inn":
      if (!first_validation_inn && input.value)
        if (input.value.length > 10) {
          errors[i].innerHTML = "Формат: 1234567";
          input.classList.add("recipient__input_invalid");
        } else {
          errors[i].innerHTML = "";
          input.classList.remove("recipient__input_invalid");
        }
      break;
  }
}

function selectPayment() {
  for (let payment of payments) {
    if (payment.checked) {
      let cards_checked = document.getElementsByClassName(
        "payment-method__card_checked"
      );
      for (let card of cards_checked)
        card.innerHTML = payment.nextElementSibling.firstElementChild.innerHTML;
    }
    window.location =
      ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") + "#close";
    document.body.style.overflowY = "auto";
  }
}
function selectAddress() {
  for (let address of addresses) {
    if (address.checked) {
      for (let total_address_heading of total_address_headings)
        for (let tab_button of tab_buttons)
          if (tab_button.checked && tab_button.value == "1") {
            total_address_heading.firstElementChild.innerHTML =
              "Доставка в пункт выдачи";
          } else if (tab_button.checked && tab_button.value == "2") {
            total_address_heading.firstElementChild.innerHTML =
              "Доставка курьером";
          }

      for (let total_address_span of total_address_spans)
        total_address_span.innerHTML = address.nextElementSibling.innerHTML;

      for (let delivery_address of delivery_addresses) {
        for (let delivery_method of delivery_methods)
          for (let tab_button of tab_buttons)
            if (tab_button.checked && tab_button.value == "2") {
              delivery_method.firstElementChild.innerHTML =
                "Курьерская доставка";
              delivery_address.lastElementChild.innerHTML = "";
            } else if (tab_button.checked && tab_button.value == "1") {
              delivery_method.firstElementChild.innerHTML = "Пункт выдачи";
              delivery_address.lastElementChild.innerHTML = "";
              let label = address.nextElementSibling;
              let rating = label.nextElementSibling;
              rating.style.margin = "0";
              delivery_address.lastElementChild.insertAdjacentHTML(
                "afterbegin",
                rating.outerHTML
              );
            }

        delivery_address.firstElementChild.innerHTML =
          address.nextElementSibling.innerHTML;
      }
    }
    window.location =
      ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") + "#close";
    document.body.style.overflowY = "auto";
  }
}

selectAllItems(true);
