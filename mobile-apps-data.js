const mobileApps = [
  {
    title: "App Coffee Story",
    category: "Mobile App",
    image: "assets/1.png",
    overview: "Aplikasi mobile Coffee Story memudahkan pengguna melihat detail produk kopi dan berbelanja melalui katalog serta keranjang belanja yang praktis.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-absensi-mobile",
    features: ["assets/2.png", "assets/3.png", "assets/4.png"]
  },
];

function mobileAppCardHTML(m){
  return `
    <img src="${m.image}" alt="${m.title}" loading="lazy" decoding="async">
    <div class="design-card-overlay">
      <p class="design-card-title">${m.title}</p>
      <p class="design-card-tag">${m.category}</p>
    </div>
  `;
}