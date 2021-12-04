use std::fs::File;
use std::io::{self, BufRead};

fn read_file() -> io::Lines<io::BufReader<File>> {
  let path = format!("src/aoc01/input.txt");
  let file = File::open(path).unwrap();
  io::BufReader::new(file).lines()
}

fn num_increases(lines: Vec<i32>) -> String {
  let mut prev_value = -1;
  let mut num_increases = -1;
  for line in lines {
    if prev_value < line {
      num_increases += 1;
    }
    prev_value = line;
  }

  num_increases.to_string()
}

fn p1() -> String {
  let lines: Vec<i32> = read_file()
    .map(|line| line.unwrap().parse::<i32>().unwrap())
    .collect();

  num_increases(lines)
}

fn p2() -> String {
  let readings: Vec<i32> = read_file()
    .map(|line| line.unwrap().parse::<i32>().unwrap())
    .collect();

  let mut sums = vec![0; readings.len() - 2];
  for i in 2..readings.len() {
    sums[i - 2] = readings[i - 2] + readings[i - 1] + readings[i];
  }

  num_increases(sums)
}

pub fn answer() {
  println!("Day {}", "01");
  println!("p1: {}", p1()); // 1715
  println!("p2: {}", p2()); // 1739
}
