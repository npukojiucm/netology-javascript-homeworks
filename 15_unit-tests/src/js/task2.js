export default function sortHeroesHealth(heroesObj) {
  return heroesObj.sort((a, b) => b.health - a.health);
}
