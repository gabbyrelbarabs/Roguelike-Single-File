/*******************
       * GAME VARIABLES
       *******************/
      const roomSize = 110;
      const mapDiv = document.getElementById("map");
      const battleMenu = document.getElementById("battleMenu");
      const battleLog = document.getElementById("battleLog");
      const enemyInfo = document.getElementById("enemyInfo");
      const levelUpMenu = document.getElementById("levelUpMenu");
      const deathMenu = document.getElementById("deathMenu")
      const battleTint = document.getElementById("battleTint");
      const inventoryMenu = document.getElementById("inventoryMenu");
      const shopMenu = document.getElementById("shopMenu");
      const shopItemsDiv = document.getElementById("shopItems");
      const casinoMenu = document.getElementById("casinoMenu");
      const betInput = document.getElementById("betInput");
      const placeBetBtn = document.getElementById("placeBetBtn");
      const casinoGameArea = document.getElementById("casinoGameArea");
      const casinoEnemyTotalEl = document.getElementById("casinoEnemyTotal");
      const casinoPlayerTotalEl = document.getElementById("casinoPlayerTotal");
      const standBtn = document.getElementById("standBtn");
      const hitButtons = document.querySelectorAll(".hitBtn");
	  
	  let timerStart = 0;
	  let timerInterval = null;
	  let timerRunning = false;
	  let elapsedTime = 0;
	  
const tooltip = document.getElementById("tooltip") || (() => {
  const t = document.createElement("div");
  t.id = "tooltip";
  document.body.appendChild(t);
  return t;
})();

function showTooltip(html, e) {
  tooltip.innerHTML = html;
  tooltip.style.left    = `${e.pageX + 12}px`;
  tooltip.style.top     = `${e.pageY + 12}px`;
  tooltip.style.display = "block";
}
function hideTooltip() {
  tooltip.style.display = "none";
}
function attachTooltip(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener("mouseenter", ev => {
      const html = el.dataset.tooltip;
      if (html) showTooltip(html, ev);
    });
    el.addEventListener("mousemove", ev => {
      tooltip.style.left = `${ev.pageX + 12}px`;
      tooltip.style.top  = `${ev.pageY + 12}px`;
    });
    el.addEventListener("mouseleave", hideTooltip);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const diffTips = {
    normal:    "The 'easiest' difficuly in the game for loser ahh beginners.",
    hard:      "The base game.",
    extreme:   "More difficulty, more fun!",
    insane:    "Too much difficulty, not fun. Not for the faint of heart.",
    calamity:  "Think you're so badass? Go for it.",
    bossRush:  "Slay Legend after Legend, Titan after Titan, God after God in this legendary game mode for the strong.",
    ultimate:  "Absolute Cinema.",
    doom:      "Play DOOM in the form of Roguelike!",
  };

  Object.entries(diffTips).forEach(([key, tip]) => {
    const btn = document.getElementById(key + "Btn");
    if (btn) {
      btn.dataset.tooltip = tip;
    }
  });

  // finally, attach them
  attachTooltip(
    "#difficultyMenu button[data-tooltip], #doomTitleScreen #beginJourneyBtn",
    el => el.dataset.tooltip
  );
});
	  
	  function startTimer() {
		timerStart = Date.now();
		timerInterval = setInterval(updateTimer, 31);  // ~32fps is enough
		timerRunning = true;
	  }

	  function updateTimer() {
		elapsedTime = Date.now() - timerStart;
		const msTotal   = elapsedTime % 1000;
		const ms        = Math.floor(msTotal / 10);
		const totalSec  = Math.floor(elapsedTime / 1000);
		const sec       = totalSec % 60;
		const min       = Math.floor(totalSec / 60) % 60;
		const hr        = Math.floor(totalSec / 3600);

		const pad2 = n => n.toString().padStart(2, '0');
		const str  = `${pad2(hr)}:${pad2(min)}:${pad2(sec)}.${pad2(ms)}`;

		document.getElementById('timerDisplay').textContent = str;
	  }

	  function stopTimer() {
		clearInterval(timerInterval);
		timerRunning = false;
	  }
	  
	  const doomCoverImage = [
		"doomcover.jpg"
	  ];
	  
	  const doomTitleImage = [
		"doomtitle.png"
	  ];
	  
	  const sellBtn      = document.getElementById("sellBtn");
	  const sellMenu     = document.getElementById("sellMenu");
	  const sellItemsDiv = document.getElementById("sellItems");
	  const closeSellBtn = document.getElementById("closeSellBtn");
	  
	  const equipmentBtn       = document.getElementById("equipmentBtn");
	  const equipmentMenu      = document.getElementById("equipmentMenu");
	  const closeEquipmentBtn  = document.getElementById("closeEquipmentBtn");
	  
	  let preBattleStats = {};
	  
	  let gameDifficulty = "normal";
	  
	  const creditsToggle = document.getElementById("creditsToggle");
	  const creditsCredits = document.getElementById("creditsCredits");
	  const contentCredits = document.getElementById("contentCredits");
	  const exitCredits = document.getElementById("exitCredits");
	  
	  const BOSS_RUSH_INTERVAL = 3;
	  
	  exitCredits.addEventListener("click", () => {
		creditsCredits.style.display = "none";
	  });

	  const libraryButton = document.getElementById("libraryButton");
	  const libraryMenu = document.getElementById("libraryMenu");
	  const exitLibrary = document.getElementById("exitLibrary");
	  const cultLibraryButton = document.getElementById("cultLibraryButton");
	  const cultLibraryMenu = document.getElementById("cultLibraryMenu");
	  const exitCultLibrary = document.getElementById("exitCultLibrary");
	  const tabGuide  = document.getElementById("tabGuide");
	  const tabGuide2 = document.getElementById("tabGuide2");
	  const tabHistory = document.getElementById("tabHistory");
	  const tabCultHistory = document.getElementById("tabCultHistory");
	  const tabPlayer = document.getElementById("tabPlayer");
	  const tabInnates = document.getElementById("tabInnates");
	  const tabMonsters = document.getElementById("tabMonsters");
	  const tabLegends = document.getElementById("tabLegends");
	  const tabCrime = document.getElementById("tabCrime");
	  const tabCultCrime = document.getElementById("tabCultCrime");
	  const contentGuide = document.getElementById("contentGuide");
	  const contentGuide2 = document.getElementById("contentGuide2");
	  const contentHistory = document.getElementById("contentHistory");
	  const contentCultHistory = document.getElementById("contentCultHistory");
	  const contentPlayer = document.getElementById("contentPlayer");
	  const contentInnates = document.getElementById("contentInnates");
	  const contentMonsters = document.getElementById("contentMonsters");
	  const contentLegends = document.getElementById("contentLegends");
	  const contentCrime = document.getElementById("contentCrime");
	  const contentCultCrime = document.getElementById("contentCultCrime");
	  
	  let hasHistoryUnlocked = false;
	  let hasCrimeUnlocked = false;
	  let hasCultHistoryUnlocked = false;
	  let hasCultCrimeUnlocked = false;
	  
	  let hasAmmoUnlocked = false;
	  let hasGunUnlocked = false;
	  let hasDragonBallUnlocked = false;
	  let hasExcaliburUnlocked = false;
	  let hasGrandUnlocked = false;
	  let hasPreviousUnlocked = false;
	  let hasStaffUnlocked = false;
	  let hasDragonUnlocked = false;
	  let hasNikeUnlocked = false;
	  let hasCrucibleUnlocked = false;
	  let hasPraetorUnlocked = false;
	  let hasBFG10000Unlocked = false;
	  let hasBFG9000Unlocked = false;
	  let hasArgentUnlocked = false;
	  let hasInfinityUnlocked = false;
	  let hasTitanUnlocked = false;
	  let hasJumpBootsUnlocked = false;
	  let hasMantleUnlocked = false;
	  let hasMechArmsUnlocked = false;
	  let hasMechArmorUnlocked = false;
	  let hasReactorUnlocked = false;
	  
libraryButton.addEventListener("click", () => {
  tabHistory.style.display = hasHistoryUnlocked ? "inline-block" : "none";
  tabCrime.style.display = hasCrimeUnlocked ? "inline-block" : "none";
  
  libraryMenu.style.display = "block";
  battleTint.style.display = "block";
});

exitLibrary.addEventListener("click", () => {
  libraryMenu.style.display = "none";
});

tabGuide.addEventListener("click", () => {
  contentGuide.style.display = "block";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "none";
  contentCrime.style.display = "none";
});
tabGuide2.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "block";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "none";
  contentCrime.style.display = "none";
});
tabHistory.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "block";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "none";
  contentCrime.style.display = "none";
});
tabPlayer.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "block";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "none";
  contentCrime.style.display = "none";
});
tabInnates.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "block";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "none";
  contentCrime.style.display = "none";
});
tabMonsters.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "block";
  contentLegends.style.display = "none";
  contentCrime.style.display = "none";
});
tabLegends.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "block";
  contentCrime.style.display = "none";
});
tabCrime.addEventListener("click", () => {
  contentGuide.style.display = "none";
  contentGuide2.style.display = "none";
  contentHistory.style.display = "none";
  contentPlayer.style.display = "none";
  contentInnates.style.display = "none";
  contentMonsters.style.display = "none";
  contentLegends.style.display = "none";
  contentCrime.style.display = "block";
});

/*CULT LIBRARY THINGS*/
cultLibraryButton.addEventListener("click", () => {
  tabCultHistory.style.display = hasCultHistoryUnlocked ? "inline-block" : "none";
  tabCultCrime.style.display = hasCultCrimeUnlocked ? "inline-block" : "none";
  
  cultLibraryMenu.style.display = "block";
  battleTint.style.display = "block";
});

exitCultLibrary.addEventListener("click", () => {
  cultLibraryMenu.style.display = "none";
});
tabCultHistory.addEventListener("click", () => {
  contentCultHistory.style.display = "block";
  contentCrime.style.display = "none";
});
tabCultCrime.addEventListener("click", () => {
  contentCultHistory.style.display = "none";
  contentCultCrime.style.display = "block";
});

let lastClickTime = 0;

document.addEventListener(
  "click",
  (event) => {
	if (event.target.closest("#guildMenu")) {
      return;
    }
    const currentTime = Date.now();

    // Check if 1 second (1000 ms) has passed since the last accepted click.
    if (currentTime - lastClickTime < 350) {
      // Prevent further processing of this click event.
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }

    // If the cooldown period has passed, update the timestamp.
    lastClickTime = currentTime;
  },
  true // Use capture phase so that this check occurs before other click event listeners.
);

	  
	  const TITLE_MUSIC_BPM = 120;
	  const BEAT_INTERVAL_MS = (60 / TITLE_MUSIC_BPM) * 1000;
	  const doomMusicOptions = [
		"hell.mp3",
		"lengthen.mp3",
		"unchained.mp3",
		"ripandtear.mp3",
		"bfg.mp3",
		"meathook.mp3",
		"cultist.mp3",
	  ];
	  let lastDoomMusic = null;
	  
	  const bgmTracks = {
  "Deep Forests": { audio: new Audio("forest.mp3"), savedTime: 0 },
  "Forest Empire": { audio: new Audio("forest.mp3"), savedTime: 0 },
  "Abandoned Graveyard": { audio: new Audio("graveyard.mp3"), savedTime: 0 },
  "Deathly Cliffs": { audio: new Audio("cliffs.mp3"), savedTime: 0 },
  "Bone Castle": { audio: new Audio("castle.mp3"), savedTime: 0 },
  "Silkwoven Caverns": { audio: new Audio("spider.mp3"), savedTime: 0 },
  "Arcane Swamps": { audio: new Audio("swamp.mp3"), savedTime: 0 },
  "Arcane Temple": { audio: new Audio("swamp.mp3"), savedTime: 0 },
  "Shi Mountains": { audio: new Audio("mountains.mp3"), savedTime: 0 },
  "The Depths": { audio: new Audio("mountains.mp3"), savedTime: 0 },
  "Archaic Caverns": { audio: new Audio("archaic.mp3"), savedTime: 0 },
  "Scorching Desert": { audio: new Audio("desert.mp3"), savedTime: 0 },
  "Never-Ending Tunnels": { audio: new Audio("Wind.mp3"), savedTime: 0 },
  "Eternity": { audio: new Audio("Wind.mp3"), savedTime: 0 },
  "Freezing Tundra": { audio: new Audio("Tundra.mp3"), savedTime: 0 },
  "The Black Sea": { audio: new Audio("sea.mp3"), savedTime: 0 },
  "Vast Ocean": { audio: new Audio("ocean.mp3"), savedTime: 0 },
  "Valrr Trench": { audio: new Audio("trench.mp3"), savedTime: 0 },
  "Sky Dimension": { audio: new Audio("sky.mp3"), savedTime: 0 },
  "Future Megalopolis": { audio: new Audio("tech.mp3"), savedTime: 0 },
  "Ancient Kingdom": { audio: new Audio("kingdom.mp3"), savedTime: 0 },
  "Shinjuku": { audio: new Audio("HeavenAndEarth.mp3"), savedTime: 0 },
  "Shibuya": { audio: new Audio("cool.mp3"), savedTime: 0 },
  "Molten Treasure Trove": { audio: new Audio("dragonsden.mp3"), savedTime: 0 },
  "Open Fields": { audio: new Audio("fields.mp3"), savedTime: 0 },
  "The Underworld": { audio: new Audio("HeavenAndEarth.mp3"), savedTime: 0 },
  "Hell": { audio: new Audio("hell.mp3"), savedTime: 0 },
  "Shadow Realm": { audio: new Audio("shadow.mp3"), savedTime: 0 },
  "The Beyond": { audio: new Audio("beyond.mp3"), savedTime: 0 },
  "Even Further Beyond": { audio: new Audio("roadtotheend.mp3"), savedTime: 0 },
  "Realm Of The Gods": { audio: new Audio("bossmusic.mp3"), savedTime: 0 },
};
const titleMusicOptions = ["fire.mp3", "tokyo.mp3", "hero.mp3", "special.mp3", "bang.mp3", "level.mp3", "titan.mp3", "rumbling.mp3"];
const titleIndex = Math.floor(Math.random() * titleMusicOptions.length);
const titleMusic = new Audio(titleMusicOptions[titleIndex]);
titleMusic.loop = true;
const ambushTrack = new Audio("battlemusic.mp3");
const bossTrack = new Audio("bossmusic.mp3");
const secTrack = new Audio("Judas.mp3");
const kocTrack = new Audio("MalevolentShrine.mp3");
const omniTrack = new Audio("Omni.mp3");
const bkTrack = new Audio("Black.mp3");
const dkTrack = new Audio("demon.mp3");
const semiTrack = new Audio("semifinale.mp3");
const troTrack = new Audio("Him.mp3");
const godTrack = new Audio("ultimate.mp3");
const casinoMusicOptions = ["gambling1.mp3", "gambling2.mp3", "gambling3.mp3"];
const casinoIndex = Math.floor(Math.random() * casinoMusicOptions.length);
const casinoMusic = new Audio(casinoMusicOptions[casinoIndex]);
const shopSound = new Audio("shop.mp3");
shopSound.loop = true;
shopSound.currentTime = 0;
const warriorTrack = new Audio("warrior.mp3");
warriorTrack.loop = true;
warriorTrack.currentTime = 0;
ambushTrack.loop = true;
ambushTrack.currentTime = 0;
bossTrack.loop = true;
bossTrack.currentTime = 0;
secTrack.loop = true;
secTrack.currentTime = 0;
omniTrack.loop = true;
omniTrack.currentTime = 0;
kocTrack.loop = true;
kocTrack.currentTime = 0;
bkTrack.loop = true;
bkTrack.currentTime = 0;
dkTrack.loop = true;
dkTrack.currentTime = 0;
troTrack.loop = true;
troTrack.currentTime = 0;
godTrack.loop = true;
godTrack.currentTime = 0;
semiTrack.loop = true;
semiTrack.currentTime = 0;
casinoMusic.loop = true;

      let ambushEnemiesQueue = null;
	  let beatTimer = null;
      let shopCooldown = 0;
      let allowedMoves = [];
      let floorCount = 1;
	  const bossInterval = 3;
      let roomMoves = 0;
      let roomsThisFloor = 0;
	  let trapCount = 0;
      let lastAltarFloor = 0;
	  let secretAmbush = false;
	  let turnNumber = 1;
	  let killCount = 0;
	  let actionsLocked = false;
	  let currentWorld = "";
	  let currentBGM = null;
	  let battleAudio = null;
	  let ambushCompleteCallback = null;
	  let guildEncounteredBefore = false;
	  let cultEncounteredBefore = false;
	  let guildFound = false;
	  let cultFound = false;
	  let skillUsedThisBattle = false;
	  let ignoreEnemyResistances = false;

      let bossRoomGenerated = false;
      let player = {
  // Current stats (will be derived from baseStats + equipment)
  attack:    2,
  defense:   2,
  magic:     2,
  maxHp:    100,
  hp:       100,
  maxArmor: 20,
  armor: 20,
  maxMana:  10,
  mana:     10,
  agility:   1,
  perception:1,
  potential: 1,
  luck: 1,
  fortune: 1,
  dodgeChance: 0.2,
  neverMiss: false,
  critMultiplier: 1,
  money: 10,
  exp: 0,
  level: 1,
  expToLevel: 5,
  inventory: new Array(10).fill(null),
  rage: false,
  iron: false,
  reflective: false,
  guildUnlocked: false,
  organization: "None",
  playerClass: "None",
  guildMissionStage: 0,
  guildMissionKills: 0,
  cultMissionStage: 0,
  cultKills: 0,
  monsterKills: 0,
  mercenaries: [],
  canRowMovement: false,
  statuses: {
    poisoned: false,
    burned: false,
    paralyzed: false,
    weakened: false,
    frozen: 0,
    asleep: 0,
  },
  // "True" base stats (permanent upgrades are stored here)
  baseStats: {
    attack:    2,
    defense:   2,
    magic:     2,
    maxHp:    100,
	maxArmor: 20,
    maxMana:  10,
    agility:   1,
    perception:1,
	potential: 1,
	luck: 1,
	fortune: 1,
    dodgeChance: 0.2,
    neverMiss:   false,
	canRowMovement: false,
  },

  // Equipped gear slots
  equipment: {
    weapon:    null,
    armor:     null,
    accessory: null
  },
  
  weaponSkill: {
	name: "None",
	usedThisBattle: false
  },
};  
	  
	  const equipmentEffects = {
  // Weapons
  "Sword":      p => {
	p.attack = Math.ceil(p.attack * 1.5);
  },
  "Gauntlets":      p => {
	p.attack = Math.ceil(p.attack * 1.3);
  },
  "Greatsword": p => {
    p.attack = p.attack * 2;
    p.defense = Math.ceil(p.defense * 1.5);
	p.maxArmor += 10;
    p.agility = p.agility - 10;
  },
  "Warhammer": p => {
    p.attack = p.attack * 3;
    p.defense = Math.ceil(p.defense * 1.67);
	p.maxArmor += 15;
    p.agility = p.agility - 15;
  },
  "Dagger":     p => {
    p.attack = Math.ceil(p.attack * 1.33);
    p.agility = Math.ceil(p.agility * 1.5);
    p.perception = Math.ceil(p.perception * 1.5);
  },
  "Spear":      p => {
    p.attack = p.attack * 2;
    p.perception = Math.ceil(p.perception * 1.5);
    p.agility = p.agility - 10;
  },
  "Wand":       p => {
	p.attack = Math.ceil(p.attack * 1.1);
    p.magic = Math.ceil(p.magic * 1.5);
    p.maxMana += 10;
  },
  "Staff":      p => {
	p.attack = Math.ceil(p.attack * 1.2);
    p.magic = p.magic * 2;
    p.maxMana += 20;
    p.agility = p.agility - 10;
  },
  "Shield":     p => {
    p.attack = Math.ceil(p.attack * 1.25);
    p.defense = Math.ceil(p.defense * 1.5);
	p.maxArmor += 30;
  },
  "Gun": p => {
    if (p.equipment.accessory
        && p.equipment.accessory.name === "Ammo Box") {
      p.attack *= 10;
    }
  },
  "Mech Arms": p => {
    if (p.equipment.accessory && p.equipment.accessory.name === "Nuclear Reactor" && p.equipment.armor && p.equipment.armor.name === "Mech Armor") {
      p.attack *= 5;
	  p.defense *= 2;
    }
  },
  "Mech Armor": p => {
    if (p.equipment.accessory && p.equipment.accessory.name === "Nuclear Reactor" && p.equipment.weapon && p.equipment.weapon.name === "Mech Arms") {
	  p.maxArmor *= 3;
      p.defense *= 2;
    }
  },
  "Nuclear Reactor": p => {
    if (p.equipment.weapon && p.equipment.weapon.name === "Mech Arms" && p.equipment.armor && p.equipment.armor.name === "Mech Armor") {
      p.maxMana *= 3;
	  p.defense *= 2;
    }
  },
  
  "Excalibur": p => {
    // triple attack
    p.attack *= 3;
    // double agility & perception
    p.agility  = Math.ceil(p.agility * 2);
    p.perception = Math.ceil(p.perception * 2);
    // increase defense by 1.5×, rounded up
    p.defense = Math.ceil(p.defense * 1.5);
    // +25 max mana
    p.maxMana += 25;
  },
  "Dragon's Fang": p => {
    p.attack *= 2;
    p.agility *= 3;
    p.perception = Math.ceil(p.perception * 2.5);
  },
  "Sorceress' Staff":      p => {
	p.attack = Math.ceil(p.attack * 1.25);
    p.magic   = p.magic * 3;
    p.maxMana = Math.ceil(p.maxMana * 2.5);
  },
  "Chainsaw":      p => {
	p.attack = Math.ceil(p.attack * 1.5);
  },
  "Sentinel Hammer": p => {
    p.attack = p.attack * 2;
    p.defense = Math.ceil(p.defense * 1.5);
	p.maxArmor += 10;
    p.agility = p.agility - 10;
  },
  "Doomblade Arm Upgrade":     p => {
    p.attack = Math.ceil(p.attack * 1.33);
    p.agility = Math.ceil(p.agility * 1.5);
    p.perception = Math.ceil(p.perception * 1.5);
  },
  "Energy Spear":      p => {
    p.attack = p.attack * 2;
    p.perception = Math.ceil(p.perception * 1.5);
    p.agility = p.agility - 10;
  },
  "Combat Shotgun":       p => {
	p.attack = Math.ceil(p.attack * 1.2);
    p.magic = Math.ceil(p.magic * 1.5);
    p.maxMana += 10;
  },
  "Unmayker":      p => {
	p.attack = Math.ceil(p.attack * 1.1);
    p.magic = p.magic * 2;
    p.maxMana += 20;
    p.agility = p.agility - 10;
  },
  "Chainshield":     p => {
    p.attack = Math.ceil(p.attack * 1.25);
    p.defense = Math.ceil(p.defense * 1.5);
	p.maxArmor += 30;
  },
  "BFG9000": p => {
    if (p.equipment.accessory && p.equipment.accessory.name === "Argent Energy Storage") {
		if (player.magic > player.attack) {
			p.magic *= 5;
			p.maxMana = Math.max(player.maxMana, 30);
		} else {
			p.attack *= 5;
		}
    }
  },
  "Crucible": p => {
    p.attack = p.attack * 3;
    p.agility  = Math.ceil(p.agility  * 2);
    p.perception = Math.ceil(p.perception * 2);
    p.defense = Math.ceil(p.defense * 1.5);
    // +25 max mana
    p.maxMana += 25;
  },
  "Titan's Fang": p => {
    p.attack = p.attack * 2;
    p.agility = p.agility * 3;
    p.perception = Math.ceil(p.perception * 2.5);
  },
  "BFG10000":      p => {
	p.attack = Math.ceil(p.attack * 1.25);
    p.magic   = p.magic * 10;
    p.maxMana = Math.max(player.maxMana, 30);
  },

  // Armors
  "Armor":      p => {
	p.defense = Math.ceil(p.defense * 1.5); 
	p.maxArmor += 25;
  },
  "Cloak":      p => {
    p.defense = Math.ceil(p.defense * 1.3);
    p.agility = Math.ceil(p.agility * 2);
	p.maxArmor += 10;
  },
  "Robe":       p => {
    p.defense = Math.ceil(p.defense * 1.25);
    p.magic   = Math.ceil(p.magic * 1.5);
    p.maxMana += 20;
	p.maxArmor += 10;
  },
  "Grand Knight's Armor":      p => {
    p.defense *= 2;
	p.attack *= 2;
	p.agility *= 2;
	p.maxArmor += 30;
  },
  "Armor":      p => {
	p.defense = Math.ceil(p.defense * 1.5); 
	p.maxArmor += 25;
  },
  "Cloak":      p => {
    p.defense = Math.ceil(p.defense * 1.3);
    p.agility = Math.ceil(p.agility * 2);
	p.maxArmor += 10;
  },
  "Mantle":       p => {
    p.defense = Math.ceil(p.defense * 1.25);
    p.magic   = Math.ceil(p.magic * 1.5);
    p.maxMana += 20;
	p.maxArmor += 10;
  },
  "Praetor Suit":      p => {
    p.defense *= 2;
	p.attack *= 2;
	p.agility *= 2;
	p.maxArmor += 30;
  },

  // Accessories
  "Scarf":      p => {
	p.dodgeChance = 0.1;
  },
  "Ring":      p => {
	p.potential *= 2;
	p.luck *= 2;
	p.fortune *= 2;
  },
  "Glasses":    p => {
	p.neverMiss = true;
  },
  "Dice":       p => {
	p.autoWinCasino = true;
  },
  "Sharpener":  p => {
	p.critMultiplier = 2;
  },
  "Ammo Box":   p => {
  },
  "Nike Black Air Force": p => {
	p.canRowMovement = true;
	p.agility = Math.ceil(p.agility * 3);
  },
  "Previous Hero's Cape": p => {
	p.attack = Math.ceil(p.attack * 1.5);
	p.magic = Math.ceil(p.magic * 1.5);
	p.defense = Math.ceil(p.defense * 1.5);
	p.agility = Math.ceil(p.agility * 1.5);
	p.perception = Math.ceil(p.perception * 1.5);
	p.potential = Math.ceil(p.potential * 1.5);
	p.luck = Math.ceil(p.luck * 1.5);
	p.fortune = Math.ceil(p.fortune * 1.5);
  },
  "Mobility Rune":      p => {
	p.dodgeChance = 0.1;
  },
  "Brutality Rune":    p => {
	p.neverMiss = true;
  },
  "Savagery Rune":  p => {
	p.critMultiplier = 2;
  },
  "Violence Rune": p => {
	p.attack = p.attack * 2;
  },
  "Armor Rune": p => {
	p.defense = p.defense * 2;
  },
  "Arsenal Rune": p => {
	p.magic = Math.ceil(p.magic * 1.5);
  },
  "Infinity Rune": p => {
	p.mana = player.maxMana;
  },
  "Argent Energy Storage":   p => {
	  
  },
  "Delta V-Jump Boots": p => {
	p.canRowMovement = true;
	p.agility = Math.ceil(p.agility * 3);
  },
  "Dark Ages Mantle": p => {
	p.attack = Math.ceil(p.attack *= 1.5);
	p.magic = Math.ceil(p.magic * 1.5);
	p.defense = Math.ceil(p.defense * 1.5);
	p.agility = Math.ceil(p.agility * 1.5);
	p.perception = Math.ceil(p.perception * 1.5);
  },
};

const weaponSkillMap = {
  "Dagger": "Assassinate",
  "Shield": "Bash",
  "Greatsword": "Heavy Slash",
  "Warhammer": "Smash",
  "Staff": "Blast Minima",
  "Excalibur": "Execution",
  "Sorceress' Staff": "Rewind",
  "Dragon's Fang": "Outrage",
  "Gauntlets": "Pummel",
  
  "Doomblade Arm Upgrade": "Glory Slash",
  "Chainshield": "Launch",
  "Sentinel Hammer": "Sentinel Slam",
  "Unmaykr": "Demon Evisceration",
  "Crucible": "Divine Execution",
  "BFG10000": "Planet Break",
  "Titan's Fang": "Outrage",
};
	  
	  const passiveAbilities = [
  { name: "None", chance: 30 },
  { name: "Tough", chance: 10 },
  { name: "Quick", chance: 10 },
  { name: "Reckless", chance: 8 },
  { name: "Hunter", chance: 8 },
  { name: "Berserker", chance: 7.5 },
  { name: "Arcane", chance: 7.5 },
  { name: "Golden", chance: 5 },
  { name: "Big", chance: 5 },
  { name: "Burning", chance: 5 },
  { name: "Fighting Spirit", chance: 5 },
  { name: "Ambidextrous", chance: 1 },
  { name: "Reflective", chance: 1 },
  { name: "Adaptable", chance: 0.5 },
  { name: "Invincible", chance: 0.5 },
  { name: "Relentless", chance: 0.5 },
  { name: "Aura Farmer", chance: 0.5 },
  { name: "Immortal", chance: 0.1 },
  { name: "Six Eyes", chance: 0.1 },
  { name: "Vessel", chance: 0.1 },
  { name: "Heavenly Restricted", chance: 0.1 },
  { name: "Immortal", chance: 0.1 },
];

const activeAbilities = [
  { name: "None", chance: 30 },
  { name: "Rage", chance: 10 },
  { name: "Dash", chance: 10 },
  { name: "Hunt", chance: 10 },
  { name: "Strike", chance: 8 },
  { name: "Blast", chance: 8 },
  { name: "Heal", chance: 7.5 },
  { name: "Mesmerizing Voice", chance: 7.5 },
  { name: "Fireball", chance: 5 },
  { name: "Freeze", chance: 5 },
  { name: "Acid Spit", chance: 5 },
  { name: "Thunderbolt", chance: 5 },
  { name: "Sacrifice", chance: 3 },
  { name: "Counter", chance: 2.5 },
  { name: "Maxima", chance: 1.5 },
  { name: "Super Strike", chance: 1.5 },
  { name: "Resurrection", chance: 1 },
  { name: "Reversal", chance: 0.7 },
  { name: "Blade of Gold", chance: 0.5 },
  { name: "Shining Armor", chance: 0.5 },
  { name: "Switch", chance: 0.1 },
  { name: "Infinity", chance: 0.1 },
  { name: "Necromancy", chance: 0.1 },
];

function getAbilityCategory(chance) {
  if (chance >= 30) {
    return "(None)";
  } if (chance >= 10) {
    return "(Common)";
  } else if (chance >= 5) {
    return "(Rare)";
  } else if (chance >= 1) {
    return "(Epic)";
  } else if (chance >= 0.5) {
    return "(Legendary)";
  } else {
	return "(???)";
  }
}

