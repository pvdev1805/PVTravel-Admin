// Show/Hide Menu Mobile
const buttonMenuMobile = document.querySelector('.header .inner-button-menu')
if (buttonMenuMobile) {
  const sider = document.querySelector('.sider')
  const siderOverlay = document.querySelector('.sider-overlay')

  buttonMenuMobile.addEventListener('click', () => {
    sider.classList.add('active')
    siderOverlay.classList.add('active')
  })

  siderOverlay.addEventListener('click', () => {
    sider.classList.remove('active')
    siderOverlay.classList.remove('active')
  })
}
// End Show/Hide Menu Mobile

// Add New Schedule - Section 8 - Create Tour page
const scheduleSection8 = document.querySelector('.section-8 .inner-schedule')
if (scheduleSection8) {
  const buttonCreate = scheduleSection8.querySelector('.inner-schedule-create')
  const listItem = scheduleSection8.querySelector('.inner-schedule-list')

  // Add New Schedule
  buttonCreate.addEventListener('click', () => {
    const firstItem = listItem.querySelector('.inner-schedule-item')
    const cloneItem = firstItem.cloneNode(true)

    cloneItem.querySelector('.inner-schedule-head input').value = ''

    const body = cloneItem.querySelector('.inner-schedule-body')
    const id = `mce_${Date.now()}`
    body.innerHTML = `<textarea id="${id}" textarea-mce></textarea>`

    listItem.appendChild(cloneItem)
    initTinyMCE(`#${id}`)
  })

  // Show/Hide Item
  listItem.addEventListener('click', (event) => {
    // Show/Hide Description of Schedule Item
    if (event.target.closest('.inner-more')) {
      const parentItem = event.target.closest('.inner-schedule-item')
      if (parentItem) {
        parentItem.classList.toggle('hidden')
      }
    }

    // Remove Schedule Item
    if (event.target.closest('.inner-remove')) {
      const parentItem = event.target.closest('.inner-schedule-item')
      const totalItem = listItem.querySelectorAll('.inner-schedule-item').length
      if (parentItem && totalItem > 1) {
        parentItem.remove()
      }
    }
  })

  // Drag and Drop Schedule Item using SortableJS
  new Sortable(listItem, {
    animation: 150,
    handle: '.inner-move',
    onStart: (event) => {
      const textarea = event.item.querySelector('[textarea-mce]')
      const id = textarea.id
      tinymce.get(id).remove()
    },
    onEnd: (event) => {
      const textarea = event.item.querySelector('[textarea-mce]')
      const id = textarea.id
      initTinyMCE(`#${id}`)
    }
  })
}
// End Add New Schedule - Section 8 - Create Tour page

// FilePond - Upload Image
const listFilePondImage = document.querySelectorAll('[filepond-image]')
let filePond = {}
if (listFilePondImage) {
  listFilePondImage.forEach((filePondImage) => {
    FilePond.registerPlugin(FilePondPluginImagePreview)
    FilePond.registerPlugin(FilePondPluginFileValidateType)

    filePond[filePondImage.name] = FilePond.create(filePondImage, {
      labelIdle: '+'
    })
  })
}
// End FilePond - Upload Image

// Revenue Chart - Dashboard page
const revenueChart = document.querySelector('#revenue-chart')
if (revenueChart) {
  new Chart(revenueChart, {
    type: 'line',
    data: {
      labels: ['01', '02', '03', '04', '05', '06', '07'],
      datasets: [
        {
          label: 'Feb 2025',
          data: [280, 120, 320, 240, 500, 370, 460],
          borderColor: '#36a1ea',
          borderWidth: 1.5
        },
        {
          label: 'Jan 2025',
          data: [100, 150, 120, 400, 360, 430, 410],
          borderColor: '#fe6383',
          borderWidth: 1.5
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Revenue (AUD)'
          }
        }
      },
      maintainAspectRatio: false
    }
  })
}
// End Revenue Chart - Dashboard page

// JustValidate - Category Create Form Validation
const categoryCreateForm = document.querySelector('#category-create-form')
if (categoryCreateForm) {
  const validator = new JustValidate('#category-create-form')

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: ' Please enter category name!'
      }
    ])
    .onSuccess((event) => {
      const name = event.target.name.value
      const parent = event.target.parent.value
      const position = event.target.position.value
      const status = event.target.status.value
      const avatars = filePond.avatar.getFiles()

      let avatar = null
      if (avatars.length > 0) {
        avatar = avatars[0].file
      }

      const description = tinymce.get('description').getContent()

      console.log('Category Name:', name)
      console.log('Parent Category:', parent)
      console.log('Position:', position)
      console.log('Status:', status)
      console.log('Avatar:', avatar)
      console.log('Description:', description)
    })
}
// End JustValidate - Category Create Form Validation

// JustValidate - Tour Create Form Validation
const tourCreateForm = document.querySelector('#tour-create-form')
if (tourCreateForm) {
  const validator = new JustValidate('#tour-create-form')

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Please enter tour name!'
      }
    ])
    .onSuccess((event) => {
      const name = event.target.name.value
      const category = event.target.category.value
      const position = event.target.position.value
      const status = event.target.status.value
      const avatars = filePond.avatar.getFiles()

      let avatar = null
      if (avatars.length > 0) {
        avatar = avatars[0].file
      }

      const priceAdult = event.target.priceAdult.value
      const priceChildren = event.target.priceChildren.value
      const priceBaby = event.target.priceBaby.value

      const priceNewAdult = event.target.priceNewAdult.value
      const priceNewChildren = event.target.priceNewChildren.value
      const priceNewBaby = event.target.priceNewBaby.value

      const stockAdult = event.target.stockAdult.value
      const stockChildren = event.target.stockChildren.value
      const stockBaby = event.target.stockBaby.value

      const locations = []

      const time = event.target.time.value
      const vehicle = event.target.vehicle.value
      const departureDate = event.target.departureDate.value

      const information = tinymce.get('information').getContent()

      const schedules = []

      // Locations
      const listElementLocation = tourCreateForm.querySelectorAll(`input[name="locations"]:checked`)
      listElementLocation.forEach((input) => {
        locations.push(input.value)
      })
      // End Locations

      // Schedules
      const listElementSchedule = tourCreateForm.querySelectorAll('.inner-schedule-item')
      listElementSchedule.forEach((scheduleItem) => {
        const input = scheduleItem.querySelector(`input`)
        const title = input.value

        const textarea = scheduleItem.querySelector(`textarea`)
        const idTextarea = textarea.id
        const description = tinymce.get(idTextarea).getContent()

        schedules.push({
          title: title,
          description: description
        })
      })
      // End Schedules

      console.log('Tour Name:', name)
      console.log('Category:', category)
      console.log('Position:', position)
      console.log('Status:', status)
      console.log('Avatar:', avatar)
      console.log('Price Old Adult:', priceAdult)
      console.log('Price Old Children:', priceChildren)
      console.log('Price Old Baby:', priceBaby)
      console.log('Price New Adult:', priceNewAdult)
      console.log('Price New Children:', priceNewChildren)
      console.log('Price New Baby:', priceNewBaby)
      console.log('Stock Adult:', stockAdult)
      console.log('Stock Children:', stockChildren)
      console.log('Stock Baby:', stockBaby)
      console.log('Locations:', locations)
      console.log('Time:', time)
      console.log('Vehicle:', vehicle)
      console.log('Departure Date:', departureDate)
      console.log('Information:', information)
      console.log('Schedules:', schedules)
    })
}
// End JustValidate - Tour Create Form Validation
