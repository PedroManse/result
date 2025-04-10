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
	return !!e && typeof e === "object" && "errCode" in e;
}

const x1 = Result.fromPromise(x, isErr);
const y1 = Result.fromPromise(y, isErr);
(async ()=>{
	const x2 = await x1;
	console.log(x2);
	const y2 = await y1;
	console.log(y2);
})();

