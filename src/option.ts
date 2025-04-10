import Result from "./result";

type Maybe<T> = {some: T}|{null: null};

export default class Option<T> {
	private v: Maybe<T>;
	constructor(v: Maybe<T>) {
		this.v = v;
	}

	static Some<T>(some: T): Option<T> {
		return new Option({some});
	}

	static None<T>(): Option<T> {
		return new Option({null: null});
	}

	isSome() {
		return typeof this.v !== null;
	}

	isNone() {
		return typeof this.v === null;
	}

	ok<E>(err: E): Result<T, E> {
		if ("some" in this.v) {
			return Result.Ok(this.v.some);
		} else {
			return Result.Err(err)
		}
	}

	err<T1>(ok: T1): Result<T, T1> {
		if ("some" in this.v) {
			return Result.Ok(this.v.some)
		} else {
			return Result.Err(ok);
		}
	}

	flatMap<X>(f: (a: T)=>Option<X>): Option<X> {
		if ("some" in this.v) {
			return f(this.v.some);
		} else {
			return Option.None();
		}
	}

	map<X>(f: (a: T)=>X): Option<X> {
		return this.flatMap(x=>Option.Some(f(x)));
	}

}
