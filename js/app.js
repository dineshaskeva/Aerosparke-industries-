const B='https://aerosparkeindustries.com/airo-assets/',P=B+'images/pages/',$=s=>document.querySelector(s);
const SOL_ICONS=[
`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5V4M12 14.5V20M9.5 12H4M14.5 12H20M5 4h3M16 4h3M5 20h3M16 20h3"/></svg>`,
`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3.5"/></svg>`,
`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18"/></svg>`,
`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 16-9 5-9-5V8l9-5 9 5v8z"/><path d="m3.27 6.96 8.73 4.87 8.73-4.87M12 22.08V11.83"/></svg>`,
`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5M20 19V5M2 19h20M4 10h16M7 19v-9M12 19v-9M17 19v-9M4 5c4 2 8 2 16 0"/></svg>`,
`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V9l5-4v16M14 21V5l5 3v13M9 9h2M9 13h2M9 17h2M14 9h2M14 13h2M14 17h2"/></svg>`
];
const solCard=([t,d],i)=>`<div class="sol-card c-${i%SOL.length}">
<div class="sol-icon-box">${SOL_ICONS[i%SOL.length]}</div>
<h3>${t}</h3>
<p>${d}</p>
<a class="sol-link" href="#/services">Learn more <span class="arr">→</span></a>
</div>`;
const NAV=[['','Home'],['about','About'],['services','Services'],['technology','Technology'],['projects','Projects'],['industries','Industries'],['careers','Careers'],['cinematography','Cinematography']];
$('#nav').innerHTML=NAV.map(([r,t])=>`<a href="#/${r}" data-r="${r}">${t}</a>`).join('')+'<a class="btn" href="#/contact" data-r="contact">Contact Us</a>';
$('#fq').innerHTML=[['','Home'],['about','About Us'],['services','Our Services'],['technology','Technology'],['projects','Projects'],['contact','Contact']].map(([r,t])=>`<li><a href="#/${r}">${t}</a></li>`).join('');
$('#fs').innerHTML=['Drone Surveying','LiDAR Mapping','GIS Solutions','Photogrammetry','Infrastructure','Smart City'].map(t=>`<li><a href="#/services">${t}</a></li>`).join('');
const L=(t,h='#/contact',c='btn')=>`<a class="${c}" href="${h}">${t}</a>`;
const img=(p,a='')=>`<div class="im"><img src="${P}${p}" alt="${a}" loading="lazy" onerror="this.remove()"></div>`;
const ic=(p,t)=>`<div class="ic rv"><img src="${P}${p}" alt="${t}" loading="lazy" onerror="this.remove()"><h3>${t}</h3></div>`;
const hd=(l,t,p='')=>`<div class="hd rv"><span class="eb">${l}</span><h2>${t}</h2>${p?`<p>${p}</p>`:''}</div>`;
const S=(x,c='')=>`<section class="${c}"><div class="w">${x}</div></section>`;
const G=(a,f,c='g3')=>`<div class="${c}">${a.map(f).join('')}</div>`;
const card=([t,d])=>`<div class="card rv"><h3>${t}</h3><p>${d}</p></div>`;
const ul=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const cta=(t,p,b,h)=>`<section class="cta"><div class="w rv"><h2>${t}</h2><p>${p}</p>${L(b,h)}</div></section>`;
const hero=(l,t,p,im,x='')=>`<section class="hero" ${im?`style="background-image:linear-gradient(rgba(255,255,255,.88),rgba(255,255,255,.95)),url(${P}${im})"`:''}><div class="w rv"><span class="eb">${l}</span><h1>${t}</h1><p>${p}</p>${x}</div></section>`;
const parseStat=s=>{
  const m=String(s).match(/^([^\d]*)(\d+)(.*)$/);
  if(m) return {prefix:m[1],num:parseInt(m[2],10),suffix:m[3]};
  return {prefix:'',num:0,suffix:s};
};
const statEl=([n,l],cls='')=>{
  const p=parseStat(n);
  return `<div class="${cls} rv"><b class="count-up" data-target="${p.num}" data-prefix="${p.prefix}" data-suffix="${p.suffix}">0${p.suffix}</b><span>${l}</span></div>`;
};
const stats=a=>`<div class="stats w">${a.map(item=>statEl(item)).join('')}</div>`;
const tags=a=>a.map(t=>`<span class="tag">${t}</span>`).join('');
const enq=s=>`#/contact?service=${encodeURIComponent(s)}`;
const prj=([c,y,t,l,o,i],k,feat=false)=>`<div class="prj-card rv${feat?' feat':''}" data-c="${c}">
<div class="prj-media">
<img src="${P}projects/${i}" alt="${t}" loading="lazy" onerror="this.style.display='none'">
<div class="prj-badges">
<span class="prj-cat"><span class="prj-dot"></span>${c}</span>
<span class="prj-yr">${y}</span>
</div>
${feat?'<span class="prj-ribbon">⭐ Landmark Project</span>':''}
</div>
<div class="prj-body">
<div class="prj-loc"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg><span>${l}</span></div>
<h3 class="prj-title">${t}</h3>
<div class="prj-outcome">
<div class="prj-outcome-hdr"><span>⚡</span><span>Key Outcome</span></div>
<p>${o}</p>
</div>
<div class="prj-ftr">
<span class="prj-sector">${c}</span>
<a class="prj-link" href="${enq(c)}">Enquire Similar <span class="arr">→</span></a>
</div>
</div>
</div>`;
const recaptcha=(id='recaptcha')=>`
<div class="recaptcha-wrap" id="${id}-wrap">
  <div class="recaptcha-box" onclick="toggleCaptcha('${id}')">
    <div class="recaptcha-left">
      <div class="recaptcha-check" id="${id}-check">
        <span class="recaptcha-spinner"></span>
        <svg class="recaptcha-mark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f9d58" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <span class="recaptcha-text">I'm not a robot</span>
    </div>
    <div class="recaptcha-right">
      <svg class="recaptcha-logo-icon" width="28" height="28" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 4C12.95 4 4 12.95 4 24c0 4.12 1.25 7.95 3.39 11.13L10.95 31A15.9 15.9 0 0 1 8 24c0-8.84 7.16-16 16-16v6l8-8-8-8v6z"/><path fill="#8AB4F8" d="M40.61 12.87L37.05 17A15.9 15.9 0 0 1 40 24c0 8.84-7.16 16-16 16v-6l-8 8 8 8v-6c11.05 0 20-8.95 20-20 0-4.12-1.25-7.95-3.39-11.13z"/></svg>
      <span class="recaptcha-brand">reCAPTCHA</span>
      <span class="recaptcha-terms"><a href="https://policies.google.com/privacy" target="_blank" onclick="event.stopPropagation()">Privacy</a> - <a href="https://policies.google.com/terms" target="_blank" onclick="event.stopPropagation()">Terms</a></span>
    </div>
  </div>
  <input type="checkbox" id="${id}-input" name="RobotVerification" style="display:none">
  <div class="recaptcha-err" id="${id}-err" style="display:none">Please verify that you are not a robot.</div>
</div>`;
const fileUpload=()=>`
<div class="resume-upload-field">
  <label style="font-weight:600;margin-bottom:8px">Upload Resume / CV (PDF or Document) *</label>
  <div class="file-dropzone" onclick="document.getElementById('cv-input').click()">
    <input type="file" id="cv-input" name="ResumeFile" accept=".pdf,.doc,.docx" required onchange="handleFile(this)" style="display:none">
    <div class="file-dropzone-content" id="cv-content">
      <div class="file-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/></svg>
      </div>
      <div class="file-text">
        <b>Click to upload or drag & drop your Resume</b>
        <span>Accepts PDF, DOC, DOCX (Max 10MB)</span>
      </div>
    </div>
    <div class="file-selected" id="cv-selected" style="display:none">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span class="file-name" id="cv-name">resume.pdf</span>
      <span class="file-size" id="cv-size"></span>
      <button type="button" class="file-remove" onclick="removeFile(event)" title="Change file">✕</button>
    </div>
  </div>
</div>`;
const form=(rows,btn,sub,id='form')=>`<form onsubmit="sendF(event,'${sub}')">${rows}${recaptcha('rc-'+id)}<button class="btn btn-pill" type="submit"><span class="btn-arrow">›</span> ${btn}</button></form>`;
const fld=(n,l,t='text',req)=>`<label>${l}${req?' *':''}<input name="${n}" type="${t}" ${req?'required':''}></label>`;
const sel=(n,l,o,ph)=>`<label>${l}<select name="${n}"><option value="">${ph}</option>${o.map(x=>`<option>${x}</option>`).join('')}</select></label>`;
function toggleCaptcha(id){
  const check=document.getElementById(id+'-check');
  const input=document.getElementById(id+'-input');
  const err=document.getElementById(id+'-err');
  if(!check||!input)return;
  if(input.checked){
    input.checked=false;
    check.classList.remove('verified');
  }else{
    check.classList.add('verifying');
    if(err)err.style.display='none';
    setTimeout(()=>{
      check.classList.remove('verifying');
      check.classList.add('verified');
      input.checked=true;
    },400);
  }
}
function handleFile(input){
  if(input.files&&input.files[0]){
    const file=input.files[0];
    const sizeMb=(file.size/(1024*1024)).toFixed(2);
    document.getElementById('cv-content').style.display='none';
    const sel=document.getElementById('cv-selected');
    sel.style.display='flex';
    document.getElementById('cv-name').textContent=file.name;
    document.getElementById('cv-size').textContent='('+sizeMb+' MB)';
  }
}
function removeFile(e){
  e.stopPropagation();
  const input=document.getElementById('cv-input');
  if(input)input.value='';
  document.getElementById('cv-content').style.display='flex';
  document.getElementById('cv-selected').style.display='none';
}
function sendF(e,s){
  e.preventDefault();
  const f=e.target;
  const captcha=f.querySelector('input[name="RobotVerification"]');
  if(captcha&&!captcha.checked){
    const err=f.querySelector('.recaptcha-err');
    if(err)err.style.display='block';
    const box=f.querySelector('.recaptcha-box');
    if(box){
      box.classList.add('shake');
      setTimeout(()=>box.classList.remove('shake'),600);
    }
    return;
  }
  const d=new FormData(f);
  let b='';
  d.forEach((v,k)=>{
    if(k==='RobotVerification'||k==='ResumeFile')return;
    if(v)b+=k+': '+v+'\n';
  });
  const fileInput=f.querySelector('input[type="file"]');
  if(fileInput&&fileInput.files[0]){
    b+='Resume / CV: '+fileInput.files[0].name+' (Attached)\n';
  }
  location.href='mailto:'+(s=='Careers'?'careers':'info')+'@aerosparke.com?subject='+encodeURIComponent(s+' – AEROSPARKe website')+'&body='+encodeURIComponent(b);
}
function filt(c,el){
document.querySelectorAll('.chips-filter .chip').forEach(x=>x.classList.toggle('on',x===el));
document.querySelectorAll('#prj-grid .prj-card').forEach(x=>{
const match=(c==='All'||x.dataset.c===c);
x.style.display=match?'flex':'none';
});
}
const WHY=[['Advanced Technology','We deploy industry-leading drone, LiDAR and GIS platforms to deliver the highest quality spatial data.'],['Precision-Driven','Every survey, model and dataset is produced to exacting accuracy standards for mission-critical applications.'],['Professional Expertise','Our team brings deep domain knowledge across drone operations, geospatial science and engineering.'],['Reliable Delivery','We are committed to on-time, on-scope project delivery with transparent communication at every stage.'],['Innovative Engineering','We continuously adopt emerging technologies to solve complex surveying and infrastructure challenges.'],['Customer-Focused','We work closely with clients to understand their goals and deliver solutions tailored to their specific needs.']];
const TECH=[['technology/matrice-350','Drone Platform','Enterprise-grade aerial workhorse','DJI Matrice 350 RTK','Our primary survey drone — 55-minute flight time, IP55 weather resistance and a triple-redundant flight control system.',[['Max Flight Time','55 min'],['Max Payload','2.7 kg'],['GNSS','GPS + GLONASS + BeiDou + Galileo'],['Positioning Accuracy','1 cm + 1 ppm (RTK)'],['Wind Resistance','12 m/s (Level 6)'],['IP Rating','IP55']]],
['technology/lidar-sensor','LiDAR Sensor','Next-generation airborne LiDAR','Zenmuse L2 LiDAR','Integrated LiDAR and RGB imaging system delivering dense point clouds with up to 5 returns per pulse, even through vegetation canopy.',[['Point Rate','Up to 240,000 pts/sec'],['Returns','5 per pulse'],['Accuracy','4 cm (V), 5 cm (H)'],['Range','Up to 450 m'],['IMU','L-Band RTK + IMU'],['Camera','20 MP RGB']]],
['technology/thermal-drone','Thermal Imaging Drone','Precision thermal intelligence from the air','Mavic 4 Thermal','Simultaneous RGB and infrared capture for solar panel inspection, power line surveys, industrial monitoring and search-and-rescue.',[['Thermal Sensor','640 × 512 px radiometric'],['Sensitivity','≤ 50 mK (NETD)'],['Visible Camera','48 MP, 1/2" CMOS'],['Flight Time','42 min'],['Transmission','O4 Enterprise, 15 km'],['Temp Range','-20°C to +550°C']]],
['technology/gnss-rtk','Ground Control & GNSS','Centimetre-level ground truth','RTK / GNSS Ground Systems','Professional multi-constellation receivers for GCP placement, base station setup and independent accuracy verification.',[['Constellations','GPS, GLONASS, BeiDou, Galileo'],['RTK Accuracy','8 mm + 1 ppm (H)'],['Channels','800+'],['Data Output','RINEX, NMEA, RTK'],['Base Range','Up to 60 km'],['IP Rating','IP67']]],
['technology/gis-software','Software','From raw data to intelligent deliverables','GIS & Processing Software Suite','Industry-standard platforms trusted by survey professionals and government agencies worldwide.',[['Photogrammetry','Agisoft Metashape Pro'],['LiDAR','LAStools, CloudCompare'],['GIS','ArcGIS Pro, QGIS'],['CAD','Civil 3D, MicroStation'],['Web GIS','GeoServer, Leaflet, MapLibre'],['Viewer','Potree, CloudCompare']]]];
const CIN=[['Film & TV Production','Cinematic aerial sequences for feature films, web series, documentaries and OTT productions.',['4K / 6K RAW capture','Cine-grade colour profiles','On-set coordination','Night & low-light capability']],['Real Estate & Architecture','Sweeping aerials, orbit shots and reveal sequences that elevate listings and architectural portfolios.',['Golden-hour scheduling','Virtual flythrough edits','360° panoramic stills','Same-day turnaround available']],['Events & Live Coverage','Weddings, concerts, sporting events and corporate gatherings from a perspective no ground camera can match.',['Live FPV streaming','Multi-drone coordination','Crowd & venue aerials','Highlight reel editing']],['Corporate & Brand Films','Aerial footage of facilities, campuses and operations for investor reels, CSR films and campaigns.',['Brand-aligned colour grading','Facility & campus flyovers','Testimonial integration','Full post-production']],['Tourism & Destination Content','Immersive aerial content for resorts, heritage sites, national parks and travel destinations.',['Landscape & seascape aerials','Sunrise / sunset shoots','Time-lapse sequences','Social-media optimised cuts']],['Infrastructure & Industrial','High-resolution aerial video for progress reporting and stakeholder communications.',['Progress documentation','Thermal overlay option','Compliance-ready footage','Secure data handling']]];
const PK=[['Basic Shoot','Perfect for listings & social content','48 hours',['Up to 2 hours of flight time','4K video footage (raw + edited)','10–15 aerial photographs','Basic colour correction','1 location','Digital delivery within 48 hrs']],['Production Package','Ideal for events, real estate & corporate','5 business days',['Up to 6 hours of flight time','4K / 6K RAW footage','30+ aerial photographs','Professional colour grade','Up to 3 locations','Highlight reel (2–3 min edit)','Social-media optimised cuts'],1],['Full Post-Production','End-to-end for films, OTT & brand films','As per project brief',['Unlimited flight days (project-based)','8K RAW cinema capture (DJI Inspire 3)','Full post-production suite','Advanced VFX & motion graphics','Professional sound design','Dedicated project manager']],['Custom Mission','Bespoke solutions for unique requirements','Discussed on consultation',['AEROSPARKe custom drone deployment','Mission-specific payload integration','Thermal, LiDAR or multispectral options','Extended endurance operations','Full data processing & reporting','Dedicated engineering support']]];
const ROLES=[['Field Operations','Full-time','Drone Pilot & Survey Technician','Hyderabad / Pan-India','2–5 years'],['Geospatial Intelligence','Full-time','GIS Analyst','Hyderabad','2–4 years'],['Data Processing','Full-time','Photogrammetry & LiDAR Specialist','Hyderabad','3–6 years'],['Infrastructure Surveys','Full-time','Survey Engineer','Pan-India (Project-based)','3–7 years'],['Sales & Partnerships','Full-time','Business Development Executive','Hyderabad / Remote','2–5 years'],['All Departments','Internship (3–6 months)','Internship — Geospatial / Drone Technology','Hyderabad','Final year / Recent graduate']];
const SVC=[['drone-surveying','Centimetre-accurate topographic data from the air','Drone & Aerial Surveying','High-resolution topographic data, orthomosaic maps and digital elevation models with centimetre-level accuracy using UAV platforms with RTK/PPK GNSS.',['Topographic & contour mapping','Corridor surveys for roads, railways and pipelines','Volumetric calculations for stockpiles and earthworks','Pre- and post-construction site surveys','Flood plain and watershed mapping','Agricultural land assessment']],
['lidar-mapping','Ultra-dense 3D point clouds for precision terrain intelligence','LiDAR Mapping & Point Cloud Processing','Millions of precise 3D measurements per second, penetrating vegetation canopy to reveal bare-earth terrain beneath.',['Bare-earth terrain modelling under dense vegetation','Power-line and transmission corridor mapping','Flood modelling and hydraulic analysis','Forest inventory and biomass estimation','Railway and road corridor surveys','Urban 3D city modelling']],
['gis-geospatial','Turning spatial data into actionable intelligence','GIS & Geospatial Intelligence','We design, build and maintain GIS databases, web mapping portals and spatial analysis workflows for decision support.',['Land use and land cover (LULC) mapping','Urban planning and zoning analysis','Utility and asset management GIS','Environmental impact assessment mapping','Disaster risk and vulnerability mapping','Web GIS portal development']],
['photogrammetry','Photo-realistic 3D models from aerial imagery','Photogrammetry & 3D Modelling','Overlapping aerial photographs processed into accurate 3D models, orthomosaics and point clouds.',['Construction site progress monitoring','Heritage and archaeological documentation','Quarry and mining volume calculations','As-built surveys and BIM integration','Urban 3D modelling for planning','Accident and crime scene documentation']],
['infrastructure-engineering','Precision surveys for roads, railways and utilities','Infrastructure Engineering Surveys','Engineering survey solutions for roads, highways, railways, pipelines and utility corridors, reducing field time dramatically.',['Road and highway alignment surveys','Railway corridor mapping','Pipeline route surveys','Bridge and structure inspection','Utility corridor mapping','Right-of-way and encroachment surveys']],
['smart-city','Digital twins and urban intelligence for modern cities','Smart City & Digital Mapping','Aerial mapping, LiDAR, GIS and digital twin technology for planners, municipal bodies and smart city mission teams.',['City-scale 3D digital twin creation','Urban heat island and green cover mapping','Traffic and mobility analysis','Utility network mapping','Slum and informal settlement mapping','Smart city dashboard integration']]];
const IN2=[['government','Government & Public Sector','Empowering policy with spatial intelligence','Large-scale topographic surveys, land records modernisation, revenue mapping and spatial data infrastructure for planning and governance.'],['roads-highways','Roads & Highways','Survey-grade data for every kilometre','End-to-end drone and LiDAR survey from DPR preparation to construction monitoring and as-built surveys.'],['construction','Construction & Real Estate','Precision from groundbreak to handover','Topographic surveys, progress monitoring and 3D site documentation for townships, complexes and infrastructure.'],['mining','Mining & Quarrying','Accurate volumes. Safer operations.','Stockpile volumetrics, pit progression monitoring and mine planning for coal, iron ore, limestone and aggregates.'],['agriculture','Agriculture & Forestry','Data-driven land management at scale','Agricultural mapping, crop health assessment and land use / land cover analysis across India.'],['energy','Energy & Utilities','Inspection and planning for the energy transition','Thermal inspection of solar farms, transmission corridor and pipeline route surveys.'],['smart-cities','Smart Cities & Urban Planning','Building the spatial foundation for smarter cities','High-resolution city mapping, 3D urban models, asset inventories and web GIS platforms.'],['industrial','Industrial & Manufacturing','Asset intelligence for complex facilities','Asset surveys, facility mapping and GIS databases for refineries, plants, steel mills and ports.']];


const DELIVERY_STEPS=[
  ['01','Requirement Analysis','We assess scope, terrain, accuracy requirements and deliverable formats.'],
  ['02','Flight Planning & Permits','Mission planning, airspace clearances and DGCA compliance handled end-to-end.'],
  ['03','Data Acquisition','Precision flights with RTK/PPK GNSS, LiDAR or photogrammetry payloads.'],
  ['04','Processing & Analysis','Raw data processed into accurate, analysis-ready outputs.'],
  ['05','Delivery & Support','Final deliverables with full QA documentation and support.']
];

const R={
'':()=>`<section class="hero v"><video class="hero-video" autoplay muted loop playsinline preload="auto" src="${B}videos/pages/home/reel-video"><source src="${B}videos/pages/home/reel-video" type="video/mp4"><source src="${B}videos/pages/home/reel-video.mp4" type="video/mp4"><source src="videos/reel-video.mp4" type="video/mp4"></video><div class="w rv"><span class="eb">ADVANCED TECHNOLOGY · DRONE · GEOSPATIAL · ENGINEERING</span><h1>Engineering The Future<br>Mapping New Possibilities.</h1><p>Aerosparke Industries Private Limited delivers advanced drone technology, precision surveying, geospatial intelligence and innovative engineering solutions to transform industries and build a smarter future.</p><div class="hero-btns">${L('Explore Our Solutions','#/services')}${L('Contact Our Team','#/contact','btn o')}</div></div></section>`
+`<section class="alt" style="overflow:hidden;padding:88px 0">
<div class="w">${hd('OUR SOLUTIONS','Precision Technology. Intelligent Outcomes.','From airborne LiDAR to smart city mapping, we deliver end-to-end geospatial and engineering solutions.')}</div>
<div class="sol-marquee-wrap">
  <div class="sol-marquee-track">
    ${[...SOL,...SOL].map((s,i)=>solCard(s,i)).join('')}
  </div>
</div>
<div style="text-align:center;margin-top:40px">${L('View All Services','#/services')}</div>
</section>`
+`<section style="padding:90px 0;position:relative;overflow:hidden">
<div class="w rv" style="text-align:center">
  <span class="badge-pill">SEE US IN ACTION</span>
  <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;margin-bottom:16px">Precision From Every Angle</h2>
  <p style="max-width:760px;margin:0 auto;font-size:16px;line-height:1.6;color:var(--mu)">Watch how AEROSPARKe's drone technology delivers survey-grade accuracy across India's most demanding terrain and infrastructure projects.</p>
</div>
<div class="w">
  <div class="flow-diagram rv">
    <div class="flow-col left">
      <div class="flow-item">
        <div class="flow-text">
          <h4>How To Use Controller</h4>
          <p>Automated waypoint navigation, multi-rotor mission control, and real-time flight telemetry.</p>
        </div>
        <div class="flow-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="13" rx="3"/><path d="M7 4h10M12 4v3"/><circle cx="8" cy="13" r="2"/><circle cx="16" cy="13" r="2"/><path d="M8 11v4M6 13h4M15 12h2M16 14h0"/></svg>
        </div>
      </div>
      <div class="flow-item">
        <div class="flow-text">
          <h4>How To Fly Drone</h4>
          <p>Centimetre-level RTK/PPK GNSS positioning across complex terrain and industrial corridors.</p>
        </div>
        <div class="flow-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M12 22l4-13M12 22l-4-13M6 3l6 6M18 3l-6 6"/></svg>
        </div>
      </div>
      <div class="flow-item">
        <div class="flow-text">
          <h4>How To Use Controller</h4>
          <p>Survey-grade GCP placement and multi-constellation base station verification.</p>
        </div>
        <div class="flow-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="6"/><path d="M15.4 12.5l2.6 7.5-6-3-6 3 2.6-7.5"/><path d="M9 8l2 2 4-4"/></svg>
        </div>
      </div>
    </div>
    <div class="flow-center">
      <div class="drone-frame">
        <span class="corner-tr"></span>
        <span class="corner-bl"></span>
        <div class="drone-scanner"></div>
        <img class="drone-img" src="images/drone-flow.png" alt="AEROSPARKe Drone System" loading="lazy">
        <span class="drone-hud">RTK ACTIVE · 1CM ACCURACY</span>
      </div>
    </div>
    <div class="flow-col right">
      <div class="flow-item">
        <div class="flow-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="17" height="12" rx="2"/><path d="M22 10v4"/><path d="M7 10l-2 4h4l-1 4 4-6h-4l1-2"/></svg>
        </div>
        <div class="flow-text">
          <h4>How To Use Battery</h4>
          <p>Dual-redundant intelligent battery system providing up to 55 minutes of endurance.</p>
        </div>
      </div>
      <div class="flow-item">
        <div class="flow-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/><circle cx="8" cy="12" r="3"/></svg>
        </div>
        <div class="flow-text">
          <h4>How To Play Video</h4>
          <p>Real-time O4 transmission delivering dense 4K/6K inspection video and LiDAR point clouds.</p>
        </div>
      </div>
      <div class="flow-item">
        <div class="flow-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>
        </div>
        <div class="flow-text">
          <h4>How To Control Camera</h4>
          <p>3-axis stabilized gimbal sensor control for sub-millimetre aerial inspection imagery.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</section>`
+S(hd('OUR WORK REEL','Real Projects. Real Results.',"A glimpse into the surveys, inspections and geospatial missions we've delivered across India's most complex environments.")+`<div class="prj-grid">${PRJ.slice(0,3).map((p,k)=>prj(p,k,true)).join('')}</div>`+`<div style="text-align:center;margin-top:40px">${L('View All Projects','#/projects')}</div>`)
+S(hd('WHY AEROSPARKe','Technology. Precision. Excellence.','We combine advanced equipment, professional expertise and intelligent technology to deliver outcomes that matter.')+G(WHY,card),'alt')
+S(hd('INDUSTRIES WE SERVE','Across Every Sector. At Every Scale.')+G(IND,([t,i])=>ic(i,t),'g4')+`<div style="text-align:center;margin-top:40px">${L('Explore All Industries','#/industries')}</div>`)
+cta('READY TO TRANSFORM YOUR PROJECT?','Talk to our team about your surveying, mapping or engineering requirements. We deliver precision solutions for complex challenges.','Get In Touch','#/contact'),

about:()=>hero('ABOUT US','Pioneering the Future of Geospatial Intelligence','AEROSPARKe Industries Private Limited is a technology-driven company at the forefront of drone innovation, precision surveying and geospatial engineering — delivering intelligent solutions that transform how industries map, measure and manage the world around them.','about/hero')
+S(`<div class="split"><div class="rv"><span class="eb">WHO WE ARE</span><h2>Built on Precision. Driven by Innovation.</h2><p>AEROSPARKe was founded with a singular purpose — to harness advanced drone technology and geospatial intelligence to solve real-world challenges across infrastructure, industry and government.</p><br><p>We combine aerial platforms, LiDAR sensors, photogrammetry workflows and GIS expertise to deliver spatial data of the highest accuracy and reliability, from large-scale topographic surveys to smart city digital mapping.</p></div>${img('about/gis-workspace','GIS and geospatial workspace')}</div>`)
+stats([['100+','Projects Delivered'],['20+','Industries Served'],['99%','Client Satisfaction'],['5+','Years of Expertise']])
+S(G([['OUR VISION',"To be India's most trusted geospatial technology company — delivering precision, innovation and intelligence at every scale.",'We envision a future where advanced drone technology and geospatial intelligence are accessible to every industry, enabling smarter decisions, safer infrastructure and a more connected world.'],['OUR MISSION','Delivering precision geospatial solutions that empower our clients to build, plan and manage with confidence.','End-to-end drone surveying, LiDAR mapping, GIS and engineering services that are technically superior, delivered on time and tailored to every client.']],([a,b,c])=>`<div class="card rv"><span class="eb">${a}</span><h3 style="font-size:22px">${b}</h3><p>${c}</p></div>`,'g2'),'alt')
+S(hd('OUR CORE VALUES','The Principles That Guide Everything We Do')+G([['Precision','We hold ourselves to the highest accuracy standards in every dataset, model and deliverable.'],['Innovation','We continuously adopt emerging technologies and methodologies.'],['Integrity','Complete transparency, honesty and professionalism in every engagement.'],['Excellence','Work that exceeds expectations — in quality, timeliness and technical depth.'],['Collaboration','True partners with our clients, aligning our expertise to their goals.'],['Safety','Safe drone operations, regulatory compliance and responsible data practices.']],card))
+S(`<div class="rv" style="margin-bottom:48px">${img('about/team-field','AEROSPARKe field survey team')}</div>`+hd('WHY CHOOSE US','What Sets AEROSPARKE Apart')+G([['End-to-End Capability','From flight planning and acquisition to processing, analysis and final deliverables — managed in-house.'],['Industry-Leading Equipment','Professional-grade drone platforms, LiDAR sensors and GNSS systems.'],['Certified Professionals','DGCA certifications, GIS qualifications and domain expertise.'],['Scalable Solutions','From a single-site survey to a multi-state infrastructure programme.'],['Rapid Turnaround','Streamlined pipelines for fast, accurate delivery.'],['Pan-India Operations','Authorised to conduct drone survey operations across India.']],card),'alt')
+cta('Ready to Work With Us?','Tell us about your project and our team will get back to you with a tailored solution.','Get In Touch','#/contact'),

services:()=>hero('OUR SERVICES','End-to-End Geospatial & Drone Solutions','From precision aerial surveys to intelligent GIS platforms, AEROSPARKe delivers the full spectrum of drone technology and geospatial engineering services — tailored to your industry and built to the highest standards.','',`<div class="chips" style="justify-content:flex-start">${SVC.map(s=>`<a class="chip" href="#${s[0]}" onclick="event.preventDefault();document.getElementById('${s[0]}').scrollIntoView({behavior:'smooth'})">${s[2]}</a>`).join('')}</div>`)
+S(SVC.map(([id,tg,t,d,a])=>`<div class="split rv" id="${id}">${img('services/'+id,t)}<div><span class="eb">${tg}</span><h2>${t}</h2><p>${d}</p><br><h3 style="font-size:15px">Key Applications</h3>${ul(a)}<br>${L('Enquire About This Service','#/contact')}</div></div>`).join(''))
+S(hd('Full Catalogue','Complete Service Catalogue','28 specialised drone and geospatial services — covering every sector, terrain and mission requirement.')+catalogue()+`<p style="text-align:center;margin:36px 0 16px">Don't see your exact requirement? We design custom drone solutions for any mission.</p><div style="text-align:center">${L('Discuss Your Project')}</div>`,'alt')
+`<section style="overflow:hidden;padding:64px 0" class="alt">
  <div class="w">${hd('HOW WE WORK','Our Delivery Process','5 systematic stages from initial survey scoping to final QA-verified data delivery.')}</div>
  <div class="process-marquee-wrap">
    <div class="process-marquee-track">
      ${[...DELIVERY_STEPS,...DELIVERY_STEPS].map(([num,t,d])=>`
        <div class="process-card">
          <span class="step-num">${num}</span>
          <h3>${t}</h3>
          <p>${d}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>`
+cta('Ready to Start Your Project?','Talk to our team about your survey, mapping or inspection requirements and get a tailored proposal.','Get in Touch','#/contact'),

technology:()=>hero('TECHNOLOGY & EQUIPMENT','Industry-Leading Tools. Uncompromising Precision.','AEROSPARKe operates a fleet of professional-grade drone platforms, LiDAR sensors, GNSS systems and GIS software — giving every project the technical foundation it needs to deliver survey-grade results.','technology/hero')
+S(TECH.map(([i,k,tg,t,d,sp])=>`<div class="split rv">${img(i,t)}<div><span class="eb">${k}</span><p style="margin-bottom:6px">${tg}</p><h2>${t}</h2><p>${d}</p><div class="spec">${sp.map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('')}</div></div></div>`).join(''))
+S(hd('TECHNICAL CAPABILITIES','What Our Technology Enables')+G([['Centimetre Accuracy','RTK/PPK workflows deliver absolute positional accuracy of 1–3 cm without ground control points.'],['Vegetation Penetration','Multi-return LiDAR captures bare-earth terrain beneath dense forest and crop canopy.'],['Thermal Analysis','Radiometric thermal imaging quantifies temperature anomalies for energy and industrial inspection.'],['Large-Area Coverage','A single Matrice 350 RTK mission can cover 500+ hectares per day at survey-grade accuracy.'],['All-Weather Operations','IP55-rated platforms and redundant systems enable operations in rain, wind and challenging conditions.'],['Seamless Data Integration','Outputs integrate directly with ArcGIS, AutoCAD Civil 3D, BIM platforms and web GIS portals.']],card),'alt')
+cta('Want to Know More About Our Equipment?','Our team is happy to discuss which platform and sensor combination is best suited to your project requirements.','Talk to Our Team','#/contact'),

projects:()=>{
const counts={All:PRJ.length};PRJ.forEach(([c])=>counts[c]=(counts[c]||0)+1);
const cats=['All',...new Set(PRJ.map(p=>p[0]))];
return hero('OUR PROJECTS','Precision Delivered. Results Proven.','A portfolio of survey, mapping and geospatial engineering projects delivered across India — spanning national highway corridors, smart cities, open-cast mines, agricultural basins and critical infrastructure.')
+`<div class="w" style="margin-top:-44px;position:relative;z-index:3"><div class="stats-banner rv">${[['100+','Projects Completed'],['20+','Industries Served'],['1M+','Hectares Mapped'],['99%','Client Satisfaction']].map(item=>statEl(item,'stat-box')).join('')}</div></div>`
+S(hd('FEATURED CASE STUDIES','Landmark Projects',"Flagship surveying and geospatial deployments delivering mission-critical outcomes across India's most demanding terrain.")+`<div class="prj-grid">${PRJ.slice(0,3).map((p,k)=>prj(p,k,true)).join('')}</div>`,'alt')
+S(hd('EXPLORE ALL PROJECTS','Browse by Industry Sector','Filter through our complete project portfolio by category to explore verified deliverables and project outcomes.')
+`<div class="chips-filter">${cats.map((c,i)=>`<button class="chip${i?'':' on'}" onclick="filt('${c}',this)">${c}<span class="chip-cnt">${counts[c]}</span></button>`).join('')}</div>`
+`<div id="prj-grid" class="prj-grid">${PRJ.map((p,k)=>prj(p,k)).join('')}</div>`)
+cta('Have a Project We Can Help With?','Share your surveying, mapping or engineering requirements and our technical team will prepare a tailored proposal.','Request a Project Quote','#/contact');
},

industries:()=>hero('INDUSTRIES WE SERVE','Geospatial Intelligence Across Every Sector','AEROSPARKe delivers precision drone survey, LiDAR mapping and GIS solutions to a wide range of industries — from national highway corridors and smart city missions to open-cast mines and solar farms.')
+stats([['20+','Industries Served'],['50+','Projects Delivered'],['9','States Covered'],['1M+','Hectares Mapped']])
+S(hd('SECTORS','Every Industry. One Trusted Partner.')+G(IN2,([i,t,tg,d])=>`<div class="card rv" style="padding:0;overflow:hidden">${img('industries/'+i,t)}<div style="padding:24px"><h3>${t}</h3><p style="color:var(--ac);font-size:14px;margin-bottom:8px">${tg}</p><p style="font-size:14px">${d}</p><a href="#/services">View Applications →</a></div></div>`),'alt')
+cta('Working in One of These Sectors?',"Tell us about your project and we'll recommend the right survey solution for your requirements.",'Get in Touch','#/contact'),

careers:()=>hero('CAREERS','Build the Future of Geospatial Intelligence','Join a team of engineers, surveyors and GIS specialists pushing the boundaries of drone technology and spatial data across India.','',`<a class="btn" href="#openings" onclick="event.preventDefault();document.getElementById('openings').scrollIntoView({behavior:'smooth'})">View Open Positions</a>`)
+S(hd('LIFE AT AEROSPARKE','Why Work With Us')+G([['Cutting-Edge Technology','Work with the latest drone platforms, LiDAR sensors and GIS software on projects that matter.'],['Nationwide Impact','Your work shapes infrastructure, cities and land management across 18+ states in India.'],['Growth & Learning','Structured training, certifications and a clear career path in a fast-growing industry.'],['Collaborative Culture','A tight-knit team where every voice counts and ideas are welcomed at every level.'],['Field & Office Balance','Exciting field deployments combined with deep technical work at our processing centres.'],['Competitive Compensation','Market-leading salaries, performance incentives and comprehensive benefits.']],card),'alt')
+`<section id="openings"><div class="w">`+hd('JOIN THE TEAM','Open Positions',"We are actively hiring across the following roles. Don't see a perfect fit? Apply anyway — we always want to hear from talented people.")+G(ROLES,([d,ty,t,l,e])=>`<div class="card rv"><span class="tag">${d}</span><span class="tag">${ty}</span><h3>${t}</h3><p style="font-size:14px">${l} · ${e}</p></div>`)+`</div></section>`
+S(`<div style="max-width:760px;margin:auto">`+hd('GET IN TOUCH','Express Your Interest','Fill in the form below and our HR team will be in touch. You can also attach your CV by email to careers@aerosparke.com after submitting.')+form(`<div class="r">${fld('Full Name','Full Name','text',1)}${fld('Email','Email Address','email',1)}</div><div class="r">${fld('Phone','Phone Number','tel')}${sel('Experience','Years of Experience',['Fresher / Intern','1–2 years','2–5 years','5–10 years','10+ years'],'Select experience')}</div>${sel('Position','Position of Interest',ROLES.map(r=>r[2]).concat('Other / Not listed'),'Select a role (or leave blank for general enquiry)')}<label>Tell Us About Yourself<textarea name="About"></textarea></label>${fileUpload()}`,'Submit Application','Careers','careers')+`</div>`,'alt'),

cinematography:()=>hero('Cinematic Drone Videography','See the World From Above','AEROSPARKe Industries delivers breathtaking aerial cinematography — from golden-hour real estate reels to large-scale film productions and live event coverage.','aerial-cinematography/hero',`<div class="hero-btns">${L('Request a Quote',enq('Cinematography'))}${L('View All Services','#/services','btn o')}</div>`)
+S(`<div class="hd rv"><h2>Where Technology Meets Storytelling</h2><p>Our cinematography team combines DGCA-certified pilots, cinema-grade stabilised gimbals and cutting-edge drone platforms to capture footage that moves audiences — from sweeping landscape reveals to dramatic tracking shots and live event aerials.</p></div>`)
+S(hd('What We Offer','Cinematography Services')+G(CIN,([t,d,a])=>`<div class="card rv"><h3>${t}</h3><p style="margin-bottom:12px">${d}</p>${ul(a)}</div>`),'alt')
+S(hd('Our Work','Frames That Tell Stories')+G([['film-production','Film & TV Production'],['real-estate','Real Estate & Architecture'],['events','Events & Live Coverage'],['corporate','Corporate & Brand Films']].map(([i,t])=>[`aerial-cinematography/${i}`,t]),([i,t])=>ic(i,t),'g4'))
+S(hd('Capabilities','Our Cinematography Capabilities')+`<div class="chips">${['4K / 6K RAW Video Capture','3-Axis Stabilised Gimbal Systems','FPV & Freestyle Drone Shots','Night & Low-Light Filming','Live Aerial Streaming','360° Panoramic Photography','Time-lapse & Hyperlapse','Full Post-Production & Colour Grade','DGCA-Certified Pilots','Multi-Drone Fleet Operations','Rapid Turnaround Delivery','Nationwide Deployment'].map(c=>`<span class="chip on">${c}</span>`).join('')}</div>`,'alt')
+S(hd('Our Fleet','Cinema-Grade Equipment')+G([['DJI Inspire 3','Professional Cinema Drone','Full-frame X9-8K Air gimbal, 8K RAW, 360° rotation, dual-operator support'],['DJI Zenmuse X9 / X7','Cinema Camera Payload','Full-frame / Super 35, RAW video, interchangeable lenses'],['DJI Mavic 4 Pro','Agile Cinematography','4/3" CMOS, 6K, Hasselblad colour science'],['FPV Racing Drone','Dynamic & Immersive Shots','High-speed tracking, tight spaces, creative angles'],['AEROSPARKe Custom Drone','Bespoke Mission Platform','In-house engineered airframe, mission-specific payload integration, extended endurance']],([t,s,d])=>`<div class="card rv"><h3>${t}</h3><p style="color:var(--ac);font-size:14px">${s}</p><p style="font-size:14px">${d}</p></div>`))
+S(hd('Packages','Pricing & Packages','Transparent packages built for every production scale. All packages include DGCA-certified pilots and full insurance coverage. All prices are indicative.')+G(PK,([t,s,ta,a,pop])=>`<div class="card price rv${pop?' pop':''}">${pop?'<span class="pp">Most Popular</span>':''}<h3>${t}</h3><p style="font-size:14px">${s}</p><big>On Request</big><p style="font-size:13px;margin-bottom:10px">Turnaround: ${ta}</p>${ul(a)}<a class="btn price-btn" href="${enq('Cinematography')}">Request Quote</a></div>`,'g4'),'alt')
+cta('Ready to Elevate Your Vision?',"Tell us about your project and we'll craft a custom aerial cinematography plan that fits your brief, timeline, and budget.",'Get in Touch',enq('Cinematography')),

contact:q=>hero('CONTACT US',"Let's Talk About Your Project","Whether you need a topographic survey, LiDAR mapping, GIS analysis or a full geospatial solution — our team is ready to help. Reach out and we'll respond within one business day.")
+S(`
<div class="contact-split-wrap rv">
  <div class="contact-info-panel">
    <div>
      <span class="contact-badge-pill">/ GET IN TOUCH /</span>
      <h2 class="contact-info-title">We are always ready to help you and answer your questions</h2>
      <p class="contact-info-sub">Whether you need a topographic survey, LiDAR mapping, GIS analysis or a full geospatial solution — our team is ready to help.</p>
      
      <div class="contact-details-grid">
        <div class="contact-detail-item">
          <div class="contact-icon-bubble">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="contact-detail-text">
            <span class="contact-detail-label">Call Us</span>
            <a href="tel:+918667456759">+91 86674 56759</a>
            <a href="tel:+914012345678">+91 40 1234 5678</a>
          </div>
        </div>

        <div class="contact-detail-item">
          <div class="contact-icon-bubble">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="contact-detail-text">
            <span class="contact-detail-label">Our Location</span>
            <p>Aerosparke Industries Pvt Ltd<br>Plot No 22, No.1/299, Alasanatham Rd, Shanthi Nagar, VASTHUSALA, Hosur, Tamil Nadu 635109</p>
          </div>
        </div>

        <div class="contact-detail-item">
          <div class="contact-icon-bubble">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="contact-detail-text">
            <span class="contact-detail-label">Email Us</span>
            <a href="mailto:info@aerosparke.com">info@aerosparke.com</a>
            <a href="mailto:careers@aerosparke.com">careers@aerosparke.com</a>
          </div>
        </div>

        <div class="contact-detail-item">
          <div class="contact-icon-bubble">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="contact-detail-text">
            <span class="contact-detail-label">Working Hours</span>
            <p>Monday – Sunday:<br>8:00 AM – 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-social-section">
      <span class="contact-social-heading">Social Network</span>
      <div class="contact-social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-circle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter / X" class="social-circle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="social-circle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="social-circle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>
        </a>
        <a href="https://wa.me/+918667456759" target="_blank" rel="noopener" aria-label="WhatsApp" class="social-circle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.46-.05 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z"/></svg>
        </a>
      </div>
    </div>
  </div>

  <div class="contact-form-panel">
    <h2 class="contact-form-title">Send Us an Enquiry</h2>
    <p class="contact-form-sub">Fill in the details below and our team will get back to you with a tailored proposal.</p>
    ${form(`<div class="r">${fld('Full Name','Full Name','text',1)}${fld('Company','Company / Organisation')}</div><div class="r">${fld('Email','Email Address','email',1)}${fld('Phone','Phone Number','tel')}</div>${sel('Service','Service Required',['Drone & Aerial Surveying','LiDAR Mapping','GIS & Geospatial Intelligence','Photogrammetry & 3D Modelling','Infrastructure Engineering Surveys','Smart City & Digital Mapping','Multiple Services','Other / Not Sure','Cinematography'],'Select a service')}${fld('Location','Project Location')}<label>Project Description<textarea name="Description"></textarea></label>`,'Send a Message','Enquiry','contact')}
  </div>
</div>
`)
+`<iframe title="Map" loading="lazy" style="width:100%;height:420px;border:0;border-top:1px solid var(--line)" src="https://www.google.com/maps?q=12.7388022,77.8484264&z=14&output=embed"></iframe>`};
R.cinematography.k='aerial-cinematography';
function animateCounters(){
  document.querySelectorAll('.count-up:not(.counted)').forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight&&rect.bottom>0){
      el.classList.add('counted');
      const target=parseFloat(el.dataset.target)||0;
      const prefix=el.dataset.prefix||'';
      const suffix=el.dataset.suffix||'';
      const duration=1600;
      const startTime=performance.now();
      function update(now){
        const elapsed=now-startTime;
        const progress=Math.min(elapsed/duration,1);
        const ease=progress===1?1:1-Math.pow(2,-10*progress);
        const current=Math.floor(ease*target);
        el.textContent=prefix+current+suffix;
        if(progress<1){
          requestAnimationFrame(update);
        }else{
          el.textContent=prefix+target+suffix;
        }
      }
      requestAnimationFrame(update);
    }
  });
}
let io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');animateCounters();io.unobserve(e.target)}}),{threshold:.12});
function route(){const [r,qs]=location.hash.slice(2).split('?'),k=R[r]?r:'';document.title=(NAV.find(n=>n[0]==k)||['','Contact'])[1]+' | AEROSPARKe Industries';
$('#app').innerHTML=R[k](qs);document.querySelectorAll('nav a[data-r]').forEach(a=>a.classList.toggle('on',a.dataset.r==k));nav.classList.remove('op');
if(qs){const s=new URLSearchParams(qs).get('service'),el=document.querySelector('select[name=Service]');if(s&&el){[...el.options].forEach(o=>{if(o.text==s||s.startsWith(o.text.slice(0,8)))el.value=o.text})}}
window.scrollTo(0,0);document.querySelectorAll('.rv').forEach(e=>io.observe(e));document.querySelectorAll('video').forEach(v=>{v.muted=true;v.play().catch(()=>{})});if(typeof setTimeout!=='undefined')setTimeout(animateCounters,80);}
addEventListener('hashchange',route);addEventListener('scroll',()=>{document.querySelector('header').classList.toggle('sc',scrollY>40);animateCounters()},{passive:true});route();
