// Hamburger Menu Toggle
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Interactive Desmos Simulation Simulation
const sliderK = document.getElementById("sliderK");
const valK = document.getElementById("valK");
const sliderA = document.getElementById("sliderA");
const valA = document.getElementById("valA");
const graphPath = document.getElementById("graphPath");
const halfLifePoint = document.getElementById("halfLifePoint");
const halfLifeLineX = document.getElementById("halfLifeLineX");
const halfLifeLineY = document.getElementById("halfLifeLineY");
const textHalfLife = document.getElementById("textHalfLife");

function updateGraph() {
  const k = parseFloat(sliderK.value);
  const A = parseFloat(sliderA.value);

  valK.textContent = k.toFixed(2);
  valA.textContent = Math.round(A);

  // Calculate Half-life: t = ln(2)/k
  const halfLife = Math.log(2) / k;
  textHalfLife.textContent = halfLife.toFixed(1);

  // Draw curve: y = A * e^(-kt)
  // SVG coordinates: Width 500 (t: 0 to 30), Height 300 (y: 0 to 500)
  // Margin-left: 50, Margin-bottom: 50 -> Graph area width 420, height 220
  // t max = 30 -> scaleX = 420 / 30 = 14
  // y max = 500 -> scaleY = 220 / 500 = 0.44

  let points = [];
  for (let t = 0; t <= 30; t += 0.5) {
    const y = A * Math.exp(-k * t);
    const svgX = 50 + t * 14;
    const svgY = 250 - y * 0.44;
    points.push(`${svgX},${svgY}`);
  }
  graphPath.setAttribute("d", "M " + points.join(" L "));

  // Calculate half-life coordinates for indicator point
  const hlY = A / 2;
  const hlSvgX = 50 + halfLife * 14;
  const hlSvgY = 250 - hlY * 0.44;

  if (halfLife <= 30 && hlSvgY >= 30) {
    halfLifePoint.setAttribute("cx", hlSvgX);
    halfLifePoint.setAttribute("cy", hlSvgY);
    halfLifePoint.setAttribute("style", "display: block;");

    halfLifeLineX.setAttribute("x1", hlSvgX);
    halfLifeLineX.setAttribute("y1", hlSvgY);
    halfLifeLineX.setAttribute("x2", hlSvgX);
    halfLifeLineX.setAttribute("y2", 250);
    halfLifeLineX.setAttribute("style", "display: block;");

    halfLifeLineY.setAttribute("x1", 50);
    halfLifeLineY.setAttribute("y1", hlSvgY);
    halfLifeLineY.setAttribute("x2", hlSvgX);
    halfLifeLineY.setAttribute("y2", hlSvgY);
    halfLifeLineY.setAttribute("style", "display: block;");
  } else {
    halfLifePoint.setAttribute("style", "display: none;");
    halfLifeLineX.setAttribute("style", "display: none;");
    halfLifeLineY.setAttribute("style", "display: none;");
  }
}

if (sliderK && sliderA) {
  sliderK.addEventListener("input", updateGraph);
  sliderA.addEventListener("input", updateGraph);
  updateGraph(); // Initial run
}

