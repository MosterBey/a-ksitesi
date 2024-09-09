// Metin yazısı animasyonu
var Text = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

Text.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap text-[#df04f3]">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

// Sayfa yüklendiğinde metin animasyonlarını başlat
window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-words');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new Text(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// Belirtilen tarihten itibaren geçen süreyi hesaplayan işlev
var countDownDate = new Date("July 9, 2023 00:00:00").getTime();

var countdownfunction = setInterval(function () {
    var now = new Date().getTime();
    var elapsedTime = now - countDownDate;

    // Gün, saat, dakika ve saniye hesaplamaları
    var days = Math.floor(elapsedTime / (3600000 * 24));
    var hours = Math.floor((elapsedTime % (3600000 * 24)) / 3600000);
    var minutes = Math.floor((elapsedTime % 3600000) / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Yıl dönümünü kontrol etme işlevi
    function anniversary() {
        var februaryDays = new Date(new Date().getFullYear(), 2, 0).getDate();
        if (februaryDays === 29 && days % 366 === 0) return days / 366;
        else if (februaryDays !== 29 && days % 365 === 0) return days / 365;
        else if (februaryDays === 29 && days % 183 === 0) return days / 366;
        else if (februaryDays !== 29 && days % 182.5 === 0) return days / 365;
        else return null;
    }

    let writetext = days + " gün " + hours + " saat " + minutes + " dakika " + seconds + " saniye";
    let anniversarytext = anniversary() + ". yıl dönümü. ❤️";
    
    let elements = ["time_since_establishment-desktop", "time_since_establishment-mobile"];
    if (anniversary()) {
        elements.forEach(m => document.getElementById(m).innerHTML = anniversarytext);
    } else {
        elements.forEach(m => document.getElementById(m).innerHTML = writetext);
    }
}, 1000);
