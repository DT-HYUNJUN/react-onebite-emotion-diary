// function taskA(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const res = a + b
//       resolve(res)
//     }, 1000)
//   })
// }

// Promise 객체
function weather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const abc = `${city}날씨는 선풍기 바람 많이 붐`
      resolve(abc)
    }, 2000)
  })
}

console.log('start')
weather('구미').then((res) => {
  res.json()
})
console.log('end')