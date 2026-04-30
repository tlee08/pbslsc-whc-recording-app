export default interface EventStructure {
  dates: {
    label: string;
    value: string;
    events: {
      label: string;
      value: string;
      genders: {
        label: string;
        value: string;
      }[];
    }[];
  }[];
}
