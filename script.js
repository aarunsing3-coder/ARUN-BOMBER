let isSending = false;

document.getElementById('bomberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;
    const message = document.getElementById('message').value;
    const count = document.getElementById('count').value;

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '';

    if (isSending) {
        resultDiv.textContent = 'Messages are already being sent. Please wait or stop the process.';
        return;
    }

    isSending = true;

    for (let i = 0; i < count; i++) {
        if (!isSending) break;

        fetch('https://kalua-sms-edge.vercel.app/api/bomb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultDiv.textContent += `Message ${i + 1} sent successfully!\n`;
            } else {
                resultDiv.textContent += `Failed to send message ${i + 1}.\n`;
            }
        })
        .catch(error => {
            resultDiv.textContent += `Error sending message ${i + 1}: ${error.message}\n`;
        });
    }

    isSending = false;
});

document.getElementById('stopButton').addEventListener('click', function() {
    isSending = false;
    document.getElementById('result').textContent += 'Sending messages stopped.\n';
});
