"use strict";

const fields = {
  bill: document.getElementById("bill"),
  tips: [...document.querySelectorAll("input[type=radio]")],
  customTip: document.getElementById("custom"),
  numOfPeople: document.getElementById("people"),
  resetBtn: document.querySelector(".btn"),
  displayTip: document.querySelector(".display__tip"),
  displayTotal: document.querySelector(".display__total"),
};

class App {
  tipPerPerson;
  totalPerPerson;

  constructor() {
    fields.numOfPeople.addEventListener("input", this._calculateTip.bind(this));
    fields.bill.addEventListener("input", this._calculateTip.bind(this));
    fields.customTip.addEventListener("input", this._calculateTip.bind(this));

    fields.customTip.addEventListener("keydown", this._clearRadios);
    fields.tips.forEach(tip => {
      tip.addEventListener("click", this._clearCustomInput);
      tip.addEventListener("click", this._calculateTip.bind(this));
    });
    fields.resetBtn.addEventListener("click", this._clear);
  }

  _calculateTip() {
    // fields.numOfPeople.value = 1;

    const value = {
      bill: +fields.bill.value,
      tip:
        +(
          document.querySelector('input[type="radio"]:checked')?.value ||
          fields.customTip.value
        ) / 100,
      people: +fields.numOfPeople.value,
    };

    if (fields.numOfPeople.value <= 0) {
      this._renderError();
      return;
    }

    if (+fields.numOfPeople.value > 0) {
      this._removeError();
      value.people = +fields.numOfPeople.value;
      this.tipPerPerson =
        Math.round(
          ((value.bill * value.tip) / value.people + Number.EPSILON) * 100
        ) / 100;
      this.totalPerPerson =
        Math.round(
          (value.bill / value.people + this.tipPerPerson + Number.EPSILON) * 100
        ) / 100;
      this._renderTip();
    }
  }

  _renderTip() {
    fields.displayTip.textContent = `$${this.tipPerPerson.toFixed(2)}`;
    fields.displayTotal.textContent = `$${this.totalPerPerson.toFixed(2)}`;
  }
  _renderError() {
    fields.numOfPeople
      .closest(".calculator__group")
      .querySelector(".error")
      .classList.remove("d-none");
    fields.numOfPeople.classList.add("error-b");
  }
  _removeError() {
    fields.numOfPeople
      .closest(".calculator__group")
      .querySelector(".error")
      .classList.add("d-none");
    fields.numOfPeople.classList.remove("error-b");
  }
  _clearRadios() {
    fields.tips.forEach(tip => {
      tip.checked = false;
    });
  }
  _clearCustomInput() {
    fields.customTip.value = "";
  }
  _clear() {
    fields.tips.forEach(tip => {
      tip.checked = false;
    });
    fields.customTip.value = "";
    fields.bill.value = "";
    fields.numOfPeople.value = 1;
  }

  // _inputOnlyNums(e) {
  //   let val = e.target.value;
  //   val = val.replace(/[^\d]/g, "");
  //   e.target.value = val;
  // }
}

const app = new App();
