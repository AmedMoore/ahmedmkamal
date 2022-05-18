export class Optional<T> {
  private constructor(private _value?: T | null) {}

  public static of<T>(value?: T | null): Optional<T> {
    return new Optional<T>(value);
  }

  public static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  public get maybe(): T | null | undefined {
    return this._value;
  }

  public get hasValue(): boolean {
    return typeof this._value !== "undefined" && this._value !== null;
  }

  public get value(): T {
    if (!this.hasValue) {
      throw new Error("trying to access value on an empty optional");
    }
    return this._value!;
  }

  public set value(value: T) {
    this._value = value;
  }
}
