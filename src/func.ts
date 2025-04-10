export function compose<A, B, C>(
	f: (a: A)=>B,
	g: (b: B)=>C
): (a: A)=>C {
	return (a)=>g(f(a))
}

export function isFn(a: unknown): a is Function {
	return typeof a === "function";
}
