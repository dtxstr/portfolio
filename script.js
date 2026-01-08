const timeZone = "America/Chicago";

function updateTimeAndTheme() {
  const now = new Date();

  // Clock (DST-aware)
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  document.getElementById("clock").textContent =
    timeFormatter.format(now);

  // CST / CDT label
  const tzName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(now)
    .find(p => p.type === "timeZoneName").value;

  document.getElementById("tz").textContent = tzName;

  // Hour + Month for season-aware day/night
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      hour12: false,
    }).format(now)
  );

  const month = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      month: "numeric",
    }).format(now)
  );

  // Season-aware sunrise/sunset
  let sunrise = 7, sunset = 17;

  if (month <= 2 || month === 11 || month === 12) { // Winter
    sunrise = 7; sunset = 17;
  } else if (month >= 3 && month <= 4 || month === 10) { // Spring/Fall
    sunrise = 6; sunset = 18;
  } else { // Summer
    sunrise = 6; sunset = 20;
  }

  const hero = document.getElementById("hero");
  if (hour >= sunrise && hour < sunset) {
    hero.classList.add("day");
    hero.classList.remove("night");
  } else {
    hero.classList.add("night");
    hero.classList.remove("day");
  }
}

// Run every second
setInterval(updateTimeAndTheme, 1000);
updateTimeAndTheme();

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();
