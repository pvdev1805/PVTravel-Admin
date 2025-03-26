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
if (listFilePondImage) {
  listFilePondImage.forEach((filePondImage) => {
    FilePond.registerPlugin(FilePondPluginImagePreview)
    FilePond.registerPlugin(FilePondPluginFileValidateType)

    FilePond.create(filePondImage, {
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
