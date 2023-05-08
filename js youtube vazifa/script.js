let boxDiv = document.getElementById("box")
let textInp = document.getElementById("text")
let arr = []
let currentPage=1
let onScroll=true

axios({
    url: `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=60`,
    url: `https://jsonplaceholder.typicode.com/photos?title_link=${textInp.value}&_page=${currentPage}&_limit=60`,
    methid: "get"
}).then(function (res) {
    arr = res.data
    draw()
})

function searchBtn() {
    axios({
        url: `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=60`,
        url: `https://jsonplaceholder.typicode.com/photos?title_like=${textInp.value}&_page=${currentPage}&_limit=60`,
        methid: "get"
    }).then(function (res) {
        arr = res.data
        draw()
    })
    // textInp.value=""
}
function draw() {
    let p = ""
    for (let i = 0; i < arr.length; i++) {
        p += `<div class="child m-2">
        <img class="img" src="${arr[i].url}" alt="#">
        <p>${arr[i].id} : ${arr[i].title}</p>
        </div>`
    }
    boxDiv.innerHTML = p
}
// debugger
function scrollPhoto(event) {
    let scroll = event.target;      
    console.log(scroll.offsetHeight, scroll.scrollHeight, scroll.scrollTop)
    if (scroll.scrollTop >= scroll.scrollHeight - scroll.offsetHeight - 100) {
        if (onScroll) {
            onScroll=false
            currentPage++
            axios({
                url: `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=60`,
                methid: "get"
            }).then(function (res) {
                arr = [...arr, ...res.data]
                draw()
                onScroll=true
            })
        }
    }
}