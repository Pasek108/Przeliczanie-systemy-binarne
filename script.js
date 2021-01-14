'use strict';
//tryb ciemny
let tryb = document.getElementById("tryb");
let slider = document.getElementById("slider");
let header = document.getElementById("header");
let footer = document.getElementById("footer");
let main = document.getElementById("main");

function zmien_tryb() {
    if (slider.classList.contains("slider2")) {
        tryb.classList.remove("ciemny");
        slider.classList.remove("slider2");
        header.classList.remove("header_dark");
        footer.classList.remove("footer_dark");
        main.classList.remove("main_dark");
        localStorage.setItem("tryb", "jasny");
    }
    else {
        tryb.classList.add("ciemny");
        slider.classList.add("slider2");
        header.classList.add("header_dark");
        footer.classList.add("footer_dark");
        main.classList.add("main_dark");
        localStorage.setItem("tryb", "ciemny");
    }
}

function ustaw_tryb() {
    if (localStorage.getItem("tryb") == "ciemny") {
        tryb.classList.add("ciemny");
        slider.classList.add("slider2");
        header.classList.add("header_dark");
        footer.classList.add("footer_dark");
        main.classList.add("main_dark");
    }
}

window.addEventListener("load", ustaw_tryb);
slider.addEventListener("click", zmien_tryb);


//przeliczanie
let system_in = document.getElementById("system_in");
let system_out = document.getElementById("system_out");

let pole_in = document.getElementById("pole_in");
let pole_out = document.getElementById("pole_out");

function sprawdz_liczba_input() {
    let liczba = document.getElementById("liczba").value;
    if (liczba == "") return false;
    return true;
}

function sprawdz_bin_input() {
    let znak = document.getElementById("znak").value;
    let modul = document.getElementById("modul").value;

    if (znak.length > 1 || znak.length < 1) return false;
    if (znak != "0" && znak != "1") return false;

    if (modul.length < 1) return false;
    for (let i = 0; i < modul.length; i++) {
        if (modul[i] != "0" && modul[i] != "1") return false;
    }

    return true;
}

function pokaz_dec() {
    pole_in.innerHTML = "Liczba do przeliczenia: <br>";
    let liczba = document.createElement("input");
    liczba.type = "number";
    liczba.pattern = "[0-9]{1,}";
    liczba.id = "liczba";
    let oblicz = document.createElement("button");
    oblicz.id = "oblicz";
    oblicz.onclick = () => {
        if (sprawdz_liczba_input()) przelicz();
        else alert("Błąd, sprawdź zapis liczby");
    };
    oblicz.innerText = "Oblicz";
    pole_in.appendChild(liczba);
    pole_in.appendChild(oblicz);
}

window.addEventListener("load", pokaz_dec);
system_in.addEventListener("change", () => {
    if (system_in.value == "dec") pokaz_dec();
    else {
        pole_in.innerHTML = "Liczba do przeliczenia: <br>";
        let znak = document.createElement("input");
        znak.type = "text";
        znak.pattern = "[0-1]{1}";
        znak.id = "znak";
        znak.style.width = ".8rem";
        let modul = document.createElement("input");
        modul.type = "text";
        modul.pattern = "[0-1]{1,}";
        modul.id = "modul";
        let oblicz = document.createElement("button");
        oblicz.id = "oblicz";
        oblicz.onclick = () => {
            if (sprawdz_bin_input()) przelicz();
            else alert("Błąd, sprawdź zapis liczby");
        };
        oblicz.innerText = "Oblicz";
        pole_in.appendChild(znak);
        pole_in.appendChild(modul);
        pole_in.appendChild(oblicz);
    }
});

