use std::env;

mod aoc01;
mod aoc02;
mod aoc03;
mod aoc04;
mod aoc05;
mod aoc06;
mod aoc07;
mod aoc08;
mod aoc09;
mod aoc10;
mod aoc11;
mod aoc12;
mod aoc13;
mod aoc14;
mod aoc15;
mod aoc16;
mod aoc17;
mod aoc18;
mod aoc19;
mod aoc20;
mod aoc21;
mod aoc22;
mod aoc23;
mod aoc24;
mod aoc25;

fn main() {
  let args: Vec<String> = env::args().collect();
  let day: &String = &args[1];

  match day.as_str() {
    "01" => aoc01::answer(),
    "02" => aoc02::answer(),
    "03" => aoc03::answer(),
    "04" => aoc04::answer(),
    "05" => aoc05::answer(),
    "06" => aoc06::answer(),
    "07" => aoc07::answer(),
    "08" => aoc08::answer(),
    "09" => aoc09::answer(),
    "10" => aoc10::answer(),
    "11" => aoc11::answer(),
    "12" => aoc12::answer(),
    "13" => aoc13::answer(),
    "14" => aoc14::answer(),
    "15" => aoc15::answer(),
    "16" => aoc16::answer(),
    "17" => aoc17::answer(),
    "18" => aoc18::answer(),
    "19" => aoc19::answer(),
    "20" => aoc20::answer(),
    "21" => aoc21::answer(),
    "22" => aoc22::answer(),
    "23" => aoc23::answer(),
    "24" => aoc24::answer(),
    "25" => aoc25::answer(),
    _ => panic!("Day '{}' not found!", day),
  }
}
