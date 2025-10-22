const btn = document.getElementById("loadBtn")
const output = document.getElementById("output")
const searchBox = document.querySelector(".search-box")

btn.addEventListener("click", () => {
    const api = "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"

fetch(api)
    .then(resp => resp.json())
    .then((youbike) => {
        output.textContent = ""
        const keyword = searchBox.value.trim().toLowerCase() // 小寫比對，不過其實不太知道為什麼沒加上就無法搜尋

        let filterName
        if (keyword) {
            filterName = youbike.filter(data => {
                const name = data.sna.replace("YouBike2.0_", "").toLowerCase()
                const address = data.ar.toLowerCase()
                return name.includes(keyword) || address.includes(keyword)
            })
        } else {
            filterName = youbike
        }

        filterName.forEach((data) => {
            const name = data.sna.replace("YouBike2.0_", "")
            const address = data.ar
            const bikes = data.available_return_bikes
            output.innerHTML += `🚲 ${name} (數量: ${bikes}) <br><span class="address-line">| ${address} <br><br>`
        })
    })
    .catch((err) => {
        console.log(err)
    })
})