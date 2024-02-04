var words = '無法讀取資料';
let index = 0, num = 0, showRun = false;
const imgPath = "img/end/"

fetch('setting.json')
.then(response => response.json())
.then(data => {
    window.data = data;
})
.catch(error => console.error('取得資料時出現錯誤:', error));

function showEnd() {

}


function wordShow() {
    showRun = true
    setTimeout(() => {
        let part = words.substr(0, index+1);
        document.querySelector('.word').textContent = part;
        index++;
        (index < words.length) ? wordShow() : setTimeout(wordDel, 5000);
    }, 100);
}

function wordDel() {
    document.querySelectorAll('.fadeOut').forEach(element => {element.style.animation = 'fadeOut 10s forwards';});
    setTimeout(() => {
        index = 0;
        showRun = false;
        num += 1;
        (num < data.end.length) ? go() : showEnd();
    }, 10000);
    
}

function go(){
    if (!showRun) {
        words = "";
        document.querySelector('.word').textContent = "";
        document.querySelectorAll('.fadeOut').forEach(element => {element.style.animation = 'none';});
        for(j=1;j < data.end[num].length;j++) {
            words += data.end[num][j] + "\n";
        }
        document.getElementById('end-img').src = imgPath + data.end[num][0]
        wordShow();
    }
}


setTimeout(() => {
    go();
}, 3000);
