/* Takım Güçlerine Göre Dinamik Oran Motoru & 2D Canvas Maç Simülatörü */
const $ = id => document.getElementById(id);
const cv = $('cv'), ctx = cv ? cv.getContext('2d') : null;
let W = 360, H = 360, st = null, raf = null, speed = 1;
const SPEEDS = [1, 2, 3, 5];

/* Güç farkından bahis oranı ve gol beklentisi üretme */
function calculateOddsFromRatings(ratingA, ratingB) {
  const diff = ratingA - ratingB; // Örn: 85 - 80 = +5
  const baseProbA = 1 / (1 + Math.pow(10, -diff / 15)); // Elo benzeri formül
  let probA = baseProbA * 0.85; // Ev sahibi avantajı vs
  let probB = (1 - baseProbA) * 0.85;
  let probD = 0.30 - Math.abs(probA - probB) * 0.2; // Dengeli maçta beraberlik yüksek

  const norm = probA + probB + probD;
  probA /= norm; probB /= norm; probD /= norm;

  return {
    oA: (1 / probA).toFixed(2),
    oB: (1 / probB).toFixed(2),
    oD: (1 / probD).toFixed(2),
    pa: probA,
    pb: probB
  };
}

function model() {
  if (!st || !st.teamAData) return { pa: 0.5, pb: 0.5, convA: 0.2, convB: 0.2 };
  const odds = calculateOddsFromRatings(st.teamAData.rating, st.teamBData.rating);
  return {
    pa: odds.pa,
    pb: odds.pb,
    atkA: odds.pa,
    convA: 0.12 + 0.35 * odds.pa,
    convB: 0.12 + 0.35 * odds.pb
  };
}

function planAttacks() {
  const m = model(), d = Math.abs(m.pa - m.pb), mean = 7 + 6 * d;
  const g = (Math.random() + Math.random() + Math.random() - 1.5) * 8;
  const n = Math.max(4, Math.min(14, Math.round(mean + g)));
  const t = []; for (let i = 0; i < n; i++) t.push(2 + Math.random() * 86);
  return t.sort((a, b) => a - b);
}

function fitCanvas() {
  if (!cv || !$('wrap')) return;
  const r = $('wrap').getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.max(1, Math.round(r.width * d));
  cv.height = Math.max(1, Math.round(r.height * d));
  ctx.setTransform(d, 0, 0, d, 0, 0);
  W = r.width; H = r.height;
  if (!raf) drawScene();
}
window.addEventListener('resize', fitCanvas);

function drawScene(kd = {}) {
  if (!ctx) return;
  ctx.fillStyle = '#2e8b3a'; ctx.fillRect(0, 0, W, H);
  for (let i = 1; i < 14; i += 2) {
    ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.fillRect(0, i * H / 14, W, H / 14);
  }
  ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.lineWidth = 2.5;
  ctx.strokeRect(3, 3, W - 6, H - 6);
  ctx.beginPath(); ctx.moveTo(3, H / 2); ctx.lineTo(W - 3, H / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(W / 2, H / 2, W * .14, 0, 7); ctx.stroke();

  if (st && st.atk) {
    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px system-ui'; ctx.textAlign = 'center';
    ctx.fillText(st.atk.team === 'A' ? st.teamAData.name + " Atakta!" : st.teamBData.name + " Atakta!", W / 2, H / 2 - 20);
  }
}

function startEngineMatch(teamA, teamB, onComplete) {
  fitCanvas();
  const odds = calculateOddsFromRatings(teamA.rating, teamB.rating);
  
  st = {
    teamAData: teamA,
    teamBData: teamB,
    min: 0,
    s: { A: 0, B: 0 },
    atk: null,
    over: false,
    i: 0,
    htDone: false,
    sched: [],
    onComplete: onComplete
  };

  $('tA').textContent = teamA.name;
  $('tB').textContent = teamB.name;
  $('pa').textContent = '%' + Math.round(odds.pa * 100);
  $('pb').textContent = '%' + Math.round(odds.pb * 100);
  $('ba').style.width = (odds.pa * 100) + '%';
  $('bb').style.width = (odds.pb * 100) + '%';
  $('ba').style.background = teamA.color || '#2ecc71';
  $('bb').style.background = teamB.color || '#e74c3c';
  $('sc').textContent = '0 : 0';
  $('clk').textContent = '0’';

  st.sched = planAttacks();
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(engineLoop);
}

function engineLoop(ts) {
  if (!st) return;
  const dt = 30;
  if (!st.over) {
    st.min += (dt / 1000) * 4 * speed;
    const nx = st.sched[st.i];
    
    if (nx !== undefined && st.min >= nx) {
      st.i++;
      const m = model();
      const isA = Math.random() < m.atkA;
      const conv = isA ? m.convA : m.convB;
      if (Math.random() < conv) {
        if (isA) st.s.A++; else st.s.B++;
        $('sc').textContent = st.s.A + ' : ' + st.s.B;
        $('tk').textContent = Math.floor(st.min) + '’ GOL! (' + (isA ? st.teamAData.name : st.teamBData.name) + ')';
      } else {
        $('tk').textContent = Math.floor(st.min) + '’ Tehlikeli Atak Kaçtı!';
      }
    }

    if (st.min >= 90) {
      st.min = 90;
      st.over = true;
      finishEngineMatch();
    }
  }

  $('clk').textContent = Math.floor(st.min) + '’';
  drawScene();
  if (!st.over) raf = requestAnimationFrame(engineLoop);
}

function finishEngineMatch() {
  $('tk').textContent = 'Maç Bitti!';
  $('enA').textContent = st.teamAData.name;
  $('enB').textContent = st.teamBData.name;
  $('eS').textContent = st.s.A + ' : ' + st.s.B;
  
  let resText = "Berabere Bitti!";
  if (st.s.A > st.s.B) resText = "🏆 " + st.teamAData.name + " Kazandı!";
  else if (st.s.B > st.s.A) resText = "🏆 " + st.teamBData.name + " Kazandı!";
  
  $('eR').textContent = resText;
  $('end').classList.add('show');

  if (st.onComplete) {
    st.onComplete(st.s.A, st.s.B);
  }
}