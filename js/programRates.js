import { percentFormatter } from './formatters.js';

//Проценты по каждой ипотечной программе.
const programBase = 0.099;
const programIt = 0.047;
const programGov = 0.067;
const programZero = 0.108;
/*Показываем ставки на странице.(Надо найти "input" 
и когда найдем пропишем в "value" процентную ставку)*/
document. querySelector('#base-value').value = programBase;
document. querySelector('#it-value').value = programIt;
document. querySelector('#gov-value').value = programGov;
document. querySelector('#zero-value').value = programZero;
//Находим в label "спаны" и тоже прописываем % ставки.
document. querySelector('#base-text').innerText = percentFormatter.format(programBase);
document. querySelector('#it-text').innerText = percentFormatter.format(programIt);   
document. querySelector('#gov-text').innerText = percentFormatter.format(programGov);  
document. querySelector('#zero-text').innerText = percentFormatter.format(programZero); 
//Создаем форматор и отформатируем  наши числа под проценты
/*Теперь нужно  найти все радиокнопки на странице и в момент когда 
по ним кликаем, значения отображаются на правой стороне.*/
const programInputs = document.querySelectorAll('input[name = "program"]');
const totalPercent = document.querySelector('#total-percent');
//Далее нужно обойти каждую радиокнопку и повесить клик. Исползуем метод "forEach".
programInputs.forEach((input) => {
//Отоброжение на старте
    if (input.checked) {
        totalPercent.innerText = percentFormatter.format(input.value);    
    }
//Отоброжение при переключение
    input.addEventListener('click', function () {       
        totalPercent.innerText = percentFormatter.format(input.value);    
    })
})
/* Полученные значения нужно прописать в процентные ставки справо.
   а)Нужно найти на странице эти процентные ставки и вставить значения
   б)нужно делать условие, чтобы процентные ставки показались и при старте страницы*/
