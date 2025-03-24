export default class Team {
  constructor() {
    this.members = new Set();
  }

  add(player) {
    if (!this.members.has(player)) return this.members.add(player);
    throw new Error('This player is already a member of the team');
  }

  addAll(...players) {
    return players[0].forEach((player) => this.members.add(player));
  }

  toArray() {
    this.members = Array.from(this.members);
    return this.members;
  }
}
