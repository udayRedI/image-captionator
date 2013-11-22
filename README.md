Here is a library built on basic jquery to have captioning on images in html.

This project is dependent on
1>jquery.js v1.4.1
2>jquery.ui.widget.js v1.8

Usage:
place 
<imageCaptionator src="image.jpg" alt="Image description"></imageCaptionator>
The src contains the image file, alt contains the description of the image. Put the below line in the script tag and it works.
$("img").captionator();
//By default the caption is initiated at the bottom of the image.


These are the three options provided to initiate the caption in the images.
$("img").captionator(
    {
        location: "bottom",
        color: "#fff",
        backgroundColor: 'rgba(0,0,0,.5);',
        height:'400px',
        width:'600px',
        captionHeight:'30px',
        slideTimeOut:1000
    });

These are the different options provided for extended usage and they are self explanatory
- Height and the width speak about the dimensions of the image to be rendered.
- Caption is the height of the caption that slides.
- SlideTimeOut is the time taken by the caption to slide on and off the image.

