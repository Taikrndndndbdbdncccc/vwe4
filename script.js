document.addEventListener("DOMContentLoaded", function() {
    // Menampilkan jam Malaysia
    function updateClock() {
        let now = new Date();
        let options = { timeZone: "Asia/Kuala_Lumpur", hour12: false };
        let timeString = now.toLocaleTimeString("id-ID", options);
        document.getElementById("jam-malaysia").textContent = "Jam Malaysia: " + timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Menampilkan hari dan tanggal
    function updateDate() {
        let now = new Date();
        let options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        let dateString = now.toLocaleDateString("id-ID", options);
        document.getElementById("hari-tanggal").textContent = dateString;
    }
    updateDate();

    // Fetch jadwal shalat untuk Seri Kembangan, Malaysia
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Seri Kembangan&country=Malaysia&method=2")
        .then(response => response.json())
        .then(data => {
            let timings = data.data.timings;
            document.getElementById("subuh").textContent = timings.Fajr;
            document.getElementById("zuhur").textContent = timings.Dhuhr;
            document.getElementById("asar").textContent = timings.Asr;
            document.getElementById("magrib").textContent = timings.Maghrib;
            document.getElementById("isya").textContent = timings.Isha;
        })
        .catch(error => console.error("Gagal mengambil jadwal shalat", error));
});
