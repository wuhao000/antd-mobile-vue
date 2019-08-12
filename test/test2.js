const date = new Date();
console.log(date.getHours());
console.log(date.getUTCHours());
console.log(date);
date.setUTCHours(1);
console.log(date);
date.setHours(16);
console.log(date);
