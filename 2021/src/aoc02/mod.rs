use std::fs::File;
use std::io::{self, BufRead};

fn read_file() -> io::Lines<io::BufReader<File>> {
  let path = format!("src/aoc02/input.txt");
  let file = File::open(path).unwrap();
  io::BufReader::new(file).lines()
}

fn parse_line(line: io::Result<String>) -> (&str, i32) {
  // "creates a temporary which is freed while still in use"
  let unwrapped = line.unwrap();
  let parts: Vec<&str> = unwrapped.split_whitespace().collect();
  let direction = parts[0];
  let value = parts[1].parse::<i32>().unwrap();

  (direction, value)
}

fn p1() -> String {
  let mut h_pos = 0;
  let mut depth = 0;

  for line in read_file() {
    let (direction, value) = parse_line(line);
    match direction {
      "forward" => h_pos += value,
      "down" => depth += value,
      "up" => depth -= value,
      _ => panic!("Unexpected direction '{}'", direction),
    }
  }

  format!("{}", h_pos * depth)
}

fn p2() -> String {
  String::new()
}

pub fn answer() {
  println!("Day {}", "02");
  println!("p1: {}", p1());
  println!("p2: {}", p2());
}
