export default class ErrorRepository {
  constructor() {
    this.errors = new Map([
      [1, 'Key error'],
      [2, 'Value error'],
      [3, 'Syntax error'],
    ]);
  }

  translate(code) {
    if (this.errors.has(code)) return this.errors.get(code);
    return 'Unknown error';
  }
}
