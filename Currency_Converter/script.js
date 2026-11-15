const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap-btn');
const convertBtn = document.getElementById('convert-btn');
const rateInfo = document.getElementById('rate-info');
const resultAmount = document.getElementById('result-amount');
const lastUpdate = document.getElementById('last-update');

async function getExchangeRate() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount < 0) {
        resultAmount.textContent = "أدخل مبلغاً صحيحاً";
        rateInfo.textContent = "";
        return;
    }

    rateInfo.textContent = "جاري جلب السعر اللحظي...";
    resultAmount.style.opacity = "0.5";

    try {
        // محاولة جلب السعر الحي من الإنترنت
        const response = await fetch(`https://er-api.com{from}`);
        
        if (!response.ok) {
            throw new Error("فشل الاتصال بالخادم");
        }

        const data = await response.json();
        const rate = data.rates[to];
        const convertedValue = (amount * rate).toFixed(2);

        rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        resultAmount.textContent = `${convertedValue} ${to}`;
        resultAmount.style.opacity = "1";

        const updateDate = new Date(data.time_last_update_utc);
        lastUpdate.textContent = `آخر تحديث حي: ${updateDate.toLocaleDateString('ar-EG')}`;

    } catch (error) {
        // نظام الطوارئ: أسعار احتياطية تعمل داخل معاينة Acode أو عند انقطاع الإنترنت
        const fallbackRates = {
            USD: { EGP: 49.50, SAR: 3.75, AED: 3.67, EUR: 0.92, GBP: 0.79, KWD: 0.31, USD: 1 },
            EGP: { USD: 0.0202, SAR: 0.0757, AED: 0.0741, EUR: 0.0185, GBP: 0.0159, KWD: 0.0062, EGP: 1 },
            SAR: { USD: 0.266, EGP: 13.20, AED: 0.98, EUR: 0.245, GBP: 0.21, KWD: 0.082, SAR: 1 },
            AED: { USD: 0.272, EGP: 13.48, SAR: 1.02, EUR: 0.25, GBP: 0.215, KWD: 0.084, AED: 1 },
            EUR: { USD: 1.08, EGP: 53.80, SAR: 4.08, AED: 3.99, GBP: 0.85, KWD: 0.33, EUR: 1 },
            GBP: { USD: 1.27, EGP: 62.65, SAR: 4.75, AED: 4.65, GBP: 1, KWD: 0.39, GBP: 1 },
            KWD: { USD: 3.25, EGP: 160.80, SAR: 12.18, AED: 11.93, EUR: 3.00, GBP: 2.56, KWD: 1 }
        };

        const rate = fallbackRates[from][to];
        const convertedValue = (amount * rate).toFixed(2);

        rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to} (وضع غير متصل)`;
        resultAmount.textContent = `${convertedValue} ${to}`;
        resultAmount.style.opacity = "1";
        lastUpdate.textContent = "ملاحظة: يتم استخدام أسعار تقديرية لمعاينة التطبيق";
    }
}

swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    getExchangeRate();
});

amountInput.addEventListener('input', getExchangeRate);
fromCurrency.addEventListener('change', getExchangeRate);
toCurrency.addEventListener('change', getExchangeRate);
convertBtn.addEventListener('click', () => {
    convertBtn.textContent = "جاري التحديث...";
    setTimeout(() => {
        getExchangeRate();
        convertBtn.textContent = "تم التحديث بنجاح ✓";
        setTimeout(() => {
            convertBtn.textContent = "تحديث السعر والتحويل الآن";
        }, 1200);
    }, 300);
});

window.addEventListener('load', getExchangeRate);
