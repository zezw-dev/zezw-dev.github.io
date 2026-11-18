window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").classList.add("open");
  }, 1900);
});

const looksData = [
  {
    name: "إطلالة 01 - كاجوال نبيتي راقي",
    img: "look1.jpg",
    items: [
      { title: "سويت شيرت نبيتي نصف سحاب", price: 680 },
      { title: "بنطلون وايد ليج أسود", price: 790 },
      { title: "سنيكرز أبيض كلاسيك", price: 1150 }
    ]
  },
  {
    name: "إطلالة 02 - كلاسيك فورمال",
    img: "look2.jpg",
    items: [
      { title: "فيست بدلة أسود فاخر", price: 850 },
      { title: "قميص أبيض قطن مصري", price: 520 },
      { title: "بنطلون كلاسيك بكسرات + كرافتة", price: 950 }
    ]
  },
  {
    name: "إطلالة 03 - أولد موني شتوي",
    img: "look3.jpg",
    items: [
      { title: "بلوفر هاي كول نبيتي", price: 590 },
      { title: "بنطلون قماش أسود واسع", price: 820 },
      { title: "حزام جلد أسود + سلسلة فضية", price: 340 }
    ]
  }
];

let currentIndex = 0;
let cartItems = [];

function renderLooks() {
  const container = document.getElementById("looksContainer");
  container.innerHTML = looksData.map((look, idx) => `
    <div class="look-card ${idx === currentIndex ? 'active' : ''}" onclick="chooseLook(${idx})">
      <img src="${look.img}" alt="${look.name}" style="width:100%; height:460px; object-fit:contain; background:#e5e4df; display:block; margin-bottom:0.8rem;">
      <strong>${look.name}</strong>
    </div>
  `).join("");
}

function chooseLook(idx) {
  currentIndex = idx;
  renderLooks();
  const selected = looksData[idx];
  document.getElementById("activeLookName").textContent = selected.name;
  const list = document.getElementById("piecesList");
  list.innerHTML = selected.items.map(item => `
    <div class="piece-item">
      <span>${item.title}</span>
      <strong>${item.price} ج.م</strong>
    </div>
  `).join("");
  const total = selected.items.reduce((sum, i) => sum + i.price, 0);
  document.getElementById("lookPrice").textContent = total + " ج.م";
}

function addFullLook() {
  const selected = looksData[currentIndex];
  cartItems.push(...selected.items);
  document.getElementById("cartCount").textContent = cartItems.length;
  
  const btn = document.querySelector(".look-details .btn-luxury");
  btn.textContent = "تمت الإضافة للسلة ✓";
  btn.style.background = "#16a34a";
  setTimeout(() => {
    btn.textContent = "إضافة الإطلالة للسلة +";
    btn.style.background = "#121212";
  }, 1000);
}

function openCartModal() {
  const modal = document.getElementById("cartModal");
  const list = document.getElementById("cartItemsList");
  if (cartItems.length === 0) {
    list.innerHTML = "<p style='text-align:center; color:#777; padding:1.5rem 0;'>السلة فارغة حالياً</p>";
    document.getElementById("cartTotalPrice").textContent = "0 ج.م";
  } else {
    list.innerHTML = cartItems.map((item, idx) => `
      <div class="cart-row">
        <span>${item.title}</span>
        <div>
          <strong>${item.price} ج.م</strong>
          <button class="del-btn" onclick="removeItem(${idx})">حذف</button>
        </div>
      </div>
    `).join("");
    const total = cartItems.reduce((sum, i) => sum + i.price, 0);
    document.getElementById("cartTotalPrice").textContent = total + " ج.م";
  }
  modal.classList.add("show");
}

function closeCartModal() {
  document.getElementById("cartModal").classList.remove("show");
}

function removeItem(idx) {
  cartItems.splice(idx, 1);
  document.getElementById("cartCount").textContent = cartItems.length;
  openCartModal();
}

function sendOrderWhatsApp() {
  if (cartItems.length === 0) return;
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);
  const text = cartItems.map(i => "- " + i.title + " (" + i.price + " ج.م)").join("\n");
  const message = "مرحباً ZEZW STUDIO، أرغب بطلب القطع التالية:\n" + text + "\nالإجمالي: " + total + " ج.م";
  const phone = "201141130701";
  window.location.href = "https://whatsapp.com" + phone + "&text=" + encodeURIComponent(message);
}

renderLooks();
chooseLook(0);
