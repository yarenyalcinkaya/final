let inputList = document.querySelector("#inputList")
console.dir(inputList)


inputList.addEventListener('input',()=>{
    console.log(inputList.value)
    const form = document.querySelector(`#${(inputList.value).replaceAll(' ','')}`)
    form.classList.add('goster')
})

document.getElementById('inputList').addEventListener('input', function () {
    // Önce tüm gizli bölümleri gizleyin
    var sections = document.querySelectorAll('.gizli');
    sections.forEach(function (section) {
      section.classList.remove('goster');
      section.classList.add('gizli');
    });
  
    // Seçilen değeri al
    var selectedValue = this.value.replace(/\s/g, '');
  
    // Eğer ilgili bölüm varsa, onu göster
    var selectedSection = document.getElementById(selectedValue);
    if (selectedSection) {
      selectedSection.classList.remove('gizli');
      selectedSection.classList.add('goster');
    }
  });