const checkboxes = document.getElementsByClassName("item_check");
function selectAllItems(checked) {
  for (let checkbox of checkboxes) {
    checkbox.checked = checked;
  }
  calculateTotalCost();
}
function selectItem(checked,id) {
    document.getElementById(id).checked = checked
    calculateTotalCost();
  }

function prettify(num) {
  var n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}
function calculateTotalCost() {
  var sum = 0;
  let items__discount = document.getElementsByClassName("item-price__discount");
  var items__discount_array = [...items__discount].filter(
    (item) => item.tagName === "SPAN"
  );

  for (var i = 0; i < items__discount_array.length; i++) {
   
    if (checkboxes[i].checked) {
        console.log(items__discount[i]);
      sum += +items__discount_array[i].innerHTML.replace(/\D/g, "");
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
      sum_nodiscount += +items__nodiscount_array[i].innerHTML.replace(/\D/g, "");
    }
  }

  var sum_discount = sum - sum_nodiscount;
  document.getElementById("sum").innerHTML = prettify(sum) + " сом";
  document.getElementById("sum_nodiscount").innerHTML =
    prettify(sum_nodiscount) + " сом";
  document.getElementById("sum_discount").innerHTML =
    prettify(sum_discount) + " сом";
}
