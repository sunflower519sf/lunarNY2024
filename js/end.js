var words = '無法讀取資料';
let index = 0, num = 0, showRun = false;
const imgPath = "img/end/"
var music = document.getElementById('music');


fetch('setting.json')
.then(response => response.json())
.then(data => {
    window.data = data;
})
.catch(error => console.error('取得資料時出現錯誤:', error));

function showEnd() {
    document.querySelectorAll('.fadeOut').forEach(element => {element.style.display = 'none';});
    document.querySelector(".show-end").style.display = "block";
    setTimeout(() => {
        document.querySelector(".show-end").style.display = "none";
        document.querySelector(".page-end").style.display = "block";
    }, 60000);
}


function wordShow() {
    showRun = true
    setTimeout(() => {
        let part = words.substr(0, index+1);
        document.querySelector('.word').textContent = part;
        index++;
        (index < words.length) ? wordShow() : setTimeout(wordDel, 10000);
    }, 100);
    music.play()
}

function wordDel() {
    document.querySelectorAll('.fadeOut').forEach(element => {element.style.animation = 'fadeOut 5s forwards';});
    setTimeout(() => {
        index = 0;
        showRun = false;
        num += 1;
        (num < data.end.length) ? go() : showEnd();
    }, 5000);
}

function go(){
    if (!showRun) {
        words = "";
        document.querySelector('.word').textContent = "";
        document.getElementById('end-img').src = imgPath + data.end[num][0]
        document.querySelectorAll('.fadeOut').forEach(element => {element.style.animation = 'none';});
        for(j=1;j < data.end[num].length;j++) {
            words += data.end[num][j] + "\n";
        }
        setTimeout(wordShow, 1000)
        music.play()
    }
}


setTimeout(() => {
    go();
    music.play()
}, 3000);
