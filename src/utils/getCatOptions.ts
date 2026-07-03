import type ResultsStructure from "../models/ResultsStructure";

function getDatesOptions(results: ResultsStructure) {
  return Object.keys(results).map((key) => ({ label: key, value: key }));
}

function getEventsOptions(results: ResultsStructure, dateValue: string) {
  return Object.keys(results[dateValue] ?? {}).map((key) => ({ label: key, value: key }));
}

function getGendersOptions(results: ResultsStructure, dateValue: string, eventValue: string) {
  return Object.keys(results[dateValue]?.[eventValue] ?? {}).map((key) => ({ label: key, value: key }));
}

export { getDatesOptions, getEventsOptions, getGendersOptions };
