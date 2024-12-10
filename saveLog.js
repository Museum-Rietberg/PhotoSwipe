function downloadLog() {
    // Get current date
    var currentDate = new Date().toISOString().slice(0, 10);

    // Download localStorage to file with appended date
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'UsageReport_' + currentDate + '.txt'; // Append current date to filename, .json gets rejected by Kiosk-Browser hence .txt workaround
    a.innerHTML = 'download JSON';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}