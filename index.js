const rnd = (n) => Math.floor(Math.random() * n)
const arr = (n) => new Array(n).fill().map(v => rnd(n))
const getIntersect_includes = (a, b) => {
  return b.filter(v => a.includes(v))
}
const getIntersect_set = (a, b) => {
  const set = new Set(a)
  return b.filter(v => set.has(v))
}
const getIntersect_obj = (a, b) => {
  const obj = a.reduce((acc, v) => {
    acc[v] = true
    return acc
  }, {})
  return b.filter(v => obj[v])
}

const testSet = async (a, b) => {
  console.time("- Using set     ")
  const result = getIntersect_set(a, b)
  console.timeEnd("- Using set     ")
  return result
}
const testIncludes = async (a, b) => {
  console.time("- Using includes")
  const result = getIntersect_includes(a, b)
  console.timeEnd("- Using includes")
  return result
}

const testObj = async (a, b) => {
  console.time("- Using obj")
  const result = getIntersect_obj(a, b)
  console.timeEnd("- Using obj")
  return result
}


(async () => {
  for (let x = 100; x <= 100000; x *= 10) {
    const list1 = arr(x)
    const list2 = arr(x)
    console.log(`Testing ${x} items per list ...`)
    const [res1, res2] = await Promise.all([
      testSet(list1, list2),
      testIncludes(list1, list2),
      testObj(list1, list2)
    ])
  }
})()
