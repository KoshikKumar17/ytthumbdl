var download_btn = document.getElementById('Download_btn');
var container = document.querySelector('.container');
var videoUrlInput = document.getElementById('url')


download_btn.addEventListener("click", function() {
    var videoUrl = videoUrlInput.value;
    var resolution = document.getElementById("resolutionSelect").value;

    // Remove whitespaces and check if the URL is valid
    videoUrl = videoUrl.trim();
    if (videoUrl === "") {
      alert("Please enter a valid YouTube video URL.");
      return;
    }

    // Get video ID from URL
    var videoId = extractVideoId(videoUrl);
    if (videoId === null) {
      alert("Please enter a valid YouTube video URL.");
      return;
    }

    // Construct thumbnail URL based on resolution
    var thumbnailUrl = "https://img.youtube.com/vi/" + videoId + "/" + resolution + ".jpg";

    // Display thumbnail
    var thumbnailImg = document.createElement("img");
    thumbnailImg.src = thumbnailUrl;
    var thumbnailContainer = document.getElementById("output");

    setTimeout(() => {
      thumbnailContainer.innerHTML = "";
      thumbnailContainer.appendChild(thumbnailImg);
    }, 1000);

    thumbnailContainer.innerHTML = "<div class='loader'></div>"; 

  });

  function extractVideoId(url) {
    var videoId = null;
    var pattern = /(?:https?:\/\/(?:www\.)?)?(?:youtu(?:be\.com\/(?:watch\?v=|embed\/|v\/)|\.be\/)([\w\-]+)|youtube\.com\/shorts\/([a-zA-Z0-9_-]+))/i;
    var match = url.match(pattern);
    if (match) {
      if (match[1]) {
        if (match[1].length === 11) {
          videoId = match[1]; // Video ID
        }
      } else if (match[2]) {
        videoId = match[2]; // Shorts ID
      }
    }
    return videoId;
  }
