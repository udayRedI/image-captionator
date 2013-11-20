Here is a library built on basic jquery for captioning for images in html.

$("img").captionator({location:'top',color: "#fff",backgroundColor: "#000"});

These are the three options provided to initiate the caption in the images.

I have provided a event mouseout

$("img").captionator(
    {
        location:'top',
        color: "#fff",
        backgroundColor: "#000"
    }).bind('mouseout', function(){
        //Callback here
    });