function populateAbilityLists() {
  const passiveListEl = document.getElementById("passiveAbilitiesList");
  const activeListEl = document.getElementById("activeAbilitiesList");
  
  passiveListEl.innerHTML = "";
  activeListEl.innerHTML = "";

  passiveAbilities.forEach(ability => {
    const li = document.createElement("li");
    li.textContent = `${ability.name} ${getAbilityCategory(ability.chance)}`;
    passiveListEl.appendChild(li);
  });

  activeAbilities.forEach(ability => {
    const li = document.createElement("li");
    li.textContent = `${ability.name} ${getAbilityCategory(ability.chance)}`;
    activeListEl.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", populateAbilityLists);

document.getElementById("spinAbilityButton").addEventListener("click", function () {
  spinAbilities();
  this.style.display = "none";
});
	  
	  const badTrapChance = Math.max(0, 0.05  - player.luck * 0.001);
	  const badAmbushChance  = Math.max(0, 0.10  - player.luck * 0.001);
	  
      let map = {};
      const ROOM_TYPES = {
        BATTLE: "battle",
        HEALING: "healing",
        SHOP: "shop",
        EMPTY: "empty",
        BOSS: "boss",
        ALTAR: "altar",
        CASINO: "casino",
        AMBUSH: "ambush",
        LOOT: "loot",
		TRAP: "trap",
		GUILD: "guild",
		CULT: "cult",
		WARRIOR:  "warrior",
      };
      const roomIcons = {
        battle: "battle.png",
        healing: "heal.png",
        shop: "shop.png",
        boss: "skull.png",
        altar: "altar.png",
        casino: "casino.png",
        ambush: "ambush.png",
        loot: "loot.png",
		trap: "trap.png",
		guild: "guild.png",
		cult: "cult.png",
      };
      const enemies = [{
        name: "Monster Crow",
        hp: 20,
        damageRange: [2, 4],
        expReward: [1, 4],
        moneyReward: [2, 4],
		reductionAttack: 0.33,
      }, {
        name: "Goblin",
        hp: 25,
        damageRange: [3, 5],
        expReward: [2, 4],
        moneyReward: [5, 6]
      }, {
        name: "Ogre",
        hp: 40,
        damageRange: [10, 12],
        expReward: [2, 4],
        moneyReward: [5, 6]
      }, {
        name: "Ogre Mage",
        hp: 35,
        damageRange: [12, 15],
        expReward: [2, 4],
        moneyReward: [5, 6], 
		reductionMagic: 0.33,
      }, {
        name: "Orc",
        hp: 30,
        damageRange: [8, 10],
        expReward: [2, 4],
        moneyReward: [5, 6]
      }, {
        name: "Orc Berserker",
        hp: 40,
        damageRange: [10, 12],
        expReward: [2, 4],
        moneyReward: [5, 6]
      }, {
        name: "High Orc",
        hp: 50,
        damageRange: [12, 16],
        expReward: [2, 4],
        moneyReward: [5, 6], 
		reductionMagic: 0.33,
      }, {
        name: "Wolf",
        hp: 30,
        damageRange: [5, 8],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "Bear",
        hp: 40,
        damageRange: [6, 9],
        expReward: [4, 6],
        moneyReward: [4, 6]
      }, {
        name: "Bull",
        hp: 50,
        damageRange: [5, 9],
        expReward: [5, 6],
        moneyReward: [3, 5]
      }, {
        name: "Snake",
        hp: 30,
        damageRange: [4, 5],
        expReward: [3, 6],
        moneyReward: [3, 5]
      }, {
        name: "Hobgoblin",
        hp: 50,
        damageRange: [7, 10],
        expReward: [5, 7],
        moneyReward: [7, 10],
		reductionMagic: 0.33,
      }, {
        name: "Dire Wolf",
        hp: 60,
        damageRange: [8, 12],
        expReward: [5, 8],
        moneyReward: [5, 8],
      }, {
        name: "Werewolf",
        hp: 70,
        damageRange: [5, 9],
        expReward: [5, 8],
        moneyReward: [5, 8],
      }, {
        name: "Dire Bear",
        hp: 80,
        damageRange: [10, 15],
        expReward: [10, 15],
        moneyReward: [4, 6],
		reductionAttack: 0.33,
      }, {
        name: "Gorgon",
        hp: 60,
        damageRange: [9, 12],
        expReward: [6, 7],
        moneyReward: [6, 6],
		reductionAttack: 0.5,
      }, {
        name: "Zombie",
        hp: 35,
        damageRange: [3, 5],
        expReward: [3, 4],
        moneyReward: [3, 5],
        reductionMagic: 0.5,
      }, {
        name: "Skeleton",
        hp: 25,
        damageRange: [4, 7],
        expReward: [3, 4],
        moneyReward: [3, 6],
		reductionAttack: 0.5,
      }, {
        name: "Ghoul",
        hp: 20,
        damageRange: [5, 8],
        expReward: [1, 3],
        moneyReward: [2, 4],
        reductionAll: 0.33
      }, {
        name: "Giant Spider",
        hp: 25,
        damageRange: [5, 7],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "Ant Swarm",
        hp: 1,
        damageRange: [50, 100],
        expReward: [3, 6],
        moneyReward: [4, 6]
      }, {
        name: "Giant Worker Ant",
        hp: 35,
        damageRange: [8, 9],
        expReward: [4, 6],
        moneyReward: [5, 7]
      }, {
        name: "Giant Warrior Ant",
        hp: 50,
        damageRange: [10, 12],
        expReward: [5, 7],
        moneyReward: [6, 7]
      }, {
        name: "Giant Drone Ant",
        hp: 70,
        damageRange: [6, 8],
        expReward: [5, 6],
        moneyReward: [5, 10], 
		reductionAll: 0.25,
      }, {
        name: "Giant Black Ant",
        hp: 80,
        damageRange: [10, 15],
        expReward: [6, 9],
        moneyReward: [6, 9],
		reductionAll: 0.33,
      }, {
        name: "Demon Bat",
        hp: 15,
        damageRange: [3, 5],
        expReward: [2, 4],
        moneyReward: [2, 4],
		reductionAttack: 0.5,
      }, {
        name: "Shark",
        hp: 40,
        damageRange: [4, 6],
        expReward: [4, 6],
        moneyReward: [3, 6],
		reductionAttack: 0.33,
      }, {
        name: "Crab",
        hp: 20,
        damageRange: [3, 5],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "Iron Crab",
        hp: 40,
        damageRange: [4, 5],
        expReward: [3, 5],
        moneyReward: [4, 5],
		reductionAll: 0.33,
      }, {
        name: "Giant Crab",
        hp: 60,
        damageRange: [3, 5],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "King Crab",
        hp: 50,
        damageRange: [4, 6],
        expReward: [3, 5],
        moneyReward: [4, 6]
      }, {
        name: "Spider Crab",
        hp: 15,
        damageRange: [4, 8],
        expReward: [3, 5],
        moneyReward: [3, 5]
      }, {
        name: "Piranha",
        hp: 15,
        damageRange: [3, 5],
        expReward: [3, 4],
        moneyReward: [3, 5],
		reductionAttack: 0.33,
      }, {
        name: "Giant Albatross",
        hp: 35,
        damageRange: [4, 7],
        expReward: [3, 5],
        moneyReward: [3, 5],
        reductionAttack: 0.33
      }, {
        name: "Golem",
        hp: 100,
        damageRange: [6, 10],
        expReward: [6, 10],
        moneyReward: [5, 10],
        reductionAttack: 0.5
      }, {
        name: "Ice Golem",
        hp: 80,
        damageRange: [8, 13],
        expReward: [6, 11],
        moneyReward: [6, 10],
        reductionMagic: 0.5
      }, {
        name: "Ice Spirit",
        hp: 40,
        damageRange: [7, 12],
        expReward: [4, 6],
        moneyReward: [2, 4],
        reductionAll: 0.33
      }, {
        name: "Snowman",
        hp: 30,
        damageRange: [5, 8],
        expReward: [2, 4],
        moneyReward: [2, 4],
        reductionAll: 0.8
      }, {
        name: "Giant Scorpion",
        hp: 35,
        damageRange: [4, 8],
        expReward: [3, 5],
        moneyReward: [3, 5],
        reductionAll: 0.33
      }, {
        name: "Sandworm",
        hp: 40,
        damageRange: [5, 9],
        expReward: [3, 6],
        moneyReward: [2, 5]
      }, {
        name: "Vulture",
        hp: 35,
        damageRange: [3, 6],
        expReward: [3, 5],
        moneyReward: [3, 5],
        reductionAttack: 0.33
      }, {
        name: "Possessed Armor",
        hp: 80,
        damageRange: [7, 10],
        expReward: [5, 7],
        moneyReward: [5, 6],
        reductionAttack: 0.5
      }, {
        name: "Cursed Spirit",
        hp: 60,
        damageRange: [6, 9],
        expReward: [6, 8],
        moneyReward: [4, 5],
        reductionAll: 0.33,
      }, {
        name: "Cyborg Guard",
        hp: 70,
        damageRange: [4, 8],
        expReward: [6, 8],
        moneyReward: [5, 6],
      }, {
		name: "Giant Robot",
        hp: 80,
        damageRange: [6, 10],
        expReward: [9, 10],
        moneyReward: [8, 9],
		reductionAttack: 0.33,
      }, {
		name: "Jeager",
        hp: 250,
        damageRange: [10, 15],
        expReward: [12, 15],
        moneyReward: [10, 12],
		reductionAttack: 0.5,
		reductionMagic: 0.33,
      }, {
		name: "Drone",
        hp: 50,
        damageRange: [8, 12],
        expReward: [8, 10],
        moneyReward: [8, 9]
      }, {
		name: "Sorcerer",
        hp: 70,
        damageRange: [9, 13],
        expReward: [9, 10],
        moneyReward: [9, 10],
		reductionAttack: 0.33,
      }, {
		name: "Shikigami",
        hp: 90,
        damageRange: [10, 15],
        expReward: [8, 9],
        moneyReward: [6, 8],
		reductionAttack: 0.33,
      }, {
		name: "Demon",
        hp: 90,
        damageRange: [13, 17],
        expReward: [8, 9],
        moneyReward: [6, 8],
		reductionMagic: 0.5,
      }, {
		name: "Imp",
        hp: 50,
        damageRange: [10, 15],
        expReward: [7, 8],
        moneyReward: [6, 9],
		reductionAttack: 0.5,
      }, {
		name: "Sinner",
        hp: 70,
        damageRange: [9, 12],
        expReward: [5, 7],
        moneyReward: [6, 9],
		reductionAll: 0.33,
      }, {
		name: "Archdemon",
        hp: 120,
        damageRange: [12, 16],
        expReward: [9, 10],
        moneyReward: [8, 10],
		reductionMagic: 0.33,
      }, {
		name: "Hell Knight",
        hp: 150,
        damageRange: [13, 18],
        expReward: [9, 10],
        moneyReward: [8, 10],
		reductionMagic: 0.33,
      }, {
        name: "Mancubus",
        hp: 200,
        damageRange: [10, 15],
        expReward: [10, 12],
        moneyReward: [8, 10],
        reductionAttack: 0.5
      }, {
        name: "Cacodemon",
        hp: 180,
        damageRange: [12, 14],
        expReward: [9, 11],
        moneyReward: [8, 10]
      }, {
        name: "Gargoyle",
        hp: 60,
        damageRange: [13, 17],
        expReward: [6, 10],
        moneyReward: [5, 10],
        reductionMagic: 0.5
      }, {
        name: "Cyberdemon",
        hp: 250,
        damageRange: [12, 15],
        expReward: [10, 12],
        moneyReward: [5, 10],
      },  {
        name: "Baron",
        hp: 225,
        damageRange: [9, 17],
        expReward: [10, 12],
        moneyReward: [5, 10]
      }, {
    name: "Goblin King",
    hp: 100,
    damageRange: [10, 15],
    expReward: [30, 30],
    moneyReward: [30, 30]
  },
  {
    name: "Zombie Mutant",
    hp: 120,
    damageRange: [12, 20],
    expReward: [60, 60],
    moneyReward: [60, 60],
	reductionMagic: 0.5,
  },
  {
    name: "Giant Lord",
    hp: 250,
    damageRange: [15, 32],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionAttack: 0.5,
  },
  {
    name: "Skeleton King",
    hp: 110,
    damageRange: [15, 30],
    expReward: [50, 50],
    moneyReward: [50, 50],
	reductionAttack: 0.5,
  },
  {
    name: "Spider Queen",
    hp: 140,
    damageRange: [12, 25],
    expReward: [40, 40],
    moneyReward: [40, 40]
  },
  {
    name: "The Witch",
    hp: 120,
    damageRange: [20, 35],
    expReward: [50, 50],
    moneyReward: [50, 50],
    reductionMagic: 0.5,
  },
  {
    name: "Titan Golem",
    hp: 350,
    damageRange: [20, 35],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionAll: 0.33,
  },
  {
    name: "Wyvern",
    hp: 200,
    damageRange: [25, 40],
    expReward: [70, 70],
    moneyReward: [90, 90],
    reductionAttack: 0.5,
  },
  {
    name: "Giant Sandworm",
    hp: 150,
    damageRange: [20, 30],
    expReward: [50, 50],
    moneyReward: [50, 50]
  },
  {
    name: "Titanoboa Lord",
    hp: 170,
    damageRange: [25, 35],
    expReward: [60, 60],
    moneyReward: [60, 60]
  },
  {
    name: "Abominable Snowman",
    hp: 190,
    damageRange: [25, 40],
    expReward: [60, 60],
    moneyReward: [60, 60]
  },
  {
    name: "Omegalodon",
    hp: 200,
    damageRange: [20, 35],
    expReward: [50, 50],
    moneyReward: [50, 50],
    reductionAttack: 0.5,
  },
  {
    name: "Leviathan",
    hp: 300,
    damageRange: [30, 40],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionAttack: 0.33,
  },
  {
    name: "Angel",
    hp: 320,
    damageRange: [30, 45],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionMagic: 0.5,
  },
  {
    name: "Mega Meta Mecha Annihilator - Model: Ultima",
    hp: 600,
    damageRange: [25, 36],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionAttack: 0.5,
  },
  {
    name: "Grand Knight",
    hp: 800,
    damageRange: [30, 40],
    expReward: [70, 70],
    moneyReward: [70, 70],
    reductionAll: 0.33
  },
  {
    name: "Frost Knight",
    hp: 200,
    damageRange: [6, 10],
    expReward: [70, 70],
    moneyReward: [70, 70],
    reductionAll: 0.33
  },
  {
    name: "Six-Eyed Calamity",
    hp: 500,
    damageRange: [35, 50],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionAll: 0.33,
  },
  {
  name: "Goblin Emperor",
  hp: 200,
  damageRange: [30, 40],
  expReward: [60, 60],
  moneyReward: [80, 80]
  },
{
  name: "Giant Cyclops, Eater of Men",
  hp: 300,
  damageRange: [25, 40],
  expReward: [60, 60],
  moneyReward: [60, 60]
},
{
  name: "Orc Lord",
  hp: 350,
  damageRange: [35, 40],
  expReward: [65, 65],
  moneyReward: [65, 65],
  reductionAttack: 0.33,
},
{
  name: "Medusa, Lady of Stone",
  hp: 250,
  damageRange: [30, 40],
  expReward: [70, 70],
  moneyReward: [70, 70],
  reductionAttack: 0.5
},
{
  name: "Ogre King",
  hp: 420,
  damageRange: [40, 45],
  expReward: [70, 70],
  moneyReward: [70, 70],
  reductionMagic: 0.33,
},
{
  name: "The Minotaur",
  hp: 400,
  damageRange: [25, 35],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionMagic: 0.5
},
{
  name: "Arachni Empress",
  hp: 300,
  damageRange: [30, 40],
  expReward: [70, 70],
  moneyReward: [70, 70],
  reductionAttack: 0.5
},
{
  name: "Grand Sorceress",
  hp: 250,
  damageRange: [35, 50],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionMagic: 1
},
{
  name: "Primordial Automaton",
  hp: 500,
  damageRange: [30, 40],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionAll: 0.5
},
{
  name: "Devourer of Worlds",
  hp: 500,
  damageRange: [30, 40],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionAll: 0.33
},
{
  name: "The World Serpent, Jörmungandr",
  hp: 800,
  damageRange: [35, 45],
  expReward: [90, 90],
  moneyReward: [90, 90],
  reductionAll: 0.5
},
{
  name: "Frost Queen, Borealis",
  hp: 400,
  damageRange: [30, 45],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionMagic: 0.5
},
{
  name: "Charybdis",
  hp: 350,
  damageRange: [25, 45],
  expReward: [70, 70],
  moneyReward: [70, 70],
  reductionAttack: 0.5
},
{
  name: "Queen Ant",
  hp: 500,
  damageRange: [30, 40],
  expReward: [60, 60],
  moneyReward: [60, 60]
},
{
  name: "Ant King, Beru",
  hp: 800,
  damageRange: [40, 50],
  expReward: [60, 60],
  moneyReward: [60, 60],
  reductionAll: 0.33,
},
{
  name: "Seraphim",
  hp: 420,
  damageRange: [40, 45],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionMagic: 1
},
{
  name: "Mega Meta Mecha Annihilator - Model: Grande",
  hp: 800,
  damageRange: [30, 45],
  expReward: [90, 90],
  moneyReward: [90, 90],
  reductionAttack: 1
},
{
  name: "Grand Knight II",
  hp: 500,
  damageRange: [30, 50],
  expReward: [80, 80],
  moneyReward: [80, 80],
  reductionAll: 0.4
},
{
  name: "The Brazen Bull, Khalkotauri",
  hp: 450,
  damageRange: [25, 35],
  expReward: [70, 70],
  moneyReward: [70, 70],
  reductionAll: 0.33
},
{
  name: "Kraken",
  hp: 450,
  damageRange: [25, 35],
  expReward: [60, 60],
  moneyReward: [60, 60],
  reductionAttack: 0.33,
},
{
  name: "Crab God, Khaos",
  hp: 400,
  damageRange: [30, 40],
  expReward: [60, 60],
  moneyReward: [60, 60]
},
{
  name: "Ghost Leviathan",
  hp: 600,
  damageRange: [30, 35],
  expReward: [60, 60],
  moneyReward: [60, 60],
  reductionAll: 0.33,
},
{
  name: "Island Turtle",
  hp: 850,
  damageRange: [25, 30],
  expReward: [60, 60],
  moneyReward: [60, 60],
  reductionAll: 0.25,
},
  {
    name: "The King of Curses",
    hp: 600,
    damageRange: [35, 55],
    expReward: [80, 80],
    moneyReward: [80, 80],
    reductionAll: 0.25,
  },
  {
    name: "Dragon King",
    hp: 800,
    damageRange: [35, 50],
    expReward: [90, 90],
    moneyReward: [90, 90],
    reductionAttack: 0.33,
	reductionMagic: 0.67,
  },
  {
    name: "Guardian of Hell, Cerberus",
    hp: 700,
    damageRange: [25, 35],
    expReward: [70, 70],
    moneyReward: [70, 70],
	reductionMagic: 0.33,
  },
  {
    name: "Demon King",
    hp: 850,
    damageRange: [40, 60],
    expReward: [80, 80],
    moneyReward: [85, 85],
    reductionMagic: 0.5,
  },
  {
    name: "The Black King",
    hp: 900,
    damageRange: [60, 80],
    expReward: [95, 95],
    moneyReward: [90, 90],
    reductionMagic: 0.5,
  },
  {
    name: "Omni",
    hp: 1000,
    damageRange: [50, 60],
    expReward: [100, 100],
    moneyReward: [100, 100],
    reductionAttack: 0.5,
    reductionMagic: 0.5,
  },
  {
    name: "Demon God",
    hp: 1050,
    damageRange: [55, 70],
    expReward: [105, 105],
    moneyReward: [90, 90],
    reductionMagic: 0.5,
  },
  {
    name: "Warden Of Judgement, Will, And Balance",
    hp: 1200,
    damageRange: [50, 60],
    expReward: [120, 120],
    moneyReward: [120, 120],
    reductionAttack: 0.5,
    reductionMagic: 0.5,
  },
];

const bossQueues = {
	20: ["Goblin", "Goblin", "Wolf", "Hobgoblin"],
	40: ["Zombie", "Zombie", "Skeleton"],
	60: ["Skeleton", "Bear", "Bears"],
	80: ["Skeleton", "Skeleton", "Ghoul", "Possessed Armor"],
	100: ["Giant Spider", "Giant Spider", "Giant Scorpion", "Golem"],
	120: ["Zombie", "Zombie", "Skeleton", "Ghoul", "Ghoul"],
	140: ["Golem", "Golem", "Golem"],
	160: ["Skeleton", "Skeleton", "Possessed Armor", "Golem"],
	180: ["Vulture", "Sandworm", "Sandworm", "Giant Scorpion"],
	200: ["Snake", "Snake", "Snake", "Gorgon"],
	220: ["Snowman", "Snowman", "Ice Spirit", "Ice Golem"],
	240: ["Piranha", "Piranha", "Shark"],
	260: ["Piranha", "Giant Albatross", "Shark", "Shark"],
	280: ["Monster Crow", "Vulture", "Giant Albatross", "Giant Albatross", "Ghoul", "Ghoul"],
	300: ["Cyborg Guard", "Cyborg Guard", "Drone", "Giant Robot"],
	320: ["Possessed Armor", "Possessed Armor", "Golem"],
	340: ["Cursed Spirit", "Cursed Spirit", "Sorcerer", "Sorcerer"],
	360: ["Gorgon", "Possessed Armor", "Possessed Armor", "Wyvern"],
	380: ["Imp", "Imp", "Demon"],
	400: ["Imp", "Demon", "Demon", "Archdemon"],
	420: ["Golem", "Werewolf", "Archdemon", "Shikigami", "Giant Black Ant", "King Crab", "Golem", "Frost Knight"],
	440: ["Goblin", "Dire Wolf", "Hobgoblin", "Hobgoblin"],
	460: ["Skeleton", "Skeleton", "Skeleton", "Hobgoblin", "Zombie", "Zombie", "Skeleton", "Zombie", "Giant Spider", "Giant Spider", "Zombie", "Giant Spider"],
	480: ["Orc", "Orc Berserker", "Orc Berserker", "High Orc"],
	500: ["Snake", "Snake", "Skeleton", "Gorgon", "Gorgon", "Dire Bear"],
	520: ["Ogre", "Ogre", "Ogre Mage", "Ogre Mage", "Golem"],
	540: ["Bull", "Bull", "Skeleton", "Bull", "Golem", "Zombie Mutant"],
	560: ["Giant Spider", "Giant Spider", "Skeleton", "Giant Spider", "Skeleton", "Skeleton", "Skeleton King", "Giant Spider"],
	580: ["Gorgon", "Ghoul", "Ghoul", "Golem", "Zombie Mutant"],
	600: ["Dire Wolf", "Dire Bear", "Dire Bear", "Golem", "Golem", "Skeleton King"],
	620: ["Wyvern", "Wyvern", "Hydra"],
	640: ["Sandworm", "Giant Scorpion", "Giant Sandworm", "Giant Sandworm"],
	660: ["Ice Spirit", "Ice Golem", "Ice Golem", "Frost Knight"],
	680: ["Piranha", "Shark", "Shark", "Omegalodon"],
	700: ["Ant Swarm", "Ant Swarm", "Giant Worker Ant", "Giant Warrior Ant", "Giant Drone Ant", "Giant Warrior Ant"],
	720: ["Giant Warrior Ant", "Giant Warrior Ant", "Giant Black Ant"],
	740: ["Ghoul", "Ghoul", "Ice Spirit", "Angel"],
	760: ["Cyborg Guard", "Drone", "Giant Robot", "Jeager"],
	780: ["Possessed Armor", "Possessed Armor", "Dire Wolf", "Dire Bear", "Frost Knight", "Golem"],
	800: ["Cursed Spirit", "Sorcerer", "Sorcerer", "Shikigami", "Shikigami"],
	840: ["Bull", "Bull", "Dire Wolf", "Dire Wolf", "Dire Bear", "Bull"],
	860: ["Giant Albatross", "Shark", "Shark", "Giant Albatross", "Shark", "Omegalodon"],
	880: ["Iron Crab", "Iron Crab", "Giant Crab", "Giant Crab", "Spider Crab", "King Crab"],
	900: ["Shark", "Ghoul", "Ghoul", "Shark", "Kraken"],
	960: ["Sinner", "Sinner", "Demon", "Archdemon"],
	980: ["Sinner", "Sinner", "Archdemon", "Gargoyle", "Archdemon", "Gargoyle", "Cacodemon", "Hell Knight", "Baron", "Baron", "Cyberdemon", "Guardian of Hell, Cerberus"],
	1000: ["Ghoul", "Ghoul", "Ghoul", "Ghoul", "Ghoul", "Ghoul", "Ghoul", "Ghoul", "Ghoul", "Ghoul"],
	1020: ["Gorgon", "Gorgon", "Ghoul", "Ghoul", "Zombie Mutant", "Zombie Mutant", "Skeleton King", "Cyberdemon", "Titan Golem", "Ghost Leviathan"],
	1040: ["Angel", "Angel", "Seraphim"],
	1060: ["Omni", "Demon God", "Black King", "Warden Of Judgement, Will, And Balance"],
};

      function getBossForFloor(floor) {
		if (gameDifficulty === "doom") {
   // Every 50 floors you hit a boss; cycle through these seven
   const bosses = [
     { name: "Behemoth",            hp: 10000,  damageRange: [40, 90],  expReward: [100, 100], moneyReward: [100, 100], },
	 { name: "Baron of Hell",            hp: 18000,  damageRange: [60, 100],  expReward: [200, 200], moneyReward: [100, 100], },
     { name: "Fallen Angel",        hp: 20000,  damageRange: [70, 120], expReward: [300, 300], moneyReward: [200, 150], },
     { name: "Hell Guard", hp: 35000, damageRange: [80, 110], expReward: [750, 750], moneyReward: [500, 500], },
     { name: "Tyrant Cyberdemon",          hp: 60000, damageRange: [100, 120], expReward: [1000, 1000], moneyReward: [800, 800], },
	 { name: "Spider Mastermind",          hp: 80000, damageRange: [90, 130], expReward: [1500, 1500], moneyReward: [800, 800], },
	 { name: "Hell Titan",          hp: 100000, damageRange: [80, 110], expReward: [2000, 2000], moneyReward: [800, 800], },
	 { name: "Guardian of Hell, Cerberus.", hp: 100000, damageRange: [120, 140], expReward: [2400, 2400], moneyReward: [1000, 1000], },
     { name: "Demon King.",          hp: 120000, damageRange: [100, 150],expReward: [2700, 2700], moneyReward: [1500, 1500], },
	 { name: "Doom Hunter",          hp: 125000, damageRange: [90, 120],expReward: [2500, 2500], moneyReward: [1000, 1000], },
	 { name: "Death Marauder",          hp: 150000, damageRange: [100, 130],expReward: [2700, 2700], moneyReward: [1000, 1000], },
	 { name: "The Gladiator",          hp: 180000, damageRange: [110, 140],expReward: [2800, 2800], moneyReward: [1200, 1200], },
     { name: "Dreadnought, the Ancient Hell Titan",  hp: 250000, damageRange: [90, 130],expReward: [3000, 3000], moneyReward: [1500, 1500], },
	 { name: "Khan Maykr",          hp: 150000, damageRange: [130, 160],expReward: [3200, 3200], moneyReward: [1500, 1000], },
	 { name: "The Icon of Sin",          hp: 300000, damageRange: [120, 130],expReward: [3500, 3500], moneyReward: [1500, 1500], },
	 { name: "Viscount Hellbreaker",          hp: 250000, damageRange: [100, 150],expReward: [3600, 3600], moneyReward: [1500, 1500], },
	 { name: "Maligog, Protector of the Gods",  hp: 500000, damageRange: [100, 120],expReward: [3800, 3800], moneyReward: [1500, 1500], },
     { name: "The Dark Lord, Davoth",           hp: 350000, damageRange: [120, 160],expReward: [4000, 4000], moneyReward: [2000, 2000], },
   ];
   const idx = Math.min(Math.ceil(floor/50)-1, bosses.length-1);
   return bosses[idx];
 }
 
 if (gameDifficulty === "bossRush") {
	 const bosses = {
          3: {
            name: "Goblin King",
            hp: 500,
            damageRange: [10, 15],
            expReward: [30, 30],
            moneyReward: [30, 30],
          },
          6: {
            name: "Zombie Mutant",
            hp: 1000,
            damageRange: [10, 20],
            expReward: [70, 70],
            moneyReward: [70, 70],
			reductionMagic: 0.5,
          },
          9: {
            name: "Giant Lord",
            hp: 3600,
            damageRange: [10, 15],
            expReward: [100, 100],
            moneyReward: [100, 100],
            reductionAttack: 0.5,
          },
          12: {
            name: "Skeleton King",
            hp: 1500,
            damageRange: [15, 20],
            expReward: [120, 120],
            moneyReward: [120, 120],
			reductionAttack: 0.5,
          },
          15: {
            name: "Spider Queen",
            hp: 2100,
            damageRange: [15, 25],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          18: {
            name: "The Witch",
            hp: 2000,
            damageRange: [20, 35],
            expReward: [180, 180],
            moneyReward: [180, 180],
            reductionMagic: 0.5,
          },
          21: {
            name: "Titan Golem",
            hp: 7500,
            damageRange: [20, 30],
            expReward: [210, 210],
            moneyReward: [210, 210],
            reductionAll: 0.33,
          },
          24: {
            name: "Wyvern",
            hp: 9000,
            damageRange: [25, 40],
            expReward: [240, 240],
            moneyReward: [240, 240],
			reductionAttack: 0.5,
          },
          27: {
            name: "Giant Sandworm",
            hp: 6500,
            damageRange: [20, 30],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          30: {
            name: "Titanoboa Lord",
            hp: 7000,
            damageRange: [25, 35],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          33: {
            name: "Abominable Snowman",
            hp: 7500,
            damageRange: [30, 40],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          36: {
            name: "Omegalodon",
            hp: 8500,
            damageRange: [30, 35],
            expReward: [320, 320],
            moneyReward: [320, 320],
            reductionAttack: 0.5,
          },
          39: {
            name: "Leviathan",
            hp: 11000,
            damageRange: [35, 45],
            expReward: [360, 360],
            moneyReward: [360, 360],
            reductionAttack: 0.33,
          },
          42: {
            name: "Angel",
            hp: 8900,
            damageRange: [50, 60],
            expReward: [400, 400],
            moneyReward: [400, 400],
            reductionMagic: 0.5,
          },
          45: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 12000,
            damageRange: [45, 55],
            expReward: [420, 420],
            moneyReward: [500, 500],
			reductionAttack: 0.5,
          },
          48: {
            name: "Grand Knight",
            hp: 11500,
            damageRange: [50, 65],
            expReward: [480, 480],
            moneyReward: [480, 480],
            reductionAll: 0.33,
          },
          51: {
            name: "Six-Eyed Calamity",
            hp: 10000,
            damageRange: [60, 75],
            expReward: [600, 600],
            moneyReward: [560, 560],
            reductionAll: 0.33,
		  },
          54: {
            name: "Hydra",
            hp: 12000,
            damageRange: [55, 75],
            expReward: [900, 900],
            moneyReward: [800, 800],
			reductionAttack: 0.5,
          },
          57: {
            name: "Guardian of Hell, Cerberus",
            hp: 12500,
            damageRange: [40, 65],
            expReward: [500, 500],
            moneyReward: [800, 800],
			reductionMagic: 0.33,
          },
          60: {
            name: "Demon King",
            hp: 16000,
            damageRange: [60, 80],
            expReward: [800, 800],
            moneyReward: [850, 850],
			reductionMagic: 0.5,
          },
		  63: {
            name: "Omni",
            hp: 20000,
            damageRange: [69, 96],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionAttack: 0.5,
			reductionMagic: 0.5,
          },
		  66: {
            name: "Goblin Emperor",
            hp: 15000,
            damageRange: [45, 60],
            expReward: [100, 100],
            moneyReward: [100, 100]
          },
          69: {
            name: "Giant Cyclops, Eater of Men",
            hp: 16500,
            damageRange: [50, 65],
            expReward: [150, 150],
            moneyReward: [150, 150],
          },
		  72: {
            name: "Orc Lord",
            hp: 20000,
            damageRange: [55, 70],
            expReward: [200, 200],
            moneyReward: [200, 200],
			reductionAttack: 0.33,
          },
          75: {
            name: "Medusa, Lady of Stone",
            hp: 17500,
            damageRange: [70, 90],
            expReward: [250, 250],
            moneyReward: [250, 250],
            reductionAttack: 0.5,
          },
		  78: {
            name: "Ogre King",
            hp: 25000,
            damageRange: [60, 70],
            expReward: [300, 300],
            moneyReward: [300, 300],
			reductioMagic: 0.33,
          },
          81: {
            name: "The Minotaur",
            hp: 26000,
            damageRange: [60, 75],
            expReward: [350, 350],
            moneyReward: [350, 350],
			reductionMagic: 0.5,
          },
          84: {
            name: "Arachni Empress",
            hp: 19500,
            damageRange: [70, 90],
            expReward: [360, 360],
            moneyReward: [360, 360],
			reductionAttack: 0.5,
          },
          87: {
            name: "Grand Sorceress",
            hp: 18000,
            damageRange: [80, 105],
            expReward: [400, 400],
            moneyReward: [400, 400],
            reductionMagic: 1,
          },
          90: {
            name: "Primordial Automaton",
            hp: 32000,
            damageRange: [60, 75],
            expReward: [420, 420],
            moneyReward: [420, 420],
            reductionAll: 0.5,
          },
          93: {
            name: "Dragon King",
            hp: 36000,
            damageRange: [75, 110],
            expReward: [450, 450],
            moneyReward: [420, 420],
			reductionAttack: 0.67,
			reductionMagic: 0.33,
          },
          96: {
            name: "Devourer of Worlds",
            hp: 34000,
            damageRange: [60, 70],
            expReward: [480, 480],
            moneyReward: [450, 450],
			reductionAll: 0.33,
          },
          99: {
            name: "Frost Queen, Borealis",
            hp: 30000,
            damageRange: [80, 120],
            expReward: [600, 600],
            moneyReward: [600, 600],
			reductionMagic: 0.5,
          },
          102: {
            name: "Charybdis",
            hp: 38000,
            damageRange: [60, 75],
            expReward: [640, 640],
            moneyReward: [640, 640],
            reductionAttack: 0.5,
          },
		  105: {
            name: "Queen Ant",
            hp: 40000,
            damageRange: [50, 65],
            expReward: [600, 600],
            moneyReward: [600, 600],
            reductionMagic: 0.5,
          },
		  108: {
            name: "Ant King, Beru",
            hp: 50000,
            damageRange: [90, 120],
            expReward: [640, 640],
            moneyReward: [640, 640],
            reductionAll: 0.33,
          },
          111: {
            name: "Seraphim",
            hp: 38500,
            damageRange: [95, 130],
            expReward: [690, 690],
            moneyReward: [650, 650],
            reductionMagic: 0.67,
			reductionAttack: 0.25,
          },
          114: {
            name: "Mega Meta Mecha Annihilator - Model: Grande",
            hp: 45000,
            damageRange: [70, 95],
            expReward: [700, 700],
            moneyReward: [700, 700],
			reductionAttack: 0.67,
          },
          117: {
            name: "Grand Knight II",
            hp: 52000,
            damageRange: [75, 100],
            expReward: [720, 720],
            moneyReward: [720, 720],
            reductionAll: 0.4,
          },
          120: {
            name: "The King of Curses",
            hp: 50000,
            damageRange: [90, 140],
            expReward: [690, 690],
            moneyReward: [420, 420]
		  },
          123: {
            name: "The Restricted One, Kyojiro Allista",
            hp: 75000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [0, 0],
			reductionAll: 0.2,
          },
		  126: {
            name: "The Brazen Bull, Khalkotauri",
            hp: 60000,
            damageRange: [60, 85],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.33,
          },
		  129: {
            name: "Kraken",
            hp: 65000,
            damageRange: [65, 100],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAttack: 0.33,
          },
		  132: {
            name: "Crab God, Khaos",
            hp: 65500,
            damageRange: [70, 90],
            expReward: [500, 500],
            moneyReward: [500, 500],
          },
		  135: {
            name: "Ghost Leviathan",
            hp: 75000,
            damageRange: [65, 80],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.33,
          },
		  138: {
            name: "Island Turtle",
            hp: 85500,
            damageRange: [60, 90],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.25,
          },
		  141: {
            name: "The World Serpent, Jörmungandr",
            hp: 100000,
            damageRange: [60, 80],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.33,
          },
          144: {
            name: "The Behemoth",
            hp: 65500,
            damageRange: [70, 95],
            expReward: [500, 500],
            moneyReward: [800, 800],
			reductionMagic: 0.33,
          },
          147: {
            name: "Demon God",
            hp: 90000,
            damageRange: [75, 115],
            expReward: [800, 800],
            moneyReward: [850, 850],
			reductionAttack: 0.33,
			reductionMagic: 0.5,
          },
		  150: {
            name: "The Black King",
            hp: 100000,
            damageRange: [70, 130],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionAttack: 0.25,
			reductionMagic: 1,
          },
		  153: {
            name: "Supreme Witch, Calamitas",
            hp: 95000,
            damageRange: [120, 180],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionMagic: 1,
          },
		  156: {
            name: "Warden Of Judgement, Will, And Balance",
            hp: 125000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionAll: 0.5,
          },
		  159: {
            name: "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel",
            hp: 200000,
            damageRange: [80, 160],
            expReward: [10000, 10000],
            moneyReward: [10000, 10000],
			reductionAttack: 0.67,
			reductionMagic: 0.67
          },
        };
		
         const bossFloors = Object.keys(bosses).map(Number).sort((a, b) => a - b);
        for (let rush of bossFloors) {
			if (floor <= rush) {
				return bosses[rush];
			}
		}
		// If you exceed the highest defined boss, just give the final one
	return bosses[bossFloors[bossFloors.length - 1]];
	}
        const bosses = {
          20: {
            name: "Goblin King",
            hp: 500,
            damageRange: [10, 15],
            expReward: [30, 30],
            moneyReward: [30, 30],
          },
          40: {
            name: "Zombie Mutant",
            hp: 1000,
            damageRange: [15, 25],
            expReward: [70, 70],
            moneyReward: [70, 70],
			reductionMagic: 0.5,
          },
          60: {
            name: "Giant Lord",
            hp: 3600,
            damageRange: [10, 20],
            expReward: [100, 100],
            moneyReward: [100, 100],
            reductionAttack: 0.5,
          },
          80: {
            name: "Skeleton King",
            hp: 1500,
            damageRange: [20, 30],
            expReward: [120, 120],
            moneyReward: [120, 120],
			reductionAttack: 0.5,
          },
          100: {
            name: "Spider Queen",
            hp: 2100,
            damageRange: [20, 35],
            expReward: [150, 150],
            moneyReward: [150, 150]
          },
          120: {
            name: "The Witch",
            hp: 2000,
            damageRange: [40, 60],
            expReward: [180, 180],
            moneyReward: [180, 180],
            reductionMagic: 0.5,
          },
          140: {
            name: "Titan Golem",
            hp: 8000,
            damageRange: [20, 30],
            expReward: [210, 210],
            moneyReward: [210, 210],
            reductionAll: 0.33,
          },
          160: {
            name: "Wyvern",
            hp: 9500,
            damageRange: [35, 70],
            expReward: [240, 240],
            moneyReward: [240, 240],
			reductionAttack: 0.5,
          },
          180: {
            name: "Giant Sandworm",
            hp: 7000,
            damageRange: [35, 60],
            expReward: [250, 250],
            moneyReward: [250, 250]
          },
          200: {
            name: "Titanoboa Lord",
            hp: 8000,
            damageRange: [40, 65],
            expReward: [280, 280],
            moneyReward: [280, 280]
          },
          220: {
            name: "Abominable Snowman",
            hp: 7500,
            damageRange: [50, 75],
            expReward: [300, 300],
            moneyReward: [300, 300]
          },
          240: {
            name: "Omegalodon",
            hp: 9000,
            damageRange: [45, 60],
            expReward: [320, 320],
            moneyReward: [320, 320],
            reductionAttack: 0.5,
          },
          260: {
            name: "Leviathan",
            hp: 12000,
            damageRange: [50, 65],
            expReward: [360, 360],
            moneyReward: [360, 360],
            reductionAttack: 0.33,
          },
          280: {
            name: "Angel",
            hp: 9000,
            damageRange: [60, 90],
            expReward: [400, 400],
            moneyReward: [400, 400],
            reductionMagic: 0.5,
          },
          300: {
            name: "Mega Meta Mecha Annihilator - Model: Ultima",
            hp: 12500,
            damageRange: [50, 75],
            expReward: [420, 420],
            moneyReward: [500, 500],
			reductionAttack: 0.5,
          },
          320: {
            name: "Grand Knight",
            hp: 12000,
            damageRange: [60, 90],
            expReward: [480, 480],
            moneyReward: [480, 480],
            reductionAll: 0.33,
          },
          340: {
            name: "Six-Eyed Calamity",
            hp: 10000,
            damageRange: [90, 125],
            expReward: [600, 600],
            moneyReward: [560, 560],
            reductionAll: 0.33,
		  },
          360: {
            name: "Hydra",
            hp: 12000,
            damageRange: [80, 120],
            expReward: [900, 900],
            moneyReward: [800, 800],
			reductionAttack: 0.5,
          },
          380: {
            name: "Guardian of Hell, Cerberus",
            hp: 12500,
            damageRange: [60, 95],
            expReward: [500, 500],
            moneyReward: [800, 800],
			reductionMagic: 0.33,
          },
          400: {
            name: "Demon King",
            hp: 16000,
            damageRange: [85, 120],
            expReward: [800, 800],
            moneyReward: [850, 850],
			reductionMagic: 0.5,
          },
		  420: {
            name: "Omni",
            hp: 20000,
            damageRange: [90, 130],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionAttack: 0.5,
			reductionMagic: 0.5,
          },
		  440: {
            name: "Goblin Emperor",
            hp: 15000,
            damageRange: [60, 80],
            expReward: [100, 100],
            moneyReward: [100, 100]
          },
          460: {
            name: "Giant Cyclops, Eater of Men",
            hp: 16500,
            damageRange: [65, 90],
            expReward: [150, 150],
            moneyReward: [150, 150],
          },
		  480: {
            name: "Orc Lord",
            hp: 20000,
            damageRange: [60, 85],
            expReward: [200, 200],
            moneyReward: [200, 200],
			reductionAttack: 0.33,
          },
          500: {
            name: "Medusa, Lady of Stone",
            hp: 17500,
            damageRange: [90, 115],
            expReward: [250, 250],
            moneyReward: [250, 250],
            reductionAttack: 0.5,
          },
		  520: {
            name: "Ogre King",
            hp: 25000,
            damageRange: [70, 90],
            expReward: [300, 300],
            moneyReward: [300, 300],
			reductionMagic: 0.33,
          },
          540: {
            name: "The Minotaur",
            hp: 26000,
            damageRange: [70, 100],
            expReward: [350, 350],
            moneyReward: [350, 350],
			reductionMagic: 0.5,
          },
          560: {
            name: "Arachni Empress",
            hp: 19500,
            damageRange: [75, 110],
            expReward: [360, 360],
            moneyReward: [360, 360],
			reductionAttack: 0.5,
          },
          580: {
            name: "Grand Sorceress",
            hp: 18000,
            damageRange: [100, 125],
            expReward: [400, 400],
            moneyReward: [400, 400],
            reductionMagic: 1,
          },
          600: {
            name: "Primordial Automaton",
            hp: 32000,
            damageRange: [90, 110],
            expReward: [420, 420],
            moneyReward: [420, 420],
            reductionAll: 0.5,
          },
          620: {
            name: "Dragon King",
            hp: 36000,
            damageRange: [100, 120],
            expReward: [450, 450],
            moneyReward: [420, 420],
			reductionAttack: 0.67,
			reductionMagic: 0.33,
          },
          640: {
            name: "Devourer of Worlds",
            hp: 34000,
            damageRange: [80, 90],
            expReward: [480, 480],
            moneyReward: [450, 450],
			reductionAll: 0.33,
          },
          660: {
            name: "Frost Queen, Borealis",
            hp: 30000,
            damageRange: [100, 140],
            expReward: [600, 600],
            moneyReward: [600, 600],
			reductionMagic: 0.5,
          },
          680: {
            name: "Charybdis",
            hp: 38000,
            damageRange: [70, 95],
            expReward: [640, 640],
            moneyReward: [640, 640],
            reductionAttack: 0.5,
          },
		  700: {
            name: "Queen Ant",
            hp: 40000,
            damageRange: [60, 90],
            expReward: [600, 600],
            moneyReward: [600, 600],
            reductionMagic: 0.5,
          },
		  720: {
            name: "Ant King, Beru",
            hp: 50000,
            damageRange: [95, 130],
            expReward: [640, 640],
            moneyReward: [640, 640],
            reductionAll: 0.33,
          },
          740: {
            name: "Seraphim",
            hp: 38500,
            damageRange: [100, 150],
            expReward: [690, 690],
            moneyReward: [650, 650],
            reductionMagic: 0.67,
			reductionAttack: 0.25,
          },
          760: {
            name: "Mega Meta Mecha Annihilator - Model: Grande",
            hp: 45000,
            damageRange: [90, 120],
            expReward: [700, 700],
            moneyReward: [700, 700],
			reductionAttack: 0.67,
          },
          780: {
            name: "Grand Knight II",
            hp: 52000,
            damageRange: [90, 125],
            expReward: [720, 720],
            moneyReward: [720, 720],
            reductionAll: 0.4,
          },
          800: {
            name: "The King of Curses",
            hp: 50000,
            damageRange: [120, 160],
            expReward: [690, 690],
            moneyReward: [420, 420]
		  },
          820: {
            name: "The Restricted One, Kyojiro Allista",
            hp: 75000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [0, 0],
			reductionAll: 0.2,
          },
		  840: {
            name: "The Brazen Bull, Khalkotauri",
            hp: 60000,
            damageRange: [75, 100],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.33,
          },
		  860: {
            name: "Kraken",
            hp: 65000,
            damageRange: [80, 115],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAttack: 0.33,
          },
		  880: {
            name: "Crab God, Khaos",
            hp: 65500,
            damageRange: [75, 100],
            expReward: [500, 500],
            moneyReward: [500, 500],
          },
		  900: {
            name: "Ghost Leviathan",
            hp: 75000,
            damageRange: [80, 110],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.33,
          },
		  920: {
            name: "Island Turtle",
            hp: 85500,
            damageRange: [75, 100],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.25,
          },
		  940: {
            name: "The World Serpent, Jörmungandr",
            hp: 100000,
            damageRange: [80, 105],
            expReward: [500, 500],
            moneyReward: [500, 500],
			reductionAll: 0.33,
          },
          960: {
            name: "The Behemoth",
            hp: 65500,
            damageRange: [90, 120],
            expReward: [500, 500],
            moneyReward: [800, 800],
			reductionMagic: 0.33,
          },
          980: {
            name: "Demon God",
            hp: 90000,
            damageRange: [120, 150],
            expReward: [800, 800],
            moneyReward: [850, 850],
			reductionAttack: 0.33,
			reductionMagic: 0.5,
          },
		  1000: {
            name: "The Black King",
            hp: 100000,
            damageRange: [100, 180],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionAttack: 0.25,
			reductionMagic: 1,
          },
		  1020: {
            name: "Supreme Witch, Calamitas",
            hp: 95000,
            damageRange: [120, 180],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionMagic: 1,
          },
		  1040: {
            name: "Warden Of Judgement, Will, And Balance",
            hp: 125000,
            damageRange: [75, 150],
            expReward: [1000, 1000],
            moneyReward: [1000, 1000],
			reductionAll: 0.5,
          },
		  1060: {
            name: "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel",
            hp: 200000,
            damageRange: [80, 160],
            expReward: [10000, 10000],
            moneyReward: [10000, 10000],
			reductionAttack: 0.67,
			reductionMagic: 0.67
          },
        };
		
         const bossFloors = Object.keys(bosses).map(Number).sort((a, b) => a - b);
        for (let thresh of bossFloors) {
			if (floor <= thresh) {
				return bosses[thresh];
			}
		}
		// If you exceed the highest defined boss, just give the final one
	return bosses[bossFloors[bossFloors.length - 1]];
	}

      function getAllowedEnemies() {
		if (gameDifficulty === "doom") {
			// Only these in Hell:
			const hellOnly = ["Demon", "Imp", "Archdem﻿on", "Sinner", "Ghoul", "Skeleton", "Possessed Armor", "Mancubus", "Cacodemon", "Gargoyle", "Cyberdemon", "Baron", "Hell Knight"];
			return enemies.filter(e => hellOnly.includes(e.name));
		}
        const nextBossFloor = Math.ceil(floorCount / 20) * 20;
        const nextBoss = getBossForFloor(nextBossFloor);
        let allowed = [];
        switch (nextBoss.name) {
          case "Goblin King":
            allowed = ["Monster Crow", "Wolf", "Bear", "Goblin"];
            break;
		  case "Goblin Emperor":
            allowed = ["Monster Crow", "Bull", "Dire Wolf", "Dire Bear", "Goblin", "Hobgoblin"];
            break;
		  case "Orc Lord":
		    allowed = ["Orc", "Hobgoblin", "Dire Wolf", "Dire Bear", "Orc Berserker", "High Orc", "Snake", "Monster Crow"];
			break;
		  case "Ogre King":
		    allowed = ["Ogre", "Ogre Mage", "Skeleton", "Skeleton King", "Golem", "Giant Spider", "Ghoul", "Zombie"];
			break;
          case "Zombie Mutant":
            allowed = ["Zombie", "Skeleton", "Ghoul", "Demon Bat", "Monster Crow", "Giant Spider", "Werewolf"];
            break;
		  case "Giant Cyclops, Eater of Men":
            allowed = ["Zombie", "Skeleton", "Bull", "Ghoul", "Demon Bat", "Monster Crow", "Giant Spider", "Hobgoblin"];
            break;
          case "Giant Lord":
            allowed = ["Skeleton", "Wolf", "Goblin", "Bear", "Monster Crow"];
            break;
		  case "Medusa, Lady of Stone":
            allowed = ["Skeleton", "Dire Wolf", "Snake", "Gorgon", "Hobgoblin", "Dire Bear", "Monster Crow"];
            break;
          case "Skeleton King":
            allowed = ["Zombie", "Skeleton", "Ghoul", "Demon Bat", "Monster Crow", "Giant Spider", "Possessed Armor", "Werewolf"];
            break;
		  case "The Minotaur":
            allowed = ["Zombie Mutant", "Bull", "Skeleton", "Ghoul", "Demon Bat", "Monster Crow", "Giant Spider", "Possessed Armor"];
            break;
          case "Spider Queen":
            allowed = ["Giant Spider", "Demon Bat", "Golem", "Ghoul", "Giant Scorpion", "Goblin"];
            break;
		  case "Arachni Empress":
            allowed = ["Giant Spider", "Demon Bat", "Golem", "Ghoul", "Giant Scorpion", "Hobgoblin"];
            break;
          case "The Witch":
            allowed = ["Giant Spider", "Snake", "Demon Bat", "Monster Crow", "Ghoul", "Piranha", "Skeleton", "Zombie"];
            break;
		  case "Grand Sorceress":
            allowed = ["Giant Spider", "Gorgon", "Demon Bat", "Monster Crow", "Ghoul", "Piranha", "Skeleton", "Zombie Mutant"];
            break;
          case "Titan Golem":
            allowed = ["Golem", "Demon Bat", "Giant Crow", "Skeleton", "Wolf", "Bear", "Giant Spider"];
            break;
		  case "Primordial Automaton":
            allowed = ["Golem", "Demon Bat", "Giant Crow", "Skeleton King", "Dire Wolf", "Bull", "Gorgon", "Dire Bear", "Giant Spider"];
            break;
          case "Wyvern":
            allowed = ["Golem", "Demon Bat", "Gorgon", "Goblin", "Skeleton", "Giant Spider", "Ghoul", "Possessed Armor"];
            break;
          case "Giant Sandworm":
            allowed = ["Giant Scorpion", "Sandworm", "Skeleton", "Zombie", "Vulture"];
            break;
		  case "Devourer of Worlds":
            allowed = ["Giant Scorpion", "Golem", "Ghoul", "Giant Sandworm", "Skeleton", "Zombie Mutant", "Vulture"];
            break;
          case "Titanoboa Lord":
            allowed = ["Sandworm", "Snake", "Goblin", "Golem", "Skeleton", "Giant Spider"];
            break;
		  case "The World Serpent, Jörmungandr":
            allowed = ["Giant Sandworm", "Titanoboa Lord", "Hobgoblin", "Titan Golem", "Golem", "Skeleton", "Giant Spider", "Snake", "Piranha", "Shark"];
            break;
          case "Abominable Snowman":
            allowed = ["Ice Golem", "Ice Spirit", "Snowman", "Possessed Armor", "Skeleton"];
            break;
		  case "Frost Queen, Borealis":
            allowed = ["Ice Golem", "Ice Spirit", "Snowman", "Frost Knight", "Skeleton King", "Skeleton"];
            break;
          case "Omegalodon":
            allowed = ["Piranha", "Shark"];
            break;
          case "Leviathan":
            allowed = ["Piranha", "Shark", "Giant Albatross"];
            break;
		  case "Charybdis":
            allowed = ["Piranha", "Shark", "Omegalodon", "Giant Albatross"];
            break;
		  case "Kraken":
		    allowed = ["Piranha", "Shark", "Omegalodon", "Giant Albatross"];
			break;
		  case "Crab God, Khaos":
		    allowed = ["Crab", "Iron Crab", "King Crab", "Giant Crab", "Spider Crab", "Giant Albatross", "Skeleton"];
			break;
		  case "Ghost Leviathan":
		    allowed = ["Piranha", "Shark", "Omegalodon", "Giant Albatross", "Ghoul"];
			break;
		  case "Island Turtle":
		    allowed = ["Crab", "Iron Crab", "King Crab", "Giant Crab", "Spider Crab", "Giant Albatross", "Piranha", "Shark", "Omegalodon", "Snake", "Skeleton", "Giant Spider", "Dire Wolf", "Dire Bear", "Bull"];
			break;
		  case "Queen Ant":
			allowed = ["Skeleton", "Ant Swarm", "Giant Warrior Ant", "Giant Worker Ant", "Giant Drone Ant"];
			break;
		  case "Ant King, Beru":
			allowed = ["Skeleton", "Ant Swarm", "Giant Warrior Ant", "Giant Worker Ant", "Giant Black Ant"];
			break;
          case "Angel":
            allowed = ["Giant Albatross", "Vulture", "Ghoul", "Ice Spirit", "Monster Crow", "Demon Bat"];
            break;
		  case "Seraphim":
            allowed = ["Giant Albatross", "Vulture", "Ghoul", "Ice Spirit", "Monster Crow", "Demon Bat", "Angel"];
            break;
          case "Mega Meta Mecha Annihilator - Model: Ultima":
            allowed = ["Cyborg Guard", "Giant Robot", "Drone"];
            break;
		  case "Mega Meta Mecha Annihilator - Model: Grande":
            allowed = ["Cyborg Guard", "Giant Robot", "Drone", "Jeager"];
            break;
          case "Grand Knight":
            allowed = ["Skeleton", "Wolf", "Bear", "Gorgon", "Possessed Armor", "Golem"];
            break;
		  case "Grand Knight II":
            allowed = ["Skeleton", "Dire Wolf", "Dire Bear", "Bull", "Gorgon", "Snake", "Possessed Armor", "Golem"];
            break;
          case "Six-Eyed Calamity":
            allowed = ["Cursed Spirit", "Shikigami", "Sorcerer"];
            break;
		  case "The King of Curses":
            allowed = ["Cursed Spirit", "Shikigami", "Sorcerer"];
            break;
		  case "Guardian of Hell, Cerberus":
            allowed = ["Demon", "Imp", "Archdemon"];
            break;
		  case "The Behemoth":
            allowed = ["Demon", "Imp", "Archdemon", "Sinner"];
            break;
		  case "Demon King":
            allowed = ["Demon", "Imp", "Archdemon", "Sinner"];
            break;
		  case "Demon God":
            allowed = ["Demon", "Imp", "Archdemon", "Sinner", "Mancubus", "Cyberdemon", "Cacodemon", "Gargoyle", "Baron", "Hell Knight"];
            break;
          case "Hydra":
            allowed = ["Goblin", "Gorgon", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Ghoul", "Giant Spider", "Demon Bat"];
            break;
		  case "The Restricted One, Kyojiro Allista":
            allowed = ["Goblin", "Gorgon", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Ghoul", "Giant Spider", "Demon Bat"];
            break;
		  case "The Brazen Bull, Khalkotauri":
			allowed = ["Bull", "Dire Wolf", "Dire Bear", "Hobgoblin", "Monster Crow", "Demon Bat", "Vulture", "Snake"];
			break;
		  case "Dragon King":
            allowed = ["Hobgoblin", "Gorgon", "Zombie Mutant", "Skeleton", "Titan Golem", "Monster Crow", "Dire Wolf", "Ghoul", "Possessed Armor", "Giant Spider", "Demon Bat"];
            break;
          case "Omni":
            allowed = ["Goblin", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Werewolf", "Ghoul", "Giant Spider", "Demon Bat", "Giant Scorpion", "Ice Golem", "Ice Spirit", "Piranha", "Shark", "Giant Albatross", "Vulture", "Sandworm", "Possessed Armor", "Bear", "Drone", "Cyborg Guard", "Giant Robot", "Shikigami", "Sorcerer", "Cursed Spirit", "Demon", "Imp", "Archdemon", "Frost Knight", "Orc", "Orc Berserker", "High Orc", "Ogre", "Ogre Mage", "Ant Swarm", "Giant Worker Ant", "Giant Warrior Ant", "Giant Drone Ant", "Giant Black", "Crab", "Iron Crab", "Giant Crab", "King Crab", "Spider Crab"];
            break;
		  case "The Black King":
            allowed = ["Ghoul"];
            break;
		  case "Supreme Witch, Calamitas":
		    allowed = ["Ghoul", "Zombie", "Skeleton", "Zombie Mutant", "Skeleton King", "Golem"];
            break;
		  case "Warden Of Judgement, Will, And Balance":
            allowed = ["Angel", "Archdemon", "Possessed Armor", "Ghoul", "Seraphim"];
            break;
		  case "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel":
            allowed = ["Goblin King", "Medusa, Lady of Stone", "Giant Cyclops, Eater of Men", "The Minotaur", "Seraphim", "Devourer of Worlds", "Goblin Emperor", "Frost Queen, Borealis", "The World Serpent, Jörmungandr", "Charybdis", "Primordial Automaton", "Grand Sorceress", "Arachni Empress", "The Brazen Bull, Khalkotauri", "Seraphim", "Grand Knight II", "Mega Meta Mecha Annihilator - Model: Grande", "Zombie Mutant", "Giant Lord", "Skeleton King", "Spider Queen", "The Witch", "Titan Golem", "Wyvern", "Giant Sandworm", "Titanoboa Lord", "Abominable Snowman", "Omegalodon", "Leviathan", "Angel", "Mega Meta Mecha Annihilator - Model: Ultima", "Grand Knight", "Six-Eyed Calamity", "The King of Curses", "Queen Ant", "Ant King, Beru", "Orc Lord", "Ogre King", "Kraken", "Crab King", "Ghost Leviathan", "Island Turtle", "Dragon King", "Guardian of Hell, Cerberus", "The Behemoth", "Demon King", "The Black King", "Supreme Witch, Calamitas", "Omni"];
            break;
          default:
            allowed = ["Goblin", "Zombie", "Skeleton", "Golem", "Monster Crow", "Wolf", "Werewolf", "Ghoul", "Giant Spider", "Demon Bat", "Giant Scorpion", "Ice Golem", "Ice Spirit", "Piranha", "Shark", "Giant Albatross", "Vulture", "Sandworm", "Possessed Armor", "Bear", "Drone", "Cyborg Guard", "Giant Robot", "Shikigami", "Sorcerer", "Cursed Spirit", "Demon", "Imp", "Archdemon", "Frost Knight", "Orc", "Orc Berserker", "High Orc", "Ogre", "Ogre Mage", "Ant Swarm", "Giant Worker Ant", "Giant Warrior Ant", "Giant Drone Ant", "Giant Black", "Crab", "Iron Crab", "Giant Crab", "King Crab", "Spider Crab"];
        }
        return enemies.filter(e => allowed.includes(e.name));
	  }

      // ─── Shop Items list ───
let shopItemsList = [
  // Consumables
  {
	name: "Healing Potion",
	cost: 50,
	type: "healing",
	category: "consumable",
	usableInBattle: true,
	usableOutOfBattle: true,
	usageScope: "both",
	description: "Restores a portion of a warrior's HP on consumption.",
  },
  {
	name: "Mana Potion",
	cost: 50,
	type: "mana",
	category: "consumable",
	usableInBattle: true,
	usableOutOfBattle: true,
	usageScope: "both",
	description: "Recharges a warrior's magical power on consumption.",
  },
  {
    name: "Rage Potion",
    cost: 150,
    type: "rage",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Force-activates a warrior's 'fight' instinct and adrenaline receptors on consumption.",
  },
  {
    name: "Poison Potion",
    cost: 150,
    type: "poison",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Throw at a target to poison them with toxic and acidic chemicals. DO NOT CONSUME.",
  },
  {
  name: "Frost Potion",
  cost: 150,
  type: "freeze",
    category: "consumable",
  usableInBattle: true,
  usableOutOfBattle: false,
  usageScope: "battle",
	description: "Throw on a target to completely freeze them in their tracks. DO NOT CONSUME.",
  },
  {
  name: "Molotov",
  cost: 200,
  type: "burned",
    category: "consumable",
  usableInBattle: true,
  usableOutOfBattle: false,
  usageScope: "battle",
	description: "A simple bottle filled with flammable gas and a flame at the end. Throw at enemies to set them on fire.",
  },
  {
    name: "Weaken Potion",
    cost: 150,
    type: "weaken",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Throw on a target to make them slower and weaker. DO NOT CONSUME.",
  },
  {
    name: "Lullaby Potion",
    cost: 150,
    type: "asleep",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Use on a target to put them to sleep. DO NOT CONSUME.",
  },
  {
    name: "Iron Potion",
    cost: 150,
    type: "iron",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Increases a warrior's defense on consumption.",
  },
  {
    name: "Shock Potion",
    cost: 200,
    type: "paralyzed",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Use on a target to shock and paralyze them. DO NOT CONSUME.",
  },

  // Equipment (must be equipped to work)
  // ─ Accessories ─
  {
    name: "Scarf",
    cost: 300,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A piece of cloth with a unique attribute, allowing its wearers to be stealthier, faster, and more perceptive.",
  },
  {
    name: "Ring",
    cost: 500,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A simple ring.",
  },
  {
    name: "Glasses",
    cost: 320,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Simple glasses, helps visually-impaired warriors see better.",
  },
  {
    name: "Dice",
    cost: 1000,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "More of a charm, but this dice allows warriors to be a lot luckier than normal.",
  },
  {
    name: "Sharpener",
    cost: 360,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Allows warriors to sharpen their melee equipment, allowing for more efficient kills.",
  },

  // ─ Armors ─
  {
    name: "Armor",
    cost: 300,
    type: "equipment",
    category: "armor",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "The generic plated armor for warriors to use in battle.",
  },
  {
    name: "Cloak",
    cost: 280,
    type: "equipment",
    category: "armor",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "This piece of clothing has a unique attribute of allowing warriors to be faster, stealthier, and more perceptive.",
  },
  {
    name: "Robe",
    cost: 320,
    type: "equipment",
    category: "armor",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A mysterious piece of clothing flowing with a magical aura.",
  },

  // ─ Weapons ─
  {
    name: "Sword",
    cost: 320,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "The starter weapon for a beginner or greater melee-type warrior. Sharp and efficient, it allows you to cut down foes with ease.",
  },
  {
    name: "Gauntlets",
    cost: 320,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Allows warriors to amplify their punching power even more greatly. With the added metal and weights, these allow you to truly wreak havoc.",
  },
  {
    name: "Shield",
    cost: 400,
    type: "equipment",
    category: "dual-wieldable",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "The best offense is a good defense. Defend and attack with the shield's weight and durability.",
  },
  {
    name: "Dagger",
    cost: 320,
    type: "equipment",
    category: "dual-wieldable",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A lightweight, efficient weapon that can be dual-wielded. Great for fast kills.",
  },
  {
    name: "Greatsword",
    cost: 360,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Heavy, but powerful, allowing you to land devastating strikes from all around.",
  },
  {
    name: "Warhammer",
    cost: 500,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Extremely heavy, but very powerful, allowing you to smash foes to bits.",
  },
  {
    name: "Spear",
    cost: 360,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Heavy, but powerful, allowing you to jab with great force and even throw with great accuracy.",
  },
  {
    name: "Wand",
    cost: 320,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Simple, efficient, light, mobile, and destructive. A perfect weapon for a beginner or greater mage.",
  },
  {
    name: "Staff",
    cost: 360,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A heavy weapon that allows warriors to focus their magic into a singular point and blast it all towards a target.",
  },
];

      /*******************
       * INITIALIZATION
       *******************/
	  function showDifficultyMenu() {
  document.getElementById("titleScreen").style.display = "none";
  document.getElementById("difficultyMenu").style.display = "block";
  document.getElementById("abilityMenu").style.display   = "none";
  battleTint.style.display = "block";
}

// Called when player clicks Easy/Normal/Hard
function selectDifficulty(difficulty) {
  gameDifficulty = difficulty;
  document.getElementById("difficultyMenu").style.display = "none";
  if (difficulty === "doom") {
   document.getElementById("miscStats").style.display = "none";
   document.getElementById("miscStats2").style.display = "none";

	["hp", "potential", "luck", "fortune"].forEach(stat => {
		const btn     = levelUpMenu.querySelector(`button[data-stat="${stat}"]`);
		const span  = levelUpMenu.querySelector(stat === "hp" ? "#hpText" : `#${stat}Stat`);
		const label   = levelUpMenu.querySelector(`#${stat === "hp" ? "hpText" : stat + "Stat"}`);
		if (btn) {
			btn.style.display = "none";
			if (stat === "hp") {
				// also remove the literal "HP: " text node that lives right after the button
				const txtNode = btn.nextSibling;
				if (txtNode && txtNode.nodeType === Node.TEXT_NODE) {
				txtNode.textContent = "";
				}
			}
		}
		if (span) {
			span.style.display = "none";
		}
		if (label) label.style.display = "none";
	});
   titleMusic.pause();
   document.getElementById("abilityMenu").style.display = "none";
   const doomNames = [
    "The Doom Slayer",
    "Hellwalker",
    "Unchained Predator",
    "Scourge of Hell",
    "Demon Slayer",
	"Heavensent Executioner",
   ];
   // Pick one at random
   const rand = Math.floor(Math.random() * doomNames.length);
   // Overwrite the player's chosen ability name
   player.doomAbilities = doomNames[rand];

   // Update whatever UI shows the ability title:
   // (Use your existing element—here’s a generic example)
   document.getElementById("hudPlayerPassive").textContent = player.doomAbilities;
   document.getElementById("hudPlayerActive" ).innerText = "Rip and Tear";
   initGame();
   document.body.classList.add("doom-mode");
   magicBtn.innerText = "Shoot";
   document.querySelectorAll('[data-stat="magic"]').forEach(el => {
  el.innerText = "Arsenal";
  });

// 2) Replace every “Magic:” and “Mana:” label in your stats panel
const statsEl = document.getElementById("stats");
if (statsEl) {
  statsEl.innerHTML = statsEl.innerHTML
    .replace(/Magic:/g, "Arsenal:")
    .replace(/Mana:/g,  "Ammo:");
}

// 3) Rename the level‑up menu’s “Magic” button and labels
const levelUpEl = document.getElementById("levelUpMenu");
if (levelUpEl) {
  // button text
  levelUpEl.querySelectorAll('button[data-stat="magic"]').forEach(btn => {
    btn.innerText = "Arsenal";
  });
  // any inline labels
  levelUpEl.innerHTML = levelUpEl.innerHTML
    .replace(/Magic:/g, "Arsenal:")
    .replace(/Mana:/g,  "Ammo:");
}

// 4) Make sure your mana‑display now reads “Ammo”
const manaBtns = document.querySelectorAll('[data-stat="mana"]');
manaBtns.forEach(el => el.innerText = "Ammo");

shopItemsList = [
	{
	name: "Medkit",
	cost: 60,
	type: "healing",
	category: "consumable",
	usableInBattle: true,
	usableOutOfBattle: true,
	usageScope: "both",
	description: "Allows the Slayer to regenerate on field without a Heal Station.",
  },
  {
	name: "Magazine",
	cost: 60,
	type: "mana",
	category: "consumable",
	usableInBattle: true,
	usableOutOfBattle: true,
	usageScope: "both",
	description: "Allows the Slayer to reload his weapons' ammo.",
  },
  {
    name: "Adrenaline",
    cost: 200,
    type: "rage",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Force-activates the Slayer's true violent nature, allowing him to brutalize even more demons.",
  },
  {
    name: "Gas Bomb",
    cost: 200,
    type: "poison",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Releases toxic gases when thrown, poisoning any enemy nearby.",
  },
  {
  name: "Subzero Bomb",
  cost: 200,
  type: "freeze",
    category: "consumable",
  usableInBattle: true,
  usableOutOfBattle: false,
  usageScope: "battle",
	description: "Releases subzero temperature nitrogen gases when thrown, freezing any enemy that gets in the Slayer's way.",
  },
  {
    name: "Sleeping Gas",
    cost: 200,
    type: "weaken",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Releases sleeping gas when thrown, weakening and putting enemies affected to sleep.",
  },
  {
    name: "EMP Grenade",
    cost: 200,
    type: "paralyzed",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "Releases powerful, electromagnetic pulses when thrown, shocking and paralyzing anything in the vicinity.",
  },
  {
    name: "Armor+",
    cost: 250,
    type: "iron",
    category: "consumable",
    usableInBattle: true,
    usableOutOfBattle: false,
    usageScope: "battle",
	description: "The Slayer's main source of defense.",
  },

  // Equipment (must be equipped to work)
  // ─ Accessories ─
  {
    name: "Mobility Rune",
    cost: 400,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Boosts the Slayer's speed and agility when active.",
  },
  {
    name: "Brutality Rune",
    cost: 400,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Boosts the Slayer's brutality when active, allowing for sure-kills to any demon that gets in his way.",
  },
  {
    name: "Savagery Rune",
    cost: 400,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Boosts the Slayer's violent creativity when active.",
  },
  {
    name: "Violence Rune",
    cost: 400,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Boosts the Slayer's strength and overall power when active.",
  },
  {
    name: "Armor Rune",
    cost: 400,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Boosts the Slayer's defenses when active.",
  },
  {
    name: "Arsenal Rune",
    cost: 400,
    type: "equipment",
    category: "accessory",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Boosts the Slayer's weapon proficiency when active.",
  },

  // ─ Armors ─
  {
    name: "Armor",
    cost: 420,
    type: "equipment",
    category: "armor",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Armor.",
  },
  {
    name: "Cloak",
    cost: 400,
    type: "equipment",
    category: "armor",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "This piece of clothing has a unique attribute of allowing warriors to be faster, stealthier, and more perceptive.",
  },
  {
    name: "Mantle",
    cost: 500,
    type: "equipment",
    category: "armor",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "An epic looking cape that helps the Slayer's primeval weapon-handling.",
  },

  // ─ Weapons ─
  {
    name: "Chainsaw",
    cost: 450,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A violent, awesome way to kill demons.",
  },
  {
    name: "Gauntlets",
    cost: 450,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Why just punch when you can punch even harder?",
  },
  {
    name: "Chainshield",
    cost: 500,
    type: "equipment",
    category: "dual-wieldable",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "Takes 'defense is the best offense' to a whole new level.",
  },
  {
    name: "Doomblade Arm Upgrade",
    cost: 420,
    type: "equipment",
    category: "dual-wieldable",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "An attachment to the Slayer's armor and weapons, allowing more versatility in battle.",
  },
  {
    name: "Sentinel Hammer",
    cost: 480,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A heavy, powerful hammer filled with positive-energy, and is kinetic-energy absorbant, given to the Slayer by the Night Sentinels.",
  },
  {
    name: "Energy Spear",
    cost: 450,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A positive-energy spear given to the Slayer by the Night Sentinels.",
  },
  {
    name: "Combat Shotgun",
    cost: 420,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A powerful shotgun used by the Slayer to slay demons for thousands of years.",
  },
  {
    name: "Unmayker",
    cost: 600,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "A powerful weapon charged up with demonic energy to use it against the demons.",
  },
  {
    name: "Flame Belch",
    cost: 550,
    type: "equipment",
    category: "weapon",
    usableInBattle: false,
    usableOutOfBattle: false,
    usageScope: "passive",
	description: "An attachment to the Slayer's armor and weapons, allowing him to incinerate anything in his way.",
  },
];
   
   // ——— Doom starting stats override ———
const effMaxHp = Math.floor(getEffectiveMaxHp());
// Core stats
player.level       = 1;
player.hp          = 200;
player.maxHp       = 133.5;
player.armor       = 150;
player.maxArmor    = 150;
player.attack      = 8;
player.magic       = 8;
player.defense     = 1;
player.agility     = 1;
player.perception  = 1;
player.potential   = 0;
player.luck        = 0;
player.fortune     = 0;
player.mana      = 10;
player.maxMana     = 10;
player.expToLevel = 20;
player.money = 500;

// True “baseStats” (for future level-up scaling)
player.baseStats.maxHp      = 133.5;
player.baseStats.maxArmor   = 150;
player.baseStats.attack     = 8;
player.baseStats.magic      = 8;
player.baseStats.defense    = 1;
player.baseStats.agility    = 1;
player.baseStats.perception = 1;
player.baseStats.potential  = 0;
player.baseStats.luck       = 0;
player.baseStats.fortune    = 0;
player.baseStats.maxMana    = 10;

player.passiveAbility = player.doomAbilities;
player.activeAbility  = "Rip and Tear";
applyPassiveAbilityEffects();

player.guildUnlocked     = true;
player.guildMissionStage = 7;
player.guildMissionKills = 0;
updateGuildRankUI();
updateStats();
updateManaDisplay();
   
   document.getElementById("gameContainer").style.display = "block";
   document.getElementById("battleTint").style.display = "none";
   currentWorld = "Hell";
      worldNum     = 666;
      worldName    = "Hell";
      document.body.style.background = "#b30003";      // Hell-red
      const wc = document.getElementById("worldCounter");
      if (wc) wc.textContent = "Hell 666 - 0";
	  return;
 }
 document.body.classList.remove("doom-mode");
 magicBtn.innerText = "Spell";
player.guildUnlocked     = false;
player.guildMissionStage = 0;
player.guildMissionKills = 0;
 document.getElementById("abilityMenu").style.display   = "block";
}

// Wire up the difficulty buttons
document.getElementById("normalBtn").addEventListener("click", () => selectDifficulty("normal"));
document.getElementById("hardBtn").addEventListener("click", () => selectDifficulty("hard"));
document.getElementById("extremeBtn").addEventListener("click", () => selectDifficulty("extreme"));
document.getElementById("insaneBtn").addEventListener("click", () => selectDifficulty("insane"));
document.getElementById("calamityBtn").addEventListener("click", () => selectDifficulty("calamity"));
document.getElementById("bossRushBtn").addEventListener("click", () => selectDifficulty("bossRush"));
document.getElementById("doomBtn").addEventListener("click", () => {
 titleMusic.pause();
 titleMusic.currentTime = 0;
  // hide the normal menus
  document.getElementById("difficultyMenu").style.display = "none";
  document.getElementById("abilityMenu").style.display   = "none";
});
document.getElementById("ultimateBtn").addEventListener("click", () => selectDifficulty("ultimate"));
	   
      function initGame() {
		player.x = 0;
		player.y = 0;
        createRoom(0, 0, ROOM_TYPES.EMPTY);
        const startRoom = map["0_0"];
        startRoom.element.innerHTML = '<div class="player"></div>';
        centerCamera();
        generateAdjacentRooms(0, 0);
		updateManaDisplay();
		updateStats();
		applyEquipmentEffects();
      }
	  
  var playButton = document.getElementById("playButton");
  function weightedRandomSelection(abilities) {
  // Calculate the cumulative weight.
  let totalWeight = abilities.reduce((sum, ability) => sum + ability.chance, 0);
  let random = Math.random() * totalWeight;
  for (let ability of abilities) {
    if (random < ability.chance) {
      return ability.name;
    }
    random -= ability.chance;
  }
  return abilities[0].name;  // fallback to the first one
}

function spinAbilities() {
  // Randomly select passive and active abilities using the weighted logic.
  const selectedPassive = weightedRandomSelection(passiveAbilities);
  const selectedActive = weightedRandomSelection(activeAbilities);

  // Update the ability selection menu texts.
  document.getElementById("playerPassiveAbility").innerText = selectedPassive;
  document.getElementById("playerActiveAbility").innerText = selectedActive;

  // Also store these abilities in the global player object.
  player.passiveAbility = selectedPassive;
  player.activeAbility = selectedActive;

  // Enable the "Start Game" button now that abilities are set.
  document.getElementById("confirmAbilitiesButton").disabled = false;
}

// -----------------------------
// Rolling‐slot effect for Innates
// -----------------------------
function startAbilityRoll() {
  const confirmBtn = document.getElementById("confirmAbilitiesButton");
  // 🔒 Make sure the confirm button is off while we spin
  confirmBtn.disabled = true;

  const duration      = 5000;  // total roll time in ms
  const startInterval =   10;   // initial flash speed
  const endInterval   =  300;   // final flash speed
  let elapsed = 0;
  let interval = startInterval;

  // grab names once
  const passiveNames = passiveAbilities.map(a => a.name);
  const activeNames  = activeAbilities .map(a => a.name);
  const passiveEl    = document.getElementById("playerPassiveAbility");
  const activeEl     = document.getElementById("playerActiveAbility");

  // one flash
  function flash() {
    passiveEl.innerText = passiveNames[Math.floor(Math.random() * passiveNames.length)];
    activeEl .innerText = activeNames [Math.floor(Math.random() * activeNames .length)];
  }

  // recursive step with easing
  function step() {
    flash();
    elapsed += interval;

    // linear ease from start→end
    const t = Math.min(elapsed / duration, 1);
    interval = startInterval + (endInterval - startInterval) * t;

    if (elapsed < duration) {
      setTimeout(step, interval);
    } else {
      // 🔓 now that the roll finished, pick & lock in
      spinAbilities();
      // spinAbilities() ends by doing:
      // confirmBtn.disabled = false;
    }
  }

  // kick things off
  step();
}

/*********************
 * Ability Menu Handling
 *********************/
document.getElementById("spinAbilityButton").addEventListener("click", function () {
	startAbilityRoll();
	document.getElementById("spinAbilityButton").style.display = "none";
});	

// When the player confirms abilities and starts the game.
document.getElementById("confirmAbilitiesButton").addEventListener("click", function () {
  document.getElementById("abilityMenu").style.display = "none";
  document.getElementById("hudPlayerPassive").innerText = player.passiveAbility || "None";
  document.getElementById("hudPlayerActive").innerText = player.activeAbility || "None";
  applyPassiveAbilityEffects();
  showClassSelectionMenu();
});

/*********************
 CLASS SELECTION MENU
 *********************/
function showClassSelectionMenu() {
  player.organization = "Guild";
  const menu = document.getElementById("classSelectionMenu");
  if (!menu) return console.error("No #classSelectionMenu in HTML!");
  console.log("📢 Opening Class Selection Menu");
  menu.style.display = "flex";
  battleTint.style.display = "block";
}

// 2) Global inline handler from each button:
function selectClass(cls) {
  console.log("📢 selectClass() got:", cls);
  player.playerClass = cls;
  applyClassEffects(cls);
  document.getElementById("classSelectionMenu").style.display = "none";
  initGame();
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("battleTint").style.display = "none";
  if (titleMusic) {
    titleMusic.pause();
  }
  titleMusic.currentTime = 0;
  updateStats();
}

function applyClassEffects(cls) {
  const swordNames = ["Sword", "Greatsword", "Excalibur"];
	const greatSwordName = ["Greatsword"];
	const daggerNames    = ["Dagger"];
	const hammerNames    = ["Warhammer"];
	const spearNames     = ["Spear"];
	const gauntletNames  = ["Gauntlet"];
	const w = player.equipment.weapon ? player.equipment.weapon.name : null;
	
  switch (cls) {
    case "Swordsman":
      if (w && swordNames.includes(w)) {
        // +10% with swords
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 1.10);
      } else {
        // -10% with anything else (or no weapon)
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 0.90);
      }
      break;

    case "Assassin":
      if (w && daggerNames.includes(w)) {
        // +20% with daggers
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 1.20);
      }
      player.baseStats.perception = (player.baseStats.perception || 0) + 5;
      player.baseStats.dodgeChance = (player.baseStats.dodgeChance || 0) + 0.10;
      player.baseStats.enemyDamageTaken = (player.baseStats.enemyDamageTaken || 1) * 1.10;
      break;

    case "Heavy Knight":
      if (w && (hammerNames.includes(w) || greatSwordName.includes(w) || spearNames.includes(w))) {
        // +10% with warhammer, greatsword, spear
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 1.10);
      } else {
        // -10% with any other
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 0.90);
      }
      player.baseStats.defense = Math.ceil(player.baseStats.defense * 1.10);
      player.baseStats.agility = Math.ceil(player.baseStats.agility * 0.80); // -20%
      break;

    case "Berserker":
      if (!w) {
        // +25% with no weapon
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 1.25);
      } else if (gauntletNames.includes(w)) {
        // +15% with gauntlets
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 1.375);
      } else {
        // -10% with any other weapon
        player.baseStats.attack = Math.ceil(player.baseStats.attack * 0.90);
      }
      player.baseStats.defense    = Math.ceil(player.baseStats.defense    * 1.05);
      player.baseStats.perception = (player.baseStats.perception || 0) + 5;
      player.baseStats.agility    = Math.ceil(player.baseStats.agility    * 1.05);
      player.baseStats.magic      = Math.ceil(player.baseStats.magic      * 0.90);
      break;

    case "Tank":
      player.baseStats.defense = Math.ceil(player.baseStats.defense * 1.25);
      break;

    case "Mage":
      player.baseStats.magic = Math.ceil(player.baseStats.magic * 1.05);
      player.baseStats.attack = Math.ceil(player.baseStats.attack * 0.85);
      player.baseStats.enemyDamageTaken = (player.baseStats.enemyDamageTaken || 1) * 1.05;
      break;

    case "Expeditionist":
      player.baseStats.fortune = Math.ceil(player.baseStats.fortune * 1.20);
      player.baseStats.luck    = Math.ceil(player.baseStats.luck    * 1.20);
      player.baseStats.agility = Math.ceil(player.baseStats.agility * 1.20);
      player.baseStats.attack  = Math.ceil(player.baseStats.attack  * 0.90);
	  player.baseStats.magic   = Math.ceil(player.baseStats.magic  * 0.90);
      break;

    case "All-rounder":
      [
        "attack", "defense", "magic",
        "agility","perception","potential",
        "luck",   "fortune"
      ].forEach(stat => {
        player.baseStats[stat] = Math.ceil(player.baseStats[stat] + 2);
      });
      break;

    default:
      console.warn("Unknown class:", cls);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('#classSelectionMenu button[data-class]')
    .forEach(btn => {
      btn.addEventListener('click', e => selectClass(e.currentTarget.dataset.class));
    });
});

/*********************
 * Title Screen Handling
 *********************/
// When the title screen is clicked, instead of immediately starting the game,
// hide the title screen and show the ability selection menu.
document.getElementById("playButton").addEventListener("click", () => {
  showDifficultyMenu;
  equipmentBtn.style.display = "flex";
});

document.getElementById("closeShopBtn").addEventListener("click", () => {
  shopMenu.style.display = "none";
  battleTint.style.display = "none";
  shopSound.pause();
  shopSound.currentTime = 0;
  shopMenu.classList.remove("jump-zoom-shop");
  if (currentBGM) currentBGM.play();
});

function handleTitleScreenClick() {
  // 1) play the music under a user gesture
  titleMusic.play().catch((e) => {
	console.log("Title music playback prevented:", e);
  });
  const src = titleMusic.src;  
  if (src.includes("fire.mp3")) titleBox.classList.add("jump-zoom-fire");
  if (src.includes("tokyo.mp3")) titleBox.classList.add("jump-zoom-tokyo");
  if (src.includes("hero.mp3")) titleBox.classList.add("jump-zoom-hero");
  if (src.includes("special.mp3")) titleBox.classList.add("jump-zoom-special");
  if (src.includes("bang.mp3")) titleBox.classList.add("jump-zoom-bang");
  if (src.includes("level.mp3")) titleBox.classList.add("jump-zoom-level");
  if (src.includes("titan.mp3")) titleBox.classList.add("jump-zoom-titan");
  if (src.includes("rumbling.mp3")) titleBox.classList.add("jump-zoom-rumbling");
  playButton.style.display = "block";
  titleScreen.removeEventListener("click", handleTitleScreenClick);
}

// listen for the very first screen-click
titleScreen.addEventListener("click", handleTitleScreenClick);

document.getElementById("playButton").addEventListener("click", function () {
  document.getElementById("titleScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
});

function createFadeOverlay() {
  const ov = document.createElement("div");
  ov.id = "doomFadeOverlay";
  ov.style.position = "fixed";
  ov.style.top = "0";
  ov.style.left = "0";
  ov.style.width = "100vw";
  ov.style.height = "100vh";
  ov.style.background = "black";
  ov.style.opacity = "0";
  ov.style.transition = "opacity 1s ease";
  ov.style.zIndex = "3000";
  document.body.appendChild(ov);
  return ov;
}

// at top of file, alongside other globals:
let gateAudio;

// Doom-button handler: immediate fade to black → load title behind the curtain → reveal title + play gate music
document.getElementById("doomBtn").addEventListener("click", () => {
  // stop the OG title music
  titleMusic.pause();
  titleMusic.currentTime = 0;

  // hide difficulty/ability menus
  document.getElementById("difficultyMenu").style.display = "none";
  document.getElementById("abilityMenu").style.display   = "none";

  // 1) Create full-screen black overlay and fade it in
  const overlay = createFadeOverlay();
  setTimeout(() => {
	  overlay.style.opacity = "1";
  }, 10);

  // 2) Once it’s fully opaque (1s), show title screen behind it & start gate audio
  setTimeout(() => {
	document.getElementById("doomTitleScreen").style.display = "flex";
	
	gateAudio = new Audio("atdoomsgate.mp3");
	gateAudio.loop = true;
	gateAudio.volume = 0;
	gateAudio.play();
	const fadeInterval = setInterval(() => {
		gateAudio.volume = Math.min(1, gateAudio.volume + 0.025);
		if (gateAudio.volume >= 1) clearInterval(fadeInterval);
	}, 250);
    setTimeout(() => {
		overlay.style.opacity = "";
		setTimeout(() => {
		overlay.remove();
	  }, 1000);
    }, 1000);
  }, 1000);
});

function playNextDoomTrack() {
  const pool = doomMusicOptions.filter(f => f !== lastDoomMusic);
  const pick = pool[Math.floor(Math.random() * pool.length)];
  lastDoomMusic = pick;

  if (currentBGM) {
    currentBGM.pause();
    currentBGM.removeEventListener("ended", onDoomTrackEnded);
  }
  currentBGM = new Audio(pick);
  currentBGM.loop = false;
  currentBGM.addEventListener("ended", onDoomTrackEnded);
  currentBGM.play();
}

function onDoomTrackEnded() {
  playNextDoomTrack();
}

document.getElementById("beginJourneyBtn").addEventListener("click", () => {
  // 1) Fade the gate audio out over 1s
  if (gateAudio) {
    const fadeInterval = setInterval(() => {
      gateAudio.volume = Math.max(0, gateAudio.volume - 0.05);
      if (gateAudio.volume <= 0) {
        gateAudio.pause();
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  // 2) Create a fresh black overlay and fade in to block the title
  const overlay = createFadeOverlay();
  setTimeout(() => {
		overlay.style.opacity = "1", 20;
		selectDifficulty("doom");
		initGame();
		document.body.classList.add("doom-mode");
		
		if (currentBGM) {
			currentBGM.pause();
			currentBGM.removeEventListener("ended", onDoomTrackEnded);
		}
		playNextDoomTrack();

		magicBtn.innerText = "Shoot";

	setTimeout(() => {
		overlay.style.opacity = "0";
		document.getElementById("doomTitleScreen").style.display = "none";
	}, 2000);
  
	setTimeout(() => {
		overlay.remove();
	}, 3000);
  });
});


// Play the world background music.
function playWorldMusic(worldName) {
	if (gameDifficulty === "doom") {
		return;
	}
  // If the same world's music is already playing, do nothing.
  if (currentBGM && currentWorld === worldName) return;
  if (titleMusic) {
			titleMusic.pause();
		}
  // Pause and save the current background music if one is already playing.
  if (currentBGM) {
    currentBGM.pause();
    if (bgmTracks[currentWorld]) {
      bgmTracks[currentWorld].savedTime = currentBGM.currentTime;
    }
  }

  // Set the current world.
  currentWorld = worldName;
  let trackObj = bgmTracks[worldName];

  // Check if the track exists.
  if (!trackObj) {
    console.error("No track defined for world:", worldName);
    return;
  }

  // Retrieve and configure the audio object.
  currentBGM = trackObj.audio;
  currentBGM.currentTime = trackObj.savedTime || 0;
  currentBGM.loop = true;
  currentBGM.play();
}

// Stop the current world music and save its time.
function stopWorldMusic() {
	if (gameDifficulty === "doom") return;
  if (currentBGM) {
    currentBGM.pause();
    if (bgmTracks[currentWorld]) {
      bgmTracks[currentWorld].savedTime = currentBGM.currentTime;
    }
    currentBGM = null;
  }
}

// Resume the world music after a battle.
function resumeWorldMusicAfterBattle() {
  if (currentWorld) {
    let trackObj = bgmTracks[currentWorld];
    if (!trackObj) {
      console.error("No track defined for current world:", currentWorld);
      return;
    }
	if (gameDifficulty === "doom") {
		hellTrack.audio.currentTime = hellTrack.savedTime || 0;
	}
    currentBGM = trackObj.audio;
    currentBGM.currentTime = trackObj.savedTime || 0;
    currentBGM.loop = true;
    currentBGM.play();
  }
}

      /*******************
       * ROOM FUNCTIONS
       *******************/
      function createRoom(x, y, type, options = {}) {
    const { disguised = false } = options;
    const key = x + "_" + y;

    // don’t overwrite locked rooms
    if (map[key] && map[key].locked) return;

    // build the room div
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    roomDiv.style.left = x * roomSize + "px";
    roomDiv.style.top  = y * roomSize + "px";
    roomDiv.dataset.x  = x;
    roomDiv.dataset.y  = y;
    roomDiv.dataset.type      = type;
    roomDiv.dataset.disguised = disguised;

    // === Guild room chance ===
    // 1% before first discovery, then 5% thereafter
    const guildChance = guildEncounteredBefore ? 0.1 : 0.05;
	const cultChance = cultEncounteredBefore ? 0.05 : 0.025;
	if (gameDifficulty !== "doom") {
		if (Math.random() < guildChance && floorCount % bossInterval === 0) {
			guildEncounteredBefore = true;
			type = ROOM_TYPES.GUILD;
			roomDiv.dataset.type = type;
		}
		if (Math.random() < cultChance && floorCount % bossInterval === 0) {
			cultEncounteredBefore = true;
			type = ROOM_TYPES.CULT;
			roomDiv.dataset.type = type;
		}
	}

	// if it’s a special room, slap the icon on it
	if ((type === ROOM_TYPES.TRAP && !disguised) || [ ROOM_TYPES.BATTLE, ROOM_TYPES.HEALING, ROOM_TYPES.SHOP, ROOM_TYPES.BOSS, ROOM_TYPES.ALTAR, ROOM_TYPES.CASINO, ROOM_TYPES.LOOT, ROOM_TYPES.GUILD, ROOM_TYPES.CULT ].includes(type)) {
		const img = document.createElement("img");
		img.src    = roomIcons[type];
		img.alt    = type;
		img.style.width = "80%";
		roomDiv.appendChild(img);
	}

    // make it clickable
    roomDiv.addEventListener("click", () => moveToRoom(x, y));
    mapDiv.appendChild(roomDiv);

    // register in the map
    map[key] = {
        x,
        y,
        type,
        element: roomDiv,
        disguisedTrap: disguised,
        secretAmbush
    };
}
	  
	  // === Constants & Configurations ===
	  const TRAP_SPAWN_RATE_BASE = 0.05;
	  const AMBUSH_SPAWN_RATE_BASE = 0.10;
	  const ALTAR_COOLDOWN_FLOORS = 5;
	  const FULL_EQUALIZE_LUCK = 100;

	  // Pull non-battle room weights into a constant
  	  const BASE_NON_BATTLE_WEIGHTS = {
		[ROOM_TYPES.CASINO]: 14,
		[ROOM_TYPES.SHOP]:   25,
		[ROOM_TYPES.LOOT]:   15,
		[ROOM_TYPES.HEALING]:25,
		[ROOM_TYPES.EMPTY]:  35
	  };

      // === Dynamic Chance Calculators ===
function getBadTrapChance() {
  return Math.max(0, TRAP_SPAWN_RATE_BASE - player.luck * 0.001);
}
function getBadAmbushChance() {
  return Math.max(0, AMBUSH_SPAWN_RATE_BASE - player.luck * 0.001);
}

// === Updated Room Generation ===
function generateAdjacentRooms(cx, cy) {
  allowedMoves = [];
  const positions = [
    { x: cx - 1, y: cy - 1 },
    { x: cx,     y: cy - 1 },
    { x: cx + 1, y: cy - 1 }
  ];
  
  // === Boss Rush mode: only Altars, Shops, Loots & Bosses ===
  if (gameDifficulty === "bossRush") {
    if (floorCount % bossInterval === 0 && !bossRoomGenerated) {
      // spawn the boss room straight ahead
      const bossPos = { x: cx, y: cy - 1 };
      createRoom(bossPos.x, bossPos.y, ROOM_TYPES.BOSS);
      allowedMoves.push(`${bossPos.x}_${bossPos.y}`);
      bossRoomGenerated = true;
      return;
    }
    // else generate only altar/shop/loot
    positions.forEach(pos => {
      const r = Math.random();
      let type;
      if (r < 0.6)      type = ROOM_TYPES.ALTAR;  // 60% altar
      else if (r < 0.8) type = ROOM_TYPES.SHOP;   // 20% shop
      else              type = ROOM_TYPES.LOOT;   // 20% loot
      createRoom(pos.x, pos.y, type);
      allowedMoves.push(`${pos.x}_${pos.y}`);
    });
    return; // skip the default generator
  }

  // Boss every N floors (20 normally, 50 in Doom)
  const bossInterval = (gameDifficulty === "doom" ? 50 : gameDifficulty === "bossrush" ? BOSS_RUSH_INTERVAL : 20);
  if (floorCount % bossInterval === 0 && !bossRoomGenerated) {
    const bossPos = { x: cx, y: cy - 1 };
    createRoom(bossPos.x, bossPos.y, ROOM_TYPES.BOSS);
    allowedMoves.push(`${bossPos.x}_${bossPos.y}`);
    bossRoomGenerated = true;
    return;
  }

  // Track how many battles/traps we've added
  let battleCount = 0;
  let localTrapCount = 0;
  const usedNonBattle = {};
  const luckFactor = Math.min(1, player.luck / FULL_EQUALIZE_LUCK);

  // Build the non-battle pool and weights (we still need
  // them for Healing, Altar, Ambush etc — we’ll just
  // force the forbidden ones into NORMAL at the end)
  const baseTypes = Object.keys(BASE_NON_BATTLE_WEIGHTS);
  const avgWeight = baseTypes.reduce((sum, t) =>
    sum + BASE_NON_BATTLE_WEIGHTS[t], 0) / baseTypes.length;
  const adjusted = {};
  baseTypes.forEach(t => {
    adjusted[t] = BASE_NON_BATTLE_WEIGHTS[t] * (1 - luckFactor)
                + avgWeight * luckFactor;
  });
  const totalWeight = baseTypes.reduce((sum, t) => sum + adjusted[t], 0);

  positions.forEach(pos => {
    let type, disguised = false;

    // Warrior—only if NOT Doom
    if (gameDifficulty !== "doom" && Math.random() < 0.15) {
      type = ROOM_TYPES.WARRIOR;
      disguised = true;
    }
    // Trap (max 2)
    else if (localTrapCount < 2 && Math.random() < getBadTrapChance()) {
      type = ROOM_TYPES.TRAP;
      localTrapCount++;
      if (Math.random() < 0.5) disguised = true;
    }
    // Battle (max 2)
    else if (battleCount < 2 && Math.random() < 0.5) {
      type = ROOM_TYPES.BATTLE;
      battleCount++;
    }
    // Healing on even floors
    else if (floorCount % 2 === 0) {
      type = ROOM_TYPES.HEALING;
    }
    // Altar every ALTAR_COOLDOWN_FLOORS floors
    else if ((floorCount - lastAltarFloor) >= ALTAR_COOLDOWN_FLOORS
             && Math.random() < 0.2) {
      type = ROOM_TYPES.ALTAR;
      lastAltarFloor = floorCount;
    }
    // Otherwise pick from non-battle pool (including CASINO & GUILD,
    // we'll override them out next)
    else {
      let rand = Math.random() * totalWeight;
      for (let t of baseTypes) {
        if (rand < adjusted[t]) {
          type = t;
          break;
        }
        rand -= adjusted[t];
      }
    }

    // Ambush chance on otherwise “safe” rooms
    if ([ROOM_TYPES.BATTLE, ROOM_TYPES.HEALING, ROOM_TYPES.EMPTY]
        .includes(type)
        && Math.random() < getBadAmbushChance()) {
      type = ROOM_TYPES.AMBUSH;
    }

    // Ensure one-of-each non-battle type per floor
    if (type !== ROOM_TYPES.BATTLE) {
      if (usedNonBattle[type]) {
        const avail = baseTypes.filter(t => !usedNonBattle[t]);
        if (avail.length) {
          type = avail[Math.floor(Math.random() * avail.length)];
        }
      }
      usedNonBattle[type] = true;
    }

    // ——— Doom override: force-forbid Casino, Guild, Warrior ———
    if (gameDifficulty === "doom"
        && [ROOM_TYPES.CASINO, ROOM_TYPES.GUILD, ROOM_TYPES.CULT, ROOM_TYPES.WARRIOR]
            .includes(type)) {
      type = ROOM_TYPES.EMPTY;
	  disguised = false;
    }

    // Finally, create it
    createRoom(pos.x, pos.y, type, { disguised });
    allowedMoves.push(`${pos.x}_${pos.y}`);
  });
}

      function shuffle(array) {
        let currentIndex = array.length,
          temporaryValue, randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
	  
	  function lockActions() {
		actionsLocked = true;
	  }

	  function unlockActions() {
		actionsLocked = false;
	  }

	  function newTurn() {
		turnNumber++;
		logBattle("----------Turn " + turnNumber + "----------");
		setTimeout(() => {
			unlockActions();
		}, 125);
	  }
	  
	  const baseItemChance = 0.5;
	  const itemChance = Math.min(0.9, baseItemChance + player.luck * 0.001);

      function handleLootRoom() {
  const mythicalChance = Math.min(0.5, 0.000001 + (player.luck * 0.000001));
  const legendaryChance = Math.min(0.5, 0.001 + (player.luck * 0.001));
  const epicChanceOne = Math.min(0.5, 0.01 + (player.luck * 0.005));
  const epicChanceTwo = Math.min(0.5, 0.02 + (player.luck * 0.005));
  const rareChance = Math.min(0.5, 0.05 + (player.luck * 0.005));
  
if (gameDifficulty !== "doom") {
  if (!hasHistoryUnlocked && Math.random() < rareChance) {
    hasHistoryUnlocked = true;
	hasCultHistoryUnlocked = true;
    alert("You found the **World History** book! It now has been added to the Guild library.");
    return;
  }
  
  if (!hasCrimeUnlocked && Math.random() < epicChanceOne) {
    hasCrimeUnlocked = true;
	hasCultCrimeUnlocked = true;
    alert("You found a mysterious file... **Case 001: The Restricted One (UNSOLVED)**, it says. You decide to hand it over to the Guild.");
    return;
  }
  
  if (!hasDragonBallUnlocked && Math.random() < mythicalChance) {
	hasDragonBallUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "DragonBall",
        type:     "misc",
        category: "dragonball",
		description: "Legends say collecting 7 Dragon Balls grants the owner 1 wish.",
      };
      updateStats();
      updateManaDisplay();
      alert("You found a... mysterious orb? (???)");
    } else {
      alert("Inventory full...");
    }
	checkDragonBalls();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasMechArmsUnlocked && Math.random() < mythicalChance) {
	hasMechArmsUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Mech Arms",
        type:     "equipment",
        category: "weapon",
		description: "Ancient technology from the post-modern era built as titans to fight against the gods. These are the limbs of the titans of war.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found an enormous pair of heavy, metallic limbs... (???)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasMechArmorUnlocked && Math.random() < mythicalChance) {
	hasMechArmorUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Mech Armor",
        type:     "equipment",
        category: "armor",
		description: "Ancient technology from the post-modern era built as titans to fight against the gods. These are the plates that protect the titans of war.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found  huge, metallic plating... armor maybe? (???)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasReactorUnlocked && Math.random() < mythicalChance) {
	hasReactorUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Nuclear Reactor",
        type:     "equipment",
        category: "accessory",
		description: "Ancient technology from the post-modern era built as titans to fight against the gods. This is the energy source to power up the titans of war.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found a generator of a powerful source of energy... (???)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasExcaliburUnlocked && Math.random() < legendaryChance) {
	hasExcaliburUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Excalibur",
        type:     "equipment",
        category: "weapon",
		description: "The Legendary Sword from myth! True to its name, it truly is a powerful, magical sword.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found the Excalibur! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasDragonUnlocked && Math.random() < legendaryChance) {
	hasDragonUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Dragon's Fang",
        type:     "equipment",
        category: "dual-wieldable",
		description: "A dragon's old tooth reforged into a deadly weapon.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found the Dragon's Fang! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasStaffUnlocked && Math.random() < legendaryChance) {
	hasStaffUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Sorceress' Staff",
        type:     "equipment",
        category: "weapon",
		description: "One of the Grand Sorceress' old staves, still filled to the brim with arcane magic.",
      };
      updateStats();
	  updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found the Sorceress' Staff! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasGunUnlocked && Math.random() < epicChanceOne) {
	hasGunUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Gun",
        type:     "equipment",
        category: "weapon",
		description: "A .44 magnum.",
      };
      alert("You found a firearm! (Epic)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasAmmoUnlocked && Math.random() < epicChanceTwo) {
	hasAmmoUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Ammo Box",
        type:     "equipment",
        category: "accessory",
		description: "Allows you to reload the Gun.",
      };
      alert("You found a mysterious box with strange metallic objects inside...! (Epic)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasNikeUnlocked && Math.random() < legendaryChance) {
	hasNikeUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Nike Black Air Force",
        type:     "equipment",
        category: "accessory",
		description: "They say that this unlocks a warrior's true strength.",
      };
      alert("You found a pair of Nike Black Air Force shoes! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasGrandUnlocked && Math.random() < legendaryChance) {
	hasGrandUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Grand Knight's Armor",
        type:     "equipment",
        category: "armor",
		description: "The Grand Knight's actual armor. Indestructible, impenetrable, built to defend even from the attacks of GOD.",
      };
      alert("You found the Grand Knight's Armor! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateManaDisplay();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasPreviousUnlocked && Math.random() < legendaryChance) {
	hasPreviousUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Previous Hero's Cape",
        type:     "equipment",
        category: "accessory",
		description: "An old ragged cape... with aura.",
      };
      alert("You found a mysterious cape...! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateManaDisplay();
	updateInventoryDisplay();
    return;
  }
} else {
	if (!hasDragonBallUnlocked && Math.random() < mythicalChance) {
	hasDragonBallUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "DragonBall",
        type:     "misc",
        category: "dragonball",
		description: "Legends say collecting 7 Dragon Balls grants the owner 1 wish.",
      };
      updateStats();
      updateManaDisplay();
      alert("You found a... mysterious orb? (???)");
    } else {
      alert("Inventory full...");
    }
	checkDragonBalls();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasCrucibleUnlocked && Math.random() < legendaryChance) {
	hasCrucibleUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Crucible",
        type:     "equipment",
        category: "weapon",
		description: "A godlike weapon forged in the depths of hell, powered with Argent energy, enough of it to power an entire planet for nearly a year.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found the Crucible! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasTitanUnlocked && Math.random() < legendaryChance) {
	hasTitanUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Titan's Fang",
        type:     "equipment",
        category: "dual-wieldable",
		description: "A Hell Titan's old tooth, reforged into a powerful weapon.",
      };
      updateStats();
      updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found the Titan's Fang! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasBFG10000Unlocked && Math.random() < legendaryChance) {
	hasBFG10000Unlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "BFG10000",
        type:     "equipment",
        category: "weapon",
		description: "An amplifier for the BFG9000, but now reinvented as its own weapon.",
      };
      updateStats();
	  updateManaDisplay();
	  updateInventoryDisplay();
      alert("You found a really big fucking gun! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    return;
  }
  
  if (!hasBFG9000Unlocked && Math.random() < epicChanceOne) {
	hasBFG9000Unlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "BFG9000",
        type:     "equipment",
        category: "weapon",
		description: "The Big Fucking Gun. Requires at least one form of Argent Energy to activate.",
      };
      alert("You found a big fucking gun! (Epic)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasJumpBootsUnlocked && Math.random() < legendaryChance) {
	hasJumpBootsUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Delta V-Jump Boots",
        type:     "equipment",
        category: "accessory",
		description: "Powerful boots left for the slayer to allow easy movement, agility, and even flight.",
      };
      alert("You found a pair of Delta V-Jump Boots! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasPraetorUnlocked && Math.random() < legendaryChance) {
	hasPraetorUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Praetor Suit",
        type:     "equipment",
        category: "armor",
		description: "An ancient suit of armor, yet is the most technologically-advanced one in all of existence. Built to adapt to any condition, it is indestructible, even to its creator.",
      };
      alert("You found the Praetor Suit! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateManaDisplay();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasMantleUnlocked && Math.random() < legendaryChance) {
	hasMantleUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Dark Ages Mantle",
        type:     "equipment",
        category: "accessory",
		description: "An ancient, furry cape filled with demonic aura that allows the Slayer to handle weapons more efficiently.",
      };
      alert("You found an epic looking cape...! (LEGENDARY)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateManaDisplay();
	updateInventoryDisplay();
    return;
  }
  
  if (!hasInfinityUnlocked && Math.random() < epicChanceOne) {
	hasInfinityUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Infinity Rune",
        type:     "equipment",
        category: "accessory",
		description: "Allows the Slayer to have unlimited ammo when active.",
      };
      alert("You found a powerful stone-looking object...! (Epic)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }

  if (!hasArgentUnlocked && Math.random() < epicChanceTwo) {
	hasArgentUnlocked = true;
    const freeIdx = player.inventory.findIndex(slot => slot === null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = {
        name:     "Argent Energy Storage",
        type:     "equipment",
        category: "accessory",
		description: "Allows use of the BFG9000.",
      };
      alert("You found a mysterious case with powerful energy surging inside...! (Epic)");
    } else {
      alert("Inventory full...");
    }
    updateStats();
	updateInventoryDisplay();
    return;
  }
}

  // Otherwise 50/50 item vs. money
  if (Math.random() < itemChance) {
    let droppedItem = getLootItem();
    if (droppedItem) {
      const freeIndex = player.inventory.findIndex(slot => slot === null);
      if (freeIndex !== -1) {
        player.inventory[freeIndex] = { ...droppedItem };
        if (droppedItem.type === "equipment") {
          if (droppedItem.name === "Gun" || droppedItem.name === "Ammo Box") {
            alert(`You found a ${droppedItem.name}! (Epic!)`);
			updateStats();
			updateInventoryDisplay();
          } else {
            alert(`You found a ${droppedItem.name}! (Rare)`);
			updateStats();
			updateInventoryDisplay();
          }
        } else {
          alert(`You found a ${droppedItem.name}! (Common)`);
		  updateStats();
		  updateInventoryDisplay();
        }
      } else {
        alert("Inventory full!");
      }
    } else {
      let moneyGained = Math.floor(Math.random() * 51) + 50;
      player.money += moneyGained * Math.round(1 + player.fortune * 0.08);
      alert(`You found some treasure! Earned $${moneyGained * Math.round(1 + player.fortune * 0.08)}!`);
    }
  } else {
    let moneyGained = Math.floor(Math.random() * 51) + 50;
    player.money = Math.round(player.money + moneyGained * Math.round(1 + player.fortune * 0.08));
    alert(`You found some treasure! Earned $${moneyGained * Math.round(1 + player.fortune * 0.08)}!`);
  }
  
  updateStats();
  updateInventoryDisplay();
}

      // Returns a valid loot item. If the drop is an equipment and player already has it, re-run the drop.
      function getLootItem(attempts = 0) {
        // Prevent infinite loops – try up to 5 times.
        if (attempts > 5) return null;
        const randomIndex = Math.floor(Math.random() * shopItemsList.length);
        const item = shopItemsList[randomIndex];
        // If the item is equipment (unique) and the player already has it, try again.
        if (item.type === "equipment" && hasItem(item.name)) {
          return getLootItem(attempts + 1);
        }
        return item;
      }
	  
function applyPlayerStatus(type, duration = null) {
  const s = player.statuses[type];
  if (!s) return;
  s.active = true;
  if (duration !== null) {
    s.turnsLeft = type==='frozen'||type==='asleep'
      ? duration 
      : null;
  }
}
      /*******************
       * MOVEMENT & CAMERA
       *******************/
      function moveToRoom(x, y) {
  const key = x + "_" + y;
  if (!allowedMoves.includes(key) && !player.canRowMovement && y !== player.y - 1 && map[key]) {
    console.log("Invalid move. Please choose one of the newly generated rooms.");
    return;
  }
  
  if (!timerRunning) {
	startTimer();
  }
  // Remove player from old room.
  const oldKey = player.x + "_" + player.y;
  if (map[oldKey]) {
    map[oldKey].element.innerHTML = "";
    if (["battle", "healing", "shop", "boss", "ambush", "loot", "trap", "guild"].includes(map[oldKey].type)) {
      const img = document.createElement("img");
      img.src = roomIcons[map[oldKey].type];
      img.alt = map[oldKey].type;
      img.style.width = "80%";
      map[oldKey].element.appendChild(img);
	  map[oldKey].type = ROOM_TYPES.EMPTY;
    }
  }
  // Update player's position.
  player.x = x;
  player.y = y;
  map[key].element.innerHTML = '<div class="player"></div>';
  centerCamera();
  
  if ((gameDifficulty === "normal" || gameDifficulty === "hard") && ![ ROOM_TYPES.BATTLE, ROOM_TYPES.AMBUSH, ROOM_TYPES.BOSS, ROOM_TYPES.WARRIOR, ROOM_TYPES.SHOP, ROOM_TYPES.CASINO, ROOM_TYPES.ALTAR,  ].includes(map[key].type)) {
	player.exp += 1;
	if (player.exp >= player.expToLevel) {
		levelUp();
    }
  }
  updateStats();
  updateManaDisplay();
  updateInventoryDisplay();

  // Trigger the room event.
  if (map[key].secretAmbush) {
    map[key].secretAmbush = false;
    const img = document.createElement("img");
    img.src = roomIcons[ROOM_TYPES.AMBUSH];
    img.alt = ROOM_TYPES.AMBUSH;
    img.style.width = "80%";
    map[key].element.appendChild(img);
    generateAdjacentRooms(player.x, player.y);
    return;
  }
  
  if (map[key].type === ROOM_TYPES.BATTLE) {
    startBattle();
  } else if (map[key].type === ROOM_TYPES.WARRIOR) {
	  if (gameDifficulty !== "doom") {
		generateAdjacentRooms(player.x, player.y);
		handleWarriorRoom(key);
		return;
	  }
  } else if (map[key].type === ROOM_TYPES.GUILD) {
	if (player.organization === "Cult") {
    const msg = Math.random() < 0.5
      ? "It's a Cult Member! Guards, get them!"
      : "What the hell is the Cult doing out here in the open? Get 'em!";
    alert(msg);
    forceGuildAmbush();
    return;
	} else {
		if (!player.guildUnlocked) {
			showGuildApplicationPrompt();
		} else {
			showGuildMainMenu();
		}
	}
  } else if (map[key].type === ROOM_TYPES.HEALING) {
    healPlayer();
  } else if (map[key].type === ROOM_TYPES.SHOP) {
    shopCooldown = 6;
    shopSound.currentTime = 0;
	if (gameDifficulty !== "doom") {
		shopSound.play();
		if (currentBGM) currentBGM.pause();
	}
	openShopMenu();
  } else if (map[key].type === ROOM_TYPES.BOSS) {
	stopWorldMusic();
	handleBossRoom(key);
  } else if (map[key].type === ROOM_TYPES.ALTAR) {
    initiateLevelUp(3);
  } else if (map[key].type === ROOM_TYPES.CASINO) {
    openCasino(() => finalizeRoom(key));
    return;
  } else if (map[key].type === ROOM_TYPES.CULT) {
    const inGuild = player.organization === "Guild";
  const inCult  = player.organization === "Cult";
  const requiredKills = 100; // or use your CULT_MISSIONS[0], etc.

  if (inGuild) {
    // Guild member stumbles into Cult domain
    const msg = Math.random() < 0.5
      ? "It's the Guild! Guards, get them!"
      : "Who the hell do you think you are? Get 'em boys!";
    alert(msg);
    forceCultAmbush();
    return;
  } else if (inCult) {
    // Already accepted—always show Cult menu
    showCultMainMenu();
	finalizeRoom(key);
    return;
  } else {
    // Not yet worthy: give them a chance (and only now do we do the kill-check logic)
    const choice = confirm(
      "Who are you, and what do you want?\n" +
      "Are you part of the guild or… do you wish to join our cause?\n\n"
    );
    if (!choice) {
      const texts = [
        "So I see... looks like we have something new to sacrifice. Get him!",
        "Hmm, well in that case... Guards!",
        "Then get out of here, foolish human! You are not worthy to join us anyway...",
        "Then get out of here! Get out before I call the guards!"
      ];
      const t = texts[Math.floor(Math.random() * texts.length)];
      alert(t);
      if (t.startsWith("So I see") || t.startsWith("Hmm,")) {
        forceCultAmbush();
      } else {
        finalizeRoom(key);
      }
    } else {
		alert("Hmm...");
      if (player.monsterKills >= requiredKills) {
    // Automatically accept once you have enough kills
    alert("I see... welcome to the Clan then, my boy!");
    player.organization = "Cult";
	player.cultUnlocked = true;
    player.cultMissionStage = 0;
    showCultMainMenu();
	finalizeRoom(key);
    return;
	  } else {
    alert("I'm sorry, but you are not worthy. Maybe in another universe, my boy.");
    finalizeRoom(key);
	  }
    }
    return;
  }
  } else if (map[key].type === ROOM_TYPES.AMBUSH) {
		generateAdjacentRooms(player.x, player.y);
		startAmbushBattle(() => finalizeRoom(key));
		return;
  } else if (map[key].type === ROOM_TYPES.LOOT) {
    handleLootRoom();
  } else if (map[key].type === ROOM_TYPES.TRAP) {
    handleTrapRoom();
  }

  
  if (player.statuses.poisoned) {
    const dmg = Math.ceil(player.maxHP * 0.02);
    player.currentHP = Math.max(0, player.currentHP - dmg);
    // optionally: show floating text “–X HP (Poison)”
  }
  if (player.statuses.burned) {
    const dmg = Math.ceil(player.maxHP * 0.02);
    player.currentHP = Math.max(0, player.currentHP - dmg);
  }
  
  // Finalize the room if none of the above events delay room completion.
  finalizeRoom(key);
}

function finalizeRoom(key) {
  map[key].type = ROOM_TYPES.EMPTY;
  map[key].element.innerHTML = "";

  player.x = parseInt(key.split("_")[0], 10);
  player.y = parseInt(key.split("_")[1], 10);
  map[key].element.innerHTML = '<div class="player"></div>';
  centerCamera();
  if (allowedMoves.includes(key)) {
    roomMoves++;
    roomsThisFloor++;
    if (roomsThisFloor >= 3) {
      floorCount++;
      roomsThisFloor = 0;
      bossRoomGenerated = false;
    }
  }
  generateAdjacentRooms(player.x, player.y);
  updateBackgroundColor();
}

      function centerCamera() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = centerX - player.x * roomSize - roomSize / 2;
        const offsetY = centerY - player.y * roomSize - roomSize / 2;
        mapDiv.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
      /*******************
       * ROOM EFFECTS
       *******************/
      function healPlayer() {
        const effMaxHp = Math.floor(getEffectiveMaxHp());
		if (gameDifficulty === "normal" || gameDifficulty === "hard" || gameDifficulty === "ultimate") {
			player.hp = player.hp + Math.floor(effMaxHp * 0.5);
			if (player.hp > effMaxHp) {
				player.hp = effMaxHp;
			}
		} else if (gameDifficulty === "extreme" || gameDifficulty === "insane" || gameDifficulty === "calamity" || gameDifficulty === "doom") {
			player.hp = player.hp + Math.floor(effMaxHp * 0.25);
			if (player.hp > effMaxHp) {
				player.hp = effMaxHp;
			}
		} else {
			player.hp = effMaxHp;
		}
		['burned','poisoned','paralyzed','weakened'].forEach(s => player.statuses[s] = false);
		updatePlayerStatusUI();
		player.mana = player.maxMana
        updateStats();
		updateManaDisplay();
      }
	  
	  /*******************
       * CULT SHIT
       *******************/

function forceCultAmbush(key) {
  // Mark we used a skill, switch music
  skillUsedThisBattle = true;
  stopWorldMusic();
  warriorTrack.play();

  // Clear & show log + tint
  battleLog.innerHTML     = "";
  battleLog.style.display = "block";
  battleTint.style.display= "block";

  // Build 2–3 Cult Member clones
  ambushEnemiesQueue = [];
  const count = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    ambushEnemiesQueue.push({
      name:        "Cult Member",
      hp:          player.maxHp,
      maxHp:       player.maxHp,
      damageRange: [player.attack, player.magic],
      expReward:   player.level,
      moneyReward: player.level,
      poison:      false,
      frozen:      0,
      burned:      false,
      weaken:      false,
      paralyzed:   false,
      asleep:      0,
      boss:        true
    });
  }
  ambushCompleteCallback = () => {
    finalizeRoom(key);
    // regenerate the four neighboring rooms
    generateAdjacentRooms(player.x, player.y);
  };
  // Kick off the first wave
  startNextAmbush();
}

/**
 * Starts a Guild ambush: 2–3 Warriors in a row.
 */
function forceGuildAmbush(key) {
  skillUsedThisBattle = true;
  stopWorldMusic();
  warriorTrack.play();

  battleLog.innerHTML     = "";
  battleLog.style.display = "block";
  battleTint.style.display= "block";

  ambushEnemiesQueue = [];
  const count = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    ambushEnemiesQueue.push({
      name:        "Warrior",
      hp:          player.maxHp,
      maxHp:       player.maxHp,
      damageRange: [player.attack, player.magic],
      expReward:   player.level,
      moneyReward: player.level,
      poison:      false,
      frozen:      0,
      burned:      false,
      weaken:      false,
      paralyzed:   false,
      asleep:      0,
      boss:        true
    });
  }
  ambushCompleteCallback = () => {
    finalizeRoom(key);
    // regenerate the four neighboring rooms
    generateAdjacentRooms(player.x, player.y);
  };
  startNextAmbush();
}

function startNextAmbush() {
  if (ambushEnemiesQueue.length === 0) {
    // all waves done
    battleTint.style.display = "none";
    return;
  }

  // 1) Pop next enemy
  currentEnemy = ambushEnemiesQueue.shift();

  // 2) Randomize its level around the player’s
  const minLv = Math.max(player.level - 2, 1);
  const maxLv = player.level + 2;
  const lvl   = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
  currentEnemy.level = lvl;

  // 3) Scale HP by ~5% per level difference
  if (currentEnemy.baseMaxHp === undefined) {
    currentEnemy.baseMaxHp = currentEnemy.hp;
  }
  const scale = 1 + 0.05 * (lvl - player.level);
  const newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
  currentEnemy.hp    = newHp;
  currentEnemy.maxHp = newHp;

  // 4) Reset log & statuses
  battleLog.innerHTML = "";
  // (If you clear status icons separately, do it here.)

  // 5) Show UI & enable actions
  battleTint.style.display    = "block";
  updateEnemyInfo();           // draws name, HP bar, statuses… :contentReference[oaicite:0]{index=0}
  battleMenu.style.display    = "block";
  unlockActions();             // Attack/Magic/Items…
}

function onEnemyDefeated() {
  if (ambushEnemiesQueue.length > 0) {
    startNextAmbush();
  } else {
	if (player.organization === "Cult") {
		alert(`You defeated the Guild Warriors! You report to the Cult of your achievement.`);
		endBattle();
	} else {
		alert(`You defeated the Cultists! You report to the Guild for them to take care of the rest.`);
		endBattle();
	}
	finalizeRoom(key);
  }
}

function showCultMainMenu() {
  updateCultRankUI();

  // 3) Display the Cult menu + tint
  const cultMenu = document.getElementById("cultMenu");
  cultMenu.style.display = "block";
  battleTint.style.display = "block";

  // 4) Wire up the buttons inside the menu
  document.getElementById("closeCultMenu").onclick = () => {
    cultMenu.style.display = "none";
    battleTint.style.display = "none";
  };
  document.getElementById("cultMissionButton").onclick = () => {
    handleCultMission();
  };
}

const CULT_RANKS = [
  "Potential Sacrifice","Follower","Disciple",
  "Zealot","Elder","Prophet","Priest","Grand Priest"
];
const CULT_MISSIONS = [1, 3, 5, 10, 20, 30, 50];
const CULT_BONUSES = [
  { luck:1, fortune:1, potential:1, maxMana:0 },
  { luck:2, fortune:2, potential:2, maxMana:10 },
  { luck:3, fortune:3, potential:3, maxMana:25 },
  { luck:5, fortune:5, potential:5, maxMana:30 },
  { luck:7, fortune:7, potential:7, maxMana:50 },
  { luck:10, fortune:10, potential:10, maxMana:75 },
  { luck:20, fortune:20, potential:20, maxMana:100 }
];

function getCultRank() {
  return CULT_RANKS[player.cultMissionStage];
}
function updateCultRankUI() {
  document.getElementById("guildRankText").innerText = "Rank: " + getCultRank();
}
function getCurrentCultRequirement() {
  return CULT_MISSIONS[player.cultMissionStage - 1] || 50;
}

function handleCultMission() {
  if (player.cultMissionStage > 0 && player.cultKills < getCurrentCultRequirement()) {
    alert("Complete your current objective.");
    return;
  }
  if (player.cultMissionStage > 0 && player.cultKills >= getCurrentCultRequirement()) {
    if (player.cultMissionStage === CULT_MISSIONS.length) {
      alert("You have completed all objectives!");
      return;
    }
    // reward
	const req   = getCurrentCultRequirement();
    const idx   = player.cultMissionStage - 1;
    const bonus = CULT_BONUSES[idx];
    Object.assign(player, {
      luck: player.luck + bonus.luck,
      fortune: player.fortune + bonus.fortune,
      potential: player.potential + bonus.potential,
      maxMana: player.maxMana + bonus.maxMana,
    });
    player.cultKills = 0;
    player.cultMissionStage++;
    updateCultRankUI();
    setCultMissionUI();
	updateStats();
	updateManaDisplay();
	updatePlayerStatsUI();
	updatePlayerStatusUI();
    return;
  }
  if (player.cultMissionStage === 0 && player.cultKills === 0) {
    player.cultMissionStage = 1;
    setCultMissionUI();
  }
}
	
function setCultMissionUI() {
  const hud = document.getElementById("cultMissionDisplay");
  const req  = getCurrentCultRequirement();
  hud.innerHTML = `<p>Objective: Hunt ${req} warriors</p><p id="cultMissionCounter">${player.cultKills}/${req}</p>`;
  hud.style.display = "block";
}

function updateCultMissionProgress() {
  if (!player.cultUnlocked || player.cultMissionStage === 0) return;
  player.cultKills++;
  let req = getCurrentCultRequirement();
  let counterEl = document.getElementById("cultMissionCounter");
  if (player.cultKills >= req) {
    counterEl.innerText = "Objective Completed!";
    updateGuildRankUI();
  } else {
    counterEl.innerText = `${player.cultKills}/${req}`;
  }
}	
	  /*******************
       * GUILD SHIT
       *******************/
	  
function showGuildApplicationPrompt() {
  let input = prompt("Welcome to the Guild! Please pay $500 if you wish to apply!");
  // If the player cancels or inputs nothing, assume they’re choosing to leave.
  if (input === null) {
    alert("We hope you reconsider applying!");
    return;
  }
  let amount = Number(input);
  if (isNaN(amount) || amount < 500) {
     alert("You do not have the requirement to apply, please return when you do.");
	 return;
  }
  
  if (amount >= 500) {
	player.money -= 500;
	alert("Thank you for applying. Welcome to the Guild!");
	player.guildUnlocked = true;
	player.organization = "Guild";
    showGuildMainMenu();
  }
}

function getGuildRank() {
  let ranks = ["Newbie", "Rookie", "Amateur", "Journeyman", "Pro", "Veteran", "Master", "Grandmaster"];
  return ranks[player.guildMissionStage] || "Grandmaster";
}

function updateGuildRankUI() {
  // update every occurrence of the guild‑rank text (HUD + guild modal)
  const els = document.querySelectorAll('#guildRankText');
  els.forEach(el => {
    if (!player.guildUnlocked) {
      el.innerText = "Rank: None";
    } else {
      el.innerText = getGuildRank();
    }
  });
}

function getGuildBonuses() {
  const guildBonus = [
    { damage: 0.00, hp: 0.00 },
    { damage: 0.05, hp: 0.05 },
    { damage: 0.07, hp: 0.10 },
    { damage: 0.10, hp: 0.15 },
    { damage: 0.12, hp: 0.20 },
    { damage: 0.15, hp: 0.25 },
    { damage: 0.20, hp: 0.35 },
    { damage: 0.25, hp: 0.50 }
  ];
  // Ensure that player.guildMissionStage falls within the array bounds.
  let index = player.guildMissionStage;
  if (index < 0) index = 0;
  if (index >= guildBonus.length) index = guildBonus.length - 1;
  return guildBonus[index];
}

function showGuildMainMenu() {
  // Make sure the guild menu (defined in your HTML) is visible, and update its rank text
  const guildMenu = document.getElementById("guildMenu");
  updateGuildRankUI();

  const hireMercenaryBtn = document.getElementById("hireMercenaryButton");
  const closeBtn = document.getElementById("closeGuildMenu");

  // Remove any existing event listeners by reassigning the onclick properties
  document.getElementById("missionButton").onclick = handleMission;
  hireMercenaryBtn.onclick = handleHireMercenary;
  closeBtn.onclick = function() {
    guildMenu.style.display = "none";
	document.getElementById("battleTint").style.display = "none";
  };

  // Display the guild menu.
  guildMenu.style.display = "block";
  document.getElementById("battleTint").style.display = "block";
}

function getCurrentMissionRequirement() {
  let requirements = [5, 10, 20, 30, 50, 100, 200];
  return requirements[player.guildMissionStage - 1] || 200;
}

function setMissionUI() {
  // Assume you use the #missionDisplay element (already present in your HTML)
  let missionDisplay = document.getElementById("missionDisplay");
  let req = getCurrentMissionRequirement();
  missionDisplay.innerHTML = `<p>Mission: Hunt ${req} enemies</p><p id="missionCounter">0/${req}</p>`;
  missionDisplay.style.display = "block";
}

function handleMission() {
  // If a mission is in progress but incomplete, do not allow a new one to start.
  if (player.guildMissionStage > 0 && player.guildMissionKills < getCurrentMissionRequirement()) {
    alert("Complete your current task!");
    return;
  }
  
  // If a mission was just completed...
  if (player.guildMissionStage > 0 && player.guildMissionKills >= getCurrentMissionRequirement()) {
    if (player.guildMissionStage === 7) {
      alert("You have completed all missions!");
      return;
    }
    let req = getCurrentMissionRequirement();
    let expReward = req * 2 * (Math.round(1 + player.potential * 0.08));
    let moneyReward = req * 5 * Math.round(1 + player.fortune * 0.08);
    alert(`Mission Completed! You gained ${expReward} EXP and $${moneyReward}.`);
    player.exp = Math.round(player.exp + expReward);
    player.money = Math.round(player.money + moneyReward);
    player.guildMissionStage++;
    player.guildMissionKills = 0;
	setMissionUI();
    updateGuildRankUI();
    document.getElementById("guildRankText").innerText = "Rank: " + getGuildRank();
    return;
  }
  
  // If no mission has been started yet:
  if (player.guildMissionStage === 0 && player.guildMissionKills === 0) {
    player.guildMissionStage = 1;  // start first mission
    setMissionUI();
  }
}

function updateGuildMissionProgress() {
  if (!player.guildUnlocked || player.guildMissionStage === 0) return;
  player.guildMissionKills++;
  let req = getCurrentMissionRequirement();
  let counterEl = document.getElementById("missionCounter");
  if (player.guildMissionKills >= req) {
    counterEl.innerText = "Mission Completed!";
    updateGuildRankUI();
  } else {
    counterEl.innerText = `${player.guildMissionKills}/${req}`;
  }
}

function handleHireMercenary() {
  // Prompt the player for hiring a mercenary.
  let choice = confirm("Hire Mercenary for $200? Press OK to pay, Cancel for Nevermind.");
  if (!choice) {
    return;
  }
  if (player.money < 200) {
    alert("You do not have enough money.");
    return;
  }
  player.money -= 200;
  player.mercenaries.push(createMercenary());
  alert("Mercenary hired!");
}

function createMercenary() {
  return {
    // Base damage is half the player's current attack.
    baseDamage: player.attack / 2,
    critChance: 0.10,
    dodgeChance: 0.5,
  };
}

      /*******************
       * BATTLE MECHANICS
       *******************/
      const enemyDodgeChance = 0.05;
	  
      function startBattle() {
		preBattleStats = {
			attack:        player.attack,
			magic:        player.magic,
			defense:      player.defense,
			agility:       player.agility,
			perception:   player.perception,
			critMultiplier: player.critMultiplier,
			critChance:    player.critChance || 0,
		};
		player.weaponSkill.usedThisBattle = false;
		skillUsedThisBattle = true;
        battleLog.innerHTML = "";
        battleLog.style.display = "block";
        battleTint.style.display = "block";
		turnNumber = 1;
		logBattle("----------Turn " + turnNumber + "----------");
		unlockActions();
        let allowedEnemies = getAllowedEnemies();
        currentEnemy = JSON.parse(JSON.stringify(allowedEnemies[Math.floor(Math.random() * allowedEnemies.length)]));
		let floorBoost = 1 + floorCount * 0.1;
	    let floorBonus = Math.max( Math.floor((floorCount / 10) * floorBoost), 1 );

if (gameDifficulty === "normal") {
    currentEnemy.hp = Math.ceil(currentEnemy.hp * floorBonus) + Math.ceil(10 * floorBonus * (player.level / floorCount));
    currentEnemy.damageRange = [
        Math.ceil(currentEnemy.damageRange[0] + 2 * floorBonus * (player.level / floorCount)),
        Math.ceil(currentEnemy.damageRange[1] + 2 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "hard") {
    currentEnemy.hp = Math.ceil(currentEnemy.hp * floorBonus) + Math.ceil(15 * floorBonus * (player.level / floorCount));
    currentEnemy.damageRange = [
        Math.ceil(currentEnemy.damageRange[0] + 2 * floorBonus * (player.level / floorCount)),
        Math.ceil(currentEnemy.damageRange[1] + 2 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "extreme") {
    currentEnemy.hp = Math.ceil(currentEnemy.hp * floorBonus) + Math.round(15 * floorBonus * (player.level / floorCount));
    currentEnemy.damageRange = [
        currentEnemy.damageRange[0] + Math.round(3 * floorBonus * (player.level / floorCount)),
        currentEnemy.damageRange[1] + Math.round(3 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "insane" && gameDifficulty === "doom") {
	currentEnemy.hp = Math.ceil(currentEnemy.hp * floorBonus) + Math.round(20 * floorBonus * (player.level / floorCount));
    currentEnemy.damageRange = [
        currentEnemy.damageRange[0] + Math.round(3 * floorBonus * (player.level / floorCount)),
        currentEnemy.damageRange[1] + Math.round(3 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "ultimate") {
	currentEnemy.hp = Math.ceil(currentEnemy.hp * floorBonus) + Math.round(30 * floorBonus * (player.level / floorCount));
    currentEnemy.damageRange = [
        currentEnemy.damageRange[0] + Math.round(5 * floorBonus * (player.level / floorCount)),
        currentEnemy.damageRange[1] + Math.round(5 * floorBonus * (player.level / floorCount))
    ];
} else {
	currentEnemy.hp = Math.ceil(currentEnemy.hp * floorBonus) + Math.round(25 * floorBonus * (player.level / floorCount));
    currentEnemy.damageRange = [
        currentEnemy.damageRange[0] + Math.round(4 * floorBonus * (player.level / floorCount)),
        currentEnemy.damageRange[1] + Math.round(4 * floorBonus * (player.level / floorCount))
    ];
}
        let rewardMultiplier = Math.pow(1.5, floorBonus);
        currentEnemy.expReward = [currentEnemy.expReward[0] * rewardMultiplier, currentEnemy.expReward[1] * rewardMultiplier];
        currentEnemy.moneyReward = [currentEnemy.moneyReward[0] * rewardMultiplier, currentEnemy.moneyReward[1] * rewardMultiplier];
        currentEnemy.poison = false;
		currentEnemy.frozen = 0;
		currentEnemy.burned = false;
        currentEnemy.weaken = false;
		currentEnemy.paralyzed = false;
		currentEnemy.asleep = 0;
        player.rage = false;
        player.iron = false;
        const minLv = Math.max(player.level - 3, 1);
        const maxLv = player.level + 5;
        const enemyLevel = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
        currentEnemy.level = enemyLevel;
        if (currentEnemy.baseMaxHp === undefined) {
          currentEnemy.baseMaxHp = currentEnemy.hp;
        }
        const levelDiff = enemyLevel - player.level;
        const scale = 1 + 0.05 * levelDiff;
        const newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
        currentEnemy.hp = currentEnemy.maxHp = newHp;
        updateEnemyInfo();
        battleMenu.style.display = "block";
      }
	  
	  function handleWarriorRoom(key) {
  // 1. Prompt the player
  let fight = confirm(
    "You encountered another Warrior! What do you do?\n\n" +
    "Press OK to Fight, or Cancel to Pass by."
  );

  // helper to kick off the battle
  function startWarriorBattle(nameOverride) {
	skillUsedThisBattle = true;
	// stop any world music
	stopWorldMusic();
	// play warrior theme
	warriorTrack.play();
    // show battle log + tint
    battleLog.innerHTML     = "";
    battleLog.style.display = "block";
    battleTint.style.display= "block";

    // build the mimic Warrior
    const warrior = {
      name:        nameOverride || "Warrior",
      hp:          player.maxHp,
      maxHp:       player.maxHp,
      damageRange: [ player.attack, player.magic ],
      expReward:   player.level,
      moneyReward: player.level,
      poison:      false,
	  frozen:      0,
	  burned:      false,
      weaken:      false,
	  paralyzed:   false,
	  asleep:      0,
      boss:        true,
    };
    // launch via ambush flow
    ambushEnemiesQueue = [ warrior ];
    currentEnemy        = ambushEnemiesQueue.shift();
    const minLv = Math.max(player.level - 3, 1);
        const maxLv = player.level + 5;
        const enemyLevel = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
        currentEnemy.level = enemyLevel;
        if (currentEnemy.baseMaxHp === undefined) {
          currentEnemy.baseMaxHp = currentEnemy.hp;
        }
        const levelDiff = enemyLevel - player.level;
        const scale = 1 + 0.05 * levelDiff;
        const newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
        currentEnemy.hp = currentEnemy.maxHp = newHp;
        // ───────────────────────────────────────────────────────────────
    updateEnemyInfo();
    battleMenu.style.display = "block";
    unlockActions();
  }
  
  let alias = "Warrior";

  if (fight) {
    // player chose to fight
    startWarriorBattle();
  } else {
    // passing by: 10% chance they still attack
    const fightChance = player.organization==="Cult" ? 0.5 : 0.15;
	if (Math.random() < fightChance) {
		// name alias distribution
		const r2 = Math.random();
		if (player.organization==="Cult") {
			if (r2 < 0.67) alias="Warrior";
			else if (r2 < 0.835) alias="Outlaw";
			else alias="Bandit";
		} else {
			// original 40/40/20 split
			if (r2 < 0.4) alias="Outlaw";
			else if (r2 < 0.8) alias="Bandit";
			else alias="Cult Member";
		}
		alert(`The ${alias} attacked you anyway!`);
		startWarriorBattle(alias);
	} else {
		finalizeRoom(key);
	}
  }
  
  ambushCompleteCallback = () => {
      let spare = confirm(`You have defeated the ${alias}, spare them?`);
	  if (player.organization==="Cult") {
		alert(`You have defeated the ${alias}! You report to the Cult about your achievement.`);
		finalizeRoom(key);
      } else {
		if (spare) {
			if (Math.random() < 0.33) {
				alert("They join you as a mercenary!");
				player.mercenaries.push(createMercenary());
				finalizeRoom(key);
			} else {
				alert("They thank you and leave.");
				finalizeRoom(key);
				ambushCompleteCallback = null;
			}
			finalizeRoom(key);
			ambushCompleteCallback = null;
		} else {
			finalizeRoom(key);
			ambushCompleteCallback = null;
		}
	  }
	  ambushCompleteCallback = null;
  };
}

function handleBossRoom(key) {
  const floor = floorCount;

  // === 1) GLOBAL SKIP: No bosses ever in doom or bossRush modes ===
  if (gameDifficulty === "doom" || gameDifficulty === "bossRush") {
    // Just clear the room and move on—no boss fight
    startBossBattle(() => finalizeRoom(key));
    generateAdjacentRooms(player.x, player.y);
    return;
  }

  // === 2) SKIP AMBUSH on special floors 820, 920, 940 ===
  const skipAmbushFloors = [820, 920, 940];
  if (skipAmbushFloors.includes(floor)) {
    // Directly start the boss, no minions
    startBossBattle(() => finalizeRoom(key));
    generateAdjacentRooms(player.x, player.y);
    return;
  }

  // === 3) NORMAL FLOW: Check for a bossQueue ambush ===
  const queueNames = bossQueues[floor] || [];
  if (Array.isArray(queueNames) && queueNames.length > 0) {
    // Flavor alert
    alert("You manage to find the Boss room, however, a few of its minions stand in your way.");

    // Build ambush queue
    ambushEnemiesQueue = queueNames.map(name => {
      const template = enemies.find(e => e.name === name);
      if (!template) {
        console.warn(`Unknown enemy “${name}” in bossQueues[${floor}]`);
        return {...getDummyEnemy(name)};
      }
      return JSON.parse(JSON.stringify(template)); // deep copy
    });

    // When ambush clears, kick off boss battle
    ambushCompleteCallback = () => {
      startBossBattle(() => finalizeRoom(key));
      generateAdjacentRooms(player.x, player.y);
    };

    startNextAmbush();
    return;
  }

  // === 4) NO QUEUE? Final boss directly ===
  startBossBattle(() => finalizeRoom(key));
  generateAdjacentRooms(player.x, player.y);
}

// Helper for dummy fallback (you can keep your original if you prefer)
function getDummyEnemy(name) {
  return {
    name,
    hp: 1, maxHp: 1,
    damageRange: [1,1],
    expReward: [0,0],
    moneyReward: [0,0],
    poison: false, frozen: 0, burned: false,
    weaken: false, paralyzed: false, asleep: 0,
    boss: true
  };
}

      function startBossBattle(onComplete) {
  let bossTemplate = getBossForFloor(floorCount);
  let bossData = JSON.parse(JSON.stringify(bossTemplate));
  currentEnemy = JSON.parse(JSON.stringify(bossData));
  if (currentEnemy === "The Restricted One, Kyojiro Allista") {
	  alert("You have entered a Boss Room... but wait, a Mysterious Man stands in your way.");
  } else if (currentEnemy === "Omni") {
	  alert("You sense a powerful presence, be careful.");
	  alert("''Greetings human, we finally meet. Shall we begin the test?''");
  } else if (currentEnemy === "Six-Eyed Calamity") {
	  alert("Between the Heavens and the Earth, you can sense the Honoured One.");
  } else if (currentEnemy === "The King of Curses") {
	  alert("The Strongest of the Heian era himself, Ryomen Sukuna, sits on a throne in front of you.");
  } else if (currentEnemy === "Island Turtle") {
	  alert("You reach the top of the island as you gaze at the magnificent view of the ocean around you, taking a breath of achievement.");
	  alert("You take the moment to think that despite the chaotic state the world is in right now, beautiful things such as this still exist to make up for it.");
	  alert("Suddenly, the ground below you shakes as you fall and tumble down the hill, right back to shore where you fortunately land back on your boat.");
	  alert("You get back up and look up as an enraged, gigantic turtle stares down at you.");
  } else if (currentEnemy === "The World Serpent, Jörmungandr") {
	  alert("You stop your boat to gaze at one hell of a sight. An enormous serpent, probably long enough to encircle the planet, resting right beside the river.");
	  alert("You then freeze in place as you realize the serpent's head is right behind you, breathing on you. You turn to see it staring right down at you as it begins to move.");
	  alert("It raises its head and roars, as it initiates a battle.");
  } else if (currentEnemy === "Demon God") {
	  alert("You finally find the Gates of Hell, the exit to this hellhole... literally. However, a huge, powerful entity stands in your way once more.");
	  alert("The monster's presence is almost familiar, similar to that god you faced before, but you stand your ground as you prepare to battle once more.");
  } else if (currentEnemy === "The Black King") {
	  alert("You get the feeling you are about to die... but you go anyway.");
	  alert("You have entered a Boss Room. Be careful.");
  } else if (currentEnemy === "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel") {
	  alert("After everything you've been through, it's finally time. All of your effort, your struggles, and your victories, has come to this one moment. Good luck, warrior.");
  } else {
	  alert("You have entered a Boss Room. Be careful.");
  }
  player.weaponSkill.usedThisBattle = false;
  skillUsedThisBattle = true;
  if (gameDifficulty !== "doom") {
	stopWorldMusic();
	if (currentEnemy === "Omni") {
	  stopWorldMusic();
	  omniTrack.play();
	} else if (currentEnemy === "Six-Eyed Calamity") {
	  stopWorldMusic();
	  secTrack.play();
	} else if (currentEnemy === "The King of Curses") {
	  stopWorldMusic();
	  kocTrack.play();
	} else if (currentEnemy === "The Black King") {
	  stopWorldMusic();
	  bkTrack.play();
	} else if (currentEnemy === "The Restricted One, Kyojiro Allista") {
	  stopWorldMusic();
	  troTrack.play();
	} else if (currentEnemy === "Demon God") {
	  stopWorldMusic();
	  dkTrack.play();
	} else if (currentEnemy === "Warden of Judgement, Will, And Balance") {
	  stopWorldMusic();
	  semiTrack.play();
	} else if (currentEnemy === "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel") {
	  stopWorldMusic();
	  godTrack.play();
	} else {
	  stopWorldMusic();
	  bossTrack.play();
	}
  }
  ambushCompleteCallback = onComplete || null;
  bossTemplate = getBossForFloor(floorCount);
  
  if (gameDifficulty === "doom") {
    // lock BGM to Hell
    stopWorldMusic();
    if (bossTemplate.name === "The Dark Lord, Davoth") {
      dkTrack.currentTime = 0;
      dkTrack.play();
    } else if (bgmTracks["Hell"]) {
      bgmTracks["Hell"].audio.loop = true;
      bgmTracks["Hell"].audio.play();
    }
    // Clone it so we don’t mangle the template
    bossData = JSON.parse(JSON.stringify(bossTemplate));

    // Apply your usual floor‐scaling (same as normal)
    const floorBoost = 1 + floorCount * 0.1;
    const floorBonus = Math.max(Math.floor((floorCount / 10) * floorBoost), 1);

    bossData.hp += Math.round(25 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
      bossData.damageRange[0] + Math.round(4 * floorBonus * (player.level / floorCount)),
      bossData.damageRange[1] + Math.round(4 * floorBonus * (player.level / floorCount))
    ];

    const rewardMultiplier = Math.pow(1.5, floorBonus);
    bossData.expReward = [bossData.expReward[0] * rewardMultiplier, bossData.expReward[1] * rewardMultiplier];
    bossData.moneyReward = [bossData.moneyReward[0] * rewardMultiplier, bossData.moneyReward[1] * rewardMultiplier];

    // Finalize currentEnemy
    currentEnemy.boss  = true;
    currentEnemy.poison = false;
    currentEnemy.burned = false;
    currentEnemy.frozen = 0;
    currentEnemy.weaken = false;
	currentEnemy.paralyzed = false;
	currentEnemy.asleep = 0;
    currentEnemy.maxHp  = currentEnemy.hp;

    // Show battle UI
    let bossLevel = player.level + 10;
	currentEnemy.level = bossLevel;
	if (currentEnemy.baseMaxHp === undefined) {
		currentEnemy.baseMaxHp = currentEnemy.hp;
	}
	let levelDiff = bossLevel - player.level;
	let scale = 1 + (0.05 * levelDiff);
	let newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
	currentEnemy.hp    = newHp;
	currentEnemy.maxHp = newHp;
    updateEnemyInfo();
    battleLog.innerHTML      = "";
    battleLog.style.display  = "block";
    battleTint.style.display = "block";
    battleMenu.style.display = "block";

    // Kick off first enemy turn
    setTimeout(enemyTurnWrapper, 250);
    return;
  } else {
  let floorBoost = 1 + floorCount * 0.1;
  let floorBonus = Math.max( Math.floor((floorCount / 10) * floorBoost), 1 );
  let bossData = getBossForFloor(floorCount);
  
  if (gameDifficulty === "normal") {
    bossData.hp = bossData.hp + Math.ceil(25 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
        Math.ceil(bossData.damageRange[0] + 2 * floorBonus * (player.level / floorCount)),
        Math.ceil(bossData.damageRange[1] + 2 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "hard") {
    bossData.hp = bossData.hp + Math.ceil(30 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
        Math.ceil(bossData.damageRange[0] + 2 * floorBonus * (player.level / floorCount)),
        Math.ceil(bossData.damageRange[1] + 2 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "extreme") {
    bossData.hp = bossData.hp + Math.round(30 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
        bossData.damageRange[0] + Math.round(3 * floorBonus * (player.level / floorCount)),
        bossData.damageRange[1] + Math.round(3 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "insane") {
	bossData.hp = bossData.hp + Math.round(35 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
        bossData.damageRange[0] + Math.round(3 * floorBonus * (player.level / floorCount)),
        bossData.damageRange[1] + Math.round(3 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "ultimate") {
	bossData.hp = bossData.hp + Math.round(60 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
        bossData.damageRange[0] + Math.round(5 * floorBonus * (player.level / floorCount)),
        bossData.damageRange[1] + Math.round(5 * floorBonus * (player.level / floorCount))
    ];
} else {
	bossData.hp = bossData.hp + Math.round(40 * floorBonus * (player.level / floorCount));
    bossData.damageRange = [
        bossData.damageRange[0] + Math.round(4 * floorBonus * (player.level / floorCount)),
        bossData.damageRange[1] + Math.round(4 * floorBonus * (player.level / floorCount))
    ];
}

  let rewardMultiplier = Math.pow(1.5, floorBonus);
	bossData.expReward   = [
		bossData.expReward[0] * rewardMultiplier,
		bossData.expReward[1] * rewardMultiplier
	];
	bossData.moneyReward = [
		bossData.moneyReward[0] * rewardMultiplier,
		bossData.moneyReward[1] * rewardMultiplier
	];
  currentEnemy = JSON.parse(JSON.stringify(bossData));
  currentEnemy.boss = true;
  currentEnemy.poison = false;
  currentEnemy.burned = false;
  currentEnemy.frozen = 0;
  currentEnemy.weaken = false;
  currentEnemy.maxHp = currentEnemy.hp;
  player.rage = false;
  player.iron = false;
  bossLevel = player.level + 10;
	currentEnemy.level = bossLevel;
	if (currentEnemy.baseMaxHp === undefined) {
		currentEnemy.baseMaxHp = currentEnemy.hp;
	}
	levelDiff = bossLevel - player.level;
	scale = 1 + (0.05 * levelDiff);
	newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
	currentEnemy.hp    = newHp;
	currentEnemy.maxHp = newHp;
  updateEnemyInfo();
  battleMenu.style.display = "block";
  
  battleLog.innerHTML = "";
  battleLog.style.display = "block";
  battleTint.style.display = "block";

  // Instead of simply unlocking actions, call the enemy turn wrapper after a delay
  setTimeout(enemyTurnWrapper, 250);
  }
	  }
  
      /*******************
       * AMBUSH BATTLE SYSTEM
       *******************/
      function startAmbushBattle(onComplete) {
  // store the finalizeRoom callback
  player.weaponSkill.usedThisBattle = false;
  skillUsedThisBattle = true;
  ambushCompleteCallback = onComplete || null;
  if (gameDifficulty !== "doom") {
    stopWorldMusic();
	ambushTrack.play();
  }
  battleLog.innerHTML = "";
  battleLog.style.display = "block";
  battleTint.style.display = "block";
  alert("You were ambushed!");

  // spawn 2–6 enemies
  const minEnemies = 2, maxEnemies = 6;
  const enemyCount = Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies; 
  ambushEnemiesQueue = [];

  for (let i = 0; i < enemyCount; i++) {
    const allowed = getAllowedEnemies();
    const e = JSON.parse(JSON.stringify(
      allowed[Math.floor(Math.random() * allowed.length)]
    ));
    let floorBoost = 1 + floorCount * 0.1;
	let floorBonus = Math.max( Math.floor((floorCount / 10) * floorBoost), 1 );

if (gameDifficulty === "normal") {
    e.hp = Math.ceil(e.hp * floorBonus) + Math.ceil(10 * floorBonus * (player.level / floorCount));
    e.damageRange = [
        Math.ceil(e.damageRange[0] + 2 * floorBonus * (player.level / floorCount)),
        Math.ceil(e.damageRange[1] + 2 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "hard") {
    e.hp = Math.ceil(e.hp * floorBonus) + Math.ceil(15 * floorBonus * (player.level / floorCount));
    e.damageRange = [
        Math.ceil(e.damageRange[0] + 2 * floorBonus * (player.level / floorCount)),
        Math.ceil(e.damageRange[1] + 2 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "extreme" && gameDifficulty === "doom") {
    e.hp = Math.ceil(e.hp * floorBonus) + Math.round(15 * floorBonus * (player.level / floorCount));
    e.damageRange = [
        e.damageRange[0] + Math.round(3 * floorBonus * (player.level / floorCount)),
        e.damageRange[1] + Math.round(3 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "insane") {
	e.hp = Math.ceil(e.hp * floorBonus) + Math.round(20 * floorBonus * (player.level / floorCount));
    e.damageRange = [
        e.damageRange[0] + Math.round(3 * floorBonus * (player.level / floorCount)),
        e.damageRange[1] + Math.round(3 * floorBonus * (player.level / floorCount))
    ];
} else if (gameDifficulty === "ultimate") {
	e.hp = Math.ceil(e.hp * floorBonus) + Math.round(30 * floorBonus * (player.level / floorCount));
    e.damageRange = [
        e.damageRange[0] + Math.round(5 * floorBonus * (player.level / floorCount)),
        e.damageRange[1] + Math.round(5 * floorBonus * (player.level / floorCount))
    ];
} else {
	e.hp = Math.ceil(e.hp * floorBonus) + Math.round(25 * floorBonus * (player.level / floorCount));
    e.damageRange = [
        e.damageRange[0] + Math.round(4 * floorBonus * (player.level / floorCount)),
        e.damageRange[1] + Math.round(4 * floorBonus * (player.level / floorCount))
    ];
}

	const mult = Math.pow(1.5, floorBonus);
    e.expReward   = [e.expReward[0]   * mult, e.expReward[1]   * mult];
    e.moneyReward = [e.moneyReward[0] * mult, e.moneyReward[1] * mult];
    e.poison = false;
	e.burned = false;
	e.frozen = 0;
    e.weaken = false;
	e.paralyzed = false;
	e.asleep = 0;
    ambushEnemiesQueue.push(e);
  }

  // start with the first enemy
  currentEnemy = ambushEnemiesQueue.shift();
  const minLv = Math.max(player.level - 3, 1);
        const maxLv = player.level + 5;
        const enemyLevel = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
        currentEnemy.level = enemyLevel;
        if (currentEnemy.baseMaxHp === undefined) {
          currentEnemy.baseMaxHp = currentEnemy.hp;
        }
        const levelDiff = enemyLevel - player.level;
        const scale = 1 + 0.05 * levelDiff;
        const newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
        currentEnemy.hp = currentEnemy.maxHp = newHp;
        // ───────────────────────────────────────────────────────────────
  updateEnemyInfo();
  battleMenu.style.display = "block";
  unlockActions();
}

function getEnemyByName(enemyName) {
  return enemies.find(e => e.name.toLowerCase() === enemyName.toLowerCase());
}

      function updateEnemyInfo() {
        let name = currentEnemy.name;
        if (currentEnemy.poison) name += " - Poisoned";
		if (currentEnemy.frozen) name += " - Frozen";
		if (currentEnemy.burned) name += " - Burned";
        if (currentEnemy.weaken) name += " - Weakened";
		if (currentEnemy.paralyzed) name += " - Paralyzed";
		if (currentEnemy.asleep) name += " - Asleep";
        enemyInfo.innerHTML = `
			<h3>${name}</h3>
			<p class="enemy-level">Level ${currentEnemy.level}</p>
			<p>HP: ${currentEnemy.hp} / ${currentEnemy.maxHp}</p>`;
      }

      function endBattle() {
		  const defeatedBoss = currentEnemy && currentEnemy.boss && currentEnemy.hp <= 0 ? currentEnemy.name : null;
		  const enemyName = currentEnemy.name;
		killCount++;
		  // only count true monsters
		  if (!["Warrior","Outlaw","Bandit","Cult Member"].includes(enemyName)) {
			  player.monsterKills++;
			  if (player.organization==="Guild") updateGuildMissionProgress();
		  } else {
			  if (player.organization==="Cult") updateCultMissionProgress();
		  }
		  
		  if (preBattleStats.attack !== undefined) {
			  player.attack        = preBattleStats.attack;
			  player.defense        = preBattleStats.defense;
			  player.agility       = preBattleStats.agility;
			  player.critMultiplier = preBattleStats.critMultiplier;
			  player.critChance    = preBattleStats.critChance;
			  player.rage          = false;
			  player.iron          = false;
			  preBattleStats = {};
		  }
  
		  if (preBattleStats.defense !== undefined) {
			player.attack        = preBattleStats.attack;
			player.defense        = preBattleStats.defense;
			player.agility       = preBattleStats.agility;
			player.critMultiplier = preBattleStats.critMultiplier;
			player.critChance    = preBattleStats.critChance;
			player.rage          = false;
			player.iron          = false;
			preBattleStats = {};
		  }
		  player.statuses.frozen = 0;
		  player.statuses.asleep = 0;
		  updatePlayerStatusUI();
  
		  if (defeatedBoss === "Demon King") {
			alert("As you kill the Demon King, you take a deep sigh of relief as you realize you've finally beaten the final Legend, the strongest monster of this world.");
			alert("You stand pridefully on top of the Demon King's corpse as you become the hero and saviour of the world, when suddenly, a bright flash of light blinds you.");
			alert("''Greetings human, congratulations on coming this far. Find me, and I shall finally test you for myself''.");
		  }
		  if (defeatedBoss === "Omni") {
			alert("As you land the finishing blow, you suddenly feel as if the world shifted... no, reality shifted. A bright flash of light then blinds you once again, as you realize you're back in a familiar place, but... it's different, somhow.");
		  }
  if (defeatedBoss === "Abominable Snowman") {
	alert("You find an ancient, abandoned port near the frozen shore. You explore it and find a boat. You meddle around and somehow got it to work as you then hop on and resume your journey, through the sea.");
  }
  if (defeatedBoss === "Leviathan") {
	alert("You slay the beast, as you then resume your journey. Finally, you find land, but something's off...");
  }
  if (defeatedBoss === "Island Turtle") {
	alert("The gigantic turtle roars and bellows as it falls, creating huge tsunamis as you struggle on your boat, eventually knocking you out.");
	alert("You wake up on your boat in a daze. You look around as you realize you're now sailing on a river, inside a huge cave... sparkling with stars and galaxies around you?");
  }
  if (defeatedBoss === " The World Serpent, Jörmungandr") {
	alert("You finally slay the enormous serpent, as your head suddenly begins to ache, causing you to fall unconscious once more.");
	alert("You wake up and realize you've crashed your boat on some land. You get up and see a familiar gate of fire. You step in and face a familiar world once more.");
  }
  if (defeatedBoss === "The Black King") {
	alert("You suddenly get a huge headache once again, but you shake it off... Reality is distorting.");
  }
  if (defeatedBoss === "Demon God") {
	alert("The Gates of Hell collapses in front of you, as a domain of light suddenly appears inside. You step inside, as you get a gut-wrenching feeling that your journey is about to end.");
  }
  if (defeatedBoss === "Warden Of Judgement, Will, And Balance") {
	alert("Your entire body aches as you fall to the ground. But you get back up, as you start to get a positive feeling this time, that your journey is finally coming to an end.");
  }
  if (defeatedBoss === "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel") {
    // 1) Fade screen to black
    const overlay = document.createElement('div');
    overlay.id = 'endingOverlay';
    Object.assign(overlay.style, {
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      background: 'black', opacity: 0,
      transition: 'opacity 2s', zIndex: 10000
    });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.style.opacity = '1');

    // 2) After fade-out, show image + text + choices
    overlay.addEventListener('transitionend', function onFade() {
      overlay.removeEventListener('transitionend', onFade);
      // Set background to ending image
      Object.assign(overlay.style, {
        background: black,
        opacity: 1, transition: ''
      });
      // Create text container
      const text = document.createElement('div');
      Object.assign(text.style, {
        position: 'absolute', bottom: '10%', left: '50%',
        transform: 'translateX(-50%)', color: 'white',
        padding: '20px', maxWidth: '80%', textAlign: 'center'
      });
      text.innerHTML = 
        `Congratulations, human. Thanks to thee, humanity hath finally completed their Third Trial. Thou hast all proven yourselves worthy of advancing as a civilization in this infinite universe.<br><br>` +
        `And as for thou, strange human, thou  hast proven yourself far beyond what we expected. It very looks like humanity hath found their hope, and it is thou. We are impressed by thy accomplishments, and we hast decided to invite thou to join us in The Beyonds.<br><br>` +
        `Will thou accept?`;
      overlay.appendChild(text);

      // Create Accept/Reject buttons
      const btnContainer = document.createElement('div');
      Object.assign(btnContainer.style, { marginTop: '20px' });
      const btnYes = document.createElement('button');
      btnYes.textContent = 'Accept';
      const btnNo = document.createElement('button');
      btnNo.textContent = 'Reject';
      [btnYes, btnNo].forEach(btn => {
        Object.assign(btn.style, { margin: '0 10px', padding: '10px 20px', fontSize: '18px' });
        btnContainer.appendChild(btn);
      });
      overlay.appendChild(btnContainer);

      // Accept: remove overlay and continue game
      btnYes.onclick = () => {
        overlay.remove();
        currentEnemy = null;
        resumeWorldMusicAfterBattle();
		gameDifficulty = "ultimate";
      };
      // Reject: reload game
      btnNo.onclick = () => location.reload();
    });

    // Skip the normal clean-up
    return;
  }
  
  battleMenu.style.display = "none";
  battleLog.style.display = "none";
  battleTint.style.display = "none";
  inventoryMenu.style.display = "none";
  
   // reward the player if the enemy died
   if (currentEnemy && currentEnemy.hp <= 0) {
    let gloryKill = false;
    if (gameDifficulty === "doom" && Math.random() < 0.2) {
      gloryKill = true;
      alert(`${currentEnemy.name} defeated! (GLORY KILL)`);
    } else {
      alert(`${currentEnemy.name} defeated!`);
    }

    // ——— compute and apply rewards ———
	 let bossTemplate = getBossForFloor(floorCount);
	 let bossData = JSON.parse(JSON.stringify(bossTemplate));
     let gainedExp, gainedMoney;
     if (currentEnemy.boss) {
       let [minE, maxE] = bossData.expReward;
       gainedExp   = Math.floor(Math.random() * (maxE - minE + 1)) + minE;
       let [minM, maxM] = bossData.moneyReward;
       gainedMoney = Math.floor(Math.random() * (maxM - minM + 1)) + minM;
     } else {
       let [minE, maxE] = currentEnemy.expReward;
       gainedExp   = Math.floor(Math.random() * (maxE - minE + 1)) + minE;
       let [minM, maxM] = currentEnemy.moneyReward;
       gainedMoney = Math.floor(Math.random() * (maxM - minM + 1)) + minM;
     }
    // double rewards on glory kill
    if (gloryKill) {
      gainedExp   *= 2;
      gainedMoney *= 2;
    }
     addExp(gainedExp);
     player.money = Math.round(player.money + gainedMoney * Math.round(1 + player.fortune * 0.08));
 
     // armor regeneration
    let armorHealAmt = Math.round(Math.random() * (20 - 10 + 1)) + 10;
    // double armor heal on glory kill
    if (gloryKill) armorHealAmt *= 2;
	if (gameDifficulty === "doom") {
       if (player.baseStats.maxArmor >= 50) {
        let armorHealAmt = Math.round(Math.random() * (20 - 10 + 1)) + 10;
        let heal = armorHealAmt;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 100) {
        let armorHealAmt = Math.round(Math.random() * (30 - 10 + 1)) + 10;
        let heal = Math.round((armorHealAmt/20)*30);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 200) {
        let armorHealAmt = Math.round(Math.random() * (50 - 30 + 1)) + 30;
        let heal = Math.round((armorHealAmt/20)*50);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 300) {
        let armorHealAmt = Math.round(Math.random() * (75 - 35 + 1)) + 35;
        let heal = Math.round((armorHealAmt/20)*75);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 500) {
        let armorHealAmt = Math.round(Math.random() * (125 - 50 + 1)) + 50;
        let heal = Math.round((armorHealAmt/20)*125);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else {
        let armorHealAmt = Math.round(Math.random() * (10 - 2 + 1)) + 5;
        let heal = Math.round((armorHealAmt/20)*10);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       }
     } else {
		if (player.baseStats.maxArmor >= 100) {
        let armorHealAmt = Math.round(Math.random() * (20 - 10 + 1)) + 10;
        let heal = armorHealAmt;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 200) {
        let armorHealAmt = Math.round(Math.random() * (30 - 10 + 1)) + 10;
        let heal = Math.round((armorHealAmt/20)*30);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 300) {
        let armorHealAmt = Math.round(Math.random() * (50 - 30 + 1)) + 30;
        let heal = Math.round((armorHealAmt/20)*50);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 500) {
        let armorHealAmt = Math.round(Math.random() * (75 - 35 + 1)) + 35;
        let heal = Math.round((armorHealAmt/20)*75);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else if (player.baseStats.maxArmor >= 700) {
        let armorHealAmt = Math.round(Math.random() * (125 - 50 + 1)) + 50;
        let heal = Math.round((armorHealAmt/20)*125);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       } else {
        let armorHealAmt = Math.round(Math.random() * (10 - 2 + 1)) + 5;
        let heal = Math.round((armorHealAmt/20)*10);
        if (gloryKill) heal *= 2;
         player.armor = Math.min(player.armor + heal, player.maxArmor);
       }
	 }
     updateStats();
   }

  // if more ambush enemies remain, queue the next one
  if (ambushEnemiesQueue && ambushEnemiesQueue.length > 0) {
    currentEnemy = ambushEnemiesQueue.shift();
    logBattle("Next enemy appears!");
    const minLv = Math.max(player.level - 3, 1);
    const maxLv = player.level + 5;
    const enemyLevel = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
    currentEnemy.level = enemyLevel;
    if (currentEnemy.baseMaxHp === undefined) {
        currentEnemy.baseMaxHp = currentEnemy.hp;
    }
    const levelDiff = enemyLevel - player.level;
    const scale = 1 + 0.05 * levelDiff;
    const newHp = Math.max(1, Math.round(currentEnemy.baseMaxHp * scale));
    currentEnemy.hp = currentEnemy.maxHp = newHp;
    updateEnemyInfo();
    battleMenu.style.display = "block";
    battleLog.style.display = "block";
    battleTint.style.display = "block";
    unlockActions();
    return;
  }

  // if this was an ambush, fire the finalizeRoom callback
  if (ambushCompleteCallback) {
    const cb = ambushCompleteCallback;
    ambushCompleteCallback = null;
    ambushEnemiesQueue = null;
	ambushTrack.pause();
	ambushTrack.currentTime = 0;
	bossTrack.pause();
	bossTrack.currentTime = 0;
	secTrack.pause();
	secTrack.currentTime = 0;
	omniTrack.pause();
	omniTrack.currentTime = 0;
	bkTrack.pause();
	bkTrack.currentTime = 0;
	dkTrack.pause();
	dkTrack.currentTime = 0;
	kocTrack.pause();
	kocTrack.currentTime = 0;
	semiTrack.pause();
	semiTrack.currentTime = 0;
	godTrack.pause();
	godTrack.currentTime = 0;
	warriorTrack.pause();
	warriorTrack.currentTime = 0;
	resumeWorldMusicAfterBattle();
    cb();
    return;
  }
  
  // otherwise, normal battle cleanup
  currentEnemy = null;
  ambushTrack.pause();
  ambushTrack.currentTime = 0;
  bossTrack.pause();
  bossTrack.currentTime = 0;
  secTrack.pause();
  secTrack.currentTime = 0;
  omniTrack.pause();
  omniTrack.currentTime = 0;
  bkTrack.pause();
  bkTrack.currentTime = 0;
  dkTrack.pause();
  dkTrack.currentTime = 0;
  kocTrack.pause();
  kocTrack.currentTime = 0;
  semiTrack.pause();
  semiTrack.currentTime = 0;
  godTrack.pause();
  godTrack.currentTime = 0;
  warriorTrack.pause();
  warriorTrack.currentTime = 0;
  if (!currentBGM) {
	  resumeWorldMusicAfterBattle();
  }
}

	   /*******************
       * PLAYER ATTACK SYSTEM
       *******************/

      function playerAttack(moveType) {
        if (!currentEnemy) return;
        if (!player.neverMiss && Math.random() < enemyDodgeChance) {
          logBattle(`${currentEnemy.name} dodged your attack!`);
		  if (player.passiveAbility === "Relentless") {
    // reset stats to pre-battle values on a miss
    player.attack  = preBattleStats.attack;
    player.magic   = preBattleStats.magic;
    player.defense = preBattleStats.defense;
    logBattle("<em>You lost momentum!</em>");
    updateStats();
  }
		  setTimeout(enemyTurnWrapper, 0);
          enemyTurn();
          return;
        }
		const extra = getGuildBonuses();
		let fsBonus = 0;
		if (player.passiveAbility === "Fighting Spirit") {
			fsBonus = (player.maxHp - player.hp) / player.maxHp;
		}
        let baseDamage;
        if (moveType === "attack") {
          const multiplier = Math.random() * (1.15 - 0.85) + 0.85;
          baseDamage = Math.floor(multiplier * player.attack * (1 + extra.damage + fsBonus));
        } else if (moveType === "magic") {
          const multiplier = Math.random() * (1.5 - 1) + 1;
          baseDamage = Math.floor(multiplier * player.magic * (1 + extra.damage + fsBonus));
        }
        let damage = Math.round(baseDamage);
        if (damage < 1) damage = 1;
        let resisted = false;
        if (currentEnemy.reductionAll) {
			if (ignoreEnemyResistances === true) {
				resisted = false;
			} else {
				damage = Math.round(damage * (1 - currentEnemy.reductionAll));
				resisted = true;
			}
        }
        if (moveType === "attack" && currentEnemy.reductionAttack) {
			if (ignoreEnemyResistances === true) {
				resisted = false;
			} else {
				damage = Math.round(damage * (1 - currentEnemy.reductionAttack));
				resisted = true;
			}
        }
        if (moveType === "magic" && currentEnemy.reductionMagic) {
			if (ignoreEnemyResistances === true) {
				resisted = false;
			} else {
				damage = Math.round(damage * (1 - currentEnemy.reductionMagic));
				resisted = true;
			}
        }
        let isCritical = false;
		let critMulValue = (player.perception / 100) + 2;
		let critDamageMultiplier = Math.min(critMulValue, 5);
        if (moveType === "attack") {
          if (Math.random() < 0.05 + (player.perception - 1) * 0.001) {
            damage = Math.round(damage * critDamageMultiplier);
            isCritical = true;
			if (player.outgoingDamageMultiplier && player.passiveAbility === "Reckless") {
				damage *= player.outgoingDamageMultiplier;
			}
			if (player.rage = true) {
				if (player.rage) {
					damage = Math.round(damage * 2);
					player.critChance *= 2;
				}
			}
          }
        }
		if (moveType === "magic") {
			if (player.outgoingDamageMultiplier && player.passiveAbility === "Reckless") {
				damage *= player.outgoingDamageMultiplier;
			}
			if (player.rage = true) {
				if (player.rage) {
					damage = Math.round(damage * 2);
				}
			}
		}
        if (isCritical) {
          logBattle(`You attacked and dealt ${damage} critical damage!`);
        } else if (resisted) {
			if (gameDifficulty !== "doom") {
				logBattle(`You ${moveType === "attack" ? "attacked" : "cast magic"} and dealt ${damage} resisted damage.`);
			} else {
				logBattle(`You ${moveType === "attack" ? "attacked" : "fired"} and dealt ${damage} resisted damage.`);
			}
        } else {
          if (gameDifficulty !== "doom") {
				logBattle(`You ${moveType === "attack" ? "attacked" : "cast magic"} and dealt ${damage} damage.`);
			} else {
				logBattle(`You ${moveType === "attack" ? "attacked" : "fired"} and dealt ${damage} damage.`);
			}
        }
        currentEnemy.hp -= damage;
        if (currentEnemy.hp < 0) currentEnemy.hp = 0;
        updateEnemyInfo();
        if (currentEnemy.hp <= 0) {
          processEnemyDefeat();
          return;
        }
		if (player.mercenaries.length > 0) {
    mercenaryAttack();
  }
		if (damage < 1) damage = 1;
		setTimeout(enemyTurnWrapper, 250);

if (player.statuses.frozen > 0 || player.statuses.asleep > 0) {
  battleLog(`Player is currently ${player.statuses.frozen>0?'frozen':'asleep'} and is unable to move!`);
  // decrement counter
  if (player.statuses.frozen > 0) player.statuses.frozen--;
  if (player.statuses.asleep > 0)  player.statuses.asleep--;
  updatePlayerStatusUI();
  enemyTurn();  // skip to enemy
  return;
}
// check paralysis chance
if (player.statuses.paralyzed && Math.random() < 0.33) {
  battleLog(`Player is paralyzed and is unable to move!`);
  enemyTurn();
  return;
}

      }
	  
function mercenaryAttack() {
    if (player.mercenaries && player.mercenaries.length > 0) {
        player.mercenaries.forEach((mercenary) => {
            // Apply a random multiplier to the base damage.
            let randomFactor = 0.8 + Math.random() * 0.4;  // multiplier between 0.8 and 1.2
            let damage = Math.floor(mercenary.baseDamage * randomFactor);
            logBattle("Your mercenary attacked " + currentEnemy.name + " for " + damage + " damage.");
            currentEnemy.hp -= damage;
        });
    }
}
	  
	  function dealPlayerDamage(options = {}) {
  // options: { multiplier, forceCrit, ignoreDodge }
  const { multiplier = 1, forceCrit = false, ignoreDodge = false } = options;
  // stash
  const origAttack = player.attack;
  const origCritMul = player.critMultiplier;
  const origNeverMiss = player.neverMiss;
  // apply
  player.attack *= multiplier;
  if (forceCrit) {
	  player.critMultiplier = 999;
	  isCritical = true;
  }
  if (ignoreDodge) player.neverMiss = true;
  // perform
  playerAttack("attack");
  // restore
  player.attack = origAttack;
  player.critMultiplier = origCritMul;
  player.neverMiss = origNeverMiss;
}

function dealPlayerMagicDamage(mult = 1) {
  // stash
  const origMagic = player.magic;
  // apply
  player.magic *= mult;
  // perform
  playerAttack("magic");
  // restore
  player.magic = origMagic;
}

/*******************
       * ENEMY TURN
       *******************/
const statusInflictConfig = [
  // Weaken
  { statuses:'weakened', list:[
    'Golem','The Witch','Giant Spider','Giant Warrior Ant','Omni'
  ], chance:0.02 },
  { statuses:'weakened', list:[
    'Dire Wolf','Grand Sorceress','Giant Scorpion','Giant Lord',
    'Titan Golem','Primordial Automaton','Angel','Seraphim',
    'Ghoul','Ghost Leviathan','Island Turtle',
    'King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel'
  ], chance:0.05 },

  // Poison
  { statuses:'poisoned', list:[
    'Snake','Hobgoblin','The Witch','Zombie','Giant Warrior Ant','Omni'
  ], chance:0.02 },
  { statuses:'poisoned', list:[
    'Gorgon','Grand Sorceress','Titanoboa Lord','Zombie Mutant',
    'Spider Queen','Arachni Empress',
    'King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel'
  ], chance:0.05 },

  // Burn
  { statuses:'burned', list:[
    'Demon','Imp','Guardian of Hell, Cerberus',
    'Behemoth','Brazen Bull, Khalkotauri','Omni'
  ], chance:0.02 },
  { statuses:'burned', list:[
    'Archdemon','Wyvern','Hydra','Dragon King',
    'Demon King','Demon God','King of Curses',
    'King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel'
  ], chance:0.05 },

  // Freeze
  { statuses:'frozen', list:[
    'Ice Golem','Snowman','Abominable Snowman','Frost Knight','Omni'
  ], chance:0.02 },
  { statuses:'frozen', list:[
    'Ice Spirit','Frost Queen Borealis',
    'King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel'
  ], chance:0.05 },

  // Sleep
  { statuses:'asleep', list:[
    'The Witch','Omni'
  ], chance:0.02 },
  { statuses:'asleep', list:[
    'Grand Sorceress',
    'King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel'
  ], chance:0.05 },

  // Paralyze
  { statuses:'paralyzed', list:[
    'Bull','Orc Mage','Omni','Ghoul','Gorgon',
    'The Witch','Behemoth','Shikigami','Hydra','Wyvern'
  ], chance:0.02 },
  { statuses:'paralyzed', list:[
    'Medusa, Lady of Stone','Grand Sorceress','Giant Lord',
    'Primordial Automaton','Titan Golem','Dragon King',
    'Six-Eyed Calamity','Ghost Leviathan','Grand Knight',
    'Grand Knight II','Island Turtle',
    'King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel'
  ], chance:0.05 },
];

// 2️⃣ Attach status chances to each enemy object
statusInflictConfig.forEach(cfg => {
  cfg.list.forEach(enemyName => {
    const e = enemies.find(en => en.name === enemyName);
    if (e) {
      e.statusChances = e.statusChances || {};
      e.statusChances[cfg.status] = cfg.chance;
    }
  });
});

      function enemyTurn() {
  // If Infinity Innate is active, drain mana instead of taking hits
  if (player.infinityActive) {
    player.mana = Math.max(0, player.mana - 1);
    updateManaDisplay();
    logBattle(`${currentEnemy.name} attacked, but nothing happened.`);
    if (player.mana === 0) {
      player.infinityActive = false;
      logBattle("Your Innate suddenly begins to fade.");
    }
    return;
  }

  // Dodge check
  if (Math.random() < player.dodgeChance + (player.agility - 1) * 0.001) {
    logBattle("Player dodged the enemy attack!");
    updateStats();
    return;
  }

  // Base damage roll
  const [minD, maxD] = currentEnemy.damageRange;
  let enemyDamage = Math.round(Math.random() * (maxD - minD + 1)) + minD;
  enemyDamage -= Math.round(enemyDamage * (player.defense / 200));
  if (enemyDamage < 0) enemyDamage = 1;
  enemyDamage = Math.ceil(enemyDamage / 2);

  // Critical hit?
  let enemyCritical = false;
  if (Math.random() < 0.05) {
    enemyDamage *= 2;
    enemyCritical = true;
  }

  // Iron passive halves incoming
  if (player.iron) {
    enemyDamage = Math.round(enemyDamage / 2);
  }
  // Other modifiers
  if (player.enemyDamageReduction) {
    enemyDamage *= player.enemyDamageReduction;
  }
  if (player.incomingDamageMultiplier) {
    enemyDamage *= player.incomingDamageMultiplier;
  }

  if (currentEnemy.frozen > 0) {
  currentEnemy.frozen--;
  logBattle(`${currentEnemy.name} is frozen and cannot move!`);
  if (currentEnemy.frozen === 0) logBattle(`${currentEnemy.name} defrosted!`);
  updateEnemyInfo();
  return;
  }
  
  if (currentEnemy.asleep > 0) {
  currentEnemy.asleep--;
  logBattle(`${currentEnemy.name} is asleep!`);
  if (currentEnemy.asleep === 0) logBattle(`${currentEnemy.name} woke up!`);
  updateEnemyInfo();
  return;
  }
  
  if (currentEnemy.paralyzed) {
	if (Math.random() < 0.33) {
      logBattle(`${currentEnemy.name} is paralyzed and couldn't move!`);
      updateEnemyInfo();
      return;
    }
  }
  
  const rawEnemyDamage = Math.round(enemyDamage);
  player.lastEnemyDamage = rawEnemyDamage;

  if (player.armor > 0) {
    if (player.lastEnemyDamage <= player.armor) {
      player.armor -= player.lastEnemyDamage;
      player.lastEnemyDamage = 0;
    } else {
      player.lastEnemyDamage -= player.armor;
      player.armor = 0;
	  logBattle("Your ARMOR has depleted!");
    }
  }

  if (player.lastEnemyDamage > 0) {
    player.hp -= player.lastEnemyDamage;
    if (player.hp < 0) player.hp = player.immortal ? 1 : 0;
  }

  if (player.hp < 0) {
	if (player.immortal) {
		player.hp = 1;
	} else {
		player.hp = 0;
	}
  }
  
  if (player.immortal) {
	player.hp = Math.max(player.hp, 1);
  }
  updateStats();

  // Log the attack
  if (enemyCritical) {
    logBattle(`${currentEnemy.name} attacked and dealt ${rawEnemyDamage} critical damage!`);
  } else {
    logBattle(`${currentEnemy.name} attacked and dealt ${rawEnemyDamage} damage.`);
  }
  updateStats();
  
  if (currentEnemy.statusChances) {
    Object.entries(currentEnemy.statusChances).forEach(([statuses, chance]) => {
      if (Math.random() < chance) {
        if (statuses === 'frozen') {
          player.statuses.frozen = getRandomInt(2, 4);
        } else if (statuses === 'asleep') {
          player.statuses.asleep = getRandomInt(1, 3);
        } else {
          player.statuses[statuses] = true;
        }
        battleLog(
          `Player was ${statuses.charAt(0).toUpperCase() + statuses.slice(1)}!`
        );
      }
    });
    updatePlayerStatusUI();
  }
  
  if (player.burning && Math.random() < 0.67) {
  currentEnemy.burned = true;
  logBattle(`${currentEnemy.name} was burnt!`);
  updateEnemyInfo();
  }
  updateStats();

  // Check for death
  if (player.hp <= 0) {
    showDeathMenu();
    return;
  }

  // --- NEW: Reflective passive bounces 50% back immediately ---
  if (player.reflective) {
    const reflectDmg = Math.ceil(player.lastEnemyDamage * 0.5);
    logBattle(`You reflected ${reflectDmg} damage back!`);
    currentEnemy.hp = Math.max(0, currentEnemy.hp - reflectDmg);
    updateEnemyInfo();
    if (currentEnemy.hp <= 0) {
      processEnemyDefeat();
      return;
    }
  }

  // Boss self-heal chance
  if (currentEnemy.boss && Math.random() < 0.10) {
    const healAmt = Math.ceil(currentEnemy.maxHp * 0.10);
    currentEnemy.hp = Math.min(currentEnemy.hp + healAmt, currentEnemy.maxHp);
    logBattle(`${currentEnemy.name} healed ${healAmt} HP!`);
    updateEnemyInfo();
    return;
  }
}
	  
	  function enemyTurnWrapper() {
  enemyTurn();
  // If the enemy is still alive and not defeated during its turn...
  if (currentEnemy && currentEnemy.hp > 0) {
    // Process poison damage if the enemy is poisoned:
    if (currentEnemy.poison) {
      const poisonDamage = Math.max(Math.round(currentEnemy.hp * 0.02), 1);
      logBattle(`${currentEnemy.name} took ${poisonDamage} poison damage!`);
      currentEnemy.hp -= poisonDamage;
      if (currentEnemy.hp < 0) currentEnemy.hp = 0;
      updateEnemyInfo();
    }
	if (currentEnemy.burned) {
	  const burnDamage = Math.max(Math.round(currentEnemy.hp * 0.02), 1);   // reuse the same function
	  logBattle(`${currentEnemy.name} took ${burnDamage} burn damage!`);
	  currentEnemy.hp -= burnDamage;
	  if (currentEnemy.hp < 0) currentEnemy.hp = 0;
	  updateEnemyInfo();
	}
	if (player.passiveAbility === "Adaptable") {
		player.defense += 1;
	}
	if (player.passiveHealingPerTurn) {
    let healAmt = Math.floor(player.maxHp * player.passiveHealingPerTurn);
    player.hp = Math.min(player.maxHp, player.hp + healAmt);
    logBattle(`Adaptable heals you for ${healAmt} HP!`);
    updateStats();
	}
	if (player.passiveAbility === "Relentless") {
  player.attack  += 1;
  player.magic   += 1;
  player.defense += 1;
  }
  setTimeout(() => {
    unlockActions();
  }, 125);
    // Check if the enemy died after poison damage.
    if (currentEnemy.hp <= 0) {
      alert(`${currentEnemy.name} defeated!`);
      endBattle();
      return;
    } else if (currentEnemy.hp <= 0 && currentEnemy.boss) {
	  alert(`You have slayed the Legend, ${currentEnemy.name}!`);
      endBattle();
      return;
	}
	// Mercenary dodge check
if (player.mercenaries.length > 0) {
  // did enemy hit? if they fail the dodge roll, mercenary dies immediately
  if (Math.random() > player.mercenaries[0].dodgeChance) {
    const idx = Math.floor(Math.random() * player.mercenaries.length);
    logBattle(`Your mercenary was attacked by ${currentEnemy.name} and has fallen!`);
    player.mercenaries.splice(idx, 1);
  } else {
    logBattle(`${currentEnemy.name} attacked your mercenary, but they dodged!`);
  }
  return; // prevent them from targeting you directly this turn
}
 else {
	}
  }
  setTimeout(newTurn, 250);
}

      function attemptRun() {
        if (ambushEnemiesQueue && ambushEnemiesQueue.length > 0) {
          logBattle("You're surrounded by monsters, you can't escape!");
		  setTimeout(enemyTurnWrapper, 250);
          return;
        }
        if (currentEnemy && currentEnemy.boss) {
          logBattle(`You tried to escape, but the ${currentEnemy.name} blocked your way!`);
		  setTimeout(enemyTurnWrapper, 250);
          return;
        }
        if (Math.random() < 0.5) {
          logBattle("You ran away!");
          alert("Successfully escaped!");
		  setTimeout(enemyTurnWrapper, 250);
		  endBattle();
        } else {
          logBattle("You attempted to run but failed!");
		  setTimeout(enemyTurnWrapper, 250);
        }
      }
	  
	  function processEnemyDefeat() {
    // Check if the active ability is Necromancy.
    if (player.activeAbility === "Necromancy") {
        // Instead of simply alerting defeat, prompt with two choices.
        // We use confirm() to simulate two options: OK = "Yes", Cancel = "Finish Off".
        let choice = confirm(
            "Player defeated " + currentEnemy.name + 
            "! Would you like for it to become your soldier?\n\n" +
            "Press OK for Yes, or Cancel to Finish Off."
        );
        if (choice) {
            // "Yes" selected – determine chance based on whether enemy is a boss.
            let successChance = currentEnemy.boss ? (0.33) : 0.5;
            if (Math.random() < successChance) {
                alert("You have resurrected " + currentEnemy.name + "!");
                if (currentEnemy.boss) {
                    player.mercenaries.push({
                        baseDamage: player.attack * 2,
                        critChance: 0.10,
                        dodgeChance: 0.67,
                    });
                } else {
                    player.mercenaries.push({
                        baseDamage: player.attack / 2,
                        critChance: 0.10,
                        dodgeChance: 0.5,
                    });
                }
            } else {
                alert("You failed to resurrect " + currentEnemy.name + ".");
            }
            endBattle();
        } else {
            endBattle();
        }
    } else {
        endBattle();
    }
}

	  /*******************
       * ABILITIES
       *******************/
	   
	   function applyPassiveAbilityEffects() {
  switch (player.passiveAbility) {
    case "None":
      // No changes
      break;
    case "Berserker":
      // Doubles the player's Attack stat
	  player.baseStats.attack += 5;
	  updateStats();
	  updateManaDisplay();
      break;
	case "Big":
	  player.baseStats.attack  += 5;
	  player.baseStats.maxArmor += 20;
	  player.armor += 20;
	  player.baseStats.maxHp   += 100;
	  player.hp += 100;
	  player.baseStats.agility -= 10;
	  updateStats();
	  break;
    case "Arcane":
	  player.baseStats.magic += 5;
	  player.baseStats.maxMana *= 2;
	  player.mana = player.maxMana;
	  updateStats();
	  updateManaDisplay();
      break;
    case "Hunter":
      // Increase crit chance by 10%
      player.critChance = (player.critChance || 0) + 0.10;
      player.alwaysHit = true;
      ignoreEnemyResistances = true;
	  player.baseStats.agility += 2;
	  player.baseStats.perception += 5;
	  updateStats();
      break;
	case "Quick":
	  player.baseStats.agility += 5;
	  updateStats();
      break;
    case "Tough":
      player.enemyDamageReduction = 0.33;
	  player.armor += 30;
	  player.baseStats.maxArmor += 30;
      player.immuneToCrits = true;
	  updateStats();
      break;
    case "Golden":
      player.moneyGainMultiplier = 2;
      player.enemyDamageReduction = 0.75;
      player.expGainMultiplier = 1.1;
      ignoreEnemyResistances = true;
      break;
	case "Burning":
	  // When enemy hits you, we’ll roll in enemyTurn()
	  player.burning = true;
	  break;
    case "Adaptable":
      player.expGainMultiplier = 2;
      player.passiveHealingPerTurn = 0.02;
      break;
	case "Reflective":
      player.reflective = true;
      break;
    case "Reckless":
      player.outgoingDamageMultiplier = 2;
      // Increase enemy damage taken by 50% (i.e. enemy damage multiplier).
      player.incomingDamageMultiplier = 1.5;
      break;
    case "Aura Farmer":
      player.upgradesRemaining = 2;
      break;
    case "Six Eyes":
      player.overrideManaCost = 1;
      break;
	case "Heavenly Restricted":
      // Override the player's base stats.
	  player.baseStats.maxHp = 500;
      player.hp = 500;
	  player.baseStats.maxArmor = 100;
      player.armor = 100;
      player.baseStats.attack = 100;
      player.baseStats.defense = 60;
      player.baseStats.magic = 0;
      player.baseStats.maxMana = 0;
      player.mana = 0;
      player.baseStats.agility = 60;
      player.baseStats.perception = 60;
      player.baseStats.potential = 0;
      player.baseStats.fortune = 1;
      player.baseStats.luck = 1;
	  ignoreEnemyResistances = true;

      // Disable the active ability.
      player.activeAbility = "None";

      // Prevent the player from leveling up by setting the required EXP to Infinity.
      player.expToLevel = Infinity;

      // Optionally update UI elements if they exist.
      const activeAbilityEl = document.getElementById("hudPlayerActive");
      if (activeAbilityEl) {
        activeAbilityEl.innerText = "None";
      }

      console.log(
        "Heavenly Restricted is in effect: player stats overwritten, active ability disabled, leveling up blocked."
      );
	  updateStats();
	  updateManaDisplay();
      break;

	case "Immortality":
	  player.immortal = true;
	  break;

	case "Invincible":
	  player.defense += 99;
	  player.baseStats.defense += 99;
	  player.armor += 100;
	  player.baseStats.maxArmor += 100;
	  updateStats();
	  break;
	  
	case "Demon Slayer":
	  player.baseStats.attack += 8;
	  updateStats();
	  break;
	
	case "Scourge of Hell":
	  player.armor += 50;
	  player.maxArmor += 50;
	  player.baseStats.maxArmor += 50;
	  updateStats();
	  break;
	
	case "The Doom Slayer":
	  player.baseStats.attack += 4;
	  player.baseStats.magic += 4;
	  player.baseStats.durability += 9;
	  player.mana += 10;
	  player.maxMana += 10;
	  player.baseStats.maxMana += 10;
	  player.armor += 10;
	  player.maxArmor += 10;
	  player.baseStats.maxArmor += 10;
	  player.baseStats.agility += 9;
	  player.baseStats.perception += 4;
	  updateManaDisplay();
	  updateStats();
	  break;
	  
	case "Hellwalker":
	  player.baseStats.agility += 19;
	  player.baseStats.perception += 9;
	  updateStats();
	  break;
	
	case "Unchained Predator":
	  player.mana += 20;
	  player.maxMana += 20;
	  player.baseStats.maxMana += 20;
	  updateManaDisplay();
	  updateStats();
	  break;
	  
	case "Heavensent Executioner":
	  player.baseStats.magic += 8;
	  updateStats();
	  break;
	  
    default:
      break;
  }
  updateStats();
  updateManaDisplay();
}

// Listen for Q:
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "q") {
	let manaCost = player.overrideManaCost || 10;
    if (!skillUsedThisBattle) {
      logBattle("You're too exhausted to do that again...");
    // re-unlock so battle can continue
    setTimeout(() => unlockActions(), 250);
    return;
    } else {
      if (player.mana < manaCost) {
		if (player.activeAbility !== "Sacrifice" && player.activeAbility !== "Rip and Tear" && player.activeAbility !== "None") {
			logBattle("Insufficient Mana!");
		}
      }
      useActiveAbility();
      skillUsedThisBattle = false;
      }
    }
  });

function useActiveAbility() { 
  if (skillUsedThisBattle = false) {
    logBattle("You're too exhausted to do that again...");
    // re-unlock so battle can continue
    setTimeout(() => unlockActions(), 250);
    return;
  }
  manaCost = player.overrideManaCost || 10;
  if (player.activeAbility !== "Sacrifice" && player.activeAbility !== "Rip and Tear" && player.activeAbility !== "None") {
	if (player.mana < manaCost) {
		logBattle("Insufficient Mana!");
		return;
	}
  }

  if (player.activeAbility !== "Sacrifice" && player.activeAbility !== "Rip and Tear" && player.activeAbility !== "None") {
	player.mana -= manaCost;
  } else {
	player.mana = player.mana;
  }
  updateManaDisplay();

  switch (player.activeAbility) {
    case "None":
      logBattle("But nothing happened...");
	  updateManaDisplay();
      break;

    case "Rage":
	  logBattle("<em>Overflow. Break your Limits. Rage!</em>");
      player.rage = true;
	  player.attack = player.attack * 2;
	  player.magic = Math.ceil(player.magic * 1.5);
	  player.perception = player.perception * 2;
	  updateManaDisplay();
	  updateStats();
      break;
	  
	case "Sacrifice":
	  updateManaDisplay();
	  logBattle("<em>Blood for strength. Pain for flame. Light the torch that leads the way. Sacrifice!</em>");
	  player.rage = true;
	  player.attack = player.attack * 3;
	  player.magic = Math.ceil(player.magic * 1.5);
	  player.perception = player.perception * 3;
	  const sacrificeCost = Math.floor(player.maxHp * 0.10);
	  if (player.hp <= sacrificeCost) {
		logBattle("You can't keep going like this...");
		updateManaDisplay();
		return;
	  }
	  player.hp = Math.max(player.hp - sacrificeCost, 1);
	  updateStats();
	  break;
	
	case "Rip and Tear":
	  updateManaDisplay();
	  logBattle("<em>RIP AND TEAR... UNTIL IT'S DONE!</em>");
	  player.attack = Math.round(player.attack * 1.5);
	  player.perception = player.perception * 3;
	  const ripAndTearCost = Math.floor(player.hp * 0.10);
	  if (player.hp <= ripAndTearCost) {
		logBattle("You can't keep going like this...");
		updateManaDisplay();
		return;
	  }
	  player.hp = Math.max(player.hp - ripAndTearCost, 1);
	  updateStats();
	  break;

    case "Maxima":
	  logBattle("<em>Single Point. Focus. Maximum Output. Maxima!</em>");
      // +10× magic attack, enemy +20% dodge
      const origDodge = currentEnemy.dodgeChance || 0;
      currentEnemy.dodgeChance = origDodge + 0.20;
      dealPlayerMagicDamage(10);
      currentEnemy.dodgeChance = origDodge;
      if (player.passiveAbility === "Six Eyes") {
		player.mana -= 0;
	  } else {
		player.mana -= manaCost; 
	  }
      updateManaDisplay();
      break;
	  
	case "Super Strike":
	  logBattle("<em>Through and through. Body and Soul. Super Strike!</em>");
	  dealPlayerDamage({ multiplier: 10 });
      if (player.passiveAbility === "Six Eyes") {
		player.mana -= 0;
	  } else {
		player.mana -= manaCost; 
	  }
      updateManaDisplay();
      break;

    case "Heal":
	  logBattle("<em>Rewind. Heal!</em>");
      const healAmt = Math.floor(player.maxHp * 0.5);
      player.hp = Math.min(player.maxHp, player.hp + healAmt);
      updateStats();
      break;

    case "Hunt":
	  logBattle("<em>No escape. With one strike. Hunt!</em>");
      ignoreEnemyResistances = true;
      const origPer = player.perception;
      player.perception = 9999;
      playerAttack("attack");
      player.perception = origPer;
      ignoreEnemyResistances = false;
      break;

    case "Strike":
	  logBattle("<em>Through and Through. Impact. Strike!</em>");
      // extra physical attack at 2× damage
      dealPlayerDamage(2);
      break;

    case "Blast":
	  logBattle("<em>Single Point. Focus. Blast!</em>");
      // extra magic attack at 2× magic
      dealPlayerMagicDamage(2);
      break;
	  
	case "Reversal":
	  const lostHp = player.maxHp - player.hp;
	  if (lostHp <= 0) {
		logBattle("<em>Vengeance. Obliterate. Reflect. Reversal!... but nothing happened?</em>");
	  } else {
		logBattle("<em>Vengeance. Obliterate. Reflect. Reversal!</em>");
		currentEnemy.hp = Math.max(0, currentEnemy.hp - lostHp);
		updateEnemyInfo();
		if (currentEnemy.hp <= 0) {
			processEnemyDefeat();
			endBattle();
			return;
		}
	  }
	break;

	case "Counter":
	  const dmg = player.lastEnemyDamage * 2;
	  if (player.lastEnemyDamage <= 0) {
		logBattle("<em>Full Counter!... but nothing happened?</em>");
	  } else {
		logBattle("<em>Full Counter!</em>");
		currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
		updateEnemyInfo();
		if (currentEnemy.hp <= 0) {
			processEnemyDefeat();
			endBattle();
			return;
		}
	  }
	break;
	
	case "Dash":
	  logBattle("<em>Grace. Stealth. Break Space. Dash!</em>");
      player.agility = player.agility + 10;
	  updateStats();
      break;

	case "Fireball":
	  logBattle("<em>Spark. Grow. Shine Bright. Raze. Fireball!</em>");
	  dealPlayerMagicDamage(1);
	  currentEnemy.burned = true;
	  logBattle(`${currentEnemy.name} was burned!`);
	  updateEnemyInfo();
	  break;
	  
	case "Acid Spit":
	  logBattle("<em>Hawk Tuah!</em>");
	  dealPlayerMagicDamage(1);
	  currentEnemy.poison = true;
	  logBattle(`${currentEnemy.name} was poisoned!`);
	  updateEnemyInfo();
	  break;
	  
	case "Thunderbolt":
	  logBattle("<em>Shock. Strike. Ignite. Thunderbolt!</em>");
	  dealPlayerMagicDamage(1);
	  currentEnemy.paralyzed = true;
	  logBattle(`${currentEnemy.name} was paralyzed and may be unable to move!`);
	  updateEnemyInfo();
	  break;
	  
	case "Freeze":
	  logBattle("<em>Cold. Shiver. Silence. Freeze!</em>");
	  dealPlayerMagicDamage(1);
	  const freezeTurns = Math.floor(Math.random() * 4) + 3; // 3 to 6 turns
	  currentEnemy.frozen = freezeTurns;
	  logBattle(`${currentEnemy.name} is frozen for ${freezeTurns} turns!`);
	  updateEnemyInfo();
	  break;
	  
	case "Mesmerizing Voice":
	  logBattle("<em>Hush little baby don't say a word, I'm gonna buy you a mockingbird~</em>");
	  const sleepTurns = Math.floor(Math.random() * 4) + 3; // 3 to 6 turns
	  currentEnemy.asleep = sleepTurns;
	  logBattle(`${currentEnemy.name} fell asleep for ${sleepTurns} turns!`);
	  updateEnemyInfo();
	  break;
	
	case "Necromancy":
	  alert("That's not how that works, dummy!");
      logBattle("<em>You tried to activate your ability, but it failed!</em>");
	  player.mana += manaCost;
	  skillUsedThisBattle = true;
	  updateStats();
	  updateManaDisplay();
      break;
	  
	case "Resurrection":
	  alert("That's not how that works, dummy!");
      logBattle("<em>You tried to activate your ability, but it failed!</em>");
	  player.mana += manaCost;
	  skillUsedThisBattle = true;
	  updateStats();
	  updateManaDisplay();
      break;
	
    case "Blade of Gold":
	  logBattle("<em>Heaven's Edge. Tear The Sky. Rip Through Negativity. Shine Bright. Blade of Gold!</em>");
      // convert all money into attack for remainder of battle
      player.attack += player.money;
	  player.money -= player.money;
	  updateStats();
	  if (player.passiveAbility === "Six Eyes</em>") {
		player.mana -= 0;
	  } else {
		player.mana -= manaCost; 
	  }
      updateManaDisplay();
      break;
	  
	case "Shining Armor":
	  logBattle("<em>Fortify. Defend The Gods. Divine Nightingale. Shine Bright. Shining Armor!</em>");
      // convert all money into attack for remainder of battle
      player.defense += player.money;
	  player.money -= player.money;
	  updateStats();
	  if (player.passiveAbility === "Six Eyes") {
		player.mana -= 0;
	  } else {
		player.mana -= manaCost; 
	  }
      updateManaDisplay();
      break;
	
	case "Switch":
      useSwitchSkill();
      break;

    case "Infinity":
      useInfinitySkill();
      break;
    default:
      logBattle("No active skill to use.");
  }

  skillUsedThisBattle = false;
  // advance turn
  setTimeout(newTurn, 500);
}

function useInfinitySkill() {
  const effectRoll = Math.random();

  if (effectRoll < 0.2) {
    // Effect 1 - Immune to all damage for this turn
    player.infinityActive = true;
    logBattle("<em>All Else Means Nothing. Incomparable. Existent And Nonexistent. Incomprehensible. Beyond All Else. Infinity!</em>");
  } else if (effectRoll < 0.4) {
    dealPlayerMagicDamage(5);
    logBattle("<em>Phase. Twilight. Eyes of Wisdo. Lapse: Blue!</em>");
  } else if (effectRoll < 0.6) {
    dealPlayerDamage(5);
    logBattle("<em>Phase. Paramita. Pillars of Light. Cursed Technique Reversal: Red!</em>");
  } else if (effectRoll < 0.8) {
    player.hp += Math.min(player.maxHp / 2);
    updateStats();
    logBattle("<em>You're so right... YOU'RE SO RIGHT! Reverse Cursed Technique!</em>");
  } else {
    dealPlayerMagicDamage(10);
	player.mana -= manaCost;
    logBattle("<em>Nine Ropes. Polarized Light. Crow and Declaration. Between Front and Back. Imaginary Technique: Hollow Purple!</em>");
  }
}

function useSwitchSkill() {
  const selfDamage = Math.floor(player.hp * 0.33);
  player.hp = Math.max(player.hp - selfDamage, 1);
  
  const isVessel = player.passiveAbility === "Vessel";
  const boostPct = isVessel ? 1 : 0.5;
  const statsToBoost = [
    { key: "attack" },
    { key: "magic" },
    { key: "defense" },
    { key: "agility" },
    { key: "perception" },
  ];

  statsToBoost.forEach(stat => {
    const base = player[stat.key];
    const increase = Math.max(Math.floor(base * 0.50), 10);
    player[stat.key] += increase;
    logBattle("<em>I'll be gone. Looks like it's your turn... Switch!</em>");
	logBattle("<em>Finally... this will be a MASSACRE!</em>");
  });
  
  if (isVessel) {
    player.critChance = 1.0;
    player.overrideManaCost = 1;
    logBattle("<em>The King of Curses... has returned!</em>");
  }
  updateManaDisplay();
  updateStats();
}

document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() !== "e") return;

  // must be in battle
  if (!currentEnemy) {
    alert("But nothing happened...");
    return;
  }

  const ws = player.weaponSkill;
  
  if (ws.name === "None") {
	if (gameDifficulty !== "doom") {
		logBattle("But nothing happened...");
		return;
	} else {
		if (ws.usedThisBattle) {
			logBattle("You're too exhausted to use that again...");
			return;
		} else {
			logBattle("<em>DEMONS EVERYWHERE... MUST KILL THEM ALL!</em>");
			dealPlayerDamage(1);
			ws.usedThisBattle = true;
		}
	}
  }
  if (ws.usedThisBattle) {
    logBattle("You're too exhausted to use that again...");
    return;
  }
  if (player.mana < 5) {
    logBattle("Insufficient Mana.");
    return;
  }

  // spend flat 5 mana
  player.mana -= 5;
  updateManaDisplay();

  // execute the right effect
  switch (ws.name) {
    case "Assassinate":
      logBattle("<em>You dashed at the target and attacked them!</em>");
      ignoreEnemyResistances = true;
      let origPer = player.perception;
      player.perception = 9999;
      playerAttack("attack");
      player.perception = origPer;
      ignoreEnemyResistances = false;
      break;

    case "Heavy Slash":
	  logBattle("<em>With one big windup, you strike with your sword!</em>");
      dealPlayerDamage(2);
	  break;

	case "Smash":
	  logBattle("<em>You muster up all your strength as you lift up your hammer in the air, before smashing it onto the enemy.</em>");
      dealPlayerDamage(1);
	  break;
	
	case "Bash":
	  logBattle("<em>You put up your shield, before charging straight at the enemy!</em>");
      dealPlayerDamage(2);
	  break;
	
    case "Execution":
      logBattle("<em>Excalibur... Execution!</em>");
      dealPlayerDamage(5);
      break;

    case "Blast Minima":
      logBattle("<em>Single Point. Focus. Blast!</em>");
      dealPlayerMagicDamage(2);
      break;

	case "Pummel":
	  logBattle("<em>Fueled by rage, you charge at your opponent and begin barraging them with attacks</em>")
	  dealPlayerDamage(1);
	  dealPlayerDamage(1);
	  dealPlayerDamage(1);
	  dealPlayerDamage(1);
	  dealPlayerDamage(1);
	  break;

    case "Rewind":
      logBattle("<em>Return. Revert. Undo. Regenerate. Maximum Output. Rewind!</em>");
      player.hp = Math.min(player.maxHp, Math.floor(player.maxHp * 0.5));
      updateStats();
      break;

    case "Outrage":
      logBattle("<em>You feel an intense rage burning inside you!</em>");
      if (player.hp <= player.maxHp * 0.25) {
        logBattle("You can't keep going like this...");
      } else {
        player.hp = Math.floor(player.hp * 0.75);
        player.attack   *= 2;
        player.agility  *= 2;
        player.perception *= 2;
        updateStats();
      }
      break;

	case "Glory Slash":
	  ignoreEnemyResistances = true;
      origPer = player.perception;
      player.perception = 9999;
      playerAttack("attack");
      player.perception = origPer;
      ignoreEnemyResistances = false;
	  break;
	
	case "Launch":
	  dealPlayerDamage(2);
	  currentEnemy.burned = true;
	  break;
	
	case "Sentinel Slam":
	  dealPlayerDamage(2);
	  break;
	
	case "Divine Execution":
	  dealPlayerDamage(5);
	  break;
	
	case "Planet Breaker":
	  ignoreEnemyResistances = true;
	  dealPlayerMagicDamage(5);
	  ignoreEnemyResistances = false;
	  break;
	
	case "Demon Evisceration":
	  ignoreEnemyResistances = true;
	  dealPlayerMagicDamage(2);
	  ignoreEnemyResistances = false;
	  break;

    default:
      logBattle("But nothing happened...");
  }

  ws.usedThisBattle = true;
  // advance turn
  setTimeout(newTurn, 500);
});
	  
      /*******************
       * BACKGROUND COLOR UPDATE
       *******************/
      function updateBackgroundColor() {
  // ——— Doom override ———
  if (gameDifficulty === "doom") {
    // stay in Hell forever, world 666
    document.body.style.background = "#b30003";
    const worldCounterEl = document.getElementById("worldCounter");
    if (worldCounterEl) {
      worldCounterEl.textContent = "Hell 666 - " + Math.floor(roomMoves);
    }
    // ensure BGM is Hell’s
    if (currentWorld !== "Hell") {
      playWorldMusic("Hell");
    }
    return;
  }
  
  if (gameDifficulty === "bossRush") {
	const nextBossFloor = Math.ceil(floorCount / BOSS_RUSH_INTERVAL) * BOSS_RUSH_INTERVAL;
	const nextBoss = getBossForFloor(nextBossFloor);
  let bgColor = "black";
  let worldNum = 0;
  let worldName = "";
  switch (nextBoss.name) {
    case "Goblin King":
      bgColor = "#113b00";
      worldNum = 1;
      worldName = "Deep Forests";
      break;
    case "Zombie Mutant":
      bgColor = "#2a5e31";
      worldNum = 2;
      worldName = "Abandoned Graveyard";
      break;
    case "Giant Lord":
      bgColor = "#5c2c00";
      worldNum = 3;
      worldName = "Deathly Cliffs";
      break;
    case "Skeleton King":
      bgColor = "#8a8a8a";
      worldNum = 4;
      worldName = "Bone Castle";
      break;
    case "Spider Queen":
      bgColor = "#202421";
      worldNum = 5;
      worldName = "Silkwoven Caverns";
      break;
    case "The Witch":
      bgColor = "#1e0033";
      worldNum = 6;
      worldName = "Arcane Swamps";
      break;
    case "Titan Golem":
      bgColor = "#242424";
      worldNum = 7;
      worldName = "Shi Mountains";
      break;
    case "Wyvern":
      bgColor = "#a32c00";
      worldNum = 8;
      worldName = "Archaic Caverns";
      break;
    case "Giant Sandworm":
      bgColor = "#ffe863";
      worldNum = 9;
      worldName = "Scorching Desert";
      break;
    case "Titanoboa Lord":
      bgColor = "#1c0a00";
      worldNum = 10;
      worldName = "Never-Ending Tunnels";
      break;
    case "Abominable Snowman":
      bgColor = "#cedede";
      worldNum = 11;
      worldName = "Freezing Tundra";
      break;
    case "Omegalodon":
      bgColor = "#2954a3";
      worldNum = 12;
      worldName = "The Black Sea";
      break;
    case "Leviathan":
      bgColor = "#0300a1";
      worldNum = 13;
      worldName = "Vast Ocean";
      break;
    case "Angel":
      bgColor = "#ffffff";
      worldNum = 14;
      worldName = "Sky Dimension";
      break;
    case "Mega Meta Mecha Annihilator - Model: Ultima":
      bgColor = "#7bb8c7";
      worldNum = 15;
      worldName = "Future Megalopolis";
      break;
    case "Grand Knight":
      bgColor = "#260d00";
      worldNum = 16;
      worldName = "Ancient Kingdom";
      break;
    case "Six-Eyed Calamity":
      bgColor = "#b700ff";
      worldNum = 17;
      worldName = "Shinjuku";
      break;
    case "Hydra":
      bgColor = "#ba0000";
      worldNum = 18;
      worldName = "Molten Treasure Trove";
      break;
    case "Guardian of Hell, Cerberus":
      bgColor = "#b30003";
      worldNum = 19;
      worldName = "The Underworld";
      break;
    case "Demon King":
      bgColor = "#7d0000";
      worldNum = 20;
      worldName = "Hell";
      break;
    case "Omni":
      bgColor = "#fcd928";
      worldNum = 21;
      worldName = "The Beyond";
      break;
    case "Goblin Emperor":
      bgColor = "#113b00";
      worldNum = 22;
      worldName = "Forest Empire";
      break;
    case "Giant Cyclops, Eater of Men":
      bgColor = "#2a5e31";
      worldNum = 23;
      worldName = "Abandoned Graveyard";
      break;
	case "Orc Lord":
      bgColor = "#063800";
      worldNum = 24;
      worldName = "Dark Forest";
      break;
    case "Medusa, Lady of Stone":
      bgColor = "#5c2c00";
      worldNum = 25;
      worldName = "Deathly Cliffs";
      break;
	case "Ogre King":
      bgColor = "#211000";
      worldNum = 26;
      worldName = "Ogre Cave";
      break;
    case "The Minotaur":
      bgColor = "#8a8a8a";
      worldNum = 27;
      worldName = "Bone Castle";
      break;
    case "Arachni Empress":
      bgColor = "#202421";
      worldNum = 28;
      worldName = "Silkwoven Caverns";
      break;
    case "Grand Sorceress":
      bgColor = "#1e0033";
      worldNum = 29;
      worldName = "Arcane Temple";
      break;
    case "Primordial Automaton":
      bgColor = "#242424";
      worldNum = 30;
      worldName = "The Depths";
      break;
    case "Dragon King":
      bgColor = "#a32c00";
      worldNum = 31;
      worldName = "Dragon King's Lair";
      break;
    case "Devourer of Worlds":
      bgColor = "#ffe863";
      worldNum = 32;
      worldName = "Scorching Desert";
      break;
    case "Frost Queen, Borealis":
      bgColor = "#cedede";
      worldNum = 33;
      worldName = "Freezing Tundra";
      break;
    case "Charybdis":
      bgColor = "#2954a3";
      worldNum = 34;
      worldName = "Valrr Trench";
      break;
	case "Queen Ant":
      bgColor = "#00b82e";
      worldNum = 35;
      worldName = "Jeju Island";
      break;
	case "Ant King, Beru":
      bgColor = "#752300";
      worldNum = 36;
      worldName = "Giant Ant Nest";
      break;
    case "Seraphim":
      bgColor = "#ffffff";
      worldNum = 37;
      worldName = "Sky Dimension";
      break;
    case "Mega Meta Mecha Annihilator - Model: Grande":
      bgColor = "#7bb8c7";
      worldNum = 38;
      worldName = "Future Megalopolis";
      break;
    case "Grand Knight II":
      bgColor = "#260d00";
      worldNum = 39;
      worldName = "Ancient Kingdom";
      break;
    case "King of Curses":
      bgColor = "#b700ff";
      worldNum = 40;
      worldName = "Shibuya";
      break;
    case "The Restricted One, Kyojiro Allista":
      bgColor = "#ba0000";
      worldNum = 41;
      worldName = "Molten Treasure Trove";
      break;
    case "The Brazen Bull, Khalkotauri":
      bgColor = "#32e800";
      worldNum = 42;
      worldName = "Open Fields";
      break;
	case "Kraken":
      bgColor = "#0300a1";
      worldNum = 43;
      worldName = "Violent Seas";
      break;
	case "King Crab":
      bgColor = "#32e800";
      worldNum = 44;
      worldName = "Khaos Island";
      break;
	case "Ghost Leviathan":
      bgColor = "#00543e";
      worldNum = 45;
      worldName = "Phantom Waters";
      break;
	case "Island Turtle":
      bgColor = "#32e800";
      worldNum = 46;
      worldName = "Mysterious Island";
      break;
	case "The World Serpent, Jörmungandr":
      bgColor = "#1c0a00";
      worldNum = 47;
      worldName = "River of Eternity";
      break;
	case "The Behemoth":
      bgColor = "#b30003";
      worldNum = 48;
      worldName = "The Underworld";
      break;
    case "Demon God":
      bgColor = "#7d0000";
      worldNum = 49;
      worldName = "7th Layer of Hell";
      break;
    case "The Black King":
      bgColor = "#000000";
      worldNum = 50;
      worldName = "Shadow Realm";
      break;
	case "Supreme Witch, Calamitas":
      bgColor = "#bd0000";
      worldNum = 51;
      worldName = "Realm of Calamity";
      break;
    case "Warden Of Judgement, Will, And Balance":
      bgColor = "#ffffff";
      worldNum = 52;
      worldName = "Even Further Beyond";
      break;
    case "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel":
      bgColor = "#fcf3dc";
      worldNum = 53;
      worldName = "Realm Of The Gods";
      break;
    default:
      bgColor = "black";
      worldNum = 0;
      worldName = "Welcome to Roguelike!";
  }
  
  document.body.style.background = bgColor;
  const worldCounterEl = document.getElementById("worldCounter");
  if (worldCounterEl) {
    worldCounterEl.textContent = worldName + " " + worldNum + "-" + Math.floor(roomMoves);
  }
  
  // FIX: Trigger playing of the appropriate world music.
  if (worldName) {
    playWorldMusic(worldName);
  }
  } else {
	const nextBossFloor = Math.ceil(floorCount / 20) * 20;
	const nextBoss = getBossForFloor(nextBossFloor);
  let bgColor = "black";
  let worldNum = 0;
  let worldName = "";
  switch (nextBoss.name) {
    case "Goblin King":
      bgColor = "#113b00";
      worldNum = 1;
      worldName = "Deep Forests";
      break;
    case "Zombie Mutant":
      bgColor = "#2a5e31";
      worldNum = 2;
      worldName = "Abandoned Graveyard";
      break;
    case "Giant Lord":
      bgColor = "#5c2c00";
      worldNum = 3;
      worldName = "Deathly Cliffs";
      break;
    case "Skeleton King":
      bgColor = "#8a8a8a";
      worldNum = 4;
      worldName = "Bone Castle";
      break;
    case "Spider Queen":
      bgColor = "#202421";
      worldNum = 5;
      worldName = "Silkwoven Caverns";
      break;
    case "The Witch":
      bgColor = "#1e0033";
      worldNum = 6;
      worldName = "Arcane Swamps";
      break;
    case "Titan Golem":
      bgColor = "#242424";
      worldNum = 7;
      worldName = "Shi Mountains";
      break;
    case "Wyvern":
      bgColor = "#a32c00";
      worldNum = 8;
      worldName = "Archaic Caverns";
      break;
    case "Giant Sandworm":
      bgColor = "#ffe863";
      worldNum = 9;
      worldName = "Scorching Desert";
      break;
    case "Titanoboa Lord":
      bgColor = "#1c0a00";
      worldNum = 10;
      worldName = "Never-Ending Tunnels";
      break;
    case "Abominable Snowman":
      bgColor = "#cedede";
      worldNum = 11;
      worldName = "Freezing Tundra";
      break;
    case "Omegalodon":
      bgColor = "#2954a3";
      worldNum = 12;
      worldName = "The Black Sea";
      break;
    case "Leviathan":
      bgColor = "#0300a1";
      worldNum = 13;
      worldName = "Vast Ocean";
      break;
    case "Angel":
      bgColor = "#ffffff";
      worldNum = 14;
      worldName = "Sky Dimension";
      break;
    case "Mega Meta Mecha Annihilator - Model: Ultima":
      bgColor = "#7bb8c7";
      worldNum = 15;
      worldName = "Future Megalopolis";
      break;
    case "Grand Knight":
      bgColor = "#260d00";
      worldNum = 16;
      worldName = "Ancient Kingdom";
      break;
    case "Six-Eyed Calamity":
      bgColor = "#b700ff";
      worldNum = 17;
      worldName = "Shinjuku";
      break;
    case "Hydra":
      bgColor = "#ba0000";
      worldNum = 18;
      worldName = "Molten Treasure Trove";
      break;
    case "Guardian of Hell, Cerberus":
      bgColor = "#b30003";
      worldNum = 19;
      worldName = "The Underworld";
      break;
    case "Demon King":
      bgColor = "#7d0000";
      worldNum = 20;
      worldName = "Hell";
      break;
    case "Omni":
      bgColor = "#fcd928";
      worldNum = 21;
      worldName = "The Beyond";
      break;
    case "Goblin Emperor":
      bgColor = "#113b00";
      worldNum = 22;
      worldName = "Forest Empire";
      break;
    case "Giant Cyclops, Eater of Men":
      bgColor = "#2a5e31";
      worldNum = 23;
      worldName = "Abandoned Graveyard";
      break;
	case "Orc Lord":
      bgColor = "#063800";
      worldNum = 24;
      worldName = "Dark Forest";
      break;
    case "Medusa, Lady of Stone":
      bgColor = "#5c2c00";
      worldNum = 25;
      worldName = "Deathly Cliffs";
      break;
	case "Ogre King":
      bgColor = "#211000";
      worldNum = 26;
      worldName = "Ogre Cave";
      break;
    case "The Minotaur":
      bgColor = "#8a8a8a";
      worldNum = 27;
      worldName = "Bone Castle";
      break;
    case "Arachni Empress":
      bgColor = "#202421";
      worldNum = 28;
      worldName = "Silkwoven Caverns";
      break;
    case "Grand Sorceress":
      bgColor = "#1e0033";
      worldNum = 29;
      worldName = "Arcane Temple";
      break;
    case "Primordial Automaton":
      bgColor = "#242424";
      worldNum = 30;
      worldName = "The Depths";
      break;
    case "Dragon King":
      bgColor = "#a32c00";
      worldNum = 31;
      worldName = "Dragon King's Lair";
      break;
    case "Devourer of Worlds":
      bgColor = "#ffe863";
      worldNum = 32;
      worldName = "Scorching Desert";
      break;
    case "Frost Queen, Borealis":
      bgColor = "#cedede";
      worldNum = 33;
      worldName = "Freezing Tundra";
      break;
    case "Charybdis":
      bgColor = "#2954a3";
      worldNum = 34;
      worldName = "Valrr Trench";
      break;
	case "Queen Ant":
      bgColor = "#00b82e";
      worldNum = 35;
      worldName = "Jeju Island";
      break;
	case "Ant King, Beru":
      bgColor = "#752300";
      worldNum = 36;
      worldName = "Giant Ant Nest";
      break;
    case "Seraphim":
      bgColor = "#ffffff";
      worldNum = 37;
      worldName = "Sky Dimension";
      break;
    case "Mega Meta Mecha Annihilator - Model: Grande":
      bgColor = "#7bb8c7";
      worldNum = 38;
      worldName = "Future Megalopolis";
      break;
    case "Grand Knight II":
      bgColor = "#260d00";
      worldNum = 39;
      worldName = "Ancient Kingdom";
      break;
    case "King of Curses":
      bgColor = "#b700ff";
      worldNum = 40;
      worldName = "Shibuya";
      break;
    case "The Restricted One, Kyojiro Allista":
      bgColor = "#ba0000";
      worldNum = 41;
      worldName = "Molten Treasure Trove";
      break;
    case "The Brazen Bull, Khalkotauri":
      bgColor = "#32e800";
      worldNum = 42;
      worldName = "Open Fields";
      break;
	case "Kraken":
      bgColor = "#0300a1";
      worldNum = 43;
      worldName = "Violent Seas";
      break;
	case "King Crab":
      bgColor = "#32e800";
      worldNum = 44;
      worldName = "Khaos Island";
      break;
	case "Ghost Leviathan":
      bgColor = "#00543e";
      worldNum = 45;
      worldName = "Phantom Waters";
      break;
	case "Island Turtle":
      bgColor = "#32e800";
      worldNum = 46;
      worldName = "Mysterious Island";
      break;
	case "The World Serpent, Jörmungandr":
      bgColor = "#1c0a00";
      worldNum = 47;
      worldName = "River of Eternity";
      break;
	case "The Behemoth":
      bgColor = "#b30003";
      worldNum = 48;
      worldName = "The Underworld";
      break;
    case "Demon God":
      bgColor = "#7d0000";
      worldNum = 49;
      worldName = "7th Layer of Hell";
      break;
    case "The Black King":
      bgColor = "#000000";
      worldNum = 50;
      worldName = "Shadow Realm";
      break;
	case "Supreme Witch, Calamitas":
      bgColor = "#bd0000";
      worldNum = 51;
      worldName = "Realm of Calamity";
      break;
    case "Warden Of Judgement, Will, And Balance":
      bgColor = "#ffffff";
      worldNum = 52;
      worldName = "Even Further Beyond";
      break;
    case "King God General Emperor, Supreme Divine Entity of Ultimacy, Archangel & Creator, Gabriel":
      bgColor = "#fcf3dc";
      worldNum = 53;
      worldName = "Realm Of The Gods";
      break;
    default:
      bgColor = "black";
      worldNum = 0;
      worldName = "Welcome to Roguelike!";
  }
  
  document.body.style.background = bgColor;
  const worldCounterEl = document.getElementById("worldCounter");
  if (worldCounterEl) {
    worldCounterEl.textContent = worldName + " " + worldNum + "-" + Math.floor(roomMoves);
  }
  
  // FIX: Trigger playing of the appropriate world music.
  if (worldName) {
    playWorldMusic(worldName);
  }
  }
}

      /*******************
       * ITEM USAGE IN BATTLE
       *******************/
      function showInventoryMenu(battleMode) {
  inventoryMenu.style.display = "block";
  inventoryMenu.innerHTML = "<h3>Choose an item: </h3>";
  let hasUsableItem = false;
  player.inventory.forEach((item, index) => {
    if (item) {
      if (battleMode && !item.usableInBattle) return;
      if (!battleMode && !item.usableOutOfBattle) return;
      hasUsableItem = true;
      const btn = document.createElement("button");
      btn.textContent = item.name;
      btn.addEventListener("click", () => {
        useItem(item, index, battleMode);
      });
	  const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
	  btn.dataset.tooltip = `${cat}-type <br>"${item.description}"`;
      inventoryMenu.appendChild(btn);
    }
  });
  attachTooltip("#inventoryMenu button[data-tooltip]");
  
  if (!hasUsableItem) {
    inventoryMenu.innerHTML += '<p>No usable items available.</p>';
    setTimeout(() => {
      unlockActions();
    }, 250);
  }
	  }

      function useItem(item, index, battleMode) {
        // Check if the item can be used in the current context.
        if (battleMode && !item.usableInBattle) {
          alert(item.name + " cannot be used in battle!");
          return;
        }
        if (!battleMode && !item.usableOutOfBattle) {
          alert(item.name + " cannot be used out of battle!");
          return;
        }
        if (item.usageScope === "passive") {
          alert(item.name + " is a passive item and cannot be used.");
          return;
        }
        inventoryMenu.style.display = "none";
        if (battleMode) {
          // Effects when used in battle:
          switch (item.name) {
            case "Medkit":
            case "Healing Potion":
			let effMaxHp = Math.floor(getEffectiveMaxHp());
			if (gameDifficulty !== "doom") {
              player.hp = Math.min(player.hp + Math.round(player.maxHp * 0.25), player.maxHp);
			} else {
			  player.hp = Math.min(player.hp + Math.round(effMaxHp * 0.05), effMaxHp);
			}
			  updateStats();
			if (gameDifficulty !== "doom") {
              logBattle("You used Healing Potion and healed 25% HP.");
			} else {
			  logBattle("You used a medkit and healed some HP.");
			}
			  updateStats();
			  updateEnemyInfo();
              break;
			
			case "Magazine":
			case "Mana Potion":
			if (gameDifficulty !== "doom") {
              player.mana = Math.min(player.mana + Math.round(player.maxMana * 0.25), player.maxMana);
			} else {
			  player.mana = player.maxMana;
			}
			  updateManaDisplay();
			if (gameDifficulty !== "doom") {
              logBattle("You used Mana Potion and healed 25% mana.");
			} else {
			  logBattle("You used a magazine and reloaded your gun.");
			}
              updateStats();
			  updateEnemyInfo();
              break;

	    case "Adrenaline":
            case "Rage Potion":
              player.rage = true;
			  player.attack *= 2;
			  player.magic = Math.ceil(player.magic *= 1.5);
			  player.perception *= 2;
			if (gameDifficulty !== "doom") {
              logBattle("You used a Rage Potion. Damage doubled this battle!");
			} else {
			  logBattle("<em>RIP AND TEAR... RIP AND TEAR... RIP AND TEAR!</em>");
			}
              updateStats();
			  updateEnemyInfo();
              break;

	    case "Gas Bomb":
            case "Poison Potion":
              currentEnemy.poison = true;
	    if (gameDifficulty !== "doom") {
              logBattle(`You threw a Poison Potion and poisoned ${currentEnemy.name}!`);
	    } else {
	      logBattle(`You threw a Gas Bomb and poisoned ${currentEnemy.name}!`);
	    }
              updateStats();
			  updateEnemyInfo();
              break;
		
		case "Lullaby Potion":
	    case "Sleeping Gas":
			let asleepTurns = Math.floor(Math.random() * 4) + 3;
			  currentEnemy.frozen = asleepTurns;
			if (gameDifficulty !== "doom") {
              logBattle(`You threw a Lullaby Potion and put ${currentEnemy.name} to sleep!`);
			} else {
			  logBattle(`You used some Sleeping Gas and put ${currentEnemy.name} to sleep!`);
			}
			  updateStats();
			  updateEnemyInfo();
              break;
			  
		case "EMP Grenade":
		case "Shock Potion":
			currentEnemy.paralyzed = true;
			if (gameDifficulty !== "doom") {
              logBattle(`You threw a Shock Potion and paralyzed ${currentEnemy.name}!`);
			} else {
			  logBattle(`You threw an EMP Grenade and paralyzed ${currentEnemy.name}!`);
			}
            updateStats();
			updateEnemyInfo();
			break;
			
            case "Weaken Potion":
              currentEnemy.weaken = true;
	    if (gameDifficulty !== "doom") {
              logBattle(`You threw a Weaken potion and weakened ${currentEnemy.name}!`);
	    }
              updateStats();
			  updateEnemyInfo();
              break;
	    
	    case "Armor+":
            case "Iron Potion":
              player.iron = true;
			  player.armor += 20;
			  player.maxArmor += 20;
	    if (gameDifficulty !== "doom") {
              logBattle("You used an Iron Potion. Enemy damage halved this battle!");
	    } else {
 	      logBattle("You activated your Armor+ and boosted your defenses!");
	    }
              updateStats();
			  updateEnemyInfo();
              break;

			case "Molotov":
              currentEnemy.burned = true;
              logBattle(`You threw the Molotov and burned ${currentEnemy.name}!`);
              updateStats();
			  updateEnemyInfo();
              break;

			case "Subzero Bomb":
			case "Frost Potion":
			  let turns = Math.floor(Math.random() * 4) + 3;
			  currentEnemy.frozen = turns;
			if (gameDifficulty !== "doom") {
			  logBattle(`You used a Frost Potion and ${currentEnemy.name} was frozen!`);
			} else {
			  logBattle(`You threw a Subzero Bomb and ${currentEnemy.name} was frozen!`);
			}
			  updateStats();
			  updateEnemyInfo();
              break;

          // Continue with enemy's turn if applicable.
		  unlockActions();
		  setTimeout(enemyTurnWrapper, 250);
          // Effects when used out-of-battle:
          switch (item.name) {
	    case "Medkit":
            case "Healing Potion":
			let effMaxHp = Math.floor(getEffectiveMaxHp());
			if (gameDifficulty !== "doom") {
              player.hp = Math.min(player.hp + Math.round(player.maxHp * 0.25), player.maxHp);
			} else {
			  player.hp = Math.min(player.hp + Math.round(effMaxHp * 0.05), effMaxHp);
			}
			  updateStats();
			if (gameDifficulty !== "doom") {
              logBattle("You used Healing Potion and healed 25% HP.");
			} else {
			  logBattle("You used a medkit and healed some HP.");
			}
              updateStats();
			  updateEnemyInfo();
              break;
			
			case "Magazine":
			case "Mana Potion":
			if (gameDifficulty !== "doom") {
              player.mana = Math.min(player.mana + Math.round(player.maxMana * 0.25), player.maxMana);
			} else {
			  player.mana = player.maxMana;
			}
			  updateManaDisplay();
			if (gameDifficulty !== "doom") {
              logBattle("You used Mana Potion and healed 25% mana.");
			} else {
			  logBattle("You used a magazine and reloaded your gun.");
			}
              updateStats();
			  updateEnemyInfo();
              break;

	    case "Adrenaline":
            case "Rage Potion":
              player.rage = true;
			  player.attack *= 2;
			  player.magic = Math.ceil(player.magic *= 1.5);
			  player.perception *= 2;
			if (gameDifficulty !== "doom") {
              logBattle("You used a Rage Potion. Damage doubled this battle!");
			} else {
			  logBattle("<em>RIP AND TEAR... RIP AND TEAR... RIP AND TEAR!</em>");
			}
              updateStats();
			  updateEnemyInfo();
              break;

	    case "Gas Bomb":
            case "Poison Potion":
              currentEnemy.poison = true;
	    if (gameDifficulty !== "doom") {
              logBattle(`You threw a Poison Potion and poisoned ${currentEnemy.name}!`);
	    } else {
	      logBattle(`You threw a Gas Bomb and poisoned ${currentEnemy.name}!`);
	    }
              updateStats();
			  updateEnemyInfo();
              break;

            case "Weaken Potion":
              currentEnemy.weaken = true;
              logBattle(`You threw a Weaken potion and weakened ${currentEnemy.name}!`);
              updateStats();
			  updateEnemyInfo();
              break;
			  
			case "Lullaby Potion":
	    case "Sleeping Gas":
			let asleepTurns = Math.floor(Math.random() * 4) + 3;
			  currentEnemy.asleep = asleepTurns;
			if (gameDifficulty !== "doom") {
              logBattle(`You threw a Lullaby Potion and put ${currentEnemy.name} to sleep!`);
			} else {
			  logBattle(`You used some Sleeping Gas and put ${currentEnemy.name} to sleep!`);
			}
			  updateStats();
			  updateEnemyInfo();
              break;
			  
			case "EMP Grenade":
		case "Shock Potion":
			currentEnemy.paralyzed = true;
			if (gameDifficulty !== "doom") {
              logBattle(`You threw a Shock Potion and paralyzed ${currentEnemy.name}!`);
			} else {
			  logBattle(`You threw an EMP Grenade and paralyzed ${currentEnemy.name}!`);
			}
            updateStats();
			updateEnemyInfo();
			break;
	    
	    case "Armor+":
            case "Iron Potion":
              player.iron = true;
			  player.armor += 20;
			  player.maxArmor += 20;
	    if (gameDifficulty !== "doom") {
              logBattle("You used an Iron Potion. Enemy damage halved this battle!");
	    } else {
 	      logBattle("You activated your Armor+ and boosted your defenses!");
	    }
              updateStats();
			  updateEnemyInfo();
              break;

			case "Molotov":
              currentEnemy.burned = true;
              logBattle(`You threw the Molotov and burned ${currentEnemy.name}!`);
              updateStats();
			  updateEnemyInfo();
              break;

			case "Subzero Bomb":
			case "Frost Potion":
			  let turns = Math.floor(Math.random() * 4) + 3;
			  currentEnemy.frozen = turns;
			if (gameDifficulty !== "doom") {
			  logBattle(`You used a Frost Potion and ${currentEnemy.name} was frozen!`);
			} else {
			  logBattle(`You threw a Subzero Bomb and ${currentEnemy.name} was frozen!`);
			}
			  updateStats();
			  updateEnemyInfo();
              break;

            default:
              alert(item.name + " has no effect.");
              return;
          }
		}
        player.inventory[index] = null;
        updateInventoryDisplay();
		updateEnemyInfo();
        updateStats();
		setTimeout(enemyTurnWrapper, 250);
		unlockActions();
		}
      }

      /*******************
       * SHOP SYSTEM
       *******************/
      function openShopMenu() {
        const shuffled = shuffle([...shopItemsList]);
        const selectedItems = shuffled.slice(0, 3);
		shopMenu.classList.add("jump-zoom-shop");
        shopItemsDiv.innerHTML = "";
        selectedItems.forEach((item) => {
          const btn = document.createElement("button");
          btn.textContent = `${item.name} - $${item.cost}`;
          btn.addEventListener("click", () => {
            buyItem(item);
          });
		  const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
		  btn.dataset.tooltip = `${cat}-type <br>"${item.description}"`;
          shopItemsDiv.appendChild(btn);
        });
		attachTooltip("#shopItems button[data-tooltip]");
        shopMenu.style.display = "block";
		battleTint.style.display = "block";
      }

      function hasItem(name) {
        return player.inventory.some(i => i && i.name === name);
      }

      function buyItem(item) {
        if (item.type === "equipment" && hasItem(item.name)) {
          alert("You can only buy " + item.name + " once!");
          return;
        }
        const freeIndex = player.inventory.findIndex(slot => slot === null);
        if (freeIndex === -1) {
          alert("Inventory full! Cannot buy more items.");
          return;
        }
        if (player.money < item.cost) {
          alert("Not enough money!");
          return;
        }
        player.money -= item.cost;
        player.inventory[freeIndex] = {
          ...item
        };
        updateStats();
		updateInventoryDisplay();
        alert(`${item.name} purchased!`);
      }
	  
      document.getElementById("closeShopBtn").addEventListener("click", () => {
        shopMenu.style.display = "none";
		battleTint.style.display = "none";
      });
	  
	  // Open Sell Menu: list non-null inventory slots
sellBtn.addEventListener("click", () => {
  sellItemsDiv.innerHTML = "";
  player.inventory.forEach((item, idx) => {
    if (!item) return;

    let sellPrice;
    if (item.name === "Excalibur") {
      sellPrice = 10000;
    } else if (item.name === "Gun") {
      sellPrice = 500;
    } else if (item.name === "Ammo Box") {
      sellPrice = 250;
    } else if (item.name === "Previous Hero's Cape") {
      sellPrice = 0;
    } else if (item.name === "Grand Knight's Armor") {
      sellPrice = 10000;
    } else if (item.name === "Crucible") {
      sellPrice = 10000;
    } else if (item.name === "BFG9000") {
      sellPrice = 5000;
    } else if (item.name === "Argent Energy Storage") {
      sellPrice = 2500;
    } else if (item.name === "Dark Ages Mantle") {
      sellPrice = 1000;
    } else if (item.name === "Praetor Suit") {
      sellPrice = 10000;
    } else if (item.name === "Sorceress' Staff") {
      sellPrice = 10000;
    } else if (item.name === "Dragon's Fang") {
      sellPrice = 10000;
    } else if (item.name === "BFG10000") {
      sellPrice = 10000;
    } else if (item.name === "Titan's Fang") {
      sellPrice = 10000;
    } else if (item.name === "Nike Black Air Force") {
      sellPrice = 3000;
    } else if (item.name === "Delta V-Jump Boots") {
      sellPrice = 5000;
    } else {
      const shopDef = shopItemsList.find(si => si.name === item.name);
      sellPrice = shopDef ? Math.floor(shopDef.cost / 2) : 0;
    }

    // --- build button ---
    const btn = document.createElement("button");
    btn.textContent = `${item.name} — Sell for $${sellPrice}`;
    btn.style.display = "block";
    btn.style.width   = "100%";
    btn.style.margin  = "5px 0";
    btn.addEventListener("click", () => {
      player.money         += sellPrice;
      player.inventory[idx] = null;
      updateStats();
	  updateInventoryDisplay();
      btn.remove();
      alert(`Sold ${item.name} for $${sellPrice}.`);
    });
    sellItemsDiv.appendChild(btn);
  });

  sellMenu.style.display   = "block";
  shopMenu.style.display   = "none";
  battleTint.style.display = "block";
});

// Close Sell Menu
closeSellBtn.addEventListener("click", () => {
  sellMenu.style.display = "none";
  shopMenu.style.display = "block";
});

      /*******************
       * EXP & LEVEL UP
       *******************/
      function addExp(amount) {
        let multiplier = 1 + (player.potential - 1) * 0.08;
        player.exp = Math.round(player.exp + Math.floor(amount * multiplier));
        updateStats();
        while (player.exp >= player.expToLevel) {
          levelUp();
        }
      }
      let upgradesRemaining = 0;

      function levelUp() {
        player.level += 1;
        player.exp -= player.expToLevel;
        if (gameDifficulty === "easy") {
			player.expToLevel = player.expToLevel + Math.round(Math.pow(5, 1 + (player.level * 0.1)) + (player.exp * 0.33));
		} else if (gameDifficulty === "normal") {
			player.expToLevel = player.expToLevel + Math.round(Math.pow(5, 1 + (player.level * 0.1)) + (player.exp * 0.25));
		} else if (gameDifficulty === "ultimate") {
			player.expToLevel = player.expToLevel + Math.round(Math.pow(5, 1 + (player.level * 0.1)));
		} else {
        	player.expToLevel = player.expToLevel + Math.round(Math.pow(5, 1 + (player.level * 0.1)) + (player.exp * 0.1));
		}

		if (player.passiveAbility === "Aura Farmer") {
			player.baseStats.maxHp += 20;
			player.baseStats.attack += 1;
			player.baseStats.magic += 1;
			player.baseStats.maxArmor += 10;
			player.baseStats.maxMana += 5;
			player.baseStats.defense += 1;
			player.baseStats.agility += 1;
			player.baseStats.perception += 1;
			player.baseStats.potential += 1;
			player.baseStats.luck += 1;
			player.baseStats.fortune += 1;
		}
        updateStats();
        let currentRoomType = map[player.x + "_" + player.y].type;
        upgradesRemaining += (currentRoomType === ROOM_TYPES.ALTAR ? 3 : 1);
        levelUpMenu.style.display = "block";
		battleTint.style.display = "block";
		if (gameDifficulty === "doom" || gameDifficulty === "ultimate") {
			initiateLevelUp(1);
		}
      }

      function initiateLevelUp(upgradeCount) {
        upgradesRemaining += upgradeCount;
        levelUpMenu.style.display = "block";
		battleTint.style.display = "block";
      }
	  
      levelUpMenu.addEventListener("click", function(e) {
        if (e.target.tagName.toLowerCase() === "button") {
          const stat = e.target.getAttribute("data-stat");
          if (stat === "hp") {
            player.maxHp += 20 + Math.round((player.level / player.maxHp) + (player.attack / player.maxHp) + (player.defense / player.maxHp));
			player.baseStats.maxHp += 20 + Math.round((player.level / player.maxHp) + (player.attack / player.maxHp) + (player.defense / player.maxHp));
			if (gameDifficulty !== "extreme" && gameDifficulty !== "insane" && gameDifficulty !== "calamity" && gameDifficulty !== "doom" && gameDifficulty !== "ultimate") {
				player.hp = player.maxHp;
			}
			updateStats();
		  } else if (stat === "magic") {
			player.maxMana += 5;
			player.baseStats.maxMana += 5;
			if (gameDifficulty !== "extreme" && gameDifficulty !== "insane" && gameDifficulty !== "calamity" && gameDifficulty !== "doom" && gameDifficulty !== "ultimate") {
				player.mana = player.maxMana;
			}
			player.magic += 1;
			player.baseStats.magic += 1;
			updateManaDisplay();
			updateStats();
		  } else if (stat === "defense") {
			player.defense += 1;
			player.baseStats.defense += 1;
			if (gameDifficulty !== "doom") {
				player.maxArmor += 10;
				player.baseStats.maxArmor += 10;
			}
		  } else {
            player[stat] += 1;
			player.baseStats[stat] += 1;
			updateStats();
          }
		  updateManaDisplay();
          updateStats();
		  applyEquipmentEffects();
          upgradesRemaining--;
          logBattle(`Player leveled up! ${stat.toUpperCase()} increased.`);
          if (upgradesRemaining <= 0) {
            levelUpMenu.style.display = "none";
			if (battleMenu.style.display !== "block") {
				battleTint.style.display = "none";
			}
          }
        }
      });
	  
      /*******************
       * BATTLE LOG UTILS
       *******************/
      function logBattle(message) {
  const p = document.createElement("p");
  p.innerHTML = message;
  battleLog.appendChild(p);
  battleLog.scrollTop = battleLog.scrollHeight;
}
      /*******************
       * DEATH HANDLING
       *******************/
      function showDeathMenu() {
  battleMenu.style.display     = "none";
  battleLog.style.display      = "none";
  battleTint.style.display     = "block";
  inventoryMenu.style.display  = "none";
  deathMenu.style.display      = "block";
  
  stopTimer();
  const finalTime = document.getElementById("timerDisplay").textContent;
  const worldText = document.getElementById("worldCounter").textContent;
  const statsDiv = document.createElement("div");
  statsDiv.innerHTML = `
    <p>
	  <br>
      Final Level: ${player.level}<br><br>
      World Reached: ${worldText}<br><br>
      Time Survived: ${finalTime}<br><br>
      Monsters Killed: ${killCount}
	  <br>
    </p>
  `;
  
  // Find the first button in the deathMenu (either retry or resurrection)
  const firstBtn = deathMenu.querySelector("button");
  // Insert our stats *before* that button
  deathMenu.insertBefore(statsDiv, firstBtn);

  const btn = document.getElementById("resurrectBtn");
  if (player.activeAbility === "Resurrection") {
    btn.style.display = "inline-block";
  } else {
    btn.style.display = "none";
  }
}
      document.getElementById("retryBtn").addEventListener("click", function() {
        initGame();
		location.reload();
      });
	  
	  document.getElementById("resurrectBtn").addEventListener("click", () => {
  // 1) Hide death UI
  deathMenu.style.display = "none";
  battleTint.style.display = "none";

  // 2) Restore the player
  player.hp   = player.maxHp;
  player.mana = player.maxMana;
  updateStats();
  updateManaDisplay();

  // 3) Remove Resurrection so it can’t be used again
  player.activeAbility = "None";
  document.getElementById("hudPlayerActive").innerText = "None";

  // 4) Hide this button permanently
  document.getElementById("resurrectBtn").style.display = "none";
});
	  
	  function showOverlay() {
  // Check if an overlay element already exists; if not, create one.
  let overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'overlay';
    // Style the overlay to cover the entire viewport.
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black
    overlay.style.zIndex = '400';  // Adjust z-index to be beneath modal menus
    document.body.appendChild(overlay);
  }
  // Display the overlay.
  overlay.style.display = 'block';
}

function hideOverlay() {
  // Hide the overlay if it exists.
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

      /*******************
       * BATTLE MENU EVENTS
       *******************/
      document.getElementById("attackBtn").addEventListener("click", () => {
		if (actionsLocked) return;
		lockActions();
		playerAttack("attack");

		if (Math.random() < player.agility * 0.0005) {
			dealPlayerDamage(1);
		}
      });
	  
	  function updateManaDisplay() {
  document.querySelectorAll("#manaText").forEach(el => {
    el.innerText = `${player.mana}/${player.maxMana}`;
  });

  const percentage = (player.mana / player.maxMana) * 100;
  document.getElementById("manaBarInner").style.width = `${percentage}%`;
  
  const spellCost = player.overrideManaCost || (gameDifficulty === "doom" ? 10 : 2);
  magicBtn.disabled = player.mana < spellCost;
}
	  
      const magicBtn = document.getElementById("magicBtn");
magicBtn.addEventListener("click", () => {
  if (actionsLocked) return;
  lockActions();

  // Determine spell cost: normally 2, but Six Eyes forces it to 1
  const spellCost = player.overrideManaCost || (gameDifficulty === "doom") ? 10 : 2;

  // Perform the magic attack
  playerAttack("magic");

  // Subtract mana (never below 0)
  player.mana = Math.max(0, player.mana - spellCost);
  updateManaDisplay();
  if (player.mana < spellCost) {
	  if (gameDifficulty !== "doom") {
        logBattle("Insufficient Mana. Cannot cast spells.");
	  } else {
		logBattle("Out of ammo...");
	  }
	  magicBtn.disabled = true;
    } else {
		magicBtn.disabled = false;
	}
	
	if (player.equipment.weapon && player.equipment.weapon.name === "Flame Belch" && currentEnemy.burned === false) {
      currentEnemy.burned = true;
	  logBattle(`You used the Flame Belch and incinerated ${currentEnemy.name}!`);
	  logBattle(`${currentEnemy.name} was burned!`);
	  updateStats();
	  updateManaDisplay();
	  updateEnemyInfo();
    }
});

document.getElementById("abilityBtn").addEventListener("click", () => {
  // Prevent spamming during animations/battles
  if (actionsLocked) return;
  lockActions();
  
  let manaCost = player.overrideManaCost || 10;
    if (!skillUsedThisBattle) {
      logBattle("You're too exhausted to do that again...");
    // re-unlock so battle can continue
    setTimeout(() => unlockActions(), 250);
    return;
    } else {
      if (player.mana < manaCost) {
		if (player.activeAbility !== "Sacrifice" && player.activeAbility !== "Rip and Tear" && player.activeAbility !== "None") {
			logBattle("Insufficient Mana!");
		}
      }
      useActiveAbility();
      skillUsedThisBattle = false;
      }
  
  setTimeout(() => unlockActions(), 250);
});

      document.getElementById("itemsBtn").addEventListener("click", () => {
		showInventoryMenu();
      });
      document.getElementById("runBtn").addEventListener("click", () => {
        if (actionsLocked) return;
		lockActions();
		attemptRun();
      });
      document.getElementById("itemsBtn").addEventListener("click", () => {
		showInventoryMenu(!!currentEnemy);
      });
	  
	  /*******************
       * CASINO FUNCTIONS
       *******************/
	  
      let casinoBet = 0;
      let casinoPlayerTotal = 0;
      let casinoEnemyTotal = 0;

      function openCasino(onComplete) {
  casinoCompleteCallback = onComplete || null;
  // reset hit buttons
  hitButtons.forEach(btn => {
    btn.style.display = "";   // back to whatever your CSS says
  });
  stopWorldMusic()
  casinoMusic.play();
  casinoPlayerTotal = 0;
  casinoEnemyTotal = 0;
  casinoPlayerTotalEl.textContent = casinoPlayerTotal;
  casinoEnemyTotalEl.textContent = casinoEnemyTotal;
  betInput.value = 1;
  casinoGameArea.style.display = "none";
  casinoMenu.style.display = "block";
  battleTint.style.display = "block";
}
	  
	  function finalizeCasinoRound() {
  // Calculate the absolute difference from 21 for both player and enemy
  const playerDiff = Math.abs(21 - casinoPlayerTotal);
  const enemyDiff = Math.abs(21 - casinoEnemyTotal);
  let outcome;
  // Decide outcome based on totals.
  // If both bust (over 21), choose the one closer to 21.
  if (casinoPlayerTotal >= 21 && casinoEnemyTotal >= 21) {
    outcome = playerDiff < enemyDiff ? "win" : (playerDiff > enemyDiff ? "lose" : "push");
  } 
  // If only one of them is over 21, then that side loses.
  else if (casinoPlayerTotal >= 21) {
    outcome = "lose";
  } 
  else if (casinoEnemyTotal >= 21) {
    outcome = "win";
  }
  // If neither busted, compare closeness.
  else {
    outcome = playerDiff < enemyDiff ? "win" : (playerDiff > enemyDiff ? "lose" : "push");
  }
  
  if (outcome === "win") {
    player.money += casinoBet;
    alert("You win! Gained $" + casinoBet);
  } else if (outcome === "lose") {
    player.money -= casinoBet;
    alert("You lose! Lost $" + casinoBet);
  } else {
    alert("Push! No money won or lost.");
  }
  updateStats();
  casinoMenu.style.display = "none";
  battleTint.style.display = "none";
  hideOverlay();
  if (casinoCompleteCallback) {
    const cb = casinoCompleteCallback;
    casinoCompleteCallback = null;
    cb();
  }
  casinoMusic.pause();
  casinoMusic.currentTime = 0;
  resumeWorldMusicAfterBattle();
}
	  
      placeBetBtn.addEventListener("click", () => {
        const bet = parseInt(betInput.value);
        if (isNaN(bet) || bet < 1) {
          alert("Please enter a valid bet amount.");
          return;
        }
        if (bet > player.money) {
          alert("You cannot bet more than you have!");
          return;
        }
        casinoBet = bet * Math.round(1 + player.fortune * 0.08);
        casinoGameArea.style.display = "block";
      });
      hitButtons.forEach((btn) => {
  btn.addEventListener("click", function onHit() {
    // Hide this hit button once pressed.
    btn.style.display = "none";
    
    // Player draws a card.
    const card = Math.floor(Math.random() * 13) + 1;
    casinoPlayerTotal += card;
    casinoPlayerTotalEl.textContent = casinoPlayerTotal;
    
    // If player's total exceeds 21 immediately, handle bust.
    if (casinoPlayerTotal >= 21) {
      alert("It's a bust! You lost.");
      concludeCasinoGame(true);
      return;
    }

	if (casinoEnemyTotal >= 21) {
        alert("Dealer had a bust! They lost.");
        concludeCasinoGame();
        return;
      }
    
    // Dealer draws a card if below 17.
    if (casinoEnemyTotal < 17) {
      const enemyCard = Math.floor(Math.random() * 13) + 1;
      casinoEnemyTotal += enemyCard;
      casinoEnemyTotalEl.textContent = casinoEnemyTotal;
      
      // If the dealer’s total goes over 21 immediately, win for the player.
      if (casinoEnemyTotal >= 21) {
        alert("Dealer had a bust! They lost.");
        concludeCasinoGame();
        return;
      }
    }
    
    // Check if no hit buttons remain visible.
    const remainingButtons = Array.from(hitButtons).filter(b => b.style.display !== "none");
    if (remainingButtons.length === 0) {
      // All hit buttons have vanished; finalize round based on closeness to 21.
      finalizeCasinoRound();
    }
  });
});

      standBtn.addEventListener("click", () => {
        while (casinoEnemyTotal < 17) {
          const enemyCard = Math.floor(Math.random() * 13) + 1;
          casinoEnemyTotal += enemyCard;
        }
        casinoEnemyTotalEl.textContent = casinoEnemyTotal;
        concludeCasinoGame();
      });
      hitButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          playerHit();
        });
      });
      // Modify the stand button event.
      standBtn.addEventListener("click", () => {
        while (casinoEnemyTotal < 17) {
          const enemyCard = Math.floor(Math.random() * 13) + 1;
          casinoEnemyTotal += enemyCard;
        }
        casinoEnemyTotalEl.textContent = casinoEnemyTotal;
        concludeCasinoGame();
      });

      function concludeCasinoGame(forcedLoss = false) {
        if (casinoPlayerTotal === 0) {
          alert("Your total is 0 – Penalty!");
          playerHit();
          return;
        }
        let playerBust = casinoPlayerTotal >= 21;
        let enemyBust = casinoEnemyTotal >= 21;
        let outcome;
        if (forcedLoss || playerBust) {
          outcome = "lose";
        } else if (enemyBust) {
          outcome = "win";
        } else {
          let bonus = hasItem("Dice") ? 2 : 0;
          let effectivePlayerTotal = Math.max(casinoPlayerTotal - bonus, 0);
          let playerDiff = 21 - effectivePlayerTotal;
          let enemyDiff = 21 - casinoEnemyTotal;
          if (playerDiff < 0) playerDiff = Infinity;
          if (enemyDiff < 0) enemyDiff = Infinity;
          if (playerDiff < enemyDiff) {
            outcome = "win";
          } else if (enemyDiff < playerDiff) {
            outcome = "lose";
          } else {
            outcome = "push";
          }
        }
        if (outcome === "win") {
          player.money += casinoBet;
          alert("You win! Gained $" + casinoBet);
        } else if (outcome === "lose") {
          player.money -= casinoBet;
          alert("You lose! Lost $" + casinoBet);
          if (player.money <= 0) {
            alert("You have run out of money and must leave the casino.");
          }
        } else {
          alert("Push! No money won or lost.");
        }
        updateStats();
        casinoMenu.style.display = "none";
		battleTint.style.display = "none";
		if (casinoCompleteCallback) {
    const cb = casinoCompleteCallback;
	casinoMusic.pause();
	casinoMusic.currentTime = 0;
    casinoCompleteCallback = null;
    cb();
  }
casinoMusic.pause();
casinoMusic.currentTime = 0;
      }
	  
	  function handleTrapRoom() {
  // 67% chance it doesn’t go off
  if (Math.random() < 0.67) {
    alert("You sense something's off… but nothing happens.");
    return;
  }

  // 20–30% of max HP
  const minPct = 0.20, maxPct = 0.30;
  const pct = Math.random() * (maxPct - minPct) + minPct;
  let damage = Math.floor(player.maxHp * pct);

  // if it was a disguised trap, only 1/3 damage
  if (map[ player.x + "_" + player.y ].disguisedTrap) {
    damage = Math.floor(damage / 3);
    alert("You fell into a trap!");
  } else {
    alert("You stepped on a trap!");
  }

  player.hp = Math.max(player.hp - damage, 0);
  alert(`You take ${damage} damage.`);
  updateStats();

  if (player.hp <= 0) {
    // immediate death handling
    battleTint.style.display = "none";
    battleMenu.style.display = "none";
    deathMenu.style.display = "block";
  }
}

function getEffectiveMaxHp() {
  const extra = getGuildBonuses();
  return player.maxHp * (1 + extra.hp);
}

function updatePlayerStatsUI() {
  // Update HP text: The hpText element might now show effective values.
  const effectiveMaxHp = getEffectiveMaxHp();
  document.getElementById("hpText").innerText = `${player.hp}/${effectiveMaxHp.toFixed(0)}`;
}

function updatePlayerStatusUI() {
  const cont = document.getElementById('player-status-container');
  cont.innerHTML = '';
  const { burned, poisoned, paralyzed, weakened, frozen, asleep } = player.statuses;
  if (burned)    cont.insertAdjacentHTML('beforeend','<span class="status-burned">Burned</span>');
  if (poisoned)  cont.insertAdjacentHTML('beforeend','<span class="status-poisoned">Poisoned</span>');
  if (weakened)  cont.insertAdjacentHTML('beforeend','<span class="status-weakened">Weakened</span>');
  if (paralyzed) cont.insertAdjacentHTML('beforeend','<span class="status-paralyzed">Paralyzed</span>');
  if (frozen > 0)  cont.insertAdjacentHTML('beforeend','<span class="status-frozen">Frozen</span>');
  if (asleep > 0)  cont.insertAdjacentHTML('beforeend','<span class="status-asleep">Asleep</span>');

}

/********************
	STATS UI
*******************/
function clampPlayerStats() {
  const statsToClamp = [
    'attack',
    'defense',
    'magic',
    'agility',
    'perception',
    'potential',
    'luck',
    'fortune',
    'dodgeChance'
  ];
  statsToClamp.forEach(stat => {
    if (player[stat] < 0) player[stat] = 0;
  });
}

      function updateStats() {
  const extra = getGuildBonuses();

  // ——— HP text & bar ———
  const effMaxHp = Math.floor(getEffectiveMaxHp());
  document.querySelectorAll("#hpText").forEach(el => {
    el.textContent = `${player.hp}/${effMaxHp}`;
  });
  // bar % uses effective max
  const hpPercent = (player.hp / effMaxHp) * 100;
  document.getElementById("hpBarInner").style.width = `${hpPercent}%`;
  
  // ——— Armor text & bar ———
  document.querySelectorAll("#armorText").forEach(el => {
	el.textContent = `${player.armor}/${player.maxArmor}`;
  });
  const armorPercent = (player.armor / player.maxArmor) * 100;
  document.getElementById("armorBarInner").style.width = `${armorPercent}%`;

  // ——— EXP text & bar ———
  document.querySelectorAll("#expText").forEach(el => {
    el.textContent = `${player.exp}/${player.expToLevel}`;
  });
  const expPercent = (player.exp / player.expToLevel) * 100;
  document.getElementById("expBarInner").style.width = `${expPercent}%`;

  // ——— Attack & Magic (both get damage bonus) ———
  const effAttack = Math.floor(player.attack * (1 + extra.damage));
  document.querySelectorAll("#attackStat").forEach(el => {
    el.textContent = effAttack;
  });
  const effMagic = Math.floor(player.magic * (1 + extra.damage));
  document.querySelectorAll("#magicStat").forEach(el => {
    el.textContent = effMagic;
  });

  // ——— The rest of your stats remain unchanged ———
  document.querySelectorAll("#defenseStat").forEach(el => {
    el.textContent = player.defense;
  });
  document.querySelectorAll("#agilityStat").forEach(el => {
    el.textContent = player.agility;
  });
  document.querySelectorAll("#perceptionStat").forEach(el => {
    el.textContent = player.perception;
  });
  document.querySelectorAll("#potentialStat").forEach(el => {
    el.textContent = player.potential;
  });
  document.querySelectorAll("#luckStat").forEach(el => {
    el.textContent = player.luck;
  });
  document.querySelectorAll("#fortuneStat").forEach(el => {
    el.textContent = player.fortune;
  });
  document.querySelectorAll("#moneyStat").forEach(el => {
    el.textContent = player.money;
  });

  // ——— Player Level label ——— (unchanged)
  document.querySelectorAll("#playerLevel").forEach(el => {
    if (gameDifficulty === "doom") {
      el.textContent = `Doom Guy Level: ${player.level}`;
    } else {
      el.textContent = `Player Level: ${player.level}`;
    }
  });
  
  document.getElementById("organizationText").textContent = player.organization;
  document.getElementById("guildRankText").textContent = player.guildUnlocked ? getGuildRank() : "None";
  document.getElementById("classText").textContent = player.playerClass;

  clampPlayerStats();
}

function updateInventoryDisplay() {
  const slots = document.querySelectorAll("#inventorySlots .inventorySlot");
  slots.forEach((slot, i) => {
    // Clear out old content, listeners, and classes
    slot.innerHTML = "";
    slot.className = "inventorySlot";

    const item = player.inventory[i];
    if (item) {
	  const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
	  slot.dataset.tooltip = `${cat}-type <br>"${item.description}"`;
      // 1. Show only the first word of the item name
      const firstWord = item.name.split(" ")[0];
      const nameEl = document.createElement("span");
      nameEl.textContent = firstWord;
      slot.appendChild(nameEl);

      // 2. Create the delete button (hidden by default)
      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "×";
      slot.appendChild(delBtn);

      // 3. Hover handlers to show/hide the button
      slot.addEventListener("mouseover", () => {
        delBtn.style.display = "inline";
      });
      slot.addEventListener("mouseout", () => {
        delBtn.style.display = "none";
      });

      // 4. Click handler to remove the item and refresh UI
      delBtn.addEventListener("click", () => {
        player.inventory[i] = null;
        updateStats();    // this also calls updateInventoryDisplay under the hood
      });

      // 5. Colorize slot based on existing item.type/category
      let cls;
      if (item.type === "equipment") {
        cls = item.category.toLowerCase();
	if (cls === "weapon") {
		cls = "weapon";
     	}
	if (cls === "armor") {
		cls = "armor";
     	}
	if (cls === "accessory") {
		cls = "accessory";
     	}
        if (cls === "dual-wieldable") {
		cls = "weapon";
     	}
      } else if (item.type === "misc" || item.category === "dragonball") {
        cls = "dragonball";
      } else {
        cls = "consumable";
      }
      slot.classList.add(cls);
    }
  });
  attachTooltip("#inventorySlots .inventorySlot[data-tooltip]");
}

/* Revised applyEquipmentEffects: resets to player.baseStats, then reapplies gear bonuses */
function applyEquipmentEffects() {
  // 1) Reset player stats from their true baseStats
  Object.assign(player, player.baseStats);
  player.canRowMovement = false;
  player.autoWinCasino = false;

  // 2) Apply each equipped item's effects on top
  Object.values(player.equipment).forEach(item => {
    if (item && equipmentEffects[item.name]) {
      equipmentEffects[item.name](player);
    }
  });
  
  const wpn = player.equipment.weapon && player.equipment.weapon.name;
  const skillName = weaponSkillMap[wpn] || "None";
  player.weaponSkill.name = skillName;
  player.weaponSkill.usedThisBattle = false;

  // update all UI spots
  document.querySelectorAll("#hudWeaponSkill").forEach(el => {
    el.textContent = skillName;
  });
  
  updateStats();
  updateManaDisplay();
}

// Open / close the Equipment modal
equipmentBtn.addEventListener("click", () => {
  equipmentMenu.style.display = "block";
  battleTint.style.display    = "block";
});
// (A) When closing the equipment menu, also hide inventoryMenu
closeEquipmentBtn.addEventListener("click", () => {
  equipmentMenu.style.display = "none";
  inventoryMenu.style.display  = "none";
  battleTint.style.display     = "none";
});

// Populate slots when opening
// (B) Update the UI‐refresh to use "None"
function updateEquipmentUI() {
  document.querySelectorAll(".equipmentSlot").forEach(el => {
    const slot = el.dataset.slot;
    el.querySelector(".slot-item").textContent =
      player.equipment[slot]?.name || "Empty";
  });
}
// Call this once on load to show “Empty” everywhere:
updateEquipmentUI();

// Clicking a slot → show only matching inventory items
document.querySelectorAll(".equipmentSlot").forEach(slotEl => {
  slotEl.addEventListener("click", () => {
    const category = slotEl.dataset.slot; // "weapon"|"armor"|"accessory"
    showEquipmentInventory(category);
  });
});

function showEquipmentInventory(category) {
  inventoryMenu.style.display = "block";
  inventoryMenu.innerHTML = `<h3>Select a ${category} to equip:</h3>`;
  let any = false;

  player.inventory.forEach((item, idx) => {
    if (!item || item.type !== "equipment") return;

    if (category === "armor") {
      if (item.category !== "armor") return;
    } else {
      if (item.category !== category && item.category !== "dual-wieldable") return;
    }

    any = true;
    const btn = document.createElement("button");
    btn.textContent = item.name;
    btn.addEventListener("click", () => {
      equipItem(category, idx);
      inventoryMenu.style.display = "none";
    });
    inventoryMenu.appendChild(btn);
  });

  if (!any) {
    inventoryMenu.innerHTML += "<p>No items available.</p>";
  }
}

// Equip logic: swap into slot (unequipping old one back into inventory)
function equipItem(category, invIndex) {
  const newItem = player.inventory[invIndex];
  const oldItem = player.equipment[category];

  // Put old item back if present
  if (oldItem) player.inventory[invIndex] = oldItem;
  else         player.inventory[invIndex] = null;

  // Equip new one
  player.equipment[category] = newItem;

  applyEquipmentEffects();
  updateEquipmentUI();
  updateInventoryDisplay();
  
  inventoryMenu.style.display = "none";
}

// Unequip via the “×” button
document.querySelectorAll(".unequipBtn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const category = btn.dataset.slot;
    const itm = player.equipment[category];
    if (!itm) return;

    const freeIdx = player.inventory.findIndex(s => s === null);
    if (freeIdx < 0) {
      alert("Inventory is full!");
      return;
    }

    // Move it back, clear the slot
    player.inventory[freeIdx] = itm;
    player.equipment[category]  = null;

    applyEquipmentEffects();
    updateEquipmentUI();
    updateInventoryDisplay();
  });
});

let lastHealTime = Date.now();

setInterval(() => {
  if (battleTint.style.display === "block") {
    lastHealTime = Date.now();
    return;
  }
  if (Date.now() - lastHealTime >= 333) {
    if (player.armor < player.maxArmor) {
      player.armor = Math.min(player.armor + 1, player.maxArmor);
      updateStats();
      updateManaDisplay();
      updateInventoryDisplay();
    }
    lastHealTime = Date.now();
  }
  if (Date.now() - lastHealTime >= 10000) {
    if (player.hp < player.maxHp) {
      player.hp = Math.min(player.hp + 1, player.maxHp);
      updateStats();
      updateManaDisplay();
      updateInventoryDisplay();
    }
    lastHealTime = Date.now();
  }
}, 50);



function checkDragonBalls() {
  const balls = player.inventory.filter(i => i && i.name === "DragonBall").length;
  if (balls >= 7) {
    player.inventory = player.inventory.map(i =>
      (i && i.name === "DragonBall") ? null : i
    );
    updateInventoryDisplay();
    showWishMenu();
  }
}

function showWishMenu() {
  document.getElementById("wishMenu").style.display = "flex";
}

document.getElementById("wishPowerBtn").addEventListener("click", () => {
  initiateLevelUp(50);
  alert("Your wish has been granted... Seek the Dragon Balls once more if you wish to see me again.");
  closeWishMenu();
});

document.getElementById("wishRichesBtn").addEventListener("click", () => {
  player.money += 1000000000;
  updateStats();
  alert("Your wish has been granted... Seek the Dragon Balls once more if you wish to see me again.");
  closeWishMenu();
});

document.getElementById("wishFameBtn").addEventListener("click", () => {
  player.luck      += 20;
  player.fortune   += 20;
  player.potential += 20;
  player.hp   = player.maxHp * 2;
  player.mana = player.maxMana * 2;

  player.guildUnlocked     = true;
  player.guildMissionStage = 7;
  player.guildMissionKills = getCurrentMissionRequirement();

  updateStats();
  updateManaDisplay();
  updateGuildRankUI();
  alert("Your wish has been granted... Seek the Dragon Balls once more if you wish to see me again.");
  closeWishMenu();
});

function closeWishMenu() {
  document.getElementById("wishMenu").style.display = "none";
}

      /*******************
       * START THE GAME
       *******************/
	   
	   (function() {
  const titleScreen   = document.getElementById("titleScreen");
  const playButton    = document.getElementById("playButton");
  const dotsEl        = document.getElementById("dots");

  // Prevent any title‐screen audio/UI until loading completes
  titleScreen.style.display = "none";
  const delay = 10000 + Math.random() * 10000;

  setTimeout(() => {
    // 1) change text to "Completed!"
    const textDiv = loadingScreen.querySelector(".loading-text");
    textDiv.textContent = "Loading Completed!";

    // 2) after a short moment, fade out
    setTimeout(() => {
      loadingScreen.style.opacity = "0";

      // 3) once fade completes, remove overlay & show title screen
      loadingScreen.addEventListener("transitionend", () => {
        loadingScreen.remove();
        titleScreen.style.display = "flex";
        // also reveal playButton if your logic shows it then:
        playButton.style.display = "";
      }, { once: true });

    }, 500); // hold “Completed!” for 0.5s

  }, delay);
})();
	   
initGame();