const array = [{
  name: 'afs'
}, {
  name: 'fgs'
}, {
  name: 'dds'
}, {
  name: 'css'
}];
console.log(array.sort((a, b) => {
  return a.name.localeCompare(b.name);
}));
