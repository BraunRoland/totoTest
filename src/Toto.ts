export class Toto {

    nevek1: string[] = [];
    nevek2: string[] = [];
    golok1: number[] = [];
    golok2: number[] = [];

    ujEredmeny(csapat1: string, csapat2: string, gol1: number, gol2: number): void{
        if (this.nevek1.length == 14) {
            throw new Error("Megvan a 14 meccs");
        }
        else if(csapat1 == "" || csapat2 == "") {
            throw new Error("Nem lehet üres a csapat(ok) neve")
        }
        else if(gol1 < 0 || gol2 < 0) {
            throw new Error("Nem lehet a gól száma 0-nál kisebb")
        }
        this.nevek1.push(csapat1);
        this.nevek2.push(csapat2);
        this.golok1.push(gol1);
        this.golok2.push(gol2);
    }

    merkozesEredmeny(id: number): string {
        return `${this.golok1[id]}-${this.golok2[id]}`
    }

    merkozesCsapatok(id: number): string {
        return `${this.nevek1[id]}-${this.nevek2[id]}`
    }

    szelvenytEllenoriz(szelveny: string[]): number {
        let talalatok = 0;
        if(szelveny.length != 14)
        {
            throw new Error("14 fogadásnak kell lennie");
        }
        for (let i = 0; i < szelveny.length; i++)
        {
            if (szelveny[i] != "1" && szelveny[i] != "2" && szelveny[i] != "X")
            {
                throw new Error("Nem helyesen kitöltött szelvény")
            }
            else {
                if (this.golok1[i]! > this.golok2[i]! && szelveny[i] == "1")
                {
                    talalatok++;
                }
                else if (this.golok2[i]! > this.golok1[i]! && szelveny[i] == "2") {
                    talalatok++;
                }
                else if (this.golok1[i] == this.golok2[i] && szelveny[i] == "X") {
                    talalatok++;
                }
            }
        }
        console.log(talalatok);
        return talalatok;
    }
}
