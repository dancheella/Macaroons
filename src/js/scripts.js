//burger menu
$('#burger').click(function () {
    $('#menu').addClass('menu__open');
});

$('#menu').each(function () {
    $('#menu').click(function () {
        $('#menu').removeClass('menu__open');
    });
});

//button
$('#main__button').click(function () {
    $('.products')[0].scrollIntoView({behavior: "smooth"});
});

let orderMacarons = $('#order-macarons');
let name = $('#name');
let phone = $('#phone');
let orderSuccess = $('#order-success');
let orderInput = $('.order__input_input::placeholder')

//очистка формы
function resetForm() {
    $('.order__form').remove();
    $('.order__strawberry-right-img').remove();
    $('.order__strawberry-left-img').remove();
    orderSuccess.css('display', 'flex');
    orderSuccess.text('Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!');
}

//нахождение названия продукции, внесения в orderMacarons и scroll в блок order
$('.product__button').click((e) => {
    orderMacarons.val($(e.target).parents('.product').find('.product__title').text());
    $('.order')[0].scrollIntoView({behavior: "smooth"});
});

//Запрет вводить цифры в orderMacarons и name
let alphabet = /[^A-Za-zА-Яа-яЁё]/g;

orderMacarons.on('input', function () {
    $(this).val($(this).val().replace(alphabet, ''));
});
name.on('input', function () {
    $(this).val($(this).val().replace(alphabet, ''));
});

//маска номера
phone.mask("+375 (99) 999-99-99");

//loader
let loader = $('.loader');

//валидация
$('#order__button').click(function () {

    let hasError = false;
    loader.css('display', 'flex');

    //сброс состояния рамок на default
    orderMacarons.css('border', '1px solid rgb(130, 19, 40)');
    name.css('border', '1px solid rgb(130, 19, 40)');
    phone.css('border', '1px solid rgb(130, 19, 40)');


    $('.error-input').hide();

    if (!orderMacarons.val()) {
        orderMacarons.next().show();
        orderMacarons.css('border-color', 'red');
        orderInput.css('color', 'red');
        hasError = true;
        loader.hide();
    }
    if (!name.val()) {
        name.next().show();
        name.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }
    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: " https://testologia.site/checkout",
            data: {product: orderMacarons.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#order__button').prop('click', resetForm);
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
    }
});
