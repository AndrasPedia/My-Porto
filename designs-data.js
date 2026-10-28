const designWorks = [
  { title: "Poster 1", category: "Poster", orientation: "portrait", image: "assets/A41.png" },
  { title: "Poster 2", category: "Poster", orientation: "portrait", image: "assets/A42.png" },
  { title: "Poster 3", category: "Poster", orientation: "portrait", image: "assets/A43.png" },
  { title: "Poster 4", category: "Poster", orientation: "portrait", image: "assets/A44.png" }
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