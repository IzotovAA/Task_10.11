"use strict";

const fruitsList = document.querySelector(".fruits__list"); // список карточек
const shuffleButton = document.querySelector(".shuffle__btn"); // кнопка перемешивания
const filterButton = document.querySelector(".filter__btn"); // кнопка фильтрации
const sortKindLabel = document.querySelector(".sort__kind"); // поле с названием сортировки
const sortTimeLabel = document.querySelector(".sort__time"); // поле с временем сортировки
const sortChangeButton = document.querySelector(".sort__change__btn"); // кнопка смены сортировки
const sortActionButton = document.querySelector(".sort__action__btn"); // кнопка сортировки
const kindInput = document.querySelector(".kind__input"); // поле с названием вида
const colorInput = document.querySelector(".color__input"); // поле с названием цвета
const weightInput = document.querySelector(".weight__input"); // поле с весом
const addActionButton = document.querySelector(".add__action__btn"); // кнопка добавления
const saveArrayButton = document.querySelector(".save__array__btn"); // кнопка сохранения
const restoreArrayButton = document.querySelector(".restore__array__btn"); // кнопка восстановления

const modalAlert = new bootstrap.Modal(document.querySelector("#alert")); // назначение модального окна alert
const modalAlertElement = document.querySelector("#alert"); // модальное окно alert как элемент
const alertMessage = document.querySelector("#alert-message"); // информация для вывода в модальном окне alert

let minWeightInput = document.querySelector(".minweight__input"); // поле ввода нижней границы веса для фильтрации
let maxWeightInput = document.querySelector(".maxweight__input"); // поле ввода верхней границы веса для фильтрации
let arrayCheckResult = false; // для сравнения перемешаного массива с изначальным

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зелёный", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "жёлтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// Объект с цветами для добавления нужного класса при динамическом заполнении карточек
const colorObj = {
  красный: "fruit_red",
  "розово-красный": "fruit_carmazin",
  оранжевый: "fruit_orange",
  "светло-коричневый": "fruit_lightbrown",
  жёлтый: "fruit_yellow",
  зелёный: "fruit_green",
  голубой: "fruit_deepskyblue",
  синий: "fruit_blue",
  фиолетовый: "fruit_violet",
};
// ...

// массив с приоритетом цветов для сортировки
const colorPriority = [
  "красный",
  "розово-красный",
  "оранжевый",
  "светло-коричневый",
  "жёлтый",
  "зелёный",
  "голубой",
  "синий",
  "фиолетовый",
];
// ...

// сохранённый массив по умолчанию
let savedArray = [
  { kind: "Мангустин", color: "фиолетовый", weight: 13 },
  { kind: "Дуриан", color: "зелёный", weight: 35 },
  { kind: "Личи", color: "розово-красный", weight: 17 },
  { kind: "Карамбола", color: "жёлтый", weight: 28 },
  { kind: "Тамаринд", color: "светло-коричневый", weight: 22 },
  { kind: "Мандарин", color: "жёлтый", weight: 30 },
  { kind: "Яблоко", color: "красный", weight: 40 },
  { kind: "Слива", color: "синий", weight: 23 },
  { kind: "Апельсин", color: "оранжевый", weight: 33 },
  { kind: "Банан", color: "зелёный", weight: 15 },
  { kind: "Киви", color: "фиолетовый", weight: 18 },
];
// ...

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  let fruitCard = document.querySelectorAll(".fruit__item"); // карточки фруктов

  if (fruitCard.length) {
    fruitCard.forEach((element) => {
      fruitsList.removeChild(element);
    });
  }

  for (let i = 0; i < fruits.length; i++) {
    let color = fruits[i].color;
    fruitsList.insertAdjacentHTML(
      "beforeend",
      `<li class="fruit__item ${colorObj[color]}"><div class="fruit__info"><div>index: ${i}</div><div>kind: ${fruits[i].kind}</div><div>color: ${fruits[i].color}</div><div>weight (кг): ${fruits[i].weight}</div></div></li>`
    );
  }
};
// ...

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// ...

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let [...arrayCheck] = [...fruits];

  while (fruits.length > 0) {
    let index = getRandomInt(0, fruits.length - 1);
    let deleteElement = fruits.splice(index, 1);
    result.push(deleteElement[0]);
  }

  // сравнение изначального и перемешанного массивов
  for (let i = 0; i < fruits.length; i++) {
    if (arrayCheck[i].kind === result[i].kind) {
      arrayCheckResult = true;
    } else arrayCheckResult = false;
  }
  // ...

  if (arrayCheckResult) {
    alertMessage.innerText = "Перемешивание не удалось, попробуйте ещё раз";
    modalAlert.show();
    arrayCheckResult = false;
  }
  // ...

  fruits = result;
};
// ...

