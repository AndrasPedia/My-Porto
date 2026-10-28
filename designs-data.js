const designWorks = [
  { title: "Poster Event Sekolah", category: "Poster", orientation: "landscape", image: "assets/A41.png" },
  { title: "Feed Instagram PPDB", category: "Media Sosial", orientation: "portrait", image: "assets/A42.png" },
  { title: "Undangan Digital", category: "Undangan", orientation: "landscape", image: "assets/A43.png" },
  { title: "Poster Webinar", category: "Poster", orientation: "portrait", image: "assets/A44.png" }
];

function designCardClass(d){
  return 'design-card' + (d.orientation === 'landscape' ? ' landscape' : '');
}

function designCardHTML(d){
  return `
    <img src="${d.image}" alt="${d.title}" loading="lazy" decoding="async">
    <div class="design-card-overlay">
      <p class="design-card-title">${d.title}</p>
      <p class="design-card-tag">${d.category}</p>
    </div>
  `;
}