function przelicz() {
    if (system_in.value == "dec") {
        if (system_out.value == "dec") dec_to_dec();
        else if (system_out.value == "zm") dec_to_zm();
        else if (system_out.value == "zu1") dec_to_zu1();
        else if (system_out.value == "zu2") dec_to_zu2();
    }
    else if (system_in.value == "zm") {
        if (system_out.value == "dec") zm_to_dec();
        else if (system_out.value == "zm") zm_to_zm();
        else if (system_out.value == "zu1") zm_to_zu1();
        else if (system_out.value == "zu2") zm_to_zu2();
    }
    else if (system_in.value == "zu1") {
        if (system_out.value == "dec") zu1_to_dec();
        else if (system_out.value == "zm") zu1_to_zm();
        else if (system_out.value == "zu1") zu1_to_zu1();
        else if (system_out.value == "zu2") zu1_to_zu2();
    }
    else if (system_in.value == "zu2") {
        if (system_out.value == "dec") zu2_to_dec();
        else if (system_out.value == "zm") zu2_to_zm();
        else if (system_out.value == "zu1") zu2_to_zu1();
        else if (system_out.value == "zu2") zu2_to_zu2();
    }
}


function odwroc(str) {
    let splitString = str.split("");
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join("");
    return joinArray;
}

function konwertuj_na_bin(liczba_przeliczana) {
    let l_bin = "";
    while (liczba_przeliczana != 0) {
        if (liczba_przeliczana % 2 == 0) l_bin += "0";
        else l_bin += "1";
        liczba_przeliczana = parseInt(liczba_przeliczana / 2);
    }

    return l_bin;
}

function konwertuj_na_liczbe(l_bin) {
    let ujemna = 0;
    if (l_bin[l_bin.length - 1] == "1") ujemna = 1;
    let potega = 1;
    let liczba = 0;
    for (let i = 0; i < l_bin.length - 1; i++) {
        if (l_bin[i] == "1") liczba += potega;
        potega *= 2;
    }
    if (ujemna == 1) liczba *= -1;

    return liczba;
}

function negacja(l_bin) {
    let l_bin_u1 = "";
    if (l_bin[0] == "1") {
        l_bin_u1 += "1";
        for (let i = 1; i < l_bin.length; i++) {
            if (l_bin[i] == "1") l_bin_u1 += "0";
            else l_bin_u1 += "1";
        }
    }
    else l_bin_u1 = l_bin;

    return l_bin_u1;
}

function dodaj_1_bit(l_bin_u1) {
    let stop = 0;
    let l_bin_u2 = "";
    for (let i = l_bin_u1.length - 1; i >= 0; i--) {
        if (l_bin_u1[i] == "1" && stop == 0) l_bin_u2 += "0";
        else if (stop == 0) {
            l_bin_u2 += "1";
            stop = 1;
        }
        else l_bin_u2 += l_bin_u1[i];
    }

    return l_bin_u2;
}

function odejmij_1_bit(l_bin_u2) {
    let stop = 0;
    let l_bin_u1 = "";
    for (let i = l_bin_u2.length - 1; i >= 0; i--) {
        if (l_bin_u2[i] == "0" && stop == 0) l_bin_u1 += "1";
        else if (stop == 0) {
            l_bin_u1 += "0";
            stop = 1;
        }
        else l_bin_u1 += l_bin_u2[i];
    }

    return l_bin_u1;
}

function pokaz_wynik(l_bin) {
    let wynik = document.createElement("input");
    wynik.type = "text";
    wynik.value = l_bin;
    pole_out.appendChild(wynik);
}

//decymalny
function dec_to_dec() {
    pole_out.innerHTML = "Podana liczba w systemie decymalnym:<br>";
    pokaz_wynik(document.getElementById("liczba").value);
}

function dec_to_zm() {
    pole_out.innerHTML = "Podana liczba w systemie znak-moduł (ZM):<br>";
    let liczba_przeliczana = parseInt(document.getElementById("liczba").value);
    let l_bin = "";

    if (liczba_przeliczana > 0) l_bin += "0";
    else if (liczba_przeliczana < 0) {
        l_bin += "1"
        liczba_przeliczana *= -1;
    }
    else {
        l_bin = "00000000 lub 10000000";
        return;
    }

    let l_bin_temp = konwertuj_na_bin(liczba_przeliczana);
    for (let i = l_bin_temp.length; i < 7; i++) l_bin_temp += "0";
    l_bin_temp = odwroc(l_bin_temp);

    l_bin += l_bin_temp;

    pokaz_wynik(l_bin);
}

