const uName = /^[ A-Za-z]{4,}$/;
const pWord = /^[0-9A-Za-z]{12,}$/;
const mCost = /^[0-9\.]{1,}$/;

const form = document.querySelector("form");
const errors = document.querySelectorAll(".feedback");

let flag = [true, true, true];

form.addEventListener("keyup", () => {
    const validTest = (elem, regExp, item, msg) => {
        if (regExp.test(elem.value)) {
            elem.classList.remove("error");
            elem.classList.add("success");
    
            errors[item].textContent = "";
            flag[item] = true;
        } else {
            elem.classList.remove("success");
            elem.classList.add("error");
    
            errors[item].textContent = msg;
            flag[item] = false;
        }
    };

    validTest(form.username, uName, 0, "Name must be at least 4 letters, no numbers");
    validTest(form.password, pWord, 1, "Password must be 12 characters, letters and numbers only");
});

form.addEventListener("submit", event => {
    event.preventDefault();
    
    if (mCost.test(form.price.value)) {
        if (Number(form.price.value) <= 0) {
            errors[2].textContent = "Meal cost must be more than zero";
            flag[2] = false;
        } else {
            errors[2].textContent = "";
            flag[2] = true;
        }
    } else {
        errors[2].textContent = "Meal cost must be numbers and decimal only";
        flag[2] = false;
    }

    if (!flag.includes(false)) {
        let tip = form.price.value * (form.qos.value / 100);
        let totalPrice = parseFloat(form.price.value) + tip;

        const moneyFormat = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        });

        let forPrice = moneyFormat.format(form.price.value);
        let forTip = moneyFormat.format(tip);
        let forTotal = moneyFormat.format(totalPrice);

        const result = document.querySelector("#result");
        result.innerHTML = `Meal Cost: ${forPrice}<br>Tip: ${forTip}<br> Total: ${forTotal}`;
    }
});