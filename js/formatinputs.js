import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

 const maxPrice = 100000000;          
      //Находим инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');
      //Cleave-функции. Форматирование.
const cleavePriceSetting = {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      delimiter: " ",
};
      //Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);

      calcMortgage();
      //Отображение и расчет суммы кредита.
form.addEventListener('input', function () {
      //расчет суммы кредита
      calcMortgage();
const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
      totalCost.innerText = priceFormatter.format(totalAmount);
})
function calcMortgage() {
      console.log('start');
      //Проверяем, чтобы стоимость недвижимости не была больше максимальной
      let cost = +cleaveCost.getRawValue();
      if (cost > maxPrice) {
      cost = maxPrice;
      }        
      //Общая сумма кредита
const totalAmount = cost - cleaveDownPayment.getRawValue();
      totalCost.innerText = priceFormatter.format(totalAmount);
      //Ставка  по кредиту
const creditRate = +document.querySelector('input[name="program"]:checked').value;
const monthRate = (creditRate * 100) / 12;         
      //Срок ипотеки 
const years = +cleaveTerm.getRawValue();
const months = years * 12;
      //Расчет ежемесячного платежа
const monthPayment =  (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months));
      //Отоброжение месячного платежа
      totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);    
}
      //Слайдер Cost
const sliderCost = document.getElementById('slider-cost');
noUiSlider.create(sliderCost, {
        start: 12000000,
        connect: 'lower',
        //tooltips: true,
        step: 100000,
        range: {
           min: 0,
          '50%': [10000000, 1000000], 
           max: 100000000,
        },
        format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: ' ',
        }), 
});
sliderCost.noUiSlider.on('slide', function() {
       const sliderValue =parseInt(sliderCost.noUiSlider.get(true));
       //inputCost.value = sliderValue;
       cleaveCost.setRawValue(sliderValue);
       calcMortgage();
});
      //Слайдер downpayment
const sliderDownPayment = document.getElementById('slider-downpayment');
noUiSlider.create(sliderDownPayment, {
        start: 6000000,
        connect: 'lower',
        tooltips: true,
        step: 100000,
        range: {
           min: 0,
           max: 10000000,
        },
        format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: ' ',
        }), 
});
sliderDownPayment.noUiSlider.on('slide', function() {
      const sliderValue =parseInt(sliderDownPayment.noUiSlider.get(true));
      cleaveDownPayment.setRawValue(sliderValue);
      calcMortgage();
});
      //Слайдер Years
const sliderTerm = document.getElementById('slider-term');
noUiSlider.create(sliderTerm, {
        start: 1,
        connect: 'lower',
        tooltips: true,
        step: 1,
        range: {
           min: 0,
           max: 30,
        },
        format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
        }), 
});
sliderTerm.noUiSlider.on('slide', function() {
      const sliderValue =parseInt(sliderTerm.noUiSlider.get(true));
      //inputCost.value = sliderValue;
      cleaveTerm.setRawValue(sliderValue);
      calcMortgage();
});
      //Форматирование inputCost
inputCost.addEventListener('input', function () {
      const value = +cleaveCost.getRawValue();
      //Обнавляем range slider
      sliderCost.noUiSlider.set(value);
      //Проверяем на max. цену
      if (value > maxPrice) inputCost.closest('.param__details').classList.add('param__details--error'); 
      if (value <= maxPrice) inputCost.closest('.param__details').classList.remove('param__details--error'); 
      //Зависимость значений downpayment от input cost
      const percentMin = value * 0.15;
      const percentMax = value * 0.90;
      sliderDownPayment.noUiSlider.updateOptions({
        range: {
           min: percentMin,
           max: percentMax,        
        }
     }); 
});
inputCost.addEventListener('change', function () {
        const value = +cleaveCost.getRawValue();
        if (value > maxPrice) {
           inputCost.closest('.param__details').classList.remove('param__details--error'); 
           cleaveCost.setRawValue(maxPrice);  
        }
});
    



        
        

        





