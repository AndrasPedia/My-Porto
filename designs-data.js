const designWorks = [
  { title: "Poster Event Sekolah", category: "Poster", orientation: "landscape", image: "assets/A4.png" },
  { title: "Feed Instagram PPDB", category: "Media Sosial", orientation: "portrait", image: "assets/A4.png" },
  { title: "Undangan Digital", category: "Undangan", orientation: "landscape", image: "assets/A4.png" },
  { title: "Poster Webinar", category: "Poster", orientation: "portrait", image: "assets/A4.png" },
  { title: "Banner Media Sosial", category: "Media Sosial", orientation: "landscape", image: "assets/A4.png" },
  { title: "Desain Sertifikat", category: "Sertifikat", orientation: "portrait", image: "assets/A4.png" }
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
