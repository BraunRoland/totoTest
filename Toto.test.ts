import { beforeEach, describe, expect, test } from "vitest";
import { Toto } from "./Toto.js";

let toto: Toto;
beforeEach(() => {
    toto = new Toto;
    for(let i = 0; i < 14; i++) {
        toto.ujEredmeny("Honvéd","UTE",i,3)
    }
})

describe("Toto", () => {
    test("Egy elem hozzáadása nem dob kivételt", () => {
        const toto1 = new Toto;
        expect(() => toto1.ujEredmeny("UTE", "Honvéd",0,5)).not.toThrow();
    })
    test("Nem Lehet több meccs 14-nél", () => {
        expect(() => toto.ujEredmeny("Honvéd","UTE",0,3)).toThrow();
    })
    test("Név nem lehet üres", () => {
        const toto1 = new Toto;
        expect(() =>toto1.ujEredmeny("","asd",1,2)).toThrow();
    })
    test("Gólok száma nem lehet negatív", () => {
        const toto1 = new Toto;
        expect(() =>toto1.ujEredmeny("asdf","asd",-1,2)).toThrow();
    })
})