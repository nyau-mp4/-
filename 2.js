let mediaRecorder;
let recordedChunks = [];

document.getElementById('startRecording').onclick = () => {
    const canvasStream = canvas.captureStream(30);
    mediaRecorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm' });

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'visualizer.webm';
        a.click();
    };

    recordedChunks = [];
    mediaRecorder.start();
};

document.getElementById('stopRecording').onclick = () => {
    mediaRecorder.stop();
};