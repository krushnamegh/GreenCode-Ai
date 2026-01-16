import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  Language.Python,
  Language.JavaScript,
  Language.TypeScript,
  Language.Java,
  Language.CPP,
  Language.Go,
  Language.Rust,
  Language.PHP
];

export const INITIAL_CODE_EXAMPLES: Record<Language, string> = {
  [Language.Python]: `def process_data(data):
    results = []
    # Inefficient nested loop example
    for i in range(len(data)):
        for j in range(len(data)):
            if data[i] == data[j]:
                results.append(data[i] * 2)
    return results`,
  [Language.JavaScript]: `function processData(data) {
  const results = [];
  // Inefficient O(n^2) operation
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i] === data[j]) {
        results.push(data[i] * 2);
      }
    }
  }
  return results;
}`,
  [Language.TypeScript]: `function processData(data: number[]): number[] {
  const results: number[] = [];
  for (let i = 0; i < data.length; i++) {
    results.push(data.filter(x => x === data[i]).length);
  }
  return results;
}`,
  [Language.Java]: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public List<Integer> processData(List<Integer> data) {
        List<Integer> results = new ArrayList<>();
        for (int i = 0; i < data.size(); i++) {
            for (int j = 0; j < data.size(); j++) {
                 if (data.get(i).equals(data.get(j))) {
                     results.add(data.get(i) * 2);
                 }
            }
        }
        return results;
    }
}`,
  [Language.CPP]: `#include <vector>

std::vector<int> processData(const std::vector<int>& data) {
    std::vector<int> results;
    for (size_t i = 0; i < data.size(); ++i) {
        for (size_t j = 0; j < data.size(); ++j) {
            if (data[i] == data[j]) {
                results.push_back(data[i] * 2);
            }
        }
    }
    return results;
}`,
  [Language.Go]: `package main

func processData(data []int) []int {
    results := []int{}
    for i := 0; i < len(data); i++ {
        for j := 0; j < len(data); j++ {
            if data[i] == data[j] {
                results = append(results, data[i]*2)
            }
        }
    }
    return results
}`,
  [Language.Rust]: `fn process_data(data: &[i32]) -> Vec<i32> {
    let mut results = Vec::new();
    for i in 0..data.len() {
        for j in 0..data.len() {
            if data[i] == data[j] {
                results.push(data[i] * 2);
            }
        }
    }
    results
}`,
  [Language.PHP]: `<?php
function processData($data) {
    $results = [];
    $count = count($data);
    for ($i = 0; $i < $count; $i++) {
        for ($j = 0; $j < $count; $j++) {
            if ($data[$i] == $data[$j]) {
                $results[] = $data[$i] * 2;
            }
        }
    }
    return $results;
}`
};
