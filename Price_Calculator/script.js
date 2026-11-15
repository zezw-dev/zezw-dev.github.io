// 1. الإمساك بجميع عناصر الإدخال والنتائج من الصفحة
const siteType = document.getElementById('siteType');
const pagesRange = document.getElementById('pagesRange');
const pagesCount = document.getElementById('pagesCount');
const addons = document.querySelectorAll('.addon');
const totalPriceEl = document.getElementById('totalPrice');
const estDaysEl = document.getElementById('estDays');
const orderBtn = document.getElementById('orderBtn');

// 2. دالة الحساب الرئيسية
function calculateTotal() {
    // السعر الأساسي لنوع الموقع
    let total = Number(siteType.value);

    // حساب تكلفة الصفحات الإضافية (كل صفحة إضافية بـ $15)
    const pages = Number(pagesRange.value);
    pagesCount.textContent = pages;
    total += (pages - 1) * 15;

    // جمع أسعار الميزات الإضافية المحددة
    let fastDelivery = false;
    addons.forEach(item => {
        if (item.checked) {
            total += Number(item.value);
            if (item.value === '50') fastDelivery = true;
        }
    });

    // تحديث السعر الإجمالي في الشاشة
    totalPriceEl.textContent = total;

    // حساب مدة التنفيذ المتوقعة بالأيام
    if (fastDelivery) {
        estDaysEl.textContent = 'يومان فقط ⚡';
    } else {
        const days = 2 + Math.ceil(pages / 2);
        estDaysEl.textContent = days + ' أيام';
    }
}

// 3. الاستماع لأي تغيير يقوم به العميل
siteType.addEventListener('change', calculateTotal);
pagesRange.addEventListener('input', calculateTotal);
addons.forEach(item => item.addEventListener('change', calculateTotal));

// 4. زر اعتماد العرض وطلب التنفيذ
orderBtn.addEventListener('click', () => {
    const selectedSite = siteType.options[siteType.selectedIndex].text;
    alert(`تم تجهيز عرض السعر بنجاح!\n\nالمشروع: ${selectedSite}\nعدد الصفحات: ${pagesRange.value}\nالتكلفة الإجمالية: $${totalPriceEl.textContent}\nالمدة: ${estDaysEl.textContent}\n\nسيتواصل معك ZEZW لبدء التنفيذ فوراً!`);
});
