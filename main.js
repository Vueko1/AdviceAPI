let adviceV = new Object;
const quotes = document.querySelector("#advice");
const count = document.querySelector("#count");
const dice = document.querySelector("#diceFrame");

// checking request for correct response and getting data

const getAdvice = (callback) => {
    const adviceRequest = new XMLHttpRequest;

    adviceRequest.addEventListener("readystatechange", () => {
        if(adviceRequest.readyState === 4 && adviceRequest.status === 200){
            const advice = JSON.parse(adviceRequest.responseText);
            callback(undefined, advice);
        } else if (adviceRequest.readyState === 4){
            callback('could not fetch data', undefined);
        }
    });

    adviceRequest.open('GET', 'https://api.adviceslip.com/advice');
    adviceRequest.send();
}

// checking request for error and replacing html with given data
const advicing = (err, advice) => {
    if(err){
        console.log(err);
    } else {
        adviceV = advice;
        count.innerHTML = `advice # ${adviceV.slip.id}`;
        quotes.innerHTML = `"${adviceV.slip.advice}"`
    }
}

getAdvice(advicing);

// handling "rolling" for next advice

diceFrame.addEventListener('click', () => {
    getAdvice(advicing);
})