function dec_to_zu1() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do jedności (ZU1):<br>";
    let liczba_przeliczana = parseInt(document.getElementById("liczba").value);
    let l_bin = "";

    if (liczba_przeliczana > 0) l_bin += "0";
    else if (liczba_przeliczana < 0) {
        l_bin += "1"
        liczba_przeliczana *= -1;
    }
    else {
        l_bin = "00000000 lub 11111111";
        return;
    }

    let l_bin_temp = konwertuj_na_bin(liczba_przeliczana);
    for (let i = l_bin_temp.length; i < 7; i++) l_bin_temp += "0";
    l_bin_temp = odwroc(l_bin_temp);

    l_bin += l_bin_temp;
    let l_bin_u1 = negacja(l_bin);

    pokaz_wynik(l_bin_u1);
}

function dec_to_zu2() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do dwóch (ZU2):<br>";
    let liczba_przeliczana = parseInt(document.getElementById("liczba").value);
    let l_bin = "";

    if (liczba_przeliczana > 0) l_bin += "0";
    else if (liczba_przeliczana < 0) {
        l_bin += "1"
        liczba_przeliczana *= -1;
    }
    else {
        l_bin = "00000000";
        return;
    }

    let l_bin_temp = konwertuj_na_bin(liczba_przeliczana);
    for (let i = l_bin_temp.length; i < 7; i++) l_bin_temp += "0";
    l_bin_temp = odwroc(l_bin_temp);

    l_bin += l_bin_temp;
    let l_bin_u1 = "";
    let l_bin_u2 = "";
    if (l_bin[0] == "1") {
        l_bin_u1 = negacja(l_bin);
        l_bin_u2 = dodaj_1_bit(l_bin_u1);
        for (let i = l_bin_u2.length; i < 7; i++) l_bin_u2 += "0";
        l_bin_u2 = odwroc(l_bin_u2);
    }
    else l_bin_u2 = l_bin;

    pokaz_wynik(l_bin_u2);
}


//znak-moduł
function wez_zm() {
    let l_bin = document.getElementById("modul").value;
    l_bin = odwroc(l_bin);
    for (let i = l_bin.length; i < 7; i++) l_bin += "0";
    l_bin = odwroc(l_bin);
    l_bin = document.getElementById("znak").value + l_bin;

    return l_bin;
}

function zm_to_dec() {
    pole_out.innerHTML = "Podana liczba w systemie decymalnym:<br>";
    let l_bin = wez_zm();

    l_bin = odwroc(l_bin);

    let liczba = konwertuj_na_liczbe(l_bin);

    pokaz_wynik(liczba);
}

function zm_to_zm() {
    pole_out.innerHTML = "Podana liczba w systemie znak-moduł (ZM):<br>";
    pokaz_wynik(document.getElementById("znak").value + document.getElementById("modul").value);
}

function zm_to_zu1() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do jedności (ZU1):<br>";
    let l_bin = wez_zm();

    let l_bin_u1 = negacja(l_bin);

    pokaz_wynik(l_bin_u1);
}

function zm_to_zu2() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do dwóch (ZU2):<br>";
    let l_bin = wez_zm();

    let l_bin_u1 = "";
    let l_bin_u2 = "";
    if (l_bin[0] == "1") {
        l_bin_u1 = negacja(l_bin);
        l_bin_u2 = dodaj_1_bit(l_bin_u1);
        l_bin_u2 = odwroc(l_bin_u2);
    }
    else l_bin_u2 = l_bin;

    pokaz_wynik(l_bin_u2);
}


//uzupełnienie do jedności
function wez_zu1() {
    let znak = document.getElementById("znak").value;
    let l_bin_u1 = document.getElementById("modul").value;
    l_bin_u1 = odwroc(l_bin_u1);
    if (znak == "1") for (let i = l_bin_u1.length; i < 7; i++) l_bin_u1 += "1";
    else for (let i = l_bin_u1.length; i < 7; i++) l_bin_u1 += "0";
    l_bin_u1 = odwroc(l_bin_u1);
    l_bin_u1 = znak + l_bin_u1;

    return l_bin_u1;
}

