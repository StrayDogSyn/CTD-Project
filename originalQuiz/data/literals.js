// nested object
jla = {
  superman: { realName: "Clarke Kent" },
  batman: { realName: "Bruce Wayne" },
  wonderWoman: { realName: "Diana Prince" },
  flash: { realName: "Barry Allen" },
  greenLantern: { realName: "Hal Jordan" },
  martianManhunter: { realName: "John Jones" }
}

// object literals

var superman = {
  name: "Superman",
  "real name": "Clark Kent",
  "actual name": "Kal-El",
  height: 75,
  weight: 235,
  hero: true,
  villain: false,
  allies: ["Batman", "Wonder Woman", "Flash", "Aquaman", "Green Lantern", "Martian Manhunter", "Nightwing", "Cyborg", "Shazam"],
  city: "Metropolis",
  fly: function () {
    return "Up, up and away!";
  }
};

var batman = {
  name: "Batman",
  "real name": "Bruce Wayne",
  height: 74,
  weight: 210,
  hero: true,
  villain: false,
  allies: ["Superman", "Flash", "Aquaman", "Wonder Woman", "Green Lantern", "Martian Manhunter", "Nightwing", "Cyborg", "Shazam"],
  city: "Gotham",
  bat: function () {
    return "I am Justice.";
  }
};

var wonderWoman = {
  name: "Wonder Woman",
  "real name": "Diana Prince",
  height: 72,
  weight: 165,
  hero: true,
  villain: false,
  allies: ["Flash", "Superman", "Batman", "Green Lantern", "Martian Manhunter", "Nightwing", "Aquaman", "Cyborg", "Shazam"],
  lasso: function () {
    return "You will speak only the truth!";
  }
};

var spiderman = {
  name: "Spiderman",
  "real name": "Peter Parker",
  height: 65,
  weight: 195,
  hero: true,
  villain: false,
  allies: ["Iron Man", "Wolverine", "Ant-man", "Doctor Strange", "Captain America", "Hawkeye", "Black Widow", "Thor", "Falcon"],
  location: "Brooklyn",
  web: function () {
    return "I'm just your friendly neighborhood Spiderman!";
  }
};

var wolverine = {
  name: "Wolverine",
  "code name": "Weapon X",
  "real name": "Logan",
  height: 55,
  weight: 375,
  hero: true,
  villain, false,
  allies: ["Professor x", "Jean Grey", "Cyclops", "Storm", "Gambit", "Rogue", "Nightcrawler", "Quicksilver", "Spiderman"],
  location: "X-Men Academy",
  claw: function () {
    return "I'm the best at what I do, and what I do isn't nice.";
  }
};
