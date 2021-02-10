// DOM Elements
const time = document.querySelector('.time')
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const switchButton = document.querySelector('.switch-button');

// Options
const showAmPm = true;

// Show Time
const showTime = () => {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // Set Am or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12 hour format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
}

// Add zeros
const addZero = (num) => {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

// Set Background and Greeting
const setBgGreet = () => {
    // let today = new Date(2019, 06, 10, 20, 33, 30); 
    let today = new Date();
    let hour = today.getHours();

    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        // Evening
        document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
        greeting.textContent = 'Good Evening';
        // document.body.style.color = 'white';
    }
}

const getImage = () => {
    let imgNum = Math.floor(Math.random() * 20) + 1;
    return (imgNum =
      imgNum >= 10 ? (imgNum = `${imgNum}.jpg`) : (imgNum = `0${imgNum}.jpg`));
  }

let images = [];

const loadIamges = () => {
    const basePath = 'assets/images/';
    for (let i = 0; i < 24; i++) {
        if (i < 6) images[i] = basePath + 'night/' + getImage();
        else if (i < 12) images[i] = basePath + 'morning/' + getImage();
        else if (i < 18) images[i] = basePath + 'day/' + getImage();
        else images[i] = basePath + 'evening/' + getImage();
    }
}

loadIamges();

const setBackgroundImage = () => {
    let today = new Date();
    let hour = today.getHours();
    let src = images[hour];
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        // document.body.style.backgroundImage = `url(${src})`;
        const active = document.querySelector('.background.active');
        active.style.backgroundImage = `url(${src})`;
        active.style.opacity = 1;
        document.querySelector('.background:not(.active)').style.opacity = 0;
        setTimeout(() => {
            const bg = document.querySelectorAll('.background');
            bg.forEach((item) => {
              item.classList.add('active');
            });
            active.classList.remove('active');
          }, 1200);
    }
}

let index = new Date();
let numOfImg = index.getHours();

switchButton.onclick = function() {
    if (numOfImg < images.length - 1) {
        let src = images[numOfImg + 1];
        const img = document.createElement("img");
        img.src = src;
        img.onload = () => {
        //   document.body.style.backgroundImage = `url(${src})`;

          const active = document.querySelector('.background.active');
          active.style.backgroundImage = `url(${src})`;
          active.style.opacity = 1;
          document.querySelector('.background:not(.active)').style.opacity = 0;
          setTimeout(() => {
            const bg = document.querySelectorAll('.background');
            bg.forEach((item) => {
              item.classList.add('active');
            });
            active.classList.remove('active');
          }, 1200);
        };
        numOfImg++;
    } else {
        numOfImg = -1;
        let src = images[numOfImg + 1];
        const img = document.createElement("img");
        img.src = src;
        img.onload = () => {
        //   document.body.style.backgroundImage = `url(${src})`;

        const active = document.querySelector('.background.active');
          active.style.backgroundImage = `url(${src})`;
          active.style.opacity = 1;
          document.querySelector('.background:not(.active)').style.opacity = 0;
          setTimeout(() => {
            const bg = document.querySelectorAll('.background');
            bg.forEach((item) => {
              item.classList.add('active');
            });
            active.classList.remove('active');
          }, 1200);
        };
    }
}

const weekDays = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fr', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May',
'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateToday = document.querySelector('.date');


const today = new Date();
const hours = today.getHours();
const minutes = today.getMinutes();
const seconds = today.getSeconds();
const day = today.getDate();
const weekday = today.getDay();
const month = today.getMonth();

dateToday.innerHTML = `${weekDays[weekday]} ${day} ${monthNames[month]}`;

// Run
showTime();
setBgGreet();



setBackgroundImage();

// timer(true);
// setInterval(timer, 1000);

// Reload local storage
const updateLocal = (name, value) => {
    localStorage.setItem(name, value);
  };

// Editable components handlers
const editables = document.querySelectorAll('.js-editable');

editables.forEach((item) => {
  const name = item.dataset.name;
  const itemValue = () => {
    const value = localStorage.getItem(name);
    if (!value) {
      return item.dataset.template;
    } else {
      return value;
    }
  };

  item.innerText = itemValue();

  // event handlers
  ['keypress', 'blur', 'click'].forEach((event) =>
    item.addEventListener(event, (currentEvent) => {
      if (event === 'click') {
        item.innerHTML = '';
        return;
      }

      if (event === 'keypress' && currentEvent.keyCode === 13) {
        currentEvent.preventDefault();
        item.blur();
      }

      if (event === 'blur') {
        const currentValue = item.innerText.trim();
        if (currentValue !== '') {
          updateLocal(name, currentValue);
          item.innerText = currentValue;
        } else {
          item.innerText = itemValue();
        }
      }
    })
  );
});

// Weather API handling
const city = document.querySelector('.city');

const loadWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=18166784a2fb55c1b03e824f6e8b9663&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
  
const updateWheather = async () => {
    const city = document.querySelector('.city');
    const weatherData = await loadWeather(city.textContent);

    const errorMessage = document.querySelector('.weather-error-js');

    if (weatherData.cod === '404') {
        errorMessage.innerText = 'City not found';
        localStorage.setItem('city', '');
        return;
    } else {
        errorMessage.innerText = '';
    }

    const temperature = document.querySelector('.weather__temperature');
    temperature.innerText = `Temperature: ${Math.floor(weatherData.main.temp)}°C`;

    const icon = document.querySelector('.weather__icon');
    icon.className = 'weather__icon owf';
    icon.classList.add(`owf-${weatherData.weather[0].id}`);

    const humidity = document.querySelector('.weather__humidity');
    humidity.innerText = `Humidity: ${weatherData.main.humidity}%`;

    const windSpeed = document.querySelector('.weather__wind-speed');
    windSpeed.innerText = `Wind speed: ${weatherData.wind.speed}m/s`;
};
  
city.addEventListener('keypress', (event) => {
    if (event.which === 13 || event.keyCode === 13) {
        city.blur();
    }
});

city.addEventListener('click', (event) => {
    event.currentTarget.innerText = '';
});
  
city.addEventListener('blur', (event) => {
    if (city.innerText === '') {
        if (localStorage.getItem('city')) {
            city.innerText = localStorage.getItem('city', city.innerText);
        } else {
            city.innerText = 'Enter city';
        }
    }
    updateWheather();
    localStorage.setItem('city', city.innerText);
    event.preventDefault();
});
  
const storedCity = localStorage.getItem('city');
  
if (storedCity) {
    city.innerText = storedCity;
    const error = document.querySelector('.weather-error-js');
    error.innerHTML = 'Loading...';
    try {
        updateWheather();
    } catch {
        error.innerHTML = 'Error with api request';
    }
}

// Quotes handling
const loadQuote = async () => {
    const url = 'https://programming-quotes-api.herokuapp.com/quotes';
    const res = await fetch(url);
    const data = await res.json();
    return data[Math.floor(Math.random() * 500)];
}

const quote = document.querySelector('.quote__content');

const updateQuote = async () => {
    try {
        const post = await loadQuote();
        quote.innerText = post['en'];
    } catch {
        quote.innerText = 'Error occured while requesting data from API';
    }
}

updateQuote();

const quoteButton = document.querySelector('.quote__update');

quoteButton.addEventListener('click', () => {
    quote.innerText = 'loading...';
    updateQuote();
});

document.addEventListener('DOMContentLoaded', loadWeather);