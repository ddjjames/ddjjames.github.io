const carouselContainer = document.querySelector('.carousel-container');
// I need to make this look for all the carousel controls conntainers in the html file
const carouselControlsContainer = document.querySelector('.carousel-controls');
const carouselControls = ['previous', 'next'];
const carouselItems = document.querySelectorAll('.carousel-item');
const picTexts = document.querySelectorAll('.carousel-item-para');

class Carousel
{
    constructor(container, items, controls, picItems)
    {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.carouselPicTexts = [...picItems]
    }

    updateCarousel(){

        // This loop removes the specified class name from the images
        // to produce the moving effect.
        this.carouselArray.forEach( el => 
            {
                for (let index = 0; index <  this.carouselArray.length; ++index) 
                {
                    el.classList.remove(`carousel-item-${index + 1}`);
                }
        });

        // This adds the class names back to the carousel array
        // making the first item in the carousel array have the
        // carousel-item-1 tag and so on so all that is happening here is
        // that we are switch class names around
        this.carouselArray.slice(0,this.carouselArray.length).forEach((el, i) => 
        {
            el.classList.add(`carousel-item-${i+1}`);
        });
    }

    setCurrentState(direction)
    {
        this.carouselPicTexts[0].style.display = 'none';

        if(direction.className == 'carousel-controls-previous'){
            this.carouselArray.unshift(this.carouselArray.pop());
            this.carouselPicTexts.unshift(this.carouselPicTexts.pop());
        }
        else
        {
            this.carouselArray.push(this.carouselArray.shift());
            this.carouselPicTexts.push(this.carouselPicTexts.shift());
        }

        this.carouselPicTexts[0].style.display = 'block';

        //console.log('After set current state');
        //console.log(this.carouselArray);
        this.updateCarousel();
    }

    setControls()
    {
        this.carouselControls.forEach(control => {
            carouselControlsContainer.appendChild(document.createElement('button')).className = `carousel-controls-${control}`;
            document.querySelector(`.carousel-controls-${control}`).innerText = control;
        })
    }

    useControls(){
        const trig = [...carouselControlsContainer.childNodes];
        trig.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            })
        })
    }
}

const exampleCarousel = new Carousel(carouselContainer, carouselItems, carouselControls, picTexts);

exampleCarousel.setControls();
exampleCarousel.useControls();