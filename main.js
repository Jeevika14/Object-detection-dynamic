img="";

Status= "";

Objects = [];

function preload()
{
    img= loadImage('dog_cat.jpg');
}

function setup()
{
    canvas= createCanvas(380, 380);
    canvas.center()
    video= createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(Status != "")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i= 0; i < Objects.length; i++)
        {
            document.getElementById('status').innerHTML= "status: Object Detected" ;
            document.getElementById("number_of_objects").innerHTML= "Number Of Objects Detected are: " + Objects.length;
            fill(r, g, b);
            percent= floor(Objects[i].confidence*100);
            text(Objects[i].label + " " + percent + "%", Objects[i].x, Objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(Objects[i].x, Objects[i].y, Objects[i].width +15, Objects[i].height +15);
        }
    }
}

function modelLoaded()
{
    console.log('model Loaded');
    Status= true;
    
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);

    Objects = results;
}

function Start()
{
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "status: Detecting objects"; 
}