// элементы в DOM можно получить при помощи функции querySelector
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

let minWeightInput = document.querySelector(".minweight__input"); // поле ввода нижней границы веса для фильтрации
let maxWeightInput = document.querySelector(".maxweight__input"); // поле ввода верхней границы веса для фильтрации
let arrayCheckResult = false; // для сравнения перемешаного массива с изначальным

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// Объект с цветами для добавления нужного класса при динамическом заполнении карточек
const colorObj = {
  фиолетовый: "fruit_violet",
  зеленый: "fruit_green",
  "розово-красный": "fruit_carmazin",
  желтый: "fruit_yellow",
  "светло-коричневый": "fruit_lightbrown",
};
// ...

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек (готово)
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  let fruitCard = document.querySelectorAll(".fruit__item"); // карточки фруктов

  if (fruitCard.length) {
    fruitCard.forEach((element) => {
      fruitsList.removeChild(element);
    });
  }

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
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

// перемешивание массива (готово)
const shuffleFruits = () => {
  let result = [];
  let [...arrayCheck] = [...fruits];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let index = getRandomInt(0, fruits.length - 1);
    let deleteElement = fruits.splice(index, 1);
    result.push(deleteElement[0]);
  }

  // сравнение массивов
  for (let i = 0; i < fruits.length; i++) {
    if (arrayCheck[i].kind === result[i].kind) {
      arrayCheckResult = true;
    } else arrayCheckResult = false;
  }

  if (arrayCheckResult) {
    alert("перемешивание не удалось, попробуйте ещё раз");
    arrayCheckResult = false;
  }
  // ...

  fruits = result;
};
// ...

// слушатель клика на кнопку перемешать
shuffleButton.addEventListener("click", () => {
  // debugger;
  shuffleFruits();
  display();
});
// ...

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива (готово)
const filterFruits = () => {
  let min = parseInt(minWeightInput.value);
  let max = parseInt(maxWeightInput.value);
  console.log(min, max, typeof min, typeof max);
  if (isNaN(min) || isNaN(max)) {
    minWeightInput.value = min = 17;
    maxWeightInput.value = max = 28;
    alert(
      "введённое значение не является числом, установленны значения по умолчанию"
    );
  } else if (min <= 0 || max <= 0) {
    minWeightInput.value = min = 17;
    maxWeightInput.value = max = 28;
    alert(
      "введённое значение меньше или равно 0, установленны значения по умолчанию"
    );
  }

  const filteredArray = fruits.filter((item) => {
    // TODO: допишите функцию
    const weight = item.weight;

    for (let i = min; i <= max; i++) {
      if (min <= weight && weight <= max) {
        return true;
      } else {
        return false;
      }
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

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener("click", () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener("click", () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener("click", () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
