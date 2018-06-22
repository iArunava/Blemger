# Blemger

Blemger is a Web Application that can be used to create a nice blend between two images. The blending works on color images that is Images
with 3 planes Red, Green and Blue with the ability to control freely
the ratio how each plane would effect the resulting blended image.

The blending even works with images that differ in its height and width. [See more](#max-height-and-width-of-blemgered-image)

_Note:_ You can press `Esc` key to close the modal image.

Head here and create great blends!! [Blemger](https://iarunava.github.io/Blemger/)

## Take a quick look!

![blemger](https://user-images.githubusercontent.com/26242097/41759151-9610bc8c-760a-11e8-8d50-7f676cfe31f9.png)

## How it works?

Blemger is developed around the concept of _linear blend_ where each pixel in the blended image is a mapping from both the input images and the resulting pixel is

    g(x) = (a * f1(x)) + (b * f2(x))

where `a` and `b` is a multiplicative factor that ranges between `0` and `1` both inclusive.
And `f1(x)` and `f2(x)` refers to the pixels from the two images.

With JavaScript at the heart, we have the option to play with one more factor that incluences the resulting blended image, that is the alpha factor.

What is alpha?

Well, in JS, alpha determines the opacity of the image, so basically the opacity of the resulting image is also a linear combination of the two images!!

But, we are not often looking for images that we can see through, so, I have the option to play around with alpha is disabled initially, and the user can choose to enable it from the [options menu](#available-options).

## Available options

1. [Enable Linear Blend](#enable-linear-blend)
2. [Enable Alpha Slider](#enable-alpha-slider)
3. [Negate Left Image](#negate-left-image)
4. [Negate Right Image](#negate-right-image)
5. [Make Blemgered image height and width max of the two images](#max-height-and-width-of-blemgered-image)
6. [Make the heart beat!](#Make-the-Heart-Beat)

### Enable Linear Blend

This option is enabled by default, what this does is it keeps the multiplicative factor for one plane (i.e. either red, green, blue and even alpha) summed up to `1`.
That is in case of linear blend the equation looks like This

    g(x) = (a * f1(x)) + ((1 - a) * f2(x))

That said it can be disabled from the options menu.

_How does this help?_

Well, it helps create nice blends!
If you disable it, i.e. the multiplicative factors sums up to be greater than `1` then its most likely that you will overshoot `255` when summing the images up and undershoot `0` when negating the images, which will result in highly bright(white pixles) and highly dark(black pixels) in the resulting blended image.

### Enable Alpha slider

The alpha slider is disabled by default and with that you can rely on the fact that all pixles in the blended image will have a opacity value of `1` i.e. maximum opacity.

But you can enable the slider and play around and create some great blends!!

### Negate Left Image

If this option is enabled, then a `-ve` sign is put in front of all pixel values for the left  image.
So,

    g(x) = -(a * f1(x)) + (b * f2(x))


### Negate Right Image

If this option is enabled, then a `-ve` sign is put in front of all pixel values for the right image.
So,

    g(x) = (a * f1(x)) + (-(b * f2(x)))

If both of the above options are enabled then,

    g(x) = -(a * f1(x)) + (-(b * f2(x)))

### Max Height and Width of Blemgered Image

By default, the height and width of the blended image is minimum of the natural height and width of the two images. Whcih results in a image that is a blend of two images and the blended image completely contains pixels from both the images! But the resulting image will crop out the pixels of the bigger image that are out of the size being considered for the final resulting image. And this cropping is done from the top left corner of the image.

But, you can choose to have the blended image have the maximum width and height of the natural width and natural height of the two available images, by enabling this option! I should warn you though, if one image is smaller than the other then you probably will see the smaller image sticked to the top left corner of the final blended image!

### Make the heart beat

Okay, what??

Haha! This is a fun feature! Enable it in the options and head down to the bottom of the page for a fun surprise ;)

This shows my love while coding this project and my love for programming :)

## A few blends!

Feel free to add your amazing creation here :)

## LICENSE

What are you waiting for? Fork and go Crazy!! ;)
