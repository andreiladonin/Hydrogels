// Получить модальный
const modal = document.getElementById("myModal");

// Получить кнопку, которая открывает модальный
const btn = document.getElementById("myBtn");

// Получить элемент <span>, который закрывает модальный
const span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
  modal.style.display = "none";
}

