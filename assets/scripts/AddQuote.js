$(document).ready(function(){
	$("#addMessageBtn").click(addMessage);
	$(".username").change(changeUsername);
	$(".embedInput").change(reloadEmbed);
})

// Dynamically add new message submissions to the page
function addMessage(){
	let container = $('#formContainer');
	// Create the new elements to allow an extra message
	// This is kind of absurd, I realize, but it is what it is.
	let contentsDiv = $('<div class="avatar"><img src="/assets/avatars/default.png"></div><div class="contents"><h2 class="nameHeader"><input type="text" name="sender" placeholder="IRL First Name" class="username"></h2><div class="messageText"><textarea rows="14" cols="10" wrap="soft" name="message" placeholder="Message text" class="messageText"></textarea></div><div class="embed"><input type="text" name="embed" placeholder= "ImageEmbedFile.jpg (optional)" class="embedInput"></div></div><br>');
	container.append(contentsDiv);
	$(".username").change(changeUsername);
	$(".embedInput").change(reloadEmbed);
}

// Update username color and avatar image on username change
function changeUsername(){
	let value = $(this).val();
	$(this).css("color", "var(--username-" + value + ")");
	// mildly cursed tree traversal
	let avatar = $(this).parent().parent().prev().children();
	avatar.attr("src", "/assets/avatars/" + value + ".png");
}

function reloadEmbed(){
	let value = $(this).val();
	// Remove the old embed, if it existed
	$(this).next($("img")).remove();
	// If there's an image to add
	if (value != ''){
		// Add said image to the DOM
		$(this).parent().append($("<img src=\"/assets/embeds/" + value + "\">"))
	}
}