// слушатель клика на кнопку перемешать
shuffleButton.addEventListener("click", () => {
  shuffleFruits();
  display();
});
// ...

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let min = parseInt(minWeightInput.value);
  let max = parseInt(maxWeightInput.value);

  if (isNaN(min) || isNaN(max)) {
    minWeightInput.value = min = 17;
    maxWeightInput.value = max = 28;
    alertMessage.innerText =
      "Введённое значение не является числом, установленны значения по умолчанию";
    modalAlert.show();
  } else if (min <= 0 || max <= 0) {
    minWeightInput.value = min = 17;
    maxWeightInput.value = max = 28;
    alertMessage.innerText =
      "Введённое значение меньше или равно 0, установленны значения по умолчанию";
    modalAlert.show();
  } else if (min > max) {
    minWeightInput.value = min = 17;
    maxWeightInput.value = max = 28;
    alertMessage.innerText =
      "Минимальное значение должно быть меньши либо равно максимальному, установленны значения по умолчанию";
    modalAlert.show();
  }

  const filteredArray = fruits.filter((item) => {
    const weight = item.weight;
    if (min <= weight && weight <= max) {
      return true;
    } else {
      return false;
    }
  });
  fruits = filteredArray;
};
// ...

// кнопка фильтровать
filterButton.addEventListener("click", () => {
  filterFruits();
  display();
});
// ...

/*** СОРТИРОВКА ***/

let sortKind = "bubbleSort"; // инициализация состояния вида сортировки
let sortTime = "-"; // инициализация состояния времени сортировки

// функция сравнивает 2 цвета согласно массиву colorPriority
const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  if (colorPriority.indexOf(a) > colorPriority.indexOf(b)) {
    return true;
  } else return false;
};
// ...

// функция разделитель для метода быстрой сортировкиы
function partition(items, comparation, left, right) {
  let pivot = items[Math.floor((right + left) / 2)].color,
    i = left,
    j = right;

  while (i <= j) {
    while (comparation(pivot, items[i].color)) {
      i++;
    }
    while (comparation(items[j].color, pivot)) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}
// ...

// функция обмена элементов для метода быстрой сортировки
function swap(items, firstIndex, secondIndex) {
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}
// ...

// объект хранящий методы и функцию запуска сортировки
const sortAPI = {
  // сортировка методом пузырька
  bubbleSort(arr, comparation) {
    const n = arr.length;
    // внешняя итерация по элементам массива (в данном случае по объектам)
    for (let i = 0; i < n - 1; i++) {
      // внутренняя итерация для перестановки элемента (объекта) в конец массива
      for (let j = 0; j < n - 1 - i; j++) {
        if (comparation(arr[j].color, arr[j + 1].color)) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },
  // ...

  // сортировка методом быстрая сортировка
  quickSort(items, comparation, left, right) {
    let index;
    if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, comparation, left, right);
      if (left < index - 1) {
        sortAPI.quickSort(items, comparation, left, index - 1);
      }
      if (index < right) {
        sortAPI.quickSort(items, comparation, index, right);
      }
    }
    return items;
  },
  // ...

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    console.log("start", start, "end", end);
  },
};
// ...

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

// слушатель клика по кнопке смены алгоритма сортировки
sortChangeButton.addEventListener("click", () => {
  if (sortKindLabel.textContent === "bubbleSort") {
    sortKind = sortKindLabel.textContent = "quickSort";
  } else if (sortKindLabel.textContent === "quickSort") {
    sortKind = sortKindLabel.textContent = "bubbleSort";
  }
});
// ...

// слушатель клика по кнопке сортировки
sortActionButton.addEventListener("click", () => {
  sortKindLabel.textContent = sortKind;
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});
// ...

/*** ДОБАВИТЬ ФРУКТ ***/

// слушатель клика по кнопке добавить фрукт
addActionButton.addEventListener("click", () => {
  let weight = parseInt(weightInput.value);

  if (isNaN(weight)) {
    weightInput.value = weight = 17;
    alertMessage.innerText =
      "Введённое значение не является числом, установленно значение по умолчанию";
    modalAlert.show();
  } else if (weight <= 0) {
    weightInput.value = weight = 17;
    alertMessage.innerText =
      "Введённое значение меньше или равно 0, установленно значение по умолчанию";
    modalAlert.show();
  }

  if (kindInput.value && colorInput.value && weightInput.value) {
    fruits.push({
      kind: kindInput.value,
      color: colorInput.value,
      weight: weightInput.value,
    });
  } else {
    alertMessage.innerText = "Необходимо заполнить все поля";
    modalAlert.show();
  }
  display();
});

// слушатель на закрытие моадльного окна alert
modalAlertElement.addEventListener("hidden.bs.modal", () => {
  answerNumber = Math.floor((minValue + maxValue) / 2);
  checkAnswerNumberText();
  orderNumber = 1;
  orderNumberField.innerText = orderNumber;
  gameRun = true;
});
// ...

// слушатель на кнопку сохранить массив
saveArrayButton.addEventListener("click", () => {
  [...savedArray] = [...fruits];
  display();
});
// ...

// слушатель на кнопку восстановить массив
restoreArrayButton.addEventListener("click", () => {
  [...fruits] = [...savedArray];
  display();
});
// ...
