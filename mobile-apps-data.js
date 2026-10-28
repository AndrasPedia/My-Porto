const mobileApps = [
  {
    title: "App Absensi Mobile",
    category: "Mobile App",
    image: "assets/1.png",
    overview: "Aplikasi mobile untuk guru mencatat kehadiran siswa langsung dari ponsel, terhubung dengan sistem absensi sekolah.",
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