// Source summaries are paraphrases, not reconstructed full prompts.
const topics = {
  image: {
    name: "AI Image",
    stages: [
      [
        "Zero-shot",
        3,
        "เริ่มจากคำขอกว้าง ๆ",
        "ขอสร้างภาพโปสเตอร์เกี่ยวกับการอนุรักษ์สิ่งแวดล้อม ผลลัพธ์มีหลายสไตล์ แต่ยังไม่ได้กำหนดผู้ชมและบริบทการใช้งาน",
        "คำสั่งและผลลัพธ์อยู่ในหน้าเดียวกัน",
      ],
      [
        "Few-shot",
        4,
        "ระบุผู้ชมและรายละเอียดของงาน",
        "กำหนดโปสเตอร์แนวตั้ง สไตล์ minimalist โทนเขียว–ฟ้า ภาพต้นไม้และโลก ข้อความ “รักษ์โลก เริ่มที่เรา” ตัวอักษรอ่านง่าย สำหรับติดในโรงเรียนมัธยม กลุ่มเป้าหมายอายุ 12–18 ปี",
        "เอกสารเรียกคำสั่งที่ปรับรายละเอียดนี้ว่า Few-shot",
      ],
      [
        "Result",
        5,
        "เห็นความต่างของทิศทางภาพ",
        "หน้าเปรียบเทียบแสดงโปสเตอร์จากทั้งสองคำสั่ง โดยภาพ Few-shot ใช้ต้นไม้ โลก และข้อความรณรงค์ตามโจทย์ที่เจาะจงขึ้น",
        "ดูผลลัพธ์หลายแบบเพิ่มเติมได้ที่หน้า 3 และ 4",
      ],
      [
        "Reflection",
        5,
        "บริบทปลายทางสำคัญ",
        "หน้า 5 สะท้อนว่า prompt แรกเปิดให้ AI เดาสไตล์ สี ข้อความ และกลุ่มเป้าหมาย ส่วนคำสั่งที่ชัดขึ้นช่วยควบคุมงานให้ตรงวัตถุประสงค์และลดรอบแก้ไข",
        "สรุปการสะท้อนการเรียนรู้จากเอกสาร",
      ],
    ],
  },
  desmos: {
    name: "Desmos",
    stages: [
      [
        "Zero-shot",
        7,
        "กราฟที่ยังขาดการทดลอง",
        "ขอกราฟแสดงความสัมพันธ์ทางคณิตศาสตร์เกี่ยวกับการอนุรักษ์สิ่งแวดล้อม หน้า 7 แสดงทั้งกราฟผลตอบแทนลดลงและภาพ Desmos ของสมการ y = 100e⁻⁰·⁰⁵ˣ",
        "ภาพ Desmos ในหน้านี้ยังเป็นสมการค่าคงที่",
      ],
      [
        "Few-shot",
        8,
        "จากสมการ สู่เครื่องมือเรียนรู้",
        "ระบุแบบจำลอง y = A · e^(−kt), A เป็นปริมาณมลพิษเริ่มต้น, k เป็นอัตราการลด และ t เป็นเวลาในปี ขอ slider สำหรับ A และ k พร้อมจุดครึ่งชีวิต และคำสั่งที่นำไปพิมพ์ได้ทันที",
        "กราฟในเว็บไซต์ใช้แบบจำลองจากหน้านี้",
      ],
      [
        "Result",
        8,
        "จุดครึ่งชีวิตที่อ่านได้",
        "ภาพผลลัพธ์แสดง A = 100, k = 0.15, h = ln(2)/k และจุด (h, 0.5A) ได้ประมาณ (4.62098, 50)",
        "ค่าดังกล่าวเป็นผลคำนวณของแบบจำลอง ไม่ใช่ข้อมูลตรวจวัด",
      ],
      [
        "Reflection",
        9,
        "บอกวัตถุประสงค์ของกราฟ",
        "บทสะท้อนเน้นว่าการเพิ่ม slider ทำให้เห็นความสัมพันธ์ของตัวแปรกับรูปร่างกราฟ และการบอกวัตถุประสงค์ช่วยให้ AI เลือกฟีเจอร์ได้ตรงงาน",
        "ข้อสังเกตต้นฉบับ: หน้า 9 กล่าวถึง a, b, c แต่คำสั่งและภาพหน้า 8 ใช้ A และ k เว็บไซต์ยึดหน้า 8 สำหรับกราฟ",
      ],
    ],
  },
  mermaid: {
    name: "Mermaid",
    stages: [
      [
        "Zero-shot",
        11,
        "ระบุรูปแบบ Mermaid ตั้งแต่ต้น",
        "แบบฝึกหัดต้นฉบับขอ Mermaid flowchart สำหรับระบบสั่งซื้อออนไลน์ โดยบทสะท้อนระบุว่าผลลัพธ์มี decision node และ error loop อยู่แล้ว",
        "เป็นแบบฝึกหัดเครื่องมือในเอกสาร ไม่ใช่ระบบ Smart Green City",
      ],
      [
        "Zero-shot result",
        12,
        "ตรรกะครบ แต่ผังยังแน่น",
        "ผลลัพธ์แรกเป็นผังแนวยาว หน้า 15 อธิบายว่ามี 14 ขั้นตอนปนกันและยังไม่มีสีเน้นจุดสำคัญ",
        "ภาพต้นฉบับแสดงที่หน้า 12",
      ],
      [
        "Few-shot",
        13,
        "ปรับโครงสร้างและการสื่อความหมาย",
        "คำสั่งปรับปรุงให้แบ่งสอง subgraph ระหว่างฝั่งลูกค้าและหลังบ้าน ใช้สีเขียวสำหรับจุดสำเร็จ สีแดงหรือส้มสำหรับข้อผิดพลาด และคง decision node กับ loop เดิม",
        "สรุปเทคนิคการจัดผังจากคำสั่งเดิม โดยไม่เปลี่ยนให้เป็นข้อเท็จจริงด้านสิ่งแวดล้อม",
      ],
      [
        "Result",
        14,
        "จัดกลุ่มและเน้นสถานะ",
        "ภาพผลลัพธ์แสดงการแบ่งกลุ่มและสีของ node เพื่อให้ผังที่มีตรรกะเดิมสื่อสารได้ง่ายขึ้น",
        "หลักฐานต้นฉบับของผลลัพธ์ Few-shot",
      ],
      [
        "Reflection",
        15,
        "ปรับการนำเสนอได้ แม้ตรรกะถูกแล้ว",
        "การเพิ่มรายละเอียดไม่ได้จำเป็นต้องแก้ตรรกะที่ผิดเสมอไป แต่สามารถปรับ visual และ organization ให้เหมาะกับการนำเสนอ",
        "ผัง Mermaid บนเว็บไซต์เป็นแผนภาพสรุปบทเรียนนี้",
      ],
    ],
  },
  latex: {
    name: "LaTeX",
    stages: [
      [
        "Zero-shot",
        17,
        "เริ่มด้วยบทความแบบง่าย",
        "ขอโค้ด LaTeX สำหรับบทความวิชาการเรื่องการอนุรักษ์สิ่งแวดล้อมในเมืองแบบง่าย ๆ ผลตอบกลับแนะนำ XeLaTeX และมีตัวอย่าง fontspec กับฟอนต์ TH Sarabun PSK",
        "หน้า 17 มีคำแนะนำทางเทคนิคบางส่วนอยู่แล้ว",
      ],
      [
        "Zero-shot result",
        18,
        "ผลลัพธ์บน Overleaf",
        "เอกสารแสดงภาพโค้ดและบทความที่ได้จากคำสั่งแรกบน Overleaf",
        "ภาพต้นฉบับหน้า 18",
      ],
      [
        "Few-shot",
        19,
        "กำหนดเนื้อหาและเทคนิคพร้อมกัน",
        "ระบุหัวข้อย่อยของบทความ ประเด็นสิ่งแวดล้อม และตัวอย่างแนวทางอนุรักษ์ พร้อม article, A4, XeLaTeX, fontspec, polyglossia, Loma และ APA ด้วย biblatex",
        "ขอเลขหน้ามุมล่างขวา และตอบเฉพาะโค้ดที่ compile ได้",
      ],
      [
        "Result",
        20,
        "จากข้อกำหนดสู่บทความ",
        "ภาพหน้า 20 แสดงผลลัพธ์โค้ดและบทความ Few-shot บน Overleaf",
        "เป็นผลลัพธ์ที่บันทึกใน PDF เว็บไซต์ไม่ได้ทดสอบ compile เอกสาร LaTeX ใหม่",
      ],
      [
        "Reflection",
        21,
        "สองมิติของคำสั่ง LaTeX",
        "บทสะท้อนเน้นการกำหนดทั้งเนื้อหาที่ต้องการและรายละเอียดการ compile เพื่อให้ได้งานที่ใช้ได้จริง",
        "ข้อสังเกตต้นฉบับ: หน้า 21 กล่าวถึงความเสี่ยงเรื่องฟอนต์ของคำสั่งแรก แต่หน้า 17 มีคำแนะนำ XeLaTeX และฟอนต์แล้ว",
      ],
    ],
  },
  notebook: {
    name: "NotebookLM",
    stages: [
      [
        "Zero-shot",
        23,
        "ขอสรุปจากสามแหล่งข้อมูล",
        "ขอสรุปเนื้อหาสำคัญเรื่องการอนุรักษ์สิ่งแวดล้อมและความสัมพันธ์ของข้อมูลทั้ง 3 ไฟล์ โดยภาพเป็นหน้าสร้างแผนผังความคิด",
        "ต้นฉบับใช้รูปแบบแผนผังความคิดในขั้นนี้",
      ],
      [
        "Zero-shot result",
        24,
        "บทสรุปแบบแยกส่วน",
        "หน้า 24 แสดงแผนผังความคิด และหน้า 27 อธิบายว่าผลลัพธ์แรกยังเป็นการสรุปแต่ละไฟล์กับความเชื่อมโยงที่กว้าง",
        "ไม่ใช่สไลด์ชุดเดียวกับผลลัพธ์ Few-shot",
      ],
      [
        "Few-shot",
        25,
        "วางกรอบ Smart Green City",
        "ระบุแหล่งข้อมูลเป็นบทความสิ่งแวดล้อมเมือง กราฟการลดแบบเอ็กซ์โพเนนเชียล Desmos และ System Workflow ขอเค้าโครงนำเสนอ 5 สไลด์ ภายใต้หัวข้อการพัฒนาระบบบริหารจัดการสิ่งแวดล้อมเมืองอัจฉริยะ",
        "ภาพแสดงการตั้งค่า Slide Deck เป็นภาษาไทย",
      ],
      [
        "Result",
        26,
        "สังเคราะห์เป็นงานนำเสนอ",
        "หน้า 26 แสดงสไลด์เรื่องวิกฤตสิ่งแวดล้อม โครงสร้างระบบ แบบจำลอง Exponential Decay มาตรการเชิงรูปธรรม และข้อเสนอแนะ",
        "หน้า 27 ระบุว่างานมี 5 หน้าพร้อม Speaker Notes แต่ไม่ได้แสดง Speaker Notes ฉบับเต็ม",
      ],
      [
        "Reflection",
        27,
        "เชื่อมข้อมูลข้ามรูปแบบ",
        "บทสะท้อนเรียกการเชื่อมสมการ ผังระบบ และบทความว่า Cross-source Integration การกำหนดกรอบแนวคิดและโครงสร้างผลลัพธ์ช่วยให้การสังเคราะห์มีทิศทาง",
        "ข้อความและตัวเลขบนสไลด์เป็นเนื้อหาต้นฉบับ ไม่ใช่การรับรองผลลัพธ์ด้านสิ่งแวดล้อมโดยเว็บไซต์",
      ],
    ],
  },
};
topics.website = {
  name: "Website",
  stages: [
    [
      "Zero-shot",
      29,
      "เริ่มจากคำขอสร้างเว็บไซต์",
      "ขอให้อ่าน PDF แล้วช่วยสร้างเว็บไซต์ด้วย HTML, CSS และ JavaScript พร้อมจัดเป็นไฟล์ ZIP สำหรับนำไปเผยแพร่บน GitHub",
      "ภาพหน้า 29 แสดงคำสั่งแรกและแนวทางออกแบบที่ AI เสนอ",
    ],
    [
      "Zero-shot result",
      30,
      "เว็บไซต์จากคำสั่งแรก",
      "หน้า 30 แสดงหน้าเว็บไซต์ “รักษ์โลก เริ่มที่เรา” ที่ใช้หัวข้อเมืองที่หายใจได้และค่าครึ่งชีวิต 4.6 ปีเป็นจุดเด่น",
      "ภาพนี้เป็นผลลัพธ์ในเอกสาร ค่าครึ่งชีวิตเป็นค่าจากแบบจำลอง ไม่ใช่ข้อมูลตรวจวัด",
    ],
    [
      "Few-shot",
      31,
      "กำหนดบทบาทและแหล่งข้อมูลให้ชัด",
      "คำสั่งแบบ AGENT MODE ระบุบทบาทด้าน frontend และ interactive design ให้ตรวจโครงการเดิมก่อนปรับปรุง ใช้ PDF เป็นแหล่งอ้างอิง และไม่แต่งข้อเท็จจริงเพิ่มเติม",
      "คำสั่งในภาพกล่าวถึง PDF 27 หน้า ซึ่งเป็นฉบับที่ใช้ในขณะสร้างเว็บไซต์",
    ],
    [
      "Result",
      32,
      "เว็บไซต์ที่เชื่อมกับหลักฐาน",
      "หน้า 32 แสดงผลลัพธ์ Smart Green City ที่ใช้หัวข้อ “จากคำสั่ง สู่ความเข้าใจ เมืองสีเขียว” และภาพโปสเตอร์จากโครงงาน",
      "ภาพต้นฉบับของผลลัพธ์ Few-shot ไม่ใช่หน้าเว็บที่ฝังให้ใช้งานในภาพ",
    ],
    [
      "Reflection",
      33,
      "ระบุทั้งงานที่ทำและข้อมูลที่ยึดถือ",
      "บทสะท้อนเปรียบเทียบคำขอทั่วไปกับคำสั่งที่กำหนดบทบาท แหล่งข้อมูลที่เชื่อถือได้ และข้อห้ามในการกุข้อมูล โดยเน้นความสำคัญของการทดสอบผลลัพธ์และการอ้างอิงเอกสารจริง",
      "สรุปบทสะท้อนจากหน้า 33 ของ PDF ฉบับใหม่",
    ],
  ],
};
let selectedTopic = "image",
  selectedStage = 0,
  currentPage = 1,
  slidePages = [],
  viewerMode = "slide";
