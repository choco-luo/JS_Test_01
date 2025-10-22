const btn = document.getElementById("loadBtn")
const output = document.getElementById("output")

btn.addEventListener("click", () => {
    const url = "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"

fetch(url)
    .then(resp => resp.json())
    .then((youbike) => {
        output.textContent = ""
        youbike.forEach((data) => {
            const name = data.sna.replace("YouBike2.0_", "")
            const address = data.ar
            const bikes = data.available_return_bikes
            output.textContent += `🚲 ${name} (數量：${bikes}) \n | ${address} \n`
        })
    })
    .catch((err) => {
        console.log(err)
    })
})