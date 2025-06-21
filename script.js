const POPUP_WIDTH = 320;
const POPUP_HEIGHT = 320;

document.getElementById("click-me").addEventListener("click", () => {
    const audio = document.getElementById("ShedLaugh");
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
    popupFlood(2);
});

function popupFlood(count = 2) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            spawnPopup();
        }, i * 150);
    }
}

function spawnPopup() {
    let width = 360;
    let height = 360;

    let maxX = screen.availWidth - width;
    let maxY = screen.availHeight - height;

    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);

    let popup = window.open(
        "",
        "",
        `width=${width},height=${height},left=${x},top=${y},resizable=no,scrollbars=no`
    );

    if (popup) {
        popup.document.write(`
            <html>
            <head>
                <title>You Are an Idiot!</title>
                <style>
                    body {
                        background: #fff;
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    img {
                        width: 230px;
                        height: auto;
                        image-rendering: pixelated;
                        cursor: pointer;
                        display: block;
                    }
                </style>
            </head>
            <body>
                <img id="popup-img" src="ElegFace.png" alt="You Are an Idiot!" />
                <audio id="popup-audio" src="ShedLaugh.mp3" loop></audio>
                <script>
                    window.resizeTo(${width}, ${height});
                    // Tocar o áudio ao abrir o popup
                    const audio = document.getElementById("popup-audio");
                    if (audio) {
                        audio.currentTime = 0;
                        audio.play();
                    }
                    let dx = 10 + Math.random() * 5;
                    let dy = 10 + Math.random() * 5;
                    let move = () => {
                        let x = window.screenX + dx;
                        let y = window.screenY + dy;
                        let maxX = screen.availWidth - ${width};
                        let maxY = screen.availHeight - ${height};
                        if (x >= maxX || x <= 0) {
                            dx = -dx;
                            x = Math.max(0, Math.min(x, maxX));
                        }
                        if (y >= maxY || y <= 0) {
                            dy = -dy;
                            y = Math.max(0, Math.min(y, maxY));
                        }
                        window.moveTo(x, y);
                    };
                    setInterval(move, 10);
                    document.getElementById("popup-img").addEventListener("click", () => {
                        try { opener.popupFlood(6); } catch (e) {}
                    });
                    window.addEventListener("unload", () => {
                        try { opener.popupFlood(6); } catch (e) {}
                    });
                <\/script>
            </body>
            </html>
        `);

        popup.focus();
    }
}