const ids = [
    "pushup","income","platform","judul",
    "belajar","durasi","healthy",
    "hiburan","statusHiburan",
    "notes","channels","ideas"
  ];
  
  const saveBtn = document.querySelector(".save");
  
  function saveData(){
    const date = datePicker.value;
    const data = {};
    ids.forEach(id => data[id] = document.getElementById(id).value);
    localStorage.setItem(date, JSON.stringify(data));
  
    saveBtn.innerText = "✔ Tersimpan";
    saveBtn.style.background =
      "linear-gradient(135deg,#00c853,#64dd17)";
  
    setTimeout(()=>{
      saveBtn.innerText = "💾 Simpan Hari Ini";
      saveBtn.style.background =
        "linear-gradient(135deg,#6a00ff,#8e2de2)";
    },1200);
  }
  
  function loadData(date){
    const raw = localStorage.getItem(date);
    if(!raw){
      ids.forEach(id=>document.getElementById(id).value="");
      return;
    }
    const data = JSON.parse(raw);
    ids.forEach(id=>{
      document.getElementById(id).value = data[id] || "";
    });
  }
  
  function exportData(){
    const data = {};
    Object.keys(localStorage).forEach(k=>{
      data[k] = JSON.parse(localStorage.getItem(k));
    });
    const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aktivitas-karier-2026.json";
    a.click();
  }
  
  function importData(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
      const data = JSON.parse(reader.result);
      Object.keys(data).forEach(k=>{
        localStorage.setItem(k, JSON.stringify(data[k]));
      });
      loadData(datePicker.value);
    };
    reader.readAsText(file);
  }
  
  saveBtn.onclick = saveData;
  
  const today = new Date().toISOString().split("T")[0];
  datePicker.value = today;
  loadData(today);
  
  datePicker.addEventListener("change",()=>{
    loadData(datePicker.value);
  });
  