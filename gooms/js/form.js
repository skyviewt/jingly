$(document).ready(function(){
	$("#error1").hide();
	$("#error2").hide();
	$("#sent-form-msg").hide();
	// on submit...

	$("#submit").click(function() {

		
    	var name = $("#name").val();

		var email = $("#email").val();
			
		var comments = $("#comments").val();
		
		var subject = "Website comments"

		
		// data string
		//dataString = 'name: ' + name + '& email: ' + email + '& comments: ' + comments + '& subject:' + subject
		dataString = {name : name, email: email, comments : comments, subject : subject};									         
		// ajax

	    var email_regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


	    if( isEmpty(name) )
        {
        	$('#error1').css('display', 'block');
        	return false;
        }

	 	if(email.match(email_regex) == null)
	 	{
	 		$('#error2').css('display', 'block');
	 	    return false;
	 	}	

	    $.ajax({
			type:"POST",
			url: "../contact/send-mail.php",
			data: dataString,
			success: success()
		});

		//need to return false to avoid the form refresh the page
		return false;

	});  
		
		
	// on success...
	 function success(){
	 	$("#sent-form-msg").fadeIn();
		console.log(dataString);
	 }

	 function isEmpty(data)
	 {
	    return (data.length == 0 || data === null || data === undefined);
	 }
	
    // return false;
});

