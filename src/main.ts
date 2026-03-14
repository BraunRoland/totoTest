import { Toto } from "./Toto.ts";

let valaszok: string[] = [];
const csapatok: string[] = ["Győri ETO", "Fradi", "Debrecen", "Zalaegerszeg", "Kisvárda", "Paks", "Puskás Akadémia", "UTE", "Nyíregyháza", "MTK","Diósgyőr", "Kazincbarcika"]
let toto: Toto;

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
      eredmenyGeneralas();
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
  let csapat1 = csapatok[Math.floor(Math.random()*csapatok.length-1)];
  let csapat2;
  do {
    csapat2 = csapatok[Math.floor(Math.random()*csapatok.length-1)];
  } while (csapat1 == csapat2)
  let gol1 = Math.floor(Math.random() * 8);
  let gol2;
  do {
    gol2 = Math.floor(Math.random() * 8);
  } while (gol1 == gol2)
  toto = new Toto;
  toto.ujEredmeny(csapat1!,csapat2!,gol1,gol2)
  ellenorzes();
}

function ellenorzes() 
{
  try
  {
    toto.szelvenytEllenoriz(valaszok);
    eredmenyek();
  } catch (err)
  {
    if (err instanceof Error)
    {
      errKiiras(err.message);
    }
  }
}

function eredmenyek(): void 
{
  let kiiras = document.getElementById("eredmenyek") as HTMLDivElement;
  console.log(toto.golok1.length);
  for(let i = 0; i < toto.golok1.length; i++)
  {
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
    ered.textContent = `${toto.merkozesCsapatok(i)}: ${toto.merkozesEredmeny(i)}`
    kiiras.appendChild(row);
    row.appendChild(col1);
    row.appendChild(col2);
    col1.appendChild(meccs);
    col2.appendChild(ered);    
  }
}

function errKiiras(msg: string): void 
{
  alert(msg);
};

function init(): void 
{

};

document.addEventListener("DOMContentLoaded", init);
document.getElementById("form")?.addEventListener("submit", submitForm);