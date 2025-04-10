import Option from "./option.js";

type Either<T, E> = {ok: T}|{err: E};

export default class Result<T, E> {
	private v: Either<T, E>;
	constructor(v: Either<T, E>) {
		this.v = v;
	}

	static Ok<T, E>(ok: T): Result<T, E> {
		return new Result({ok})
	}

	static Err<T, E>(err: E): Result<T, E> {
		return new Result({err})
	}

	static async fromPromise<T, E>(
		prom: Promise<T>,
		isErr: (x:unknown)=>x is E,
	): Promise<Result<T, E>> {
		return prom
		.then(Result.Ok<T, E>)
		.catch((e)=>{
			if (isErr(e)) {
				return Result.Err(e) as Result<T, E>
			}
			throw new Error("Making Promise<Result> failed");
		})
		;
		
	}

	asOk(): Option<T> {
		if  ("ok" in this.v) {
			return Option.Some(this.v.ok)
		} else {
			return Option.None()
		}
	}

	asErr(): Option<E> {
		if ("err" in this.v) {
			return Option.Some(this.v.err)
		} else {
			return Option.None()
		}
	}

	flatMap<X>(f: (a: T)=>Result<X, E>): Result<X, E> {
		if ("ok" in this.v) {
			return f(this.v.ok);
		} else {
			return Result.Err(this.v.err)
		}
	}

	map<X>(f: (a: T)=>X): Result<X, E> {
		return this.flatMap(x=>Result.Ok(f(x)))
	}

}

