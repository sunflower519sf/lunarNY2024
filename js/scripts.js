const audioButton = document.getElementById('startButton');
const asks = document.querySelectorAll(".answer");

let askCount = 0;




function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}  

function askEnd() {
    document.querySelector(".pageAsk").style.display = "none";

}

function askError() {
    document.querySelector(".pageStart").style.display = "block";
    document.querySelector(".pageAsk").style.display = "none";
    askCount = 0;
}

function askReplace() {

    if (askCount < data.ask.length){
        const ansData = data.ask[askCount].ans;
        window.askAns = data.ask[askCount].ans[0];
        shuffleArray(ansData);

        document.querySelector(".ask").innerText = data.ask[askCount].ask;
        asks[0].innerText = ansData[0];
        asks[1].innerText = ansData[1];

        askCount++;
    } else {
        askEnd();
    }
}


document.getElementById('startButton').addEventListener('click', function() {
    document.querySelector(".pageStart").style.display = "none";
    document.querySelector(".pageAsk").style.display = "block";

    fetch('setting.json')
    .then(response => response.json())
    .then(data => {
        window.data = data;
        askReplace();

    })
    .catch(error => console.error('取得題目資料時出現錯誤:', error));
});

asks.forEach(button => {
    button.addEventListener('click', (a) => {
        if (a.currentTarget.innerText == askAns) {
            console.log('答對囉！', a.currentTarget.innerText);
            
            askReplace();
        } else {
            console.log('答錯囉！')
            askError()
        }
        

    });
});
