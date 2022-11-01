export function randomNumber(max, min){
    return Math.floor(Math.random() * max) + min; 

}

export function randomBorderRadius(){
    let string = `border-radius: 50% 50% ${randomNumber(70, 40)}% ${randomNumber(70, 40)}% / 50% ${randomNumber(70, 40)}% 50% ${randomNumber(70, 40)}%;`
    return string
}

export function randomColor(){
    return `box-shadow: 0px 5px 5px 3px rgba(${randomNumber(255, 50)}, ${randomNumber(255, 50)}, ${randomNumber(200, 50)}, 0.8`

}

