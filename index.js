const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ ضع مفتاحك الجديد هنا بين علامات التنصيص
const API_KEY = "AIzaSyAIvJ_OoNwxpgm5-i8Q58MTuSmlufP77uU"; 

const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

app.post('/ask', async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log("📥 استلمت سؤالك:", prompt);

        // إرسال الطلب لجوجل مباشرة بدون مكتبات وسيطة
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        // فحص إذا كان هناك خطأ من جهة جوجل (مثل المفتاح)
        if (data.error) {
            console.error("❌ خطأ من جوجل:", data.error.message);
            return res.status(400).json({ error: data.error.message });
        }

        const answer = data.candidates[0].content.parts[0].text;
        console.log("✅ تم الحصول على الرد من Gemini");
        res.json({ answer: answer });

    } catch (error) {
        console.error("🔥 خطأ تقني في السيرفر:", error.message);
        res.status(500).json({ error: "فشل الاتصال" });
    }
});

app.listen(5000, '0.0.0.0', () => {
    console.log("🚀 السيرفر الجديد جاهز ومستعد على http://localhost:5000");
});