const $ = (id) => document.getElementById(id);
function selectTopic(key, scroll = false) {
  selectedTopic = key;
  selectedStage = 0;
  document.querySelectorAll("[data-lab]").forEach((b) => {
    const active = b.dataset.lab === key;
    b.setAttribute("aria-selected", active);
    b.tabIndex = active ? 0 : -1;
  });
  $("labPanel").setAttribute("aria-labelledby", `tab-${key}`);
  $("stageButtons").replaceChildren(
    ...topics[key].stages.map((stage, i) => {
      const b = document.createElement("button");
      b.textContent = stage[0];
      b.addEventListener("click", () => selectStage(i));
      return b;
    }),
  );
  selectStage(0);
  if (scroll) {
    $("lab").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    $(`tab-${key}`).focus({ preventScroll: true });
  }
}
function selectStage(i) {
  selectedStage = i;
  const s = topics[selectedTopic].stages[i];
  [...$("stageButtons").children].forEach((b, j) =>
    b.setAttribute("aria-pressed", i === j),
  );
  $("labSource").textContent =
    `${topics[selectedTopic].name} / PDF หน้า ${s[1]}`;
  $("labTitle").textContent = s[2];
  $("labText").textContent = s[3];
  $("labNote").textContent = s[4];
  $("labImage").src = `assets/slides/page-${String(s[1]).padStart(2, "0")}.jpg`;
  $("labImage").alt =
    `หลักฐาน ${topics[selectedTopic].name} ${s[0]} จาก PDF หน้า ${s[1]}`;
  $("labCaption").textContent = `หน้า ${s[1]} · คลิกภาพเพื่อขยาย`;
}
document
  .querySelectorAll("[data-lab]")
  .forEach((b) =>
    b.addEventListener("click", () => selectTopic(b.dataset.lab)),
  );
