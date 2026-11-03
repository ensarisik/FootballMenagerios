/* Oyun Durumu ve Menajerlik Mantığı */
let gameState = {
  leagueKey: null,
  myTeamId: null,
  week: 1,
  standings: [],
  schedule: [],
  myTeam: null
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  populateLeagueSelect();

  $('leagueSelect').addEventListener('change', populateTeamSelect);
  $('startCareerBtn').addEventListener('click', startCareer);
  $('goToMatchBtn').addEventListener('click', () => switchTab('tab-match'));
  $('go').addEventListener('click', playCurrentMatch);
  $('eC').addEventListener('click', () => {
    $('end').classList.remove('show');
    advanceWeek();
  });
  $('sp').addEventListener('click', () => {
    speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    $('sp').textContent = speed + 'x';
  });
});

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  const targetBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (targetBtn) targetBtn.classList.add('active');
  $(tabId).classList.add('active');
}

function populateLeagueSelect() {
  const sel = $('leagueSelect');
  sel.innerHTML = '';
  Object.keys(LEAGUES_DATA).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = LEAGUES_DATA[key].name;
    sel.appendChild(opt);
  });
  populateTeamSelect();
}

function populateTeamSelect() {
  const lKey = $('leagueSelect').value;
  const sel = $('teamSelect');
  sel.innerHTML = '';
  LEAGUES_DATA[lKey].teams.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.name} (Güç: ${t.rating})`;
    sel.appendChild(opt);
  });
}

function startCareer() {
  gameState.leagueKey = $('leagueSelect').value;
  gameState.myTeamId = $('teamSelect').value;
  const league = LEAGUES_DATA[gameState.leagueKey];

  gameState.myTeam = JSON.parse(JSON.stringify(league.teams.find(t => t.id === gameState.myTeamId)));

  // Puan Durumu Başlatma
  gameState.standings = league.teams.map(t => ({
    id: t.id,
    name: t.name,
    rating: t.rating,
    color: t.color,
    played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0
  }));

  generateSchedule(league.teams);
  
  $('setupCard').classList.add('hidden');
  $('dashboardCard').classList.remove('hidden');
  $('userStatus').textContent = `${gameState.myTeam.name} Menajeri`;

  updateDashboard();
  renderStandings();
  renderTransferMarket();
}

function generateSchedule(teams) {
  gameState.schedule = [];
  const list = [...teams];
  if (list.length % 2 !== 0) list.push({ id: 'dummy', name: 'BAY' });

  for (let w = 0; w < (list.length - 1) * 2; w++) {
    const weekMatches = [];
    for (let i = 0; i < list.length / 2; i++) {
      const t1 = list[i], t2 = list[list.length - 1 - i];
      if (t1.id !== 'dummy' && t2.id !== 'dummy') {
        weekMatches.push(w % 2 === 0 ? { home: t1, away: t2 } : { home: t2, away: t1 });
      }
    }
    gameState.schedule.push(weekMatches);
    list.splice(1, 0, list.pop());
  }
}

function updateDashboard() {
  $('dashTeamRating').textContent = gameState.myTeam.rating;
  $('dashBudget').textContent = gameState.myTeam.budget + " M€";
  $('dashWeek').textContent = gameState.week;

  const tbody = document.querySelector('#squadTable tbody');
  tbody.innerHTML = '';
  (gameState.myTeam.squad || []).forEach(p => {
    tbody.innerHTML += `<tr><td><b>${p.name}</b></td><td>${p.pos}</td><td><span style="color:var(--ac)">${p.rating}</span></td><td>${p.price} M€</td></tr>`;
  });
}

function renderStandings() {
  gameState.standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  const tbody = document.querySelector('#standingsTable tbody');
  tbody.innerHTML = '';
  gameState.standings.forEach((t, i) => {
    const isMe = t.id === gameState.myTeamId ? 'class="my-team"' : '';
    tbody.innerHTML += `<tr ${isMe}><td>${i + 1}</td><td>${t.name}</td><td>${t.played}</td><td>${t.won}</td><td>${t.drawn}</td><td>${t.lost}</td><td>${t.gf}</td><td>${t.ga}</td><td>${t.gd}</td><td><b>${t.pts}</b></td></tr>`;
  });
}

function renderTransferMarket() {
  const tbody = document.querySelector('#transferTable tbody');
  tbody.innerHTML = '';
  const league = LEAGUES_DATA[gameState.leagueKey];

  league.teams.filter(t => t.id !== gameState.myTeamId).forEach(t => {
    (t.squad || []).forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td><b>${p.name}</b></td>
          <td>${t.name}</td>
          <td>${p.pos}</td>
          <td>${p.rating}</td>
          <td>${p.price} M€</td>
          <td><button class="btn-primary btn-sm" onclick="buyPlayer('${p.name}', ${p.rating}, ${p.price})">Satın Al</button></td>
        </tr>`;
    });
  });
}

window.buyPlayer = function(name, rating, price) {
  if (gameState.myTeam.budget < price) {
    alert("Yetersiz Bütçe!");
    return;
  }
  gameState.myTeam.budget -= price;
  gameState.myTeam.squad.push({ name, pos: "TRF", rating, price });
  
  // Takım gücünü güncelle (kadro ortalaması artışı)
  gameState.myTeam.rating = Math.round(gameState.myTeam.rating + 1);
  const std = gameState.standings.find(s => s.id === gameState.myTeamId);
  if (std) std.rating = gameState.myTeam.rating;

  alert(`${name} başarıyla transfer edildi! Takım gücün arttı.`);
  updateDashboard();
  renderTransferMarket();
};

function playCurrentMatch() {
  const matches = gameState.schedule[gameState.week - 1];
  if (!matches) {
    alert("Sezon Bitti!");
    return;
  }

  const myMatch = matches.find(m => m.home.id === gameState.myTeamId || m.away.id === gameState.myTeamId);
  const homeTeam = gameState.standings.find(s => s.id === myMatch.home.id);
  const awayTeam = gameState.standings.find(s => s.id === myMatch.away.id);

  startEngineMatch(homeTeam, awayTeam, (scoreA, scoreB) => {
    // Diğer maçları hızlı simüle et
    matches.forEach(m => {
      const h = gameState.standings.find(s => s.id === m.home.id);
      const a = gameState.standings.find(s => s.id === m.away.id);
      let sA = scoreA, sB = scoreB;

      if (m !== myMatch) {
        const diff = h.rating - a.rating;
        sA = Math.max(0, Math.floor(Math.random() * 3 + (diff > 0 ? 1 : 0)));
        sB = Math.max(0, Math.floor(Math.random() * 3 + (diff < 0 ? 1 : 0)));
      }

      h.played++; a.played++;
      h.gf += sA; h.ga += sB; h.gd = h.gf - h.ga;
      a.gf += sB; a.ga += sA; a.gd = a.gf - a.ga;

      if (sA > sB) { h.won++; h.pts += 3; a.lost++; }
      else if (sB > sA) { a.won++; a.pts += 3; h.lost++; }
      else { h.drawn++; a.drawn++; h.pts += 1; a.pts += 1; }
    });

    renderStandings();
  });
}

function advanceWeek() {
  gameState.week++;
  updateDashboard();
  switchTab('tab-career');
}