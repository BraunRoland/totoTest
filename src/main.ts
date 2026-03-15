import { Toto } from "./Toto.ts";

let valaszok: string[] = [];
const csapatok: string[] = ["Győri ETO", "Fradi", "Debrecen", "Zalaegerszeg", "Kisvárda", "Paks", "Puskás Akadémia", "UTE", "Nyíregyháza", "MTK","Diósgyőr", "Kazincbarcika"]
let toto: Toto;
let kiiras = document.getElementById("eredmenyek") as HTMLDivElement;

function submitForm(e: SubmitEvent): void 
{
  e.preventDefault();
  valaszok = [];
  const idk: string[] = [];
  try 
  {
    for (let i = 1; i < 15; i++) 
    {
      for (let j = 1; j < 4; j++) 
      {
        let rb = document.getElementById(`q${i}o${j}`) as HTMLInputElement;
        if (rb.checked == true) 
        {
          valaszok.push(rb.value);
          idk.push(`q${i}o${j}`);
          break;
        }
      }
    }
    if(valaszok.length != 14) 
    {
      throw new Error("Add meg minden meccs eredményét")
    }
    else
    {
      toto = new Toto;
      for (let i = 0; i < 14; i++)
      {
        eredmenyGeneralas();
      }
      eredmenyek();
      const resultHTML = document.getElementsByClassName("result") as HTMLCollectionOf<HTMLHeadingElement>;
      console.log(toto.results)
      for (let elem of resultHTML)
      {
        console.log(elem.classList)
        if(toto.results.includes(elem.className))
        {
          elem.innerHTML += " &#9989;"
        }
        else
        {
          elem.innerHTML += " &#10060;"
        }
      }
      // &#9989; - pipa
      // &#10060; - x
    }
  }
  catch(err) 
  {
    if (err instanceof Error) 
    {
      errKiiras(err.message);
    }
  }
};

function eredmenyGeneralas(): void 
{
  console.log("belep");
  let csapat1 = csapatok[Math.floor(Math.random()*csapatok.length)];
  let csapat2;
  do {
    csapat2 = csapatok[Math.floor(Math.random()*csapatok.length)];
  } while (csapat1 == csapat2)
  let gol1 = Math.floor(Math.random() * 8);
  let gol2 = Math.floor(Math.random() * 8);
  toto.ujEredmeny(csapat1!,csapat2!,gol1,gol2);
}

function eredmenyek(): void 
{
  console.log(toto.golok1);
  console.log(toto.golok2);
  console.log(toto.nevek1);
  console.log(toto.nevek2);
  console.log(valaszok);
  console.log(toto.golok1.length);
  for(let i = 0; i < toto.golok1.length; i++)
  {
    const csapatok = toto.merkozesCsapatok(i)
    const golok = toto.merkozesEredmeny(i)
    const row = document.createElement("div") as HTMLDivElement;
    row.setAttribute("class","row");
    const col1 = document.createElement("div") as HTMLDivElement;
    col1.setAttribute("class", "col-sm-6 bal");
    const col2 = document.createElement("div") as HTMLDivElement;
    col2.setAttribute("class", "col-sm-6");
    const meccs = document.createElement("h3") as HTMLDivElement;
    if (i == 13)
    {
      meccs.textContent = `13+1. Meccs:`;
    }
    else
    {
      meccs.textContent = `${i+1}. Meccs:`;
    }
    const ered = document.createElement("h3") as HTMLDivElement;  
    ered.setAttribute("class",`result ${i}`);
    ered.textContent = `${csapatok}: ${golok}`
    kiiras.appendChild(row);
    row.appendChild(col1);
    row.appendChild(col2);
    col1.appendChild(meccs);
    col2.appendChild(ered);   
  }
  const row = document.createElement("div") as HTMLDivElement;
  row.setAttribute("class","row");
  const col = document.createElement("div") as HTMLDivElement;
  col.setAttribute("class", "col-sm-12");
  const res = document.getElementById("results") as HTMLDivElement;
  const talal = document.createElement("h3") as HTMLHeadingElement;
  talal.textContent ="Találatok: " + toto.szelvenytEllenoriz(valaszok);
  kiiras.appendChild(row);
  row.appendChild(col);
  col.appendChild(talal);
  kiiras.hidden = false;
}

function errKiiras(msg: string): void 
{
  alert(msg);
};

function init(): void 
{
  kiiras.hidden = true;
};

document.addEventListener("DOMContentLoaded", init);
document.getElementById("form")?.addEventListener("submit", submitForm);