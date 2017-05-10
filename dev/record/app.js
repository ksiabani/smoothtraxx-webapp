//http://stackoverflow.com/questions/42336604/can-i-record-the-output-of-an-audio-without-use-of-the-microphone
audio.oncanplay = function(){
  var audioCtx = new AudioContext();
  var source = audioCtx.createMediaElementSource(audio);
  var gainNode = audioCtx.createGain();

  gainNode.gain.value = 1;

  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  var rec = new Recorder(gainNode);

  rec.record();
  setTimeout(function(){
    rec.stop()
    audio.pause();
    rec.exportWAV(function(blob){
      var a = new Audio(URL.createObjectURL(blob));
      a.controls = true;
      document.body.appendChild(a);
    });
  }, 6000);
};
