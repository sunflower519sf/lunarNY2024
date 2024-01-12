const audioButton = document.getElementById('startButton');
let askCount = 0;
const asks = document.querySelectorAll(".answer");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}  

function askReplace() {
    fetch('setting.json')
    .then(response => response.json())
    .then(data => {
    // 在這裡處理從 JSON 中獲取的數據
        console.log(data);
        const ansData = data.ask[askCount].ans1;
        shuffleArray(ansData);

        document.querySelector(".ask").innerText = data.ask[askCount].ask1;
        asks[0].innerText = ansData[0];
        asks[1].innerText = ansData[1];

        if (data.ask > askCount){
            askCount = askCount + 1;
        } else {
            askEnd();
        }
        
    })
    .catch(error => console.error('取得題目資料時出現錯誤:', error));
}

function askEnd() {

}

document.getElementById('startButton').addEventListener('click', function() {
    document.querySelector(".pageStart").style.display = "none";
    document.querySelector(".pageAsk").style.display = "block";

    askReplace();
});

asks.forEach(button => {
    button.addEventListener('click', () => {
        console.log('按鈕被點擊了！');

    });
});
