export type Gender = "Male" | "Female";
export type Tri = "Yes" | "No" | "Maybe";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string; // ISO
  age: number;
  country: string;
  city: string;
  height: number; // cm
  email: string;
  phone: string;
  college: string;
  degree: string;
  income: number; // INR lakhs/year
  company: string;
  designation: string;
  maritalStatus: "Never Married" | "Divorced" | "Widowed";
  languages: string[];
  siblings: number;
  caste: string;
  religion: string;
  motherTongue: string;
  diet: "Vegetarian" | "Non-Vegetarian" | "Eggetarian" | "Vegan";
  drinks: "Never" | "Socially" | "Often";
  smokes: "Never" | "Socially" | "Often";
  wantKids: Tri;
  openToRelocate: Tri;
  openToPets: Tri;
  hobbies: string[];
  about: string;
  status?: "New" | "Active" | "Match Sent" | "On Hold" | "Engaged";
}

const MALE_FIRST = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Krishna", "Ishaan", "Rohan", "Karan", "Rahul", "Rajat", "Aniket", "Dev", "Kabir", "Yash", "Nikhil", "Siddharth", "Aman", "Manish", "Pranav", "Tarun", "Varun", "Harsh", "Akash", "Raj", "Sameer", "Tushar", "Mihir"];
const FEMALE_FIRST = ["Aanya", "Diya", "Saanvi", "Aadhya", "Myra", "Anika", "Pari", "Riya", "Anaya", "Kiara", "Ananya", "Ishita", "Meera", "Priya", "Neha", "Pooja", "Sneha", "Shruti", "Kavya", "Tanvi", "Aditi", "Sakshi", "Ritika", "Nisha", "Megha", "Divya", "Swati", "Payal", "Anjali", "Sonal"];
const LAST = ["Sharma", "Verma", "Iyer", "Reddy", "Kapoor", "Khanna", "Mehta", "Patel", "Gupta", "Singh", "Nair", "Menon", "Pillai", "Joshi", "Bhatia", "Chopra", "Malhotra", "Agarwal", "Bose", "Das", "Ghosh", "Mukherjee", "Rao", "Krishnan", "Subramanian"];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "Jaipur"];
const COLLEGES = ["IIT Bombay", "IIT Delhi", "IIM Ahmedabad", "BITS Pilani", "Delhi University", "NIT Trichy", "St. Xavier's Mumbai", "VIT Vellore", "Symbiosis Pune", "Christ University"];
const DEGREES = ["B.Tech Computer Science", "MBA Finance", "B.Com Honors", "M.Tech AI", "MBBS", "B.Arch", "B.Des", "CA", "M.A. Economics", "LLB"];
const COMPANIES = ["Google", "Microsoft", "Goldman Sachs", "TCS", "Infosys", "Flipkart", "Zomato", "Razorpay", "McKinsey", "Deloitte", "Swiggy", "PhonePe", "Adobe"];
const DESIGNATIONS = ["Software Engineer", "Product Manager", "Data Scientist", "Consultant", "Designer", "Marketing Manager", "Architect", "Doctor", "Lawyer", "Investment Banker"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain"];
const CASTES = ["Brahmin", "Kshatriya", "Vaishya", "Khatri", "Agarwal", "Iyer", "Iyengar", "Reddy", "Nair", "Maratha", "Open"];
const LANGS = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Punjabi", "Kannada", "Malayalam"];
const HOBBIES = ["Travel", "Reading", "Cooking", "Yoga", "Photography", "Hiking", "Music", "Painting", "Dancing", "Fitness", "Gaming", "Writing"];
const STATUSES: Profile["status"][] = ["New", "Active", "Match Sent", "On Hold"];

// Seeded RNG so data is stable across renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(rng: () => number, arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  }
  return out;
}

function makeProfile(idx: number, gender: Gender, isCustomer: boolean): Profile {
  const rng = mulberry32((isCustomer ? 1000 : 5000) + idx);
  const firstNames = gender === "Male" ? MALE_FIRST : FEMALE_FIRST;
  const firstName = pick(rng, firstNames);
  const lastName = pick(rng, LAST);
  const age = 24 + Math.floor(rng() * 14); // 24-37
  const year = new Date().getFullYear() - age;
  const month = 1 + Math.floor(rng() * 12);
  const day = 1 + Math.floor(rng() * 28);
  const heightBase = gender === "Male" ? 165 : 150;
  const height = heightBase + Math.floor(rng() * 25);
  const income = 8 + Math.floor(rng() * 60); // 8 - 68 LPA
  const triOpts: Tri[] = ["Yes", "No", "Maybe"];
  const id = `${isCustomer ? "c" : "p"}${idx}`;
  return {
    id,
    firstName,
    lastName,
    gender,
    dob: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    age,
    country: "India",
    city: pick(rng, CITIES),
    height,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idx}@example.com`,
    phone: `+91 9${Math.floor(rng() * 900000000 + 100000000)}`,
    college: pick(rng, COLLEGES),
    degree: pick(rng, DEGREES),
    income,
    company: pick(rng, COMPANIES),
    designation: pick(rng, DESIGNATIONS),
    maritalStatus: rng() < 0.85 ? "Never Married" : rng() < 0.5 ? "Divorced" : "Widowed",
    languages: pickN(rng, LANGS, 2 + Math.floor(rng() * 2)),
    siblings: Math.floor(rng() * 4),
    caste: pick(rng, CASTES),
    religion: pick(rng, RELIGIONS),
    motherTongue: pick(rng, LANGS),
    diet: pick(rng, ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"] as const),
    drinks: pick(rng, ["Never", "Socially", "Often"] as const),
    smokes: pick(rng, ["Never", "Socially", "Often"] as const),
    wantKids: pick(rng, triOpts),
    openToRelocate: pick(rng, triOpts),
    openToPets: pick(rng, triOpts),
    hobbies: pickN(rng, HOBBIES, 3),
    about: `${firstName} is a ${pick(rng, ["thoughtful", "ambitious", "warm", "curious", "grounded"])} ${pick(rng, DESIGNATIONS).toLowerCase()} based in ${pick(rng, CITIES)} who values family, growth, and shared adventures.`,
    status: isCustomer ? pick(rng, STATUSES)! : undefined,
  };
}

// 12 customers (mix of genders)
export const CUSTOMERS: Profile[] = Array.from({ length: 12 }, (_, i) =>
  makeProfile(i, i % 2 === 0 ? "Male" : "Female", true),
);

// 120 dummy profiles (60 of each gender)
export const DUMMY_PROFILES: Profile[] = [
  ...Array.from({ length: 60 }, (_, i) => makeProfile(i, "Female", false)),
  ...Array.from({ length: 60 }, (_, i) => makeProfile(i + 60, "Male", false)),
];

export function getCustomer(id: string): Profile | undefined {
  return CUSTOMERS.find((c) => c.id === id);
}

export function getProfile(id: string): Profile | undefined {
  return DUMMY_PROFILES.find((p) => p.id === id) ?? getCustomer(id);
}
