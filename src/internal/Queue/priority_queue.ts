export type PriorityComparator<T> = (curValue: T, comparedValue: T) => number;
abstract class PriorityQueue<T extends PriorityComparator<T>> {}
