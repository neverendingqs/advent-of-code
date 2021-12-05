use std::fs::File;
use std::io::{self, BufRead};

fn read_file() -> io::Lines<io::BufReader<File>> {
  let path = format!("src/aoc03/input.txt");
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
  String::new()
}

fn p2() -> String {
  String::new()
}

pub fn answer() {
  println!("Day {}", "03");
  println!("p1: {}", p1());
  println!("p2: {}", p2());
}
