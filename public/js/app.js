const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const btn2 = document.getElementById('btn-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    search.focus()
    const location = search.value
    messageOne.textContent = 'loading data...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
btn2.addEventListener('click', () => {
    search.value = ''
    search.focus()
    if (!navigator.geolocation)
           return alert('Geolocation is not supported in your browser')

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        messageOne.textContent = 'loading data...'
        messageTwo.textContent = ''
        fetch(`/weather?address=${latitude},${longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
})