function zu1_to_dec() {
    pole_out.innerHTML = "Podana liczba w systemie decymalnym:<br>";
    let l_bin_u1 = wez_zu1();

    let l_bin = "";
    if (l_bin_u1[0] == "1") l_bin = negacja(l_bin_u1);
    else l_bin = l_bin_u1;

    l_bin = odwroc(l_bin);

    let liczba = konwertuj_na_liczbe(l_bin);

    pokaz_wynik(liczba);
}

function zu1_to_zm() {
    pole_out.innerHTML = "Podana liczba w systemie znak-moduł (ZM):<br>";
    let l_bin_u1 = wez_zu1();

    let l_bin = "";
    if (l_bin_u1[0] == "1") l_bin = negacja(l_bin_u1);
    else l_bin = l_bin_u1;

    pokaz_wynik(l_bin);
}

function zu1_to_zu1() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do jedności (ZU1):<br>";
    pokaz_wynik(document.getElementById("znak").value + document.getElementById("modul").value);
}

function zu1_to_zu2() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do dwóch (ZU2):<br>";
    let l_bin_u1 = wez_zu1();

    let l_bin_u2 = dodaj_1_bit(l_bin_u1);
    l_bin_u2 = odwroc(l_bin_u2);

    pokaz_wynik(l_bin_u2);
}


//uzupełnienie do dwóch
function wez_zu2() {
    let l_bin_u2 = document.getElementById("modul").value;
    l_bin_u2 = odwroc(l_bin_u2);
    if (document.getElementById("znak").value == "1") for (let i = l_bin_u2.length; i < 7; i++) l_bin_u2 += "1";
    else for (let i = l_bin_u2.length; i < 7; i++) l_bin_u2 += "0";
    l_bin_u2 = odwroc(l_bin_u2);
    l_bin_u2 = document.getElementById("znak").value + l_bin_u2;

    return l_bin_u2;
}

function zu2_to_dec() {
    pole_out.innerHTML = "Podana liczba w systemie decymalnym:<br>";
    let l_bin_u2 = wez_zu2();

    let l_bin_u1 = "";
    let l_bin = "";
    if (l_bin_u2[0] == "1") {
        l_bin_u1 = odejmij_1_bit(l_bin_u2);
        l_bin_u1 = odwroc(l_bin_u1);
        l_bin = negacja(l_bin_u1);
    }
    else l_bin = l_bin_u2;

    l_bin = odwroc(l_bin);

    let liczba = konwertuj_na_liczbe(l_bin);

    pokaz_wynik(liczba);
}

function zu2_to_zm() {
    pole_out.innerHTML = "Podana liczba w systemie znak-moduł (ZM):<br>";
    let l_bin_u2 = wez_zu2();

    let l_bin_u1 = "";
    let l_bin = "";
    if (l_bin_u2[0] == "1") {
        l_bin_u1 = odejmij_1_bit(l_bin_u2);
        l_bin_u1 = odwroc(l_bin_u1);
        l_bin = negacja(l_bin_u1);
    }
    else l_bin = l_bin_u2;

    pokaz_wynik(l_bin);
}

function zu2_to_zu1() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do jedności (ZU1):<br>";
    let l_bin_u2 = wez_zu2();

    let l_bin_u1 = "";
    if (l_bin_u2[0] == "1") {
        l_bin_u1 = odejmij_1_bit(l_bin_u2);
        l_bin_u1 = odwroc(l_bin_u1);
    }
    else l_bin_u1 = l_bin_u2;

    pokaz_wynik(l_bin_u1);
}

function zu2_to_zu2() {
    pole_out.innerHTML = "Podana liczba w systemie uzupełnień do dwóch (ZU2):<br>";
    pokaz_wynik(document.getElementById("znak").value + document.getElementById("modul").value);
}