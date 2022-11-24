var checkboxes = document.getElementsByClassName("item_check");
var select_all = document.getElementById("select_all");
class ItcAccordion {
  constructor(target, config) {
    this._el =
      typeof target === "string" ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350,
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener("click", (e) => {
      const elHeader = e.target.closest(".accordion__header");
      if (
        !elHeader ||
        e.target.tagName === "INPUT" ||
        e.target.tagName === "LABEL"
      ) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector(".accordion__item_show");
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement
            ? this.toggle(elOpenItem)
            : null;
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector(".accordion__body");
    if (
      elBody.classList.contains("collapsing") ||
      el.classList.contains("accordion__item_show")
    ) {
      return;
    }
    elBody.style["display"] = "block";
    const height = elBody.offsetHeight;
    elBody.style["height"] = 0;
    elBody.style["overflow"] = "hidden";
    elBody.style["transition"] = `height ${this._config.duration}ms ease`;
    elBody.classList.add("collapsing");
    el.classList.add("accordion__item_slidedown");
    elBody.offsetHeight;
    elBody.style["height"] = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove("collapsing");
      el.classList.remove("accordion__item_slidedown");
      elBody.classList.add("collapse");
      el.classList.add("accordion__item_show");
      elBody.style["display"] = "";
      elBody.style["height"] = "";
      elBody.style["transition"] = "";
      elBody.style["overflow"] = "";
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector(".accordion__body");
    if (
      elBody.classList.contains("collapsing") ||
      !el.classList.contains("accordion__item_show")
    ) {
      return;
    }
    elBody.style["height"] = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style["display"] = "block";
    elBody.style["height"] = 0;
    elBody.style["overflow"] = "hidden";
    elBody.style["transition"] = `height ${this._config.duration}ms ease`;
    elBody.classList.remove("collapse");
    el.classList.remove("accordion__item_show");
    elBody.classList.add("collapsing");
    window.setTimeout(() => {
      elBody.classList.remove("collapsing");
      elBody.classList.add("collapse");
      elBody.style["display"] = "";
      elBody.style["height"] = "";
      elBody.style["transition"] = "";
      elBody.style["overflow"] = "";
    }, this._config.duration);
  }
  toggle(el) {
    if (el.classList.contains("accordion__item_show")) {
      this.hide(el);
      el.firstElementChild.innerHTML = "";
      let sum_count = document.getElementById("sum_count").innerHTML;
      let sum = document.getElementById("sum").innerHTML;
      el.firstElementChild.innerHTML = `${sum_count} · ${sum}`;
    } else {
      this.show(el);
      el.firstElementChild.innerHTML = "";
      let sum_checkboxes = 0;
      let checked;
      for (let checkbox of checkboxes) {
        if (checkbox.checked) sum_checkboxes++;
      }
      sum_checkboxes === checkboxes.length
        ? (checked = "checked")
        : (checked = "");
      el.firstElementChild.insertAdjacentHTML(
        "afterbegin",
        `<input type="checkbox" class="checkbox" id="select_all" name="select_all" ${checked} onchange="selectAllItems(this.checked)"/><label for="select_all">Выбрать все</label>`
      );
    }
  }
}
