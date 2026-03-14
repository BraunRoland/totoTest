import { Toto } from "./Toto.ts";

let valaszok: string[] = [];
const csapatok: string[] = ["Győri ETO", "Fradi", "Debrecen", "Zalaegerszeg", "Kisvárda", "Paks", "Puskás Akadémia", "UTE", "Nyíregyháza", "MTK","Diósgyőr", "Kazincbarcika"]

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
  const toto = new Toto;
  toto.ujEredmeny(csapat1!,csapat2!,gol1,gol2)
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