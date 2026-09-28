const organData = {
  brain:{
    icon:"✦",title:"Brain",subtitle:"Central control of the nervous system",
    description:"The brain receives and processes information and coordinates many voluntary and automatic functions.",
    role:"Control",system:"Nervous",region:"head",
    summary:"Brain and sensory structures",
    connections:["Brain ↔ Spinal cord","Brain ↔ Senses","Brain ↔ Hormonal signals"],
    organs:["Brain","Cerebrum","Cerebellum","Brainstem"]
  },
  heart:{
    icon:"♥",title:"Heart",subtitle:"The engine of circulation",
    description:"The heart is a muscular organ that pumps blood through pulmonary and systemic circulation.",
    role:"Circulation",system:"Circulatory",region:"chest",
    summary:"Heart and blood circulation",
    connections:["Heart ↔ Blood","Heart ↔ Lungs","Heart ↔ Vessels"],
    organs:["Heart","Aorta","Blood vessels"]
  },
  lungs:{
    icon:"◌",title:"Lungs",subtitle:"Primary organs of gas exchange",
    description:"The lungs exchange gases between inhaled air and the blood, bringing oxygen into the body and removing carbon dioxide.",
    role:"Gas exchange",system:"Respiratory",region:"chest",
    summary:"Lungs and airways",
    connections:["Lungs ↔ Heart","Lungs ↔ Blood","Lungs ↔ Diaphragm"],
    organs:["Lungs","Trachea","Bronchi","Alveoli"]
  },
  liver:{
    icon:"◇",title:"Liver",subtitle:"Major metabolic organ",
    description:"The liver processes nutrients, produces bile, stores substances, and handles many compounds carried in the blood.",
    role:"Metabolism",system:"Digestive",region:"abdomen",
    summary:"Liver and digestive structures",
    connections:["Liver ↔ Blood","Liver ↔ Intestine","Liver ↔ Gallbladder"],
    organs:["Liver","Gallbladder","Bile ducts"]
  },
  stomach:{
    icon:"◒",title:"Stomach",subtitle:"A muscular digestive chamber",
    description:"The stomach stores food, mixes it with digestive secretions, and begins digestion before contents enter the small intestine.",
    role:"Digestion",system:"Digestive",region:"abdomen",
    summary:"Stomach and upper digestion",
    connections:["Stomach ↔ Esophagus","Stomach ↔ Pancreas","Stomach ↔ Intestine"],
    organs:["Stomach","Esophagus","Pylorus"]
  },
  kidneys:{
    icon:"◍",title:"Kidneys",subtitle:"Blood filtration and fluid balance",
    description:"The kidneys filter blood and help regulate fluid, electrolytes, acid-base balance, and waste removal.",
    role:"Filtration",system:"Urinary",region:"abdomen",
    summary:"Kidneys and urinary structures",
    connections:["Kidneys ↔ Blood","Kidneys ↔ Ureters","Kidneys ↔ Hormonal signals"],
    organs:["Kidneys","Ureters","Bladder"]
  }
};

const regionData = {
  head:{title:"Head",summary:"Brain and sensory structures",focus:"focus-head",defaultOrgan:"brain"},
  chest:{title:"Chest",summary:"Heart and lungs",focus:"focus-chest",defaultOrgan:"heart"},
  abdomen:{title:"Abdomen",summary:"Digestive and urinary organs",focus:"focus-abdomen",defaultOrgan:"liver"}
};

const $ = id => document.getElementById(id);
let selectedOrgan = "brain";
let selectedRegion = "head";

function showToast(message){
  const t=$("toast");
  t.textContent=message;
  t.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>t.classList.remove("show"),2200);
}

function renderOrganList(region){
  const list=$("organList");
  const data = Object.values(organData).filter(o=>o.region===region);
  list.innerHTML=data.map((o)=>{
    const key=Object.keys(organData).find(k=>organData[k]===o);
    return `<button type="button" class="${key===selectedOrgan?"active":""}" data-organ="${key}">${o.title}</button>`;
  }).join("");

  list.querySelectorAll("[data-organ]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      setOrgan(btn.dataset.organ);
    });
  });
}

