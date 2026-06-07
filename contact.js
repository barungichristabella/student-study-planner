function sendMessage() {
    // Get values from the form
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();
    var feedback = document.getElementById('contact-feedback');

    // Check if all fields are filled
    if (name === '' || email === '' || subject === '' || message === '') {
        feedback.innerHTML = '<p style="color: red;">Please fill in all fields before sending.</p>';
        return;
    }

    // Check if email looks valid
    if (!email.includes('@') || !email.includes('.')) {
        feedback.innerHTML = '<p style="color: red;">Please enter a valid email address.</p>';
        return;
    }

    // Save message to localStorage
    var messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    var newMessage = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleDateString()
    };
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    feedback.innerHTML = '<p style="color: green;">Thank you ' + name + '! Your message has been sent successfully.</p>';

    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}