console.log('Client side javascript is loaded');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''
        fetch(`/weather?address=${location}`).then((response)=>{
            response.json().then((body)=>{
                if(body.error){
                     
                return messageOne.textContent = body.error;
            }
            messageOne.textContent = body.location;
            messageTwo.textContent = body.forecast;
        })
        })
    
})

