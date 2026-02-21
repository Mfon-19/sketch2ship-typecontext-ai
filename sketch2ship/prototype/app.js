const FONT_DATA = [
    { name: 'Inter', category: 'Modern', tags: ['startup', 'minimal', 'clean', 'tech'], weight: '400;700' },
    { name: 'Playfair Display', category: 'Trustworthy', tags: ['legal', 'luxury', 'traditional', 'classic'], weight: '400;700' },
    { name: 'Roboto Mono', category: 'Technical', tags: ['code', 'data', 'developer', 'terminal'], weight: '400;700' },
    { name: 'Fredoka', category: 'Playful', tags: ['kids', 'fun', 'game', 'friendly'], weight: '400;700' },
    { name: 'Montserrat', category: 'Modern', tags: ['brand', 'bold', 'creative'], weight: '400;700' },
    { name: 'Lora', category: 'Trustworthy', tags: ['editorial', 'writing', 'formal'], weight: '400;700' },
    { name: 'Fira Code', category: 'Technical', tags: ['syntax', 'accurate', 'logic'], weight: '400;700' },
    { name: 'Comfortaa', category: 'Playful', tags: ['soft', 'organic', 'round'], weight: '400;700' }
];

const analyzeBtn = document.getElementById('analyzeBtn');
const projectInput = document.getElementById('projectDescription');
const resultsSection = document.getElementById('resultsSection');
const fontCards = document.getElementById('fontCards');
const mockUI = document.getElementById('mockUI');
const currentFontLabel = document.getElementById('currentFontLabel');

analyzeBtn.addEventListener('click', () => {
    const text = projectInput.value.toLowerCase();
    if (!text.trim()) return alert('Please enter a description first.');

    const suggestions = rankFonts(text);
    displayResults(suggestions);
});

function rankFonts(text) {
    return FONT_DATA.map(font => {
        let score = 0;
        font.tags.forEach(tag => {
            if (text.includes(tag)) score += 2;
        });
        if (text.includes(font.category.toLowerCase())) score += 5;
        return { ...font, score };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
}

function displayResults(fonts) {
    resultsSection.classList.remove('hidden');
    fontCards.innerHTML = '';

    fonts.forEach((font, index) => {
        const card = document.createElement('div');
        card.className = `font-card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <span class="meta">${font.category}</span>
            <span class="name">${font.name}</span>
        `;
        card.onclick = () => applyFont(font, card);
        fontCards.appendChild(card);
        
        if (index === 0) applyFont(font, card);
    });
}

function applyFont(font, cardElement) {
    // Load Google Font
    const linkId = 'font-link';
    let link = document.getElementById(linkId);
    if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
    const fontUrlName = font.name.replace(/ /g, '+');
    link.href = `https://fonts.googleapis.com/css2?family=${fontUrlName}:wght@400;700&display=swap`;

    // Update UI
    document.querySelectorAll('.font-card').forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');
    
    mockUI.style.fontFamily = `'${font.name}', sans-serif`;
    currentFontLabel.innerText = font.name;
}