let lastUpdated = new Date();
async function getNews(page = 1) {
    await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=TRhxZBGOWOLmybTC8rM32Ap1eNfsWh8Q`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.results);
            const output = document.getElementById('output');
            output.innerHTML = '';

            const shuffledIndexes = shuffleArray(Array.from({ length: data.results.length }, (_, i) => i));

            shuffledIndexes.forEach(index => {
                const result = data.results[index];
            
                try {
                    const card = document.createElement('div');
                    card.classList.add('card', 'my-3');
                    
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const image = document.createElement('img');
                    image.src = result['media'][0]['media-metadata'][2].url;
                    image.classList.add('card-img-top');
                    image.alt = result['media'][0].caption;
                    image.title = result['media'][0].caption;
            
                    const title = document.createElement('h2');
                    title.classList.add('card-title');
                    title.textContent = result.title;
            
                    const abstract = document.createElement('p');
                    abstract.classList.add('card-text');
                    abstract.textContent = result.abstract;
            
                    const dateUpdated = document.createElement('p');
                    dateUpdated.classList.add('card-date');
                    dateUpdated.textContent = `News Update : ${lastUpdated.getDate()} ${lastUpdated.toLocaleDateString('en-US', { month: 'long' })} ${lastUpdated.getFullYear()}`;
            
                    cardBody.appendChild(image);
                    cardBody.appendChild(title);
                    cardBody.appendChild(abstract);
                    cardBody.appendChild(dateUpdated);
            
                    card.appendChild(cardBody);
            
                    output.appendChild(card);
;
            
                    console.log(result['media'][0].caption);
                    console.log(result.title);
                } catch (err) {
                    console.log(err);
                }
            });

            console.log(data.results.length);
            lastUpdated = new Date();
            document.getElementById('lastUpdated').textContent = `Last updated: ${lastUpdated.getDate()} ${lastUpdated.toLocaleDateString('en-US', { month: 'long' })} ${lastUpdated.getFullYear()}`;
            setTimeout(() => {
                getNews(page + 1);
            }, 1 * 60 * 1000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

getNews();


let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let navbar = document.getElementById("navbar");
    if (currentScroll > lastScrollTop) {
        navbar.style.transform = "translateY(-150%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});