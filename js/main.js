/* ============================================================
   main.js — สคริปต์เล็ก ๆ 3 อย่างของหน้านี้
   1) ใส่ปีปัจจุบันในกรอบท้ายกระดาษ
   2) สลับโหมดสีสว่าง/มืด
   3) คัดลอกอีเมลเมื่อกดขา Email

   หมายเหตุ: ไฟล์นี้เป็นสคริปต์ธรรมดา ไม่ใช่ ES Module
   จึงเปิดหน้าเว็บด้วยการดับเบิลคลิก index.html ได้เลย
   ============================================================ */

// ---------- 1) ใส่ปีปัจจุบัน ----------
// ดึงปี ค.ศ. จากนาฬิกาเครื่อง แล้วบวก 543 ให้เป็น พ.ศ.
var yearEl = document.getElementById("year");
if (yearEl) {
  var buddhistYear = new Date().getFullYear() + 543;
  yearEl.textContent = "พ.ศ. " + buddhistYear;
}

// ---------- 2) สลับโหมดสี ----------
var toggleBtn = document.getElementById("modeToggle");
var modeLabel = document.getElementById("modeLabel");

if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    // เพิ่ม/ถอด class "negative" ที่ body
    // ตัวแปรสีทั้งหมดใน theme.css จะถูกเขียนทับอัตโนมัติ
    var isNegative = document.body.classList.toggle("negative");

    // เปลี่ยนข้อความบนปุ่มให้บอกว่ากดแล้วจะได้อะไร
    modeLabel.textContent = isNegative ? "POSITIVE" : "NEGATIVE";
  });
}

// ---------- 3) คัดลอกอีเมล ----------
var hintEl = document.getElementById("copyHint");
var copyLinks = document.querySelectorAll("[data-copy]");
var hintDefault = hintEl ? hintEl.textContent : "";

copyLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    var text = link.getAttribute("data-copy");

    // clipboard API ใช้ได้เฉพาะบน https หรือ localhost
    // ถ้าใช้ไม่ได้ ปล่อยให้ลิงก์ mailto ทำงานตามปกติ
    if (!navigator.clipboard) return;

    event.preventDefault();

    navigator.clipboard.writeText(text).then(
      function () {
        showHint("คัดลอกแล้ว: " + text);
      },
      function () {
        showHint("คัดลอกไม่สำเร็จ กดค้างที่ลิงก์เพื่อคัดลอกเอง");
      }
    );
  });
});

// แสดงข้อความแจ้งผล แล้วคืนค่าเดิมหลัง 2.5 วินาที
function showHint(message) {
  if (!hintEl) return;
  hintEl.textContent = message;
  window.setTimeout(function () {
    hintEl.textContent = hintDefault;
  }, 2500);
}
