$(document).ready(function () {
    let userSession =
        JSON.parse(sessionStorage.getItem("userSession")) ||
        JSON.parse(localStorage.getItem("userSession"));

    if (!userSession || !userSession.isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    $("#welcomeMessage").text(`Welcome, ${userSession.username}!`);

    const validateInput = (selector, errorSelector) => {
        const value = $(selector).val().trim();
        const numberPattern = /^-?\d+(\.\d+)?$/;
        if (value === "") {
            $(errorSelector).text("Please enter a number").fadeIn();
            return false;
        } else if (!numberPattern.test(value)) {
            $(errorSelector).text("Please enter a valid number").fadeIn();
            return false;
        } else {
            $(errorSelector).fadeOut();
            return true;
        }
    };

    const calculate = (num1, num2, operation) => {
        switch (operation) {
            case "add":
                return num1 + num2;
            case "subtract":
                return num1 - num2;
            case "multiply":
                return num1 * num2;
            case "divide":
                if (num2 === 0) return "Error: Cannot divide by zero";
                return num1 / num2;
            default:
                return "Invalid Operation";
        }
    };

    $('#num1').on('keyup blur', () => validateInput('#num1', '#num1Error'));
    $('#num2').on('keyup blur', () => validateInput('#num2', '#num2Error'));

    $(".btn-operation").click(function () {
        $("#num1Error, #num2Error").fadeOut();

        const isNum1Valid = validateInput("#num1", "#num1Error");
        const isNum2Valid = validateInput("#num2", "#num2Error");
        if (!isNum1Valid || !isNum2Valid) return;

        const num1 = parseFloat($("#num1").val().trim());
        const num2 = parseFloat($("#num2").val().trim());
        const operation = $(this).data("op");
        const result = calculate(num1, num2, operation);

        $("#result")
            .val(result)
            .css({ color: "#1C1F33", fontWeight: "600" })
            .fadeOut(100)
            .fadeIn(200);
    });

    $("#logoutBtn").click(function () {
        $(".container").fadeOut(500, function () {
            sessionStorage.removeItem("userSession");
            localStorage.removeItem("userSession");
            window.location.href = "login.html";
        });
    });
});






