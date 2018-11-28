$("button").click(function(event){
    event.preventDefault();
    var inputTextVal = $("#inputText").val();
    console.log(inputTextVal);
    AWS.config.region = 'eu-central-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-central-1:bcb9f252-99e8-480d-be8b-28727fb1032b',
    });
    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    
    let params = {
        "LanguageCode": "ru-RU",
        "OutputFormat": "mp3",
        "Text": inputTextVal,
        "TextType": "text",
        "VoiceId": "Maxim" 
    }

    let synthCB = function (err, data){
        if(err) {
            console.log(err);
        } else {
            console.log('saving mp3');
            console.log('AWS POLLY RESPONSE:', data);
            
            var uInt8Array = new Uint8Array(data.AudioStream);
            var arrayBuffer = uInt8Array.buffer;
            var blob = new Blob([arrayBuffer]);
            var audio = $('audio');
            var url = URL.createObjectURL(blob);
            $('audio').attr("controls", "controls");
            audio[0].src = url;
            audio[0].play();

        }
    }

    if($("#inputText").val() != "") {
        
        console.log("starting GET request");
        polly.synthesizeSpeech(params, synthCB);
        console.log("End of GET request");
    } else return;
});





   

    
    
    





