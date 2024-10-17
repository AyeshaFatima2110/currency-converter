import {countryList} from './code.js';

const baseUrl = `https://v6.exchangerate-api.com/v6/485b26ca3d39108917fa46a0/pair`;
//`https://v6.exchangerate-api.com/v6/485b26ca3d39108917fa46a0/pair/USD/PKR/${amount}`;

const button = document.querySelector('button');
const dropDown = document.querySelectorAll('.dropdown select');


//generate countries options in selects element
for (let select of dropDown){
  for(let currCode in countryList){
    const newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode==='USD'){
      newOption.selected = 'selected';
    }
    else if(select.name==='to' && currCode === 'PKR'){
      newOption.selected = 'selected';
    }
    select.append(newOption);

  }
  select.addEventListener('change' , (event)=>{
    updateFlag(event.target);

  });

}

//updating the flag image when changing the select option to new country
const updateFlag = (element)=>{
  
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  img.src = newSrc;

   }


//adding event listener to the exchange rate button
button.addEventListener('click' , (event)=>{
  event.preventDefault();
  const amount = document.querySelector('.js-amount').value;
  const currFrom = document.querySelector('.from select').value;
  const currTo= document.querySelector('.to select').value;
  const url = `${baseUrl}/${currFrom}/${currTo}/${amount}`;
  Converter(url,currFrom,currTo,amount);
  
  
});


const Converter = async(url,currFrom,currTo,amount)=>{

  const  response = await fetch(url);
  const data = await response.json();
  const conversion_rate = data.conversion_rate;
  const conversion_result = data.conversion_result

  
  document.querySelector('.js-base-currency').innerHTML = 
        `1 ${currFrom} = ${conversion_rate} ${currTo}`;

  document.querySelector('.js-conversion-result').innerHTML = 
        `${amount} ${currFrom} = ${conversion_result} ${currTo}`;

}





