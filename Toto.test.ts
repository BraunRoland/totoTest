import { beforeEach, describe, expect, test } from "vitest";
import { Toto } from "./Toto.js";

let toto;
beforeEach(() => {
    toto = new Toto;
    for(let i = 0; i < 15; i++) {
        toto.ujEredmeny("Honvéd","UTE",i,3)
    }
})

describe("Toto", () => {
    test("Egy elem hozzáadása nem dob kivételt", () => {
        const toto1 = new Toto;
        expect(() => toto1.ujEredmeny("UTE", "Honvéd",0,5)).not.toThrow();
    })
})