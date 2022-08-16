const inputName = document.getElementById('input-name')
const studentList = document.getElementById('student-list-group')
const display = document.getElementById('display')
const tryBtn = document.getElementById('try-btn')
const winnerList = document.getElementById('winner-list')

const firstPosition = document.getElementById('first-position')
const secondPosition = document.getElementById('second-position')
const thirdPosition = document.getElementById('third-position')

// Extract Text from textarea to an Array
// Render The Names Extracted from textarea
// Shuffle The Names Array for Better Result

const participantName = []

inputName.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    let temp = event.target.value
    let arrName = temp.replaceAll(' ', '$').replaceAll(', ').split('$')
    if (arrName[0] !== ''){
      arrName.forEach((name, index) => {
        participantName.push(name)
        let item = createStudentList(name, index + 1)
        studentList.appendChild(item)
        event.target.value = ''
      })
    }
  }
})

function createStudentList(name, index) {
  let li = document.createElement('li')
  li.className = 'student-list-item'
  li.innerHTML = `${index}. ${name}`
  return li
}
tryBtn.addEventListener('click', function () {
  if (participantName.length === 0) {
    alert('There is No Entry')
  } else {
    let shuffledName = Shuffle(participantName)
    for (let i = 1; i < shuffledName.length; i++){
      (function (i, count) {
        setTimeout(() => {
          let rand = Math.floor(Math.random() * shuffledName.length)
          display.innerHTML = shuffledName[rand]

          if (count === shuffledName.length - 1) {
            if (!firstPosition.innerHTML) {
              firstPosition.innerHTML = shuffledName[rand]
              let ind = participantName.indexOf(shuffledName[rand])
              participantName.splice(ind, 1)
            } else if (!secondPosition.innerHTML) {
              secondPosition.innerHTML = shuffledName[rand]
              let ind = participantName.indexOf(shuffledName[rand])
              participantName.splice(ind, 1)
            } else if (!thirdPosition.innerHTML) {
              thirdPosition.innerHTML = shuffledName[rand]
              let ind = participantName.indexOf(shuffledName[rand])
              participantName.splice(ind, 1)
              tryBtn.disabled = true
            } else {
              alert('Raffle Draw Already Completed')
            }
          }
        }, i)

      })(i*100, i)
    }
  }
})
// Array Fisher Algorithm

function Shuffle(arr) {
  let shuffledArr = [...arr]
  for (let i = shuffledArr.length - 1; i > 0; i--){
    let rand = Math.floor(Math.random() * (i + 1))
    let temp = shuffledArr[rand]
    shuffledArr[rand] = shuffledArr[i]
    shuffledArr[i] = temp
  }
  return shuffledArr
}
