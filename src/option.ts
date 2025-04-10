import { compose, isFn } from "./func";
import Result from "./result";

type Maybe<T> = { some: T } | { null: null };

export default class Option<T> {
	private v: Maybe<T>;
	constructor(v: Maybe<T>) {
		this.v = v;
	}

	// base components
	static Some<T>(some: T): Option<T> {
		return new Option({ some });
	}

	static None<T>(): Option<T> {
		return new Option({ null: null });
	}

	isSome() {
		return typeof this.v !== null;
	}

	isNone() {
		return typeof this.v === null;
	}

	case<X_SOME, X_NONE>(
		fn_some: (a: T) => X_SOME,
		fn_none: X_NONE | (() => X_NONE),
	): X_SOME | X_NONE {
		if ("some" in this.v) {
			return fn_some(this.v.some)
		} else {
			return isFn(fn_none) ? fn_none() : fn_none;
		}
	}

	// abstract components
	ok<E>(err: E): Result<T, E> {
		return this.case(
			Result.Ok<T, E>,
			Result.Err(err)
		);
	}

	err<nT>(err: nT): Result<nT, T> {
		return this.case(
			Result.Err<nT, T>,
			Result.Ok(err)
		);
	}

	flatMap<X>(f: (a: T) => Option<X>): Option<X> {
		return this.case(
			f,
			Option.None<X>
		);
	}

	map<X>(f: (a: T) => X): Option<X> {
		return this.flatMap(compose(f, Option.Some));
	}

	static transpose<T, E>(r: Option<Result<T, E>>): Result<Option<T>, E> {
		return r.case(
			s => s.map(Option.Some),
			Result.Ok(Option.None())
		);
	}
}
