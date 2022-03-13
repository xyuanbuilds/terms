export interface IComparable<T> {
  less(other: T): boolean;
  equals(other: T): boolean;
}
