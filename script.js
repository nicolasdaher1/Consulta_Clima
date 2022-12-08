document.querySelector('.busca').addEventListener('submit', async function(event){
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    if(input !== '' ){
        showWarning('Carregando...');
    } 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=62b9ef2b2cf487441a0b1f794aa47d1d&units=metric&lang=pt_br`;

    let result = await fetch(url);
    let JSON = await result.json();

    if(JSON.cod === 200){
        showInfo({
            name: JSON.name,
            country: JSON.sys.country,
            temp: JSON.main.temp,
            tempIcon: JSON.weather[0].icon,
            windSpeed: JSON.wind.speed,
            windDeg: JSON.wind.deg
        });
    } else{
        clearInfo();
        showWarning('Não encontramos esta localização.');
    }
});

function showInfo(JSON){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${JSON.name}, ${JSON.country}`;
    document.querySelector('.tempInfo').innerHTML = `${JSON.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${JSON.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${JSON.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${JSON.windDeg-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
};
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

