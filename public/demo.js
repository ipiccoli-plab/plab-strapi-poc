function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value ?? '';
  return div.innerHTML;
}

fetch('/api/test-pocs')
  .then((res) => res.json())
  .then((json) => {
    const container = document.getElementById('content');
    const entries = json.data || [];
    if (entries.length === 0) {
      container.innerHTML = '<p class="empty">Nessun contenuto pubblicato.</p>';
      return;
    }
    container.innerHTML = entries
      .map((entry) => {
        const { title, body } = entry.attributes ?? entry;
        return `<article><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></article>`;
      })
      .join('');
  })
  .catch((err) => {
    document.getElementById('content').innerHTML =
      '<p class="error">Errore nel caricamento: ' + escapeHtml(err.message) + '</p>';
  });
