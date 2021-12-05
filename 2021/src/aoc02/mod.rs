use std::fs::File;
use std::io::{self, BufRead};

fn read_file() -> io::Lines<io::BufReader<File>> {
  let path = format!("src/aoc02/input.txt");
  let file = File::open(path).unwrap();
  io::BufReader::new(file).lines()
}

fn parse_line<'a>(line: &'a io::Result<String>) -> (&'a str, i32) {
  // Reason for `as_ref()`
  // "move occurs because `*line` has type `Result<String, std::io::Error>`, which does not implement the `Copy` trait"
  let unwrapped = line.as_ref().unwrap();

  // Reason for `unwrapped` temp variable
  // "creates a temporary which is freed while still in use"
  let parts: Vec<&str> = unwrapped.split_whitespace().collect();
  let direction = parts[0];
  let value = parts[1].parse::<i32>().unwrap();

  (direction, value)
}

fn p1() -> String {
  let mut h_pos = 0;
  let mut depth = 0;

  for line in read_file() {
    let (direction, value) = parse_line(&line);
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
  let mut aim = 0;
  let mut h_pos = 0;
  let mut depth = 0;

  for line in read_file() {
    let (direction, value) = parse_line(&line);
    match direction {
      "forward" => {
        h_pos += value;
        depth += value * aim;
      },
      "down" => aim += value,
      "up" => aim -= value,
      _ => panic!("Unexpected direction '{}'", direction),
    }
  }

  format!("{}", h_pos * depth)
}

pub fn answer() {
  println!("Day {}", "02");
  println!("p1: {}", p1());
  println!("p2: {}", p2());
}
