let inputList = document.querySelector("#inputList")
console.dir(inputList)


inputList.addEventListener('input',()=>{
    console.log(inputList.value)
    const form = document.querySelector(`#${inputList.value.replaceAll(' ','')}`)
    console.log(form)
    form.classList.add('goster')
})

let List = document.querySelector("#List") //id değeri List olandan seçe işlemi yapıyoruz.
console.dir(List)

List.addEventListener('input',()=>{
    console.log(List.value)
    const from = document.querySelector(`#${(List.value).replaceAll(' ','')}`) //List value ile seçilen değer alınıyor.
    from.classList.add('goster')//gizlediğimizi açtığımızı onu çalıltırdığımızı gösteriyor.
}
)

let emisyonKayıtList = document.querySelector("#emisyonKayıtList")
console.log(emisyonKayıtList)


emisyonKayıtList.addEventListener('input',()=>{
    console.log(emisyonKayıtList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(emisyonKayıtList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let emisyonGrupList = document.querySelector("#emisyonGrupList")
console.log(emisyonGrupList)

emisyonGrupList.addEventListener('input',()=>{
    console.log(emisyonGrupList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(emisyonGrupList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let mesaiKayıtList = document.querySelector("#mesaiKayıtList")
console.log(mesaiKayıtList)

mesaiKayıtList.addEventListener('input',()=>{
    console.log(mesaiKayıtList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(mesaiKayıtList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let kapsam1List = document.querySelector("#kapsam1List")
console.log(kapsam1List)

kapsam1List.addEventListener('input',()=>{
    console.log(kapsam1List.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(kapsam1List.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let kapsam3List = document.querySelector("#kapsam3List")
console.log(kapsam3List)

kapsam3List.addEventListener('input',()=>{
    console.log(kapsam3List.value.replaceAll(' ',''))
    const from = document.querySelector(`#${kapsam3List.value.replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let kapsam2List = document.querySelector("#kapsam2List")
console.log(kapsam2List)

kapsam2List.addEventListener('input', () => {
    const selectedValue = kapsam2List.value.replaceAll(' ', '');
    console.log(selectedValue);  // Check the selected value

    // Check if the element exists
    const element = document.querySelector(`#${selectedValue}`);
    if (element) {
        console.log(element);  // Make sure element is found

        // Add the class
        element.classList.add('goster');
        console.log(element.classList);  // Check if the class is added

    } else {
        console.log("Element not found");
    }
});

let tipList = document.querySelector("#tipList")
console.log(tipList)

tipList.addEventListener('input',()=>{
    console.log(tipList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(tipList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let üretimGirişList = document.querySelector("#üretimGirişList")
console.log(üretimGirişList)

üretimGirişList.addEventListener('input',()=>{
    console.log(üretimGirişList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(üretimGirişList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let üretimMerkezleriList = document.querySelector("#üretimMerkezleriList")
console.log(üretimMerkezleriList)

üretimMerkezleriList.addEventListener('input',()=>{
    console.log(üretimMerkezleriList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(üretimMerkezleriList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let üretimkayıtList = document.querySelector("#üretimkayıtList")
console.log(üretimkayıtList)

üretimkayıtList.addEventListener('input',()=>{
    console.log(üretimkayıtList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(üretimkayıtList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})

let belgeTakipList = document.querySelector("#belgeTakipList")
console.log(belgeTakipList)

belgeTakipList.addEventListener('input',()=>{
    console.log(belgeTakipList.value.replaceAll(' ',''))
    const from = document.querySelector(`#${(belgeTakipList.value).replaceAll(' ','')}`)
    console.log(from)
    from.classList.add('goster')
})