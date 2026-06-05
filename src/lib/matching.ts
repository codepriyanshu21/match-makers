import type { Profile } from "@/data/profiles";
import { DUMMY_PROFILES } from "@/data/profiles";

export interface MatchScore {
  profile: Profile;
  score: number; // 0-100
  reasons: string[];
  tier: "High Potential" | "Strong" | "Worth Considering";
}

function triCompat(a: string, b: string): number {
  if (a === b) return 1;
  if (a === "Maybe" || b === "Maybe") return 0.6;
  return 0;
}

export function rankMatches(customer: Profile, pool: Profile[] = DUMMY_PROFILES): MatchScore[] {
  const candidates = pool.filter((p) => p.gender !== customer.gender);
  const scored: MatchScore[] = candidates.map((p) => {
    const reasons: string[] = [];
    let score = 0;

    if (customer.gender === "Male") {
      // Traditional Indian matrimonial heuristics (per brief)
      const ageDiff = customer.age - p.age;
      if (ageDiff >= 1 && ageDiff <= 6) { score += 18; reasons.push(`${ageDiff} year age gap`); }
      else if (ageDiff === 0) { score += 8; }
      if (p.height < customer.height) { score += 10; reasons.push("Compatible heights"); }
      if (p.income < customer.income) { score += 8; }
    } else {
      // Thoughtful logic for female customers: values, profession, ambition
      const ageDiff = p.age - customer.age;
      if (ageDiff >= 0 && ageDiff <= 5) { score += 15; reasons.push("Similar life stage"); }
      if (Math.abs(p.income - customer.income) < 25) { score += 10; reasons.push("Aligned career trajectory"); }
      if (p.height >= customer.height) { score += 6; }
    }

    // Shared dimensions (matter for everyone)
    const wantKids = triCompat(customer.wantKids, p.wantKids);
    score += wantKids * 14;
    if (wantKids === 1) reasons.push("Aligned on kids");

    const relocate = triCompat(customer.openToRelocate, p.openToRelocate);
    score += relocate * 8;
    if (relocate === 1 && customer.city !== p.city) reasons.push("Both open to relocating");
    if (customer.city === p.city) { score += 8; reasons.push(`Both in ${p.city}`); }

    if (customer.religion === p.religion) { score += 10; reasons.push(`Same religion (${p.religion})`); }
    if (customer.diet === p.diet) { score += 4; }
    if (customer.smokes === "Never" && p.smokes === "Never") { score += 3; }

    const sharedLangs = customer.languages.filter((l) => p.languages.includes(l));
    if (sharedLangs.length) { score += Math.min(6, sharedLangs.length * 3); reasons.push(`Speaks ${sharedLangs[0]}`); }

    const sharedHobbies = customer.hobbies.filter((h) => p.hobbies.includes(h));
    if (sharedHobbies.length) { score += sharedHobbies.length * 3; reasons.push(`Shared interest: ${sharedHobbies[0]}`); }

    if (p.maritalStatus === customer.maritalStatus) score += 3;

    const normalized = Math.min(100, Math.round(score));
    const tier: MatchScore["tier"] =
      normalized >= 70 ? "High Potential" : normalized >= 50 ? "Strong" : "Worth Considering";
    return { profile: p, score: normalized, reasons: reasons.slice(0, 4), tier };
  });
  return scored.sort((a, b) => b.score - a.score);
}
