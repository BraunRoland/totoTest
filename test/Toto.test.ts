import { beforeEach, describe, expect, test } from "vitest";
import { Toto } from "../src/Toto.ts";

let toto: Toto;
beforeEach(() => {
    toto = new Toto;
    for(let i = 0; i < 14; i++) {
        toto.ujEredmeny("Honvéd","UTE",i,3)
    }
});

describe("ujEredmeny", () => {
    test("Egy elem hozzáadása nem dob kivételt", () => {
        const toto1 = new Toto;
        expect(() => toto1.ujEredmeny("UTE", "Honvéd",0,5)).not.toThrow();
    });
    test("Nem Lehet több meccs 14-nél", () => {
        expect(() => toto.ujEredmeny("Honvéd","UTE",0,3)).toThrow();
    });
    test("Név nem lehet üres", () => {
        const toto1 = new Toto;
        expect(() =>toto1.ujEredmeny("","asd",1,2)).toThrow();
    });
    test("Gólok száma nem lehet negatív", () => {
        const toto1 = new Toto;
        expect(() =>toto1.ujEredmeny("asdf","asd",-1,2)).toThrow();
    });
});

describe("Kiírás", () => {
    test("Eredmény kiírása", () => {
        expect(toto.merkozesEredmeny(1)).toBe("1-3");
    });
    test("Csapatok kiírása", () => {
        expect(toto.merkozesCsapatok(1)).toBe("Honvéd-UTE");
    });
});

describe("szelvenytEllenoriz", () => {
    let szelveny: string[] = ["2","2","2","X","1","1","1","1","1","1","1","1","1","1"];
    test("Helyesen adja vissza a találatok számát", () => {
        expect(toto.szelvenytEllenoriz(szelveny)).toBe(14);
    });
    test("Még mindig helyesen adja meg", ()=> {
        szelveny[0] = "X";
        szelveny[3] = "1";
        szelveny[10] = "2";
        expect(toto.szelvenytEllenoriz(szelveny)).toBe(11);
    });
    test("Nem fogad el 14-nél hosszabb szelvényt", () => {
        szelveny.push("2");
        expect(() => toto.szelvenytEllenoriz(szelveny)).toThrow();
    });
    test("Nem fogad el rosszul kitöltött szelvényt", () => {
        szelveny[10] = "3";
        expect(() => toto.szelvenytEllenoriz(szelveny)).toThrow();
    });
});