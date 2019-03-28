$("button").click(function(event){
    event.preventDefault();
    var inputTextVal = $("#inputText").val();
    console.log(inputTextVal);
    
    //AWS configurations required to use AWS Polly
    AWS.config.region = 'eu-central-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'INSERT POOL ID HERE',
    });
    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    
    let params = {
        "LanguageCode": "ru-RU",
        "OutputFormat": "mp3",
        "OutputS3BucketName": "lingqaudio",
        "SnsTopicArn": "SNS TOPIC ARN",
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
            $('p.text-response-url').text(data.SynthesisTask.OutputUri);
            

            
            //Timeout function is used as AWS SNS isn't setup yet, 
            //a message needs to be sent to allow the src attr of the <audio> tag to be updated to create an async response.
            setTimeout(function(){
                var audio = $('audio');
                var url = data.SynthesisTask.OutputUri;
                $('audio').attr("controls", "controls");
                audio[0].src = url;
                audio[0].play();
            },15000);
            
           
            

        }
    }
    
    //This is the AWS Polly request
    if($("#inputText").val() != "") {
        
        console.log("starting GET request");
        polly.startSpeechSynthesisTask(params, synthCB);
        console.log("End of GET request");
    } else return;
});







   

    
    
    





