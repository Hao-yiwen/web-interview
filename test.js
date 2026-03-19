console.log("a");

(async function das() {
    console.log("b");
    await null
    console.log("d")
})();

console.log("c");