function setRegion(region){
  selectedRegion=region;
  const data=regionData[region];
  $("regionTitle").textContent=data.title;
  $("regionSummary").textContent=data.summary;

  document.querySelectorAll(".region-button").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.region===region);
  });

  document.querySelectorAll(".region-focus").forEach(f=>f.classList.remove("active"));
  document.querySelector(".region-focus."+data.focus).classList.add("active");

  renderOrganList(region);
  setOrgan(data.defaultOrgan,false);
}

function setOrgan(name, shouldUpdateRegion=true){
  const data=organData[name];
  if(!data) return;
  selectedOrgan=name;

  if(shouldUpdateRegion && selectedRegion!==data.region){
    selectedRegion=data.region;
    const region=regionData[data.region];
    $("regionTitle").textContent=region.title;
    $("regionSummary").textContent=region.summary;
    document.querySelectorAll(".region-button").forEach(btn=>btn.classList.toggle("active",btn.dataset.region===data.region));
    document.querySelectorAll(".region-focus").forEach(f=>f.classList.remove("active"));
    document.querySelector(".region-focus."+region.focus).classList.add("active");
    renderOrganList(data.region);
  }else{
    renderOrganList(selectedRegion);
  }

  $("profileIcon").textContent=data.icon;
  $("profileTitle").textContent=data.title;
  $("profileSubtitle").textContent=data.subtitle;
  $("profileDescription").textContent=data.description;
  $("statRole").textContent=data.role;
  $("statSystem").textContent=data.system;
  $("connectionA").textContent=data.connections[0];
  $("connectionB").textContent=data.connections[1];
  $("connectionC").textContent=data.connections[2];
}

document.querySelectorAll(".region-button").forEach(btn=>{
  btn.addEventListener("click",()=>setRegion(btn.dataset.region));
});

$("deepDiveBtn").addEventListener("click",()=>{
  const titles={
    brain:"Open Brain profile",
    heart:"Open Heart profile",
    lungs:"Open Lungs profile",
    liver:"Open Liver profile",
    stomach:"Open Stomach profile",
    kidneys:"Open Kidneys profile"
  };
  showToast(titles[selectedOrgan]+ " — detailed section ready.");
});

$("profileClose").addEventListener("click",()=>{
  $("profileTitle").textContent="Choose an organ";
  $("profileSubtitle").textContent="Select a body region or organ";
  $("profileDescription").textContent="Use the left rail to navigate the atlas. The profile updates without leaving this page.";
  $("profileIcon").textContent="＋";
  $("statRole").textContent="—";
  $("statSystem").textContent="—";
});

$("allOrgansBtn").addEventListener("click",()=>{
  setOrgan(selectedOrgan);
  document.querySelector(".profile-panel").scrollIntoView({behavior:"smooth",block:"nearest"});
});

$("jumpToBody").addEventListener("click",()=>{
  $("bodyMap").scrollIntoView({behavior:"smooth",block:"start"});
});

document.querySelectorAll(".module-card").forEach(card=>{
  card.addEventListener("click",()=>showToast(card.dataset.module+" system selected."));
});

/* BloodMatch */
const donateTo={
 "O-":["O-","O+","A-","A+","B-","B+","AB-","AB+"],
 "O+":["O+","A+","B+","AB+"],
 "A-":["A-","A+","AB-","AB+"],
 "A+":["A+","AB+"],
 "B-":["B-","B+","AB-","AB+"],
 "B+":["B+","AB+"],
 "AB-":["AB-","AB+"],
 "AB+":["AB+"]
};
function updateBlood(){
  const donor=$("donorType").value,recipient=$("recipientType").value;
  const ok=donateTo[donor].includes(recipient),box=$("bloodResult");
  box.classList.toggle("bad",!ok);
  box.querySelector(".blood-result__icon").textContent=ok?"✓":"!";
  box.querySelector("h3").textContent=ok?"Compatible":"Not compatible";
  box.querySelector("p").textContent=ok?"For red blood cell transfusion.":"This donor → recipient pairing is not compatible for red blood cell transfusion.";
}
$("donorType").addEventListener("change",updateBlood);
$("recipientType").addEventListener("change",updateBlood);

setRegion("head");
updateBlood();
