const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

const clock = setInterval(function time()
{
    const date = new Date();
    let hr = date.getHours();
    let mn = date.getMinutes();
    let s = date.getSeconds();

    if (hr < 10)
        hr = '0' + hr;
    if (mn < 10)
        mn = '0' + mn;
    if (s < 10)
        s = '0' + s;

    hour.textContent = hr;
    minute.textContent = mn;
    second.textContent = s;


    console.log(hr, mn, s);
}, 1);