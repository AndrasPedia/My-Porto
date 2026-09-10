const designWorks = [
  { title: "Poster Event Sekolah", category: "Poster", image: "assets/design-1-poster-event.svg" },
  { title: "Feed Instagram PPDB", category: "Media Sosial", image: "assets/design-2-feed-ppdb.svg" },
  { title: "Undangan Digital", category: "Undangan", image: "assets/design-3-undangan.svg" },
  { title: "Poster Webinar", category: "Poster", image: "assets/design-4-poster-webinar.svg" },
  { title: "Banner Media Sosial", category: "Media Sosial", image: "assets/design-5-banner.svg" },
  { title: "Desain Sertifikat", category: "Sertifikat", image: "assets/design-6-sertifikat.svg" }
];

function designCardHTML(d){
  return `
    <img src="${d.image}" alt="${d.title}" loading="lazy">
    <div class="design-card-overlay">
      <p class="design-card-title">${d.title}</p>
      <p class="design-card-tag">${d.category}</p>
    </div>
  `;
}