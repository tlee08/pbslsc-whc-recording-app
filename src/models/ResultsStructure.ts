import type MemberShort from "./MemberShort";

export default interface ResultsStructure {
  [date: string]: {
    [event: string]: {
      [gender: string]: MemberShort[];
    };
  };
}
