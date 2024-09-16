let minValue;
let maxValue;
let answerNumber;
let orderNumber = 1;
let gameRun = true;
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const startButton = document.getElementById('startGame');
const btnOver = document.getElementById('btnOver');
const btnLess = document.getElementById('btnLess');
const btnEqual = document.getElementById('btnEqual');
const btnRetry = document.getElementById('btnRetry');

// После смены замены promt и alert добавил новые кнопки и поля ввода для начала игры
function startGame() {
  orderNumber = 1;
  minValue = parseInt(document.getElementById('minValueInput').value);
  maxValue = parseInt(document.getElementById('maxValueInput').value);
  // Проверяем значения на NaN и присваиваем значения по умолчанию
  if (isNaN(minValue) || isNaN(maxValue)) {
    alert('Введите числовое значение для минимального и максимального числа');
    return;
};

if (minValue < -999 || minValue >= maxValue || maxValue > 999) {
    alert('Минимальное число должно быть не меньше -999, а максимальное - не больше 999. Также убедитесь, что максимальное число больше минимального.');
    return;
};
  orderNumberField.innerText = orderNumber;
  answerNumber = Math.floor((minValue + maxValue) / 2);
  let randomValue = Math.floor(Math.random() * 3);
  let answerPhrase;
  if (randomValue === 0) {
    answerPhrase = `Это число ${numberToText(answerNumber)}?`;
  } else if (randomValue === 1) {
    answerPhrase = `Вы загадали число ${numberToText(answerNumber)}?`;
  } else if (randomValue === 2) {
    answerPhrase = `Наверное, это число ${numberToText(answerNumber)}?`;
  } else {
    answerPhrase = `Может быть, это число ${numberToText(answerNumber)}?`;
  };
  answerField.innerText = answerPhrase;

  document.getElementById('gameContent').classList.add('show'); // Скрывает 1 окно с полем ввода, открывает 2 окно с выбором больше, меньше
  document.querySelector('.card-header').style.display = 'none';
};
// Запускаем игру
startButton.addEventListener('click', startGame);

// Кнопка больше
btnOver.addEventListener('click', function() {
  if (gameRun) {
    if (minValue === maxValue) {
        const phraseRandom = Math.round(Math.random());
        const answerPhrase = (phraseRandom === 1) ?
            `Вы загадали неправильное число!\n\u{1F914}` :
            `Я сдаюсь..\n\u{1F92F}`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    } else {
        minValue = answerNumber + 1;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        orderNumber++;
        orderNumberField.innerText = orderNumber;
        let randomValue = Math.floor(Math.random() * 3);
        let answerPhrase; // Разные варианты ответов
        if (randomValue === 0) {
          answerPhrase = `Это число ${numberToText(answerNumber)}?`;
        } else if (randomValue === 1) {
          answerPhrase = `Вы загадали число ${numberToText(answerNumber)}?`;
        } else if (randomValue === 2) {
          answerPhrase = `Наверное, это число ${numberToText(answerNumber)}?`;
        } else {
          answerPhrase = `Может быть, это число ${numberToText(answerNumber)}?`;
        };
        answerField.innerText = answerPhrase;
    }
}
});

// Кнопка меньше
btnLess.addEventListener('click', function() {
  if (gameRun) {
    if (minValue >= maxValue) {
      const phraseRandom = Math.round(Math.random());
      const answerPhrase = (phraseRandom === 1) ?
        `Вы загадали неправильное число!\n\u{1F914}` :
        `Я сдаюсь..\n\u{1F92F}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      maxValue = answerNumber - 1;
      if (minValue > maxValue) {
        const phraseRandom = Math.round(Math.random());
        const answerPhrase = (phraseRandom === 1) ?
          `Вы загадали неправильное число!\n\u{1F914}` :
          `Я сдаюсь..\n\u{1F92F}`;
        answerField.innerText = answerPhrase;
        gameRun = false;
      } else {
        answerNumber = Math.floor((minValue + maxValue) / 2);
        orderNumber++;
        orderNumberField.innerText = orderNumber;
        let randomValue = Math.floor(Math.random() * 3);
        let answerPhrase;
        if (randomValue === 0) {
          answerPhrase = `Это число ${numberToText(answerNumber)}?`;
        } else if (randomValue === 1) {
          answerPhrase = `Вы загадали число ${numberToText(answerNumber)}?`;
        } else if (randomValue === 2) {
          answerPhrase = `Наверное, это число ${numberToText(answerNumber)}?`;
        } else {
          answerPhrase = `Может быть, это число ${numberToText(answerNumber)}?`;
        };
        answerField.innerText = answerPhrase;
      }
    }
  }
});

// Кнопка верно
btnEqual.addEventListener('click', function() {
  if (gameRun){
    let phrases = [
        "Я всегда угадываю\n\u{1F60E}",
        "Проще простого!",
        "И снова я угадал!",
        "Это было очень легко:)"
    ];
    let randomIndex = Math.floor(Math.random() * phrases.length);
    answerField.innerText = phrases[randomIndex];
    gameRun = false;
}
});

// Кнопка заново
btnRetry.addEventListener('click', function() {
  orderNumber = 0;
  gameRun = true;
  document.getElementById('minValueInput').value = ''; // Сброс значения
  document.getElementById('maxValueInput').value = '';
  document.getElementById('gameContent').classList.remove('show'); // Открывает 1 окно с вводом чисел и скрывает 2 окно
  document.querySelector('.card-header').style.display = 'block';
});

// Функция преобразования числа в текст
function numberToWords(answerNumber) {
  if (answerNumber < 0) {
      return 'минус ' + numberToWords(-answerNumber);
  }
  if (answerNumber == 0) {
      return 'ноль';
  }

  const words = [];
  if (answerNumber >= 100) {
      const hundreds = Math.floor(answerNumber / 100);
      words.push(['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'][hundreds - 1]);
      answerNumber %= 100;
  }

  if (answerNumber >= 20) {
      const tens = Math.floor(answerNumber / 10);
      words.push(['двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'][tens - 2]);
      answerNumber %= 10;
  }

  if (answerNumber >= 10 && answerNumber <= 19) {
      words.push(['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'][answerNumber - 10]);
  } else if (answerNumber > 0) {
      words.push(['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'][answerNumber - 1]);
  }

  return words.join(' ');
}

// функция отображения текста в зависимости от количества символов
function numberToText(answerNumber) {  
  let textRepresentation = numberToWords(answerNumber);
  if (textRepresentation.length <= 20) {
    return textRepresentation;
  } else {
    alert("Число слишком большое для текстового представления.");
    return answerNumber;
  }
};