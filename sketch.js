var crimeArray = []
var crimeCol = 3;
var angles = []
var r = [255, 250, 233, 240, 205]
var g = [160, 128, 150, 128, 92]
var b = [122, 114, 122, 128, 92]

//theft323,battery106,damage to property99,narcotics98,vehicle burglary81

function preload(){
    data = loadTable("data.csv")
}

function setup() {
    createCanvas(500, 500);

    for (var i = 0; i < 1254; i++) {
        crime = data.get(i, crimeCol)
        if (crime == 'OTHER') {
            // do nothing
        }
        else if (crime in crimeArray) {
            crimeArray[crime] += 1;
        } else {
            crimeArray[crime] = 1
        }
    }

    findAngles()
}

function draw() {
    background(255, 255, 255);
    noStroke()
    pieChart(300, angles);
    fill(0,0,0)
    textSize(20)
    text('Top Five Committed Crimes In Baton Rouge',20, 50) 
    text('From Novemebr 1st-18th, 2019',20,70)
    text('Theft',240,320)
    text('Battery',140,240)
    text('Damage to\n Property',250,150)
    text('Narcotics',160,150)
    text('Vehicular\n Burglary',310,210)
}

function pieChart(diameter, data) {
    let lastAngle = 0;
    for (let i = 0; i < data.length; i++) {
      fill(r[i], g[i], b[i]);
      arc(
        width / 2,
        height / 2,
        diameter,
        diameter,
        lastAngle,
          lastAngle + radians(angles[i])
      );
      lastAngle += radians(angles[i]);
    }
  }

  
function findAngles() {
    for (crime in crimeArray) {
        angles.push(crimeArray[crime])
        console.log(crime + " " + crimeArray[crime])
    }
    angles.sort(function(a, b){return b-a});
    angles = angles.slice(0, 5)
    totalCrime = sum(angles)
    
    for (angle in angles) {
        angles[angle] = (angles[angle]/totalCrime)*360
    }
}

function sum(array) {
    total = 0
    for (num in array) {
        total += array[num]
    }
    return total
}
