const G = 25;
const canvas = document.getElementById('blueprintCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

let currentFloor = 0;

// DATA MODEL
const mapData = {
    0: { walls: [], shelves: [], furniture: [], facilities: [] },
    1: { walls: [], shelves: [], furniture: [], facilities: [] },
    2: { walls: [], shelves: [], furniture: [], facilities: [] }
};

/* --- INIT --- */
function init() {
    buildArchitecturalData();
    draw();
}

/* --- DATA OPBOUW --- */
function buildArchitecturalData() {
    // 1. VASTE KERNEN (Trap & Lift)
    [0, 1, 2].forEach(f => {
        mapData[f].facilities.push({type: 'stairs', x: 28, y: 1, w: 4, h: 4, label: 'TRAP'});
        mapData[f].facilities.push({type: 'lift', x: 28, y: 6, w: 4, h: 3, label: 'LIFT'});
        mapData[f].walls.push({x: 27.5, y: 0.5, w: 5, h: 9});
    });

    // --- BEGANE GROND ---
    const bg = mapData[0];
    bg.furniture.push({type: 'desk', x: 10, y: 14, w: 8, h: 4, label: 'SERVICE BALIE'});
    bg.walls.push({x: 0, y: 21, w: 12, h: 0.5}); 
    bg.walls.push({x: 20, y: 21, w: 14, h: 0.5});
    // Kasten A
    for(let i=0; i<8; i++) bg.shelves.push({id: `A${i+1}`, x: 2 + (i%4)*5, y: 4 + Math.floor(i/4)*4, w: 4, h: 1});

    // --- 1e VERDIEPING ---
    const f1 = mapData[1];
    f1.furniture.push({type: 'table', x: 6, y: 8, w: 6, h: 6, label: 'STUDIE'});
    f1.furniture.push({type: 'table', x: 16, y: 8, w: 6, h: 6, label: 'LEES HOEK'});
    // Kasten B
    for(let i=0; i<10; i++) f1.shelves.push({id: `B${i+1}`, x: 2, y: 2 + i*2, w: 3, h: 1});

    // --- 2e VERDIEPING ---
    const f2 = mapData[2];
    // Kasten C
    for(let i=0; i<12; i++) {
        f2.shelves.push({id: `C${i+1}`, x: 4, y: 2 + i*1.5, w: 10, h: 1});
        f2.shelves.push({id: `C${i+13}`, x: 16, y: 2 + i*1.5, w: 8, h: 1});
    }
}

/* --- INTERACTIE --- */
function switchFloor(f) {
    currentFloor = f;
    document.querySelectorAll('.floor-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === f);
    });
    draw();
}

/* --- TEKEN ENGINE --- */
function draw() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();

    const data = mapData[currentFloor];

    drawRects(data.walls, "#2c3e50", true); // Muren
    drawRects(data.furniture, "#f39c12");   // Meubels
    drawFacilities(data.facilities);        // Trap/Lift

    data.shelves.forEach(s => {
        ctx.fillStyle = "#34495e";
        ctx.fillRect(s.x*G, s.y*G, s.w*G, s.h*G);
        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1;
        ctx.strokeRect(s.x*G, s.y*G, s.w*G, s.h*G);
        
        ctx.fillStyle = "#ffffff"; 
        ctx.font = "bold 10px Arial"; ctx.textAlign = "center";
        ctx.fillText(s.id, s.x*G + s.w*G/2, s.y*G + s.h*G/2 + 4);
    });

    if(currentFloor === 0) drawEntrance();
}

/* --- HULP FUNCTIES --- */
function drawGrid() {
    ctx.beginPath(); ctx.strokeStyle = "#e0e0e0"; ctx.lineWidth = 0.5;
    for(let x=0; x<=W; x+=G) { ctx.moveTo(x,0); ctx.lineTo(x,H); }
    for(let y=0; y<=H; y+=G) { ctx.moveTo(0,y); ctx.lineTo(W,y); }
    ctx.stroke();
}

function drawEntrance() {
    ctx.fillStyle = "rgba(227, 125, 34, 0.2)";
    ctx.fillRect(12*G, 20*G, 8*G, 2*G);
    
    ctx.beginPath(); ctx.strokeStyle = "#E37D22"; ctx.lineWidth = 3;
    ctx.moveTo(12*G, 22*G); ctx.lineTo(12*G, 20*G);
    ctx.moveTo(20*G, 22*G); ctx.lineTo(20*G, 20*G);
    ctx.stroke();
    
    ctx.fillStyle = "#E37D22"; ctx.font = "bold 14px Arial"; ctx.textAlign = "center";
    ctx.fillText("HOOFDINGANG", 16*G, 21.5*G);
}

function drawFacilities(list) {
    list.forEach(f => {
        ctx.fillStyle = "#7f8c8d"; ctx.fillRect(f.x*G, f.y*G, f.w*G, f.h*G);
        ctx.strokeStyle = "#2c3e50"; ctx.lineWidth = 2; ctx.strokeRect(f.x*G, f.y*G, f.w*G, f.h*G);
        
        if(f.type === 'stairs') {
            ctx.beginPath(); ctx.strokeStyle = "#bdc3c7"; ctx.lineWidth = 1;
            for(let i=1; i<f.h*2; i++) {
                let yPos = f.y*G + (i*(G/2));
                ctx.moveTo(f.x*G, yPos); ctx.lineTo(f.x*G + f.w*G, yPos);
            }
            ctx.stroke();
        }
        ctx.fillStyle = "white"; ctx.font = "bold 12px Arial"; ctx.textAlign = "center";
        ctx.fillText(f.label, f.x*G + f.w*G/2, f.y*G + f.h*G/2 + 5);
    });
}

function drawRects(list, color, isWall = false) {
    list.forEach(o => {
        ctx.fillStyle = color;
        if(isWall) ctx.lineWidth = 4;
        ctx.fillRect(o.x*G, o.y*G, o.w*G, o.h*G);
        if(o.label) {
            ctx.fillStyle = "#2c3e50"; ctx.font = "bold 11px Arial"; ctx.textAlign = "center";
            ctx.fillText(o.label, o.x*G + o.w*G/2, o.y*G + o.h*G/2 + 4);
        }
    });
}

init();