const search = document.querySelector('.search')
const button = document.querySelector('.search__button') 
const container = document.querySelector('body')

search.addEventListener('click',toggleSearch)

container.addEventListener('click',removeActiveClass)


function toggleSearch (event){
    event.stopPropagation(); //stop propagation
    if(event.target == button || button.contains(event.target)){ //check if button is clicked
        search.classList.toggle('active')
    }

}

function removeActiveClass(){
    search.classList.remove('active')
}