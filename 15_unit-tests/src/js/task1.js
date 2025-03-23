export default function showHealth(heroesObj) {
  if (heroesObj.health > 50) {
    return 'healthy';
  } if (heroesObj.health <= 50 && heroesObj.health > 15) {
    return 'wounded';
  }
  return 'critical';
}
