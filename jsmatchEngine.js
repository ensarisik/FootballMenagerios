/* Takım Güçlerine Göre Oran Hesaplama ve Canvas Maç Motoru */
let cv = null, ctx = null, W = 360, H = 360, st = null, raf = null, speed = 1;
const SPEEDS = [1, 2, 3, 5];

/* İki takımın gücünü (OVR) karşılaştırıp dinamik iddaa oranı ve olasılık üretme */
function calculateOddsFromRatings(ratingA, ratingB) {
  const diff = ratingA - ratingB; // Örn: 82 - 76 = +6 güç farkı
  const baseProbA = 1 / (1 + Math.pow(10, -diff / 15));
  let probA = baseProbA * 0.85;
  let probB = (1 - baseProbA) * 0.85;
  let probD = 0.30 - Math.abs(probA - probB) * 0.2;

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

/* Canvas boyutlandırma */
function fitCanvas() {
  cv = $('cv');
  if (!cv || !$('wrap')) return;
  ctx = cv.getContext('2d');
  const r = $('wrap').getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.max(1, Math.round(r.width * d));
  cv.height = Math.max(1, Math.round(r.height * d));
  ctx.setTransform(d, 0, 0, d, 0, 0);
  W = r.width; H = r.height;
  if (!raf) drawScene();
}
window.addEventListener('resize', fitCanvas);

/* Saha ve Maç Çizimi */
function drawScene() {
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
    ctx.fillStyle = '#fff'; 
    ctx.font = 'bold 15px system-ui'; 
    ctx.textAlign = 'center';
    ctx.fillText(st.atk.team === 'A' ? st.teamAData.name + " Atakta!" : st.teamBData.name + " Atakta!", W / 2, H / 2 - 15);
  }
}

/* Maçı Başlatma Fonksiyonu */
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
    sched: [8, 22, 35, 49, 63, 77, 86], // Atak dakikaları
    onComplete: onComplete,
    odds: odds
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
  $('tk').textContent = 'Maç Başladı!';

  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(engineLoop);
}

/* Maç Döngüsü */
function engineLoop() {
  if (!st) return;
  
  if (!st.over) {
    st.min += 0.3 * speed;
    const nx = st.sched[st.i];
    
    // Atak Dakikası Geldi mi?
    if (nx !== undefined && st.min >= nx) {
      st.i++;
      const isA = Math.random() < st.odds.pa;
      st.atk = { team: isA ? 'A' : 'B' };

      // Gücü yüksek olan takımın gol atma şansı daha fazla
      const convRate = isA ? 0.38 + (st.odds.pa * 0.2) : 0.38 + (st.odds.pb * 0.2);
      
      if (Math.random() < convRate) {
        if (isA) st.s.A++; else st.s.B++;
        $('sc').textContent = st.s.A + ' : ' + st.s.B;
        $('tk').textContent = Math.floor(st.min) + '’ GOL! (' + (isA ? st.teamAData.name : st.teamBData.name) + ')';
      } else {
        $('tk').textContent = Math.floor(st.min) + '’ Şut Dışarıda / Kaleci Kurtardı!';
      }
    } else if (st.min % 15 < 0.5) {
      st.atk = null;
    }

    // 90. Dk Kontrolü
    if (st.min >= 90) {
      st.min = 90;
      st.over = true;
      st.atk = null;
      finishEngineMatch();
    }
  }

  $('clk').textContent = Math.floor(st.min) + '’';
  drawScene();
  if (!st.over) raf = requestAnimationFrame(engineLoop);
}

/* Maç Sonu Modalı */
function finishEngineMatch() {
  $('tk').textContent = 'Maç Bitti!';
  $('enA').textContent = st.teamAData.name;
  $('enB').textContent = st.teamBData.name;
  $('eS').textContent = st.s.A + ' : ' + st.s.B;
  
  let resText = "🤝 Berabere Bitti";
  if (st.s.A > st.s.B) resText = "🏆 " + st.teamAData.name + " Kazandı!";
  else if (st.s.B > st.s.A) resText = "🏆 " + st.teamBData.name + " Kazandı!";
  
  $('eR').textContent = resText;
  $('end').classList.add('show');

  if (st.onComplete) {
    st.onComplete(st.s.A, st.s.B);
  }
}