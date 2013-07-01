
var win = Titanium.UI.createWindow({
	title: 'Snapture',
	backgroundColor: '#FFFFFF'
})

var takePictureButton = Titanium.UI.createButton({
	title: "Take Picture",
	width: 120,
	height: 75,
	bottom: 5,
	zIndex: 2
})

win.add(takePictureButton);

takePictureButton.addEventListener("click", function(e){
	Titanium.Media.showCamera({
		success: function(e){
			if(e.mediaType === Titanium.Media.MEDIA_TYPE_PHOTO){
				// It's a photo, now show it
				var capturedImageView = Titanium.UI.createImageView({
					image: e.media,
					width: 288,
					height: 215,
					top: 5,
					zIndex: 1
				})
				win.add(capturedImageView);
			}else if(e.mediaType === Titanium.Media.MEDIA_TYPE_VIDEO){
				// It's a video, now play it
				var capturedVideoWindow = Titanium.UI.createWindow({
					title: "New Video",
					backgroundColor: '#000000'
				})
				
				var videoPlayer = Titanium.Media.createVideoPlayer({
					media: e.media
					
				})
				capturedVideoWindow.add(videoPlayer);
				
				videoPlayer.addEventListener("complete", function(e){
					// Remove the videoPlayer and mark it for garbage collection
					capturedVideoWindow.remove(videoPlayer);
					videoPlayer = null;
					capturedVideoWindow.close();
				})
			}
		},
		error: function(e){
			alert("Take Picture: There was an error.")
		},
		cancel: function(e){
			alert("Take Picture: Cancelled.")
		},
		allowEditing: true,
		SaveToPhotoGallery: true,
		mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO],
		videoQuality: Titanium.Media.QUALITY_HIGH
	})
})

win.open();
