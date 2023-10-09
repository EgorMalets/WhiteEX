/* <!— start edit —> */
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block : "start"
        })
    })
}
/* <!— end edit —> */


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("codeCheckForm");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
});

/*document.getElementById("open-modal-btn").addEventListener("click",function() {
    document.getElementById("my-modal").classList.add("open")
})*/

document.getElementById("close-my-modal-btn").addEventListener("click",function() {
    document.getElementById("my-modal").classList.remove("open")
})

/*document.getElementById("open-modal-btn").addEventListener("click",function() {
    document.getElementById("my-modalsecond").classList.add("open2")
})*/

document.getElementById("close-my-modal-btnsecond").addEventListener("click",function() {
    document.getElementById("my-modalsecond").classList.remove("open2")
})


function checkCode() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const partner = document.getElementById('partner').value;
    const region = document.getElementById('region').value;
    const code = document.getElementById('code').value;
    
    /* <!— start edit —> */
    const form = new FormData(document.getElementById("codeCheckForm"))
    form.append('name', name)
    form.append('email', email)
    form.append('partner', partner)
    form.append('region', region)
    form.append('code', code)
    
    fetch('https://whiteex-1.andrii.work/api/check', {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data'
        },
        body: form,
    })
    /* <!— end edit —> */
    
    .then(data => {
        if (data.response === 1) {
            // Сценарій 1: Код не знайдено
            document.getElementById('my-modal').classList.add("open");
        } else if (data.response === 2) {
            // Сценарій 2: Код не виграшний
            document.getElementById('my-modal').classList.add("open");
        } else if (data.response === 3) {
            // Сценарій 3: Код виграшний
            document.getElementById('my-modalseconds').classList.add("open2");
            /* <!— start edit —> */
            document.getElementById('denomination').innerHTML = data.denomination;
            document.getElementById('code').innerHTML = data.code;
            /* <!— end edit —> */
        }
    })
    .catch(error => {
        console.error('Помилка при виконанні запиту:', error);
    });
} 

// Функция для установки куки
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Функция для получения значения куки
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// Проверяем, есть ли кука CookieAgree
const cookieAgree = getCookie('CookieAgree');

if (!cookieAgree) {
    // Если куки нет, показываем оверлей
    const cookieOverlay = document.getElementById('cookie-overlay');
    cookieOverlay.style.display = 'block';

    // Обработчик согласия на куки
    const acceptButton = document.getElementById('accept-cookie');
    acceptButton.addEventListener('click', () => {
        // Устанавливаем куку на 30 дней (можете изменить срок)
        setCookie('CookieAgree', 'true', 30);
        document.getElementById('cookiealert').style = 'top: 1000px' // Скрываем оверлей
        setTimeout(() => {
            cookieOverlay.style.display = "none";
        }, 2000)
    });
}
