const $ = id => document.getElementById(id);

let gameState = {
  leagueKey: null,
  myTeamId: null,
  week: 1,
  standings: [],
  schedule: [],
  myTeam: null
};

// Sayfa tamamen yüklendiğinde çalışmasını garantiye alıyoruz
function initApp() {
  populateLeagueSelect();
  initTabs();

  const leagueSel = $('leagueSelect');
  if (leagueSel) {
    leagueSel.addEventListener('change', populateTeamSelect);
  }

  const startBtn = $('startCareerBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startCareer);
  }
}

function populateLeagueSelect() {
  const sel = $('leagueSelect');
  if (!sel) return;
  
  sel.innerHTML = '';
  Object.keys(LEAGUES_DATA).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = LEAGUES_DATA[key].name;
    sel.appendChild(opt);
  });

  // İlk lig seçildikten sonra takımları doldur
  populateTeamSelect();
}

function populateTeamSelect() {
  const lKey = $('leagueSelect').value;
  const sel = $('teamSelect');
  if (!sel || !lKey || !LEAGUES_DATA[lKey]) return;

  sel.innerHTML = '';
  LEAGUES_DATA[lKey].teams.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.name} (Güç: ${t.rating})`;
    sel.appendChild(opt);
  });
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      $(btn.dataset.tab).classList.add('active');
    });
  });
}

function startCareer() {
  gameState.leagueKey = $('leagueSelect').value;
  gameState.myTeamId = $('teamSelect').value;
  const league = LEAGUES_DATA[gameState.leagueKey];

  gameState.myTeam = JSON.parse(JSON.stringify(league.teams.find(t => t.id === gameState.myTeamId)));
  
  $('setupCard').classList.add('hidden');
  $('dashboardCard').classList.remove('hidden');
  $('userStatus').textContent = `${gameState.myTeam.name} Menajeri`;

  $('dashTeamRating').textContent = gameState.myTeam.rating;
  $('dashBudget').textContent = gameState.myTeam.budget + " M€";
}

// Otomatik çalıştırma tetikleyicisi
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}