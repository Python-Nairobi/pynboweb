import { describe, expect, it } from "vitest";
import { isSchoolEmail, normalizeEmail } from "../src/lib/student-email";

describe("student email validation", () => {
  it("normalizes whitespace and casing", () => {
    expect(normalizeEmail(" Student@UONBI.AC.KE ")).toBe(
      "student@uonbi.ac.ke",
    );
  });

  it.each([
    "student@uonbi.ac.ke",
    "student@students.school.ac.ke",
    "student@mit.edu",
  ])("accepts supported academic address %s", (email) => {
    expect(isSchoolEmail(email)).toBe(true);
  });

  it.each([
    "student@gmail.com",
    "student@yahoo.com",
    "student@icloud.com",
    "student@outlook.com",
    "student@hotmail.com",
    "student@proton.me",
    "student@protonmail.com",
    "student@aol.com",
    "student@fastmail.com",
    "student@mail.com",
    "student@tuta.com",
    "student@yandex.com",
    "student@zoho.com",
    "student@fakeac.ke",
    "student@edu.example.com",
    "not-an-email",
    "@uonbi.ac.ke",
  ])("rejects unsupported or malformed address %s", (email) => {
    expect(isSchoolEmail(email)).toBe(false);
  });

  it("supports a configured suffix list", () => {
    expect(isSchoolEmail("student@ox.ac.uk", ["ac.uk"])).toBe(true);
    expect(isSchoolEmail("student@ox.ac.uk", ["ac.ke"])).toBe(false);
  });

  it("blocks public providers even when a broad suffix is configured", () => {
    expect(isSchoolEmail("student@gmail.com", ["com"])).toBe(false);
    expect(isSchoolEmail("student@icloud.com", ["com"])).toBe(false);
  });

  it("supports extra blocked domains", () => {
    expect(
      isSchoolEmail("student@public-mail.example", ["example"], [
        "public-mail.example",
      ]),
    ).toBe(false);
  });
});
