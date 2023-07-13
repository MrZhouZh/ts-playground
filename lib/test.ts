type SetA = 1 | 2 | 3 | 4
type SetB = 4 | 5 | 6

type A = {
  name: string;
  age: number;
  addr: string;
}

type B = {
  name: string;
  adult: boolean;
  addr: number;
}

type ObjectInter<T extends object, U extends object> = Pick<U, Extract<keyof T, keyof U>>
type AB = ObjectInter<A, B>
// type AB = {
//   name: string;
//   addr: number;
// }

type ObjectDiff<T extends object, U extends object> = Omit<U, Extract<keyof T, keyof U>>
type ABDiff = ObjectDiff<A, B>
// type ABDiff = {
//   adult: boolean;
// }
type ObjectDiff2<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>
type ABDiff2 = ObjectDiff2<A, B>
// type ABDiff2 = {
//   age: number;
// }
type ObjectDiff3<T extends object, U extends object> = Omit<T, keyof U>
type ABDiff3 = ObjectDiff3<A, B>
// type ABDiff3 = {
//   age: number;
// }

// 交集
type AExtractB = Extract<SetA, SetB>  // 4
// A 差集
type AExcludeB = Exclude<SetA, SetB>  // 1 | 2 | 3
// B 差集
type BExcludeA = Exclude<SetB, SetA>  // 5 | 6
// 并集
type AUnionB = SetA | SetB

