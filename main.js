// 簡単な波形ビジュアライザー
const audioInput = document.getElementById('audioInput');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioPlayer = document.getElementById('audioPlayer');

audioInput.onchange = function () {
    const file = audioInput.files[0];
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audioPlayer);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            ctx.fillStyle = `rgb(${barHeight+100},50,50)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }
    draw();
};