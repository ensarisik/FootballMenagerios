/* 10 Büyük Dünya Ligi, Takımlar, Başlangıç Güçleri (OVR) ve Yıldız Oyuncular */
const LEAGUES_DATA = {
  premier: {
    name: "Premier League (İngiltere)",
    teams: [
      { id: "mci", name: "Manchester City", rating: 86, budget: 150, color: "#6cabdd", squad: [
        { name: "Eling Haaland", pos: "ST", rating: 91, price: 120 },
        { name: "Kevin De Bruyne", pos: "CAM", rating: 90, price: 75 },
        { name: "Rodri", pos: "CDM", rating: 89, price: 85 },
        { name: "Ruben Dias", pos: "CB", rating: 87, price: 60 }
      ]},
      { id: "ars", name: "Arsenal", rating: 84, budget: 110, color: "#ef0107", squad: [
        { name: "Bukayo Saka", pos: "RW", rating: 87, price: 80 },
        { name: "Martin Odegaard", pos: "CAM", rating: 87, price: 75 },
        { name: "William Saliba", pos: "CB", rating: 86, price: 65 }
      ]},
      { id: "liv", name: "Liverpool", rating: 85, budget: 120, color: "#c8102e", squad: [
        { name: "Mohamed Salah", pos: "RW", rating: 89, price: 70 },
        { name: "Virgil van Dijk", pos: "CB", rating: 89, price: 55 },
        { name: "Alisson", pos: "GK", rating: 89, price: 50 }
      ]},
      { id: "che", name: "Chelsea", rating: 81, budget: 130, color: "#034694", squad: [
        { name: "Cole Palmer", pos: "CAM", rating: 85, price: 70 },
        { name: "Enzo Fernandez", pos: "CM", rating: 82, price: 50 }
      ]}
    ]
  },
  laliga: {
    name: "La Liga (İspanya)",
    teams: [
      { id: "rma", name: "Real Madrid", rating: 87, budget: 160, color: "#febe10", squad: [
        { name: "Kylian Mbappé", pos: "ST", rating: 91, price: 140 },
        { name: "Vinicius Jr.", pos: "LW", rating: 90, price: 110 },
        { name: "Jude Bellingham", pos: "CAM", rating: 90, price: 105 },
        { name: "Federico Valverde", pos: "CM", rating: 88, price: 80 }
      ]},
      { id: "bar", name: "Barcelona", rating: 85, budget: 90, color: "#004d98", squad: [
        { name: "Lamine Yamal", pos: "RW", rating: 86, price: 90 },
        { name: "Pedri", pos: "CM", rating: 86, price: 70 },
        { name: "Robert Lewandowski", pos: "ST", rating: 88, price: 30 }
      ]},
      { id: "atm", name: "Atletico Madrid", rating: 82, budget: 80, color: "#cb3524", squad: [
        { name: "Antoine Griezmann", pos: "ST", rating: 87, price: 45 },
        { name: "Julian Alvarez", pos: "ST", rating: 85, price: 65 }
      ]}
    ]
  },
  seriea: {
    name: "Serie A (İtalya)",
    teams: [
      { id: "int", name: "Inter", rating: 84, budget: 85, color: "#0053a0", squad: [
        { name: "Lautaro Martinez", pos: "ST", rating: 88, price: 75 },
        { name: "Nicolò Barella", pos: "CM", rating: 86, price: 60 }
      ]},
      { id: "juv", name: "Juventus", rating: 82, budget: 75, color: "#ffffff", squad: [
        { name: "Dusan Vlahovic", pos: "ST", rating: 84, price: 50 },
        { name: "Bremer", pos: "CB", rating: 84, price: 40 }
      ]},
      { id: "acm", name: "AC Milan", rating: 81, budget: 70, color: "#fb090b", squad: [
        { name: "Rafael Leao", pos: "LW", rating: 86, price: 65 },
        { name: "Theo Hernandez", pos: "LB", rating: 85, price: 55 }
      ]}
    ]
  },
  bundesliga: {
    name: "Bundesliga (Almanya)",
    teams: [
      { id: "bay", name: "Bayern München", rating: 86, budget: 140, color: "#dc052d", squad: [
        { name: "Harry Kane", pos: "ST", rating: 90, price: 85 },
        { name: "Jamal Musiala", pos: "CAM", rating: 87, price: 90 },
        { name: "Joshua Kimmich", pos: "CM", rating: 86, price: 50 }
      ]},
      { id: "bvb", name: "Borussia Dortmund", rating: 81, budget: 65, color: "#fde100", squad: [
        { name: "Julian Brandt", pos: "CAM", rating: 83, price: 35 },
        { name: "Nico Schlotterbeck", pos: "CB", rating: 83, price: 35 }
      ]},
      { id: "lev", name: "Bayer Leverkusen", rating: 83, budget: 70, color: "#e32219", squad: [
        { name: "Florian Wirtz", pos: "CAM", rating: 88, price: 95 },
        { name: "Jeremie Frimpong", pos: "RWB", rating: 84, price: 45 }
      ]}
    ]
  },
  ligue1: {
    name: "Ligue 1 (Fransa)",
    teams: [
      { id: "psg", name: "Paris Saint-Germain", rating: 84, budget: 160, color: "#004170", squad: [
        { name: "Ousmane Dembélé", pos: "RW", rating: 85, price: 50 },
        { name: "Achraf Hakimi", pos: "RB", rating: 84, price: 55 },
        { name: "Vitinha", pos: "CM", rating: 84, price: 45 }
      ]},
      { id: "om", name: "Olympique Marseille", rating: 78, budget: 45, color: "#009ee0", squad: [
        { name: "Mason Greenwood", pos: "RM", rating: 81, price: 30 }
      ]}
    ]
  },
  superlig: {
    name: "Süper Lig (Türkiye)",
    teams: [
      { id: "gs", name: "Galatasaray", rating: 80, budget: 50, color: "#a90429", squad: [
        { name: "Victor Osimhen", pos: "ST", rating: 87, price: 70 },
        { name: "Mauro Icardi", pos: "ST", rating: 82, price: 20 },
        { name: "Lucas Torreira", pos: "CDM", rating: 81, price: 18 },
        { name: "Davinson Sanchez", pos: "CB", rating: 80, price: 16 }
      ]},
      { id: "fb", name: "Fenerbahçe", rating: 79, budget: 48, color: "#002d62", squad: [
        { name: "Youssef En-Nesyri", pos: "ST", rating: 81, price: 22 },
        { name: "Fred", pos: "CM", rating: 80, price: 15 },
        { name: "Sebastian Szymanski", pos: "CAM", rating: 80, price: 16 },
        { name: "Edin Dzeko", pos: "ST", rating: 80, price: 8 }
      ]},
      { id: "bjk", name: "Beşiktaş", rating: 77, budget: 35, color: "#ffffff", squad: [
        { name: "Ciro Immobile", pos: "ST", rating: 81, price: 12 },
        { name: "Rafa Silva", pos: "CAM", rating: 82, price: 18 },
        { name: "Gedson Fernandes", pos: "CM", rating: 79, price: 15 }
      ]},
      { id: "ts", name: "Trabzonspor", rating: 75, budget: 25, color: "#800020", squad: [
        { name: "Simon Banza", pos: "ST", rating: 78, price: 10 },
        { name: "Edin Visca", pos: "RW", rating: 77, price: 5 }
      ]}
    ]
  },
  eredivisie: {
    name: "Eredivisie (Hollanda)",
    teams: [
      { id: "aja", name: "Ajax", rating: 77, budget: 40, color: "#d2122e", squad: [{ name: "Brian Brobbey", pos: "ST", rating: 79, price: 18 }] },
      { id: "psv", name: "PSV Eindhoven", rating: 79, budget: 45, color: "#ff0000", squad: [{ name: "Johan Bakayoko", pos: "RW", rating: 80, price: 25 }] }
    ]
  },
  liganos: {
    name: "Liga Portugal (Portekiz)",
    teams: [
      { id: "ben", name: "Benfica", rating: 80, budget: 55, color: "#ff0000", squad: [{ name: "Kerem Aktürkoğlu", pos: "LW", rating: 80, price: 22 }] },
      { id: "por", name: "FC Porto", rating: 79, budget: 45, color: "#003399", squad: [{ name: "Diogo Costa", pos: "GK", rating: 84, price: 40 }] },
      { id: "spo", name: "Sporting CP", rating: 81, budget: 50, color: "#008000", squad: [{ name: "Viktor Gyökeres", pos: "ST", rating: 85, price: 65 }] }
    ]
  },
  championship: {
    name: "Championship (İngiltere 2. Lig)",
    teams: [
      { id: "lee", name: "Leeds United", rating: 74, budget: 25, color: "#ffffff", squad: [{ name: "Wilfried Gnonto", pos: "RM", rating: 75, price: 10 }] },
      { id: "bur", name: "Burnley", rating: 74, budget: 28, color: "#6c1d45", squad: [{ name: "Josh Brownhill", pos: "CM", rating: 75, price: 8 }] }
    ]
  },
  mls: {
    name: "MLS (ABD)",
    teams: [
      { id: "mia", name: "Inter Miami", rating: 77, budget: 40, color: "#f7b5cd", squad: [
        { name: "Lionel Messi", pos: "RW", rating: 88, price: 40 },
        { name: "Luis Suarez", pos: "ST", rating: 82, price: 10 }
      ]}
    ]
  }
};