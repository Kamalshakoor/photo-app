document.addEventListener('DOMContentLoaded', function () {
    // console.log('File is being executed');

    var submitHandler = function (event) {
        var form = event.target;
        var submitButton = form.querySelector("input[type=submit]");
        submitButton.disabled = true;

        if (typeof Stripe !== 'undefined') {
            Stripe
                .card
                .createToken(form, stripeResponseHandler);
        } else {
            show_error(
                "Failed to load credit card processing functionality. Please reload this page i" +
                "n your browser."
            );
        }

        event.preventDefault();
        return false;
    };

    var ccForms = document.querySelectorAll(".cc_form");
    ccForms.forEach(function (form) {
        form.addEventListener('submit', submitHandler);
    });

    var stripeResponseHandler = function (status, response) {
        var token;
        var form = document.querySelector('.cc_form');

        if (response.error) {
            console.log(response.error.message);
            show_error(response.error.message);
            var submitButton = form.querySelector("input[type=submit]");
            submitButton.disabled = false;
        } else {
            token = response.id;
            var hiddenInput = document.createElement("input");
            hiddenInput.setAttribute("type", "hidden");
            hiddenInput.setAttribute("name", "payment[token]");
            hiddenInput.value = token;
            form.appendChild(hiddenInput);

            var fieldsToRemove = ["number", "cvc", "exp-year", "exp-month", "label"];
            fieldsToRemove.forEach(function (field) {
                var elements = document.querySelectorAll("[data-stripe=" + field + "]");
                elements.forEach(function (element) {
                    element.remove();
                });
            });

            form.submit();
        }
    };

    var show_error = function (message) {
        var flashMessages = document.getElementById("flash-messages");
        if (!flashMessages) {
            var container = document.querySelector('div.container.main div:first');
            flashMessages = document.createElement("div");
            flashMessages.id = 'flash-messages';
            container.insertBefore(flashMessages, container.firstChild);
        }

        flashMessages.innerHTML = '<div class="alert alert-warning"><a class="close" data-bs-dismiss="alert">x</a' +
                '><div id="flash_alert">' + message + '</div></div>';
        setTimeout(function () {
            flashMessages.style.display = 'none';
        }, 5000);
    };
});
