const object = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };

export default function orderByProps(obj, arrProp) {
  const result = [];

  arrProp.forEach((element) => {
    result.push({
      key: element,
      value: obj[element],
    });
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const prop of Object.keys(obj).sort()) {
    // eslint-disable-next-line no-continue
    if (arrProp.includes(prop)) continue;
    result.push({
      key: prop,
      value: obj[prop],
    });
  }
  return result;
}
