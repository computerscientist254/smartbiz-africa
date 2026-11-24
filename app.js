const starterListings = [
 {id:"s1",title:"Website design & development",category:"Technology",location:"Nairobi",description:"Responsive business websites, landing pages and portfolio sites for growing brands.",price:15000,phone:"254700000001",icon:"⌘",owner:"SmartBiz Demo"},
 {id:"s2",title:"Laptop repair & ICT support",category:"Technology",location:"Kiambu",description:"Computer troubleshooting, software installation, upgrades and maintenance support.",price:1000,phone:"254700000002",icon:"⌨",owner:"SmartBiz Demo"},
 {id:"s3",title:"Logo & brand identity design",category:"Creative",location:"Nairobi",description:"Professional logo concepts and starter brand identity packages for small businesses.",price:3500,phone:"254700000003",icon:"✳",owner:"SmartBiz Demo"},
 {id:"s4",title:"Bookkeeping & business support",category:"Business",location:"Mombasa",description:"Organise business records, invoices and basic bookkeeping workflows.",price:5000,phone:"254700000004",icon:"▤",owner:"SmartBiz Demo"},
 {id:"s5",title:"Home electrical services",category:"Home",location:"Nakuru",description:"Electrical installation, inspection and general household maintenance enquiries.",price:2000,phone:"254700000005",icon:"⚡",owner:"SmartBiz Demo"},
 {id:"s6",title:"Computer skills tutoring",category:"Education",location:"Kisumu",description:"Practical beginner lessons in computer applications, internet and digital skills.",price:800,phone:"254700000006",icon:"▣",owner:"SmartBiz Demo"}
];
const $ = s => document.querySelector(s);
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let listings = read("smartbiz_listings", starterListings);
let activeCategory = "All";
let activeUser = read("smartbiz_user", null);
let toastTimer;
function money(value){ return value ? "KSh " + Number(value).toLocaleString("en-KE") : "Contact for price"; }
function showToast(message){ const el=$("#toast"); el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3000); }
function render(){
 const q=$("#searchInput").value.trim().toLowerCase(), loc=$("#locationFilter").value;
 const filtered=listings.filter(x=>(activeCategory==="All"||x.category===activeCategory)&&(!loc||x.location===loc)&&(!q||[x.title,x.description,x.category,x.location].join(" ").toLowerCase().includes(q)));
 $("#listingGrid").innerHTML=filtered.map(x=>`<article class="listing"><div class="listing-top"><div class="listing-icon">${escapeHtml(x.icon||"✦")}</div><span class="tag">${escapeHtml(x.category)}</span></div><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.description)}</p><div class="listing-meta"><span>⌖ ${escapeHtml(x.location)}</span><span class="price">${money(x.price)}</span></div><div class="listing-actions"><a class="contact" href="https://wa.me/${encodeURIComponent(x.phone)}?text=${encodeURIComponent("Hello, I found your service on SmartBiz Africa: "+x.title)}" target="_blank" rel="noopener">WhatsApp provider ↗</a><button class="details" data-detail="${escapeHtml(x.id)}">Details</button></div></article>`).join("");
 $("#emptyState").classList.toggle("hidden",filtered.length!==0);
 $("#showAllBtn").classList.toggle("hidden",filtered.length===listings.length);
}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openAuth(){ $("#authTitle").textContent=activeUser?"Your account":"Create your account";$("#authDialog").showModal(); }
function openListing(){ if(!activeUser){showToast("Create an account or sign in before listing a service.");openAuth();return;}$("#listingDialog").showModal(); }
$("#searchInput").addEventListener("input",render);$("#locationFilter").addEventListener("change",render);
$("#categories").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));render();});
$("#listingGrid").addEventListener("click",e=>{const b=e.target.closest("[data-detail]");if(!b)return;const item=listings.find(x=>x.id===b.dataset.detail);if(item)showToast(`${item.title} · ${item.owner||"Independent provider"} · ${money(item.price)}. Contact via WhatsApp.`);});
$("#showAllBtn").addEventListener("click",()=>{$("#searchInput").value="";$("#locationFilter").value="";activeCategory="All";document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.category==="All"));render();});
$("#loginBtn").addEventListener("click",openAuth);$("#joinBtn").addEventListener("click",openAuth);$("#listServiceBtn").addEventListener("click",openListing);
$("#menuToggle").addEventListener("click",()=>{const nav=$("#mainNav"),open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
$("#mainNav").addEventListener("click",e=>{if(e.target.closest("a"))$("#mainNav").classList.remove("open");});
$("#authForm").addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));activeUser={name:data.name,email:data.email,role:data.role};localStorage.setItem("smartbiz_user",JSON.stringify(activeUser));$("#authDialog").close();e.currentTarget.reset();$("#loginBtn").textContent="My account";showToast(`Welcome, ${activeUser.name}. Your demo account is ready.`);});
$("#listingForm").addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));const item={...d,id:"user-"+Date.now(),price:Number(d.price)||0,owner:activeUser.name,icon:"✦"};listings.unshift(item);localStorage.setItem("smartbiz_listings",JSON.stringify(listings));$("#listingDialog").close();e.currentTarget.reset();activeCategory="All";document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.category==="All"));$("#searchInput").value="";$("#locationFilter").value="";render();showToast("Your demo listing has been published on this device.");$("#marketplace").scrollIntoView({behavior:"smooth"});});
document.querySelectorAll("dialog .close").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
$("#year").textContent=new Date().getFullYear();
if(activeUser)$("#loginBtn").textContent="My account";
render();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
