const LEAGUES_DATA = {
  superlig: {
    name: "Süper Lig (Türkiye)",
    teams: [
      { id: "gs", name: "Galatasaray", rating: 82, budget: 50, color: "#a90429", squad: [
        { name: "Victor Osimhen", pos: "ST", rating: 87, price: 70 },
        { name: "Mauro Icardi", pos: "ST", rating: 82, price: 20 },
        { name: "Lucas Torreira", pos: "CDM", rating: 81, price: 18 }
      ]},
      { id: "fb", name: "Fenerbahçe", rating: 80, budget: 48, color: "#002d62", squad: [
        { name: "Youssef En-Nesyri", pos: "ST", rating: 81, price: 22 },
        { name: "Fred", pos: "CM", rating: 80, price: 15 },
        { name: "Sebastian Szymanski", pos: "CAM", rating: 80, price: 16 }
      ]},
      { id: "bjk", name: "Beşiktaş", rating: 78, budget: 35, color: "#ffffff", squad: [
        { name: "Ciro Immobile", pos: "ST", rating: 81, price: 12 },
        { name: "Rafa Silva", pos: "CAM", rating: 82, price: 18 }
      ]},
      { id: "ts", name: "Trabzonspor", rating: 76, budget: 25, color: "#800020", squad: [
        { name: "Simon Banza", pos: "ST", rating: 78, price: 10 }
      ]}
    ]
  },
  premier: {
    name: "Premier League (İngiltere)",
    teams: [
      { id: "mci", name: "Manchester City", rating: 87, budget: 150, color: "#6cabdd", squad: [{ name: "Erling Haaland", pos: "ST", rating: 91, price: 120 }] },
      { id: "ars", name: "Arsenal", rating: 85, budget: 110, color: "#ef0107", squad: [{ name: "Bukayo Saka", pos: "RW", rating: 87, price: 80 }] },
      { id: "liv", name: "Liverpool", rating: 86, budget: 120, color: "#c8102e", squad: [{ name: "Mohamed Salah", pos: "RW", rating: 89, price: 70 }] }
    ]
  },
  laliga: {
    name: "La Liga (İspanya)",
    teams: [
      { id: "rma", name: "Real Madrid", rating: 88, budget: 160, color: "#febe10", squad: [{ name: "Kylian Mbappé", pos: "ST", rating: 91, price: 140 }] },
      { id: "bar", name: "Barcelona", rating: 86, budget: 90, color: "#004d98", squad: [{ name: "Lamine Yamal", pos: "RW", rating: 86, price: 90 }] }
    ]
  },
  seriea: {
    name: "Serie A (İtalya)",
    teams: [
      { id: "int", name: "Inter", rating: 84, budget: 85, color: "#0053a0", squad: [{ name: "Lautaro Martinez", pos: "ST", rating: 88, price: 75 }] },
      { id: "juv", name: "Juventus", rating: 82, budget: 75, color: "#ffffff", squad: [{ name: "Dusan Vlahovic", pos: "ST", rating: 84, price: 50 }] }
    ]
  },
  bundesliga: {
    name: "Bundesliga (Almanya)",
    teams: [
      { id: "bay", name: "Bayern München", rating: 86, budget: 140, color: "#dc052d", squad: [{ name: "Harry Kane", pos: "ST", rating: 90, price: 85 }] },
      { id: "bvb", name: "Borussia Dortmund", rating: 81, budget: 65, color: "#fde100", squad: [{ name: "Julian Brandt", pos: "CAM", rating: 83, price: 35 }] }
    ]
  }
};