document
  .querySelectorAll("[data-topic]")
  .forEach((b) =>
    b.addEventListener("click", () => selectTopic(b.dataset.topic, true)),
  );
document.querySelector(".topic-tabs").addEventListener("keydown", (e) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
  e.preventDefault();
  const keys = Object.keys(topics);
  let i = keys.indexOf(selectedTopic);
  i =
    e.key === "Home"
      ? 0
      : e.key === "End"
        ? keys.length - 1
        : (i + (e.key === "ArrowRight" ? 1 : -1) + keys.length) % keys.length;
  selectTopic(keys[i]);
  $(`tab-${keys[i]}`).focus();
});
$("resetGraph").addEventListener("click", () => {
  sliderA.value = 100;
  sliderK.value = 0.15;
  updateGraph();
});
siteNav.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});
function goToPage(page, scroll = false) {
  currentPage = Math.max(
    1,
    Math.min(slidePages.length || Number(page) || 1, Number(page) || 1),
  );
  const meta = slidePages[currentPage - 1];
  $("slideImage").src =
    meta?.image ||
    `assets/slides/page-${String(currentPage).padStart(2, "0")}.jpg`;
  $("slideImage").alt = `PDF ต้นฉบับ หน้า ${currentPage}`;
  $("pageSelect").value = String(currentPage);
  $("pageCount").textContent = `${currentPage} / ${slidePages.length || "…"}`;
  $("prevPage").disabled = currentPage === 1;
  $("nextPage").disabled =
    !slidePages.length || currentPage === slidePages.length;
  $("openPdf").href =
    `assets/presentation.pdf?v=03851ca168#page=${currentPage}`;
  $("pageText").textContent = meta?.text || "กำลังโหลดข้อความ";
  if (viewerMode === "pdf") renderPdfPage();
  if (scroll) {
    setViewerMode("slide");
    $("slides").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    $("viewer").focus({ preventScroll: true });
  }
}
function setViewerMode(mode) {
  viewerMode = mode;
  $("slideImage").hidden = mode !== "slide";
  $("pdfObject").hidden = mode !== "pdf";
  $("slideMode").setAttribute("aria-pressed", mode === "slide");
  $("pdfMode").setAttribute("aria-pressed", mode === "pdf");
  if (mode === "pdf") renderPdfPage();
}
$("slideMode").addEventListener("click", () => setViewerMode("slide"));
$("pdfMode").addEventListener("click", () => setViewerMode("pdf"));
$("prevPage").addEventListener("click", () => goToPage(currentPage - 1));
$("nextPage").addEventListener("click", () => goToPage(currentPage + 1));
$("pageSelect").addEventListener("change", (e) => goToPage(e.target.value));
$("viewer").addEventListener("keydown", (e) => {
  if (e.target.matches("select,button,a,summary")) return;
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    goToPage(currentPage + (e.key === "ArrowRight" ? 1 : -1));
  }
});
document
  .querySelectorAll("[data-page]")
  .forEach((b) =>
    b.addEventListener("click", () => goToPage(b.dataset.page, true)),
  );
$("labOpen").addEventListener("click", () =>
  goToPage(topics[selectedTopic].stages[selectedStage][1], true),
);
$("labZoom").addEventListener("click", () => {
  $("dialogImage").src = $("labImage").src;
  $("dialogImage").alt = $("labImage").alt;
  $("evidenceDialog").showModal();
});
$("closeEvidence").addEventListener("click", () => $("evidenceDialog").close());
$("evidenceDialog").addEventListener("click", (e) => {
  if (e.target === $("evidenceDialog")) $("evidenceDialog").close();
});
$("slideImage").addEventListener("error", () => {
  $("viewerStatus").textContent =
    "โหลดภาพหน้านี้ไม่สำเร็จ ใช้ PDF View หรือเปิดไฟล์ต้นฉบับได้จากปุ่มด้านบน";
});
$("slideImage").addEventListener("load", () => {
  $("viewerStatus").textContent = "";
});
selectTopic("image");
// Generated from the bundled PDF and embedded in HTML: works without fetch,
// including local file previews and hosts that do not serve JSON.
slidePages = JSON.parse($("slideManifest").textContent);
$("pageSelect").replaceChildren(
  ...slidePages.map((p) => new Option(String(p.page), String(p.page))),
);
goToPage(currentPage);
if (window.mermaid) {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    fontFamily: "Tahoma, sans-serif",
    themeVariables: {
      primaryColor: "#eef2e8",
      primaryTextColor: "#214d3b",
      primaryBorderColor: "#7a9970",
      lineColor: "#32644c",
      clusterBkg: "#f9faf5",
      clusterBorder: "#c8dab8",
    },
  });
  mermaid.run({ nodes: [$("learningDiagram")] }).catch(() => {
    $("learningDiagram").textContent =
      "Zero-shot: ตรรกะครบ → Few-shot: แบ่งกลุ่มและใช้สี → อ่านง่ายขึ้น";
  });
}

