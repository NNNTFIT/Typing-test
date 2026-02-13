const display = document.getElementById("text");
const startBtn = document.querySelector(".menu-typing-btn");
const selectBox = document.querySelector(".menu-typing-content-main-select");
const selectTittle = document.querySelector(".menu-typing-content-main-title");
const inp = document.getElementById("inp");
let text = "";
const listText = [
    "Đố anh bắt được em.",
    "Hôm nay trời nhẹ lên cao, tôi buồn không hiểu vì sao tôi buồn.",
    "Trăm năm trong cõi người ta, chữ tài chữ mệnh khéo là ghét nhau.",
    "Học, học nữa, học mãi.",
    "Deadline giống như crush. Lúc chưa tới thì không quan tâm. Tới sát bên rồi mới thấy hoảng :)))",
    "Học hành như cá kho tiêu, kho nhiều thì mặn, học nhiều thì ngu.",
    "Sóng bắt đầu từ gió, gió bắt đầu từ đâu, em cũng không biết nữa, khi nào ta yêu nhau.",
    "Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra.",
    "Bầu ơi thương lấy bí cùng, mai sau có lúc nấu chung một nồi.",
    "Có công mài sắt, có ngày nên kim.",
    "Có chí thì nên, có tiền thì khỏe."
];



let s = []; 
let checkStart = false;
let checkEnd = false;
let startTime = null;



function randomText() {
    const random = Math.floor(Math.random() * listText.length);
    text = listText[random];
}



function splitText() {
    display.innerHTML = "";
    s = []; 
    const words = text.split(" ");
    
    words.forEach((word, index) => {
        const divWord = document.createElement("div");
        divWord.classList.add("word"); 
        
        word.split("").forEach(char => {
            const span = document.createElement("span");
            span.innerText = char;
            span.classList.add("char");
            
            divWord.appendChild(span);
            s.push(span); 
        });
        display.appendChild(divWord);

        if (index < words.length - 1) {
            const space = document.createElement("span");
            space.innerHTML = " "; 
            space.classList.add("char");
            display.appendChild(space); 
            s.push(space);
        }
    });

    if (s.length > 0 && checkStart) {
        s[0].classList.add("active");
    }
}

function start() {
    checkStart = true;
    startTime = new Date();
    startBtn.textContent = "Đặt lại";
    selectBox.style.display = "none";
    selectTittle.style.display = "none";
    inp.value = "";
    inp.focus();
    splitText();

}

function reset() {
    checkStart = false;
    startBtn.textContent = "Bắt đầu";
    selectBox.style.display = "none";
    selectTittle.style.display = "none"; 
    inp.value = "";
    randomText()
    splitText(); 

}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {        
        if (!checkStart) {
            start();
        }
    } 
    else if (event.key === "Escape") {
        reset(); 
    }
});

startBtn.addEventListener("click", () => {
    if (!checkStart){
        start();
    } 
    else{
        reset();
    }
});


display.addEventListener("click", () => {
    if (checkStart){
        inp.focus();
    }
});
inp.addEventListener("input", () => {
    if (!checkStart){
        return;
    }

    clearTimeout(checkEnd)

    const valueActive = inp.value.split(""); 
    let countTrue = 0;
    s.forEach((span, index) => {
        const character = valueActive[index]; 
        
        let charAtive = span.innerText;


        if (character == null) {
            span.classList.remove("true");
            span.classList.remove("false");
            span.classList.remove("active");
        } else { 
            if (character === charAtive) {
                span.classList.add("true");
                span.classList.remove("false");
                span.classList.remove("active");
                countTrue++;
            } else {
                span.classList.remove("true");
                span.classList.add("false");
                span.classList.remove("active");
            }
        }

        if (index === valueActive.length) {
            span.classList.add("active");
        }
    });

    if (valueActive.length >= s.length) {
        checkEnd = setTimeout(() =>{
        const endTime = new Date();
        const time = endTime - startTime;
        let second = Math.floor(time / 1000);
        let minutes = Math.floor(second / 60);
        let hour = Math.floor(minutes / 60);
        second = second % 60;
        second = second<10 ? "0"+second : second;
        minutes = minutes<10 ? "0"+minutes : minutes;
        hour = hour<10 ? "0"+hour : hour;
        const wpm = Math.round((inp.value.length / 5) / (time /1000 / 60)); 
        const accuracy = Math.round((countTrue / s.length) * 100);
            alert(`Thời gian: ${hour}:${minutes}:${second}\nWPM: ${wpm}\nĐộ chính xác: ${accuracy}%`);
            reset();
        },200)




    }
});




randomText();
splitText();