function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',model_loaded)
}
function draw() {
  image(video,0,0,300,300)
  classifier.classify(video,video_loaded)
}
function model_loaded() {
  console.log("model_initialized")
}
var previous_result=""
function video_loaded(error,result) {
  if (error) {
    console.error(error)
    
  }else {
    if (result[0].confidence>0.5 && previous_result !=result[0].labels) {
      console.log(result)
      previous_result=result[0].label
      document.getElementById("result_object_name").innerHTML=result[0].label
      document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(2)
      var synthesis=window.speechSynthesis
      speak_data="object detected is "+result[0].label
      var utter=new SpeechSynthesisUtterance(speak_data)
      //synthesis.speak(utter)
    }
  }
}

