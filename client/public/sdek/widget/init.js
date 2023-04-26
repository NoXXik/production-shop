const widjet = new ISDEKWidjet({
    showWarns: true,
    showErrors: true,
    showLogs: true,
    hideMessages: false,
    path: 'http://localhost:3000/sdek/widget/scripts/',
    servicepath: 'http://localhost:8080/sdek/widget/scripts/service.php', //ссылка на файл service.php на вашем сайте
    templatepath: 'http://localhost:8080/sdek/widget/scripts/template.php',
    choose: true,
    popup: false,
    country: 'Россия',
    defaultCity: 'Уфа',
    cityFrom: 'Омск',
    link: 'forpvz',
    hidedress: true,
    hidecash: true,
    hidedelt: false,
    detailAddress: true,
    region: true,
    apikey: 'a4b58d88-e41f-4774-98ad-e3ac6eb59700',
    goods: [{
        length: 10,
        width: 10,
        height: 10,
        weight: 1
    }],
    onReady: onReady,
    onChoose: onChoose,
    onChooseProfile: onChooseProfile,
    onCalculate: onCalculate
});

function onReady() {
    alert('Виджет загружен');
}

function onChoose(wat) {
    alert(
        'Выбран пункт выдачи заказа ' + wat.id + "\n" +
        'цена ' + wat.price + "\n" +
        'срок ' + wat.term + " дн.\n" +
        'город ' + wat.cityName + ', код города ' + wat.city
    );
}

function onChooseProfile(wat) {
    alert(
        'Выбрана доставка курьером в город ' + wat.cityName + ', код города ' + wat.city + "\n" +
        'цена ' + wat.price + "\n" +
        'срок ' + wat.term + ' дн.'
    );
}

function onCalculate(wat) {
    alert('Расчет стоимости доставки произведен');
}


