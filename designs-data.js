const designWorks = [
  { title: "Poster Event Sekolah", category: "Poster", orientation: "landscape", image: "assets/1234.png" },
  { title: "Feed Instagram PPDB", category: "Media Sosial", orientation: "portrait", image: "assets/design-2-feed-ppdb.svg" },
  { title: "Undangan Digital", category: "Undangan", orientation: "landscape", image: "assets/design-3-undangan.svg" },
  { title: "Poster Webinar", category: "Poster", orientation: "portrait", image: "assets/design-4-poster-webinar.svg" },
  { title: "Banner Media Sosial", category: "Media Sosial", orientation: "landscape", image: "assets/design-5-banner.svg" },
  { title: "Desain Sertifikat", category: "Sertifikat", orientation: "portrait", image: "assets/design-6-sertifikat.svg" }
];

function designCardClass(d){
  return 'design-card' + (d.orientation === 'landscape' ? ' landscape' : '');
}

function designCardHTML(d){
  return `
    <img src="${d.image}" alt="${d.title}" loading="lazy">
    <div class="design-card-overlay">
      <p class="design-card-title">${d.title}</p>
      <p class="design-card-tag">${d.category}</p>
    </div>
  `;
}
