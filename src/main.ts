import Result from "./result";

console.log("Hello, world")

const x = new Promise<string>(resolve=>{
	resolve("uwu");
	throw {errCode: 3};
});
const y = new Promise<string>(_=>{
	throw {errCode: 3};
});

function isErr(e: unknown): e is {errCode: number} {
	if (!!e && typeof e === "object" && "errCode" in e) {
		return typeof e.errCode === "number"
	}
	return false
}

(async ()=>{
})();