// PDF.js is loaded on demand; both module and worker are served locally.
let pdfDocumentPromise,
  pdfRenderSequence = 0;
async function renderPdfPage() {
  const sequence = ++pdfRenderSequence;
  if (location.protocol === "file:") {
    const image = document.createElement("img");
    image.id = "pdfCanvas";
    image.src = slidePages[currentPage - 1].image;
    image.alt = `PDF ต้นฉบับ หน้า ${currentPage}`;
    $("pdfCanvas").replaceWith(image);
    $("pdfStatus").textContent =
      "แสดงภาพหน้าต้นฉบับครบทุกหน้า · เปิดผ่านเว็บเซิร์ฟเวอร์เพื่อใช้ PDF.js หรือเปิดไฟล์ PDF จากปุ่มด้านบน";
    return;
  }
  $("pdfStatus").textContent = "กำลังอ่าน PDF ต้นฉบับ…";
  try {
    if (!pdfDocumentPromise)
      pdfDocumentPromise = import("./assets/vendor/pdf.min.mjs")
        .then((pdfjs) => {
          pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            "./assets/vendor/pdf.worker.min.mjs",
            document.baseURI,
          ).href;
          return pdfjs.getDocument({
            url: new URL(
              "assets/presentation.pdf?v=03851ca168",
              document.baseURI,
            ).href,
            isEvalSupported: false,
          }).promise;
        })
        .catch((error) => {
          pdfDocumentPromise = null;
          throw error;
        });
    const doc = await pdfDocumentPromise;
    const page = await doc.getPage(currentPage);
    if (sequence !== pdfRenderSequence) return;
    const viewport = page.getViewport({ scale: 1 });
    const width = Math.min(
      1800,
      Math.max(800, $("pdfObject").clientWidth * devicePixelRatio),
    );
    const scaled = page.getViewport({ scale: width / viewport.width });
    const canvas = document.createElement("canvas");
    canvas.width = scaled.width;
    canvas.height = scaled.height;
    canvas.id = "pdfCanvas";
    canvas.setAttribute("role", "img");
    canvas.setAttribute(
      "aria-label",
      `PDF ต้นฉบับ หน้า ${currentPage} จาก ${doc.numPages}`,
    );
    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: scaled,
    }).promise;
    if (sequence !== pdfRenderSequence) return;
    $("pdfCanvas").replaceWith(canvas);
    $("pageCount").textContent = `${currentPage} / ${doc.numPages}`;
    $("pdfStatus").textContent =
      `PDF ต้นฉบับ · หน้า ${currentPage} จาก ${doc.numPages}`;
  } catch (error) {
    if (sequence === pdfRenderSequence)
      $("pdfStatus").textContent =
        "เปิด PDF View ไม่สำเร็จ ใช้ Slide View หรือดาวน์โหลดไฟล์ต้นฉบับจากปุ่มด้านบน";
  }
}
