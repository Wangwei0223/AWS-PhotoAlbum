Voice/Text Enabled Photo Album

### Assignment_3 Voice/Text Enabled Photo Album

Group Members:

1. Wei Wang    ww1306
2. Jingyao Li  jl9075
3. Kuan Chen   kc3422
4. Guanhua Chen gc2229

This Photo Album app contains
1. upload image files in JPG or PNG format to S3 Bucket.
2. upload action trigger lambda 1 using Rekognition to detect labels
3. Store labels to ES
4. Serach labels from ES (enabled both text and voice input using aws-lex-audio.min.js) and display images. Using Lex to extract key words

folder:

    lambda:
    > index-photos.py: LF1
        
    > search-photo.py: LF2
        
    > SearchPhotoCodeHook: Hook lambda for lex

    other folders:
        front-end code using Vue.js

s3 link:
    https://s3.amazonaws.com/photoccc/index.html

    default route to https://s3.amazonaws.com/photoccc/index.html#/search

For Locally run
1. git clone git@github.com:Wangwei0223/AWS-PhotoAlbum.git

2. cd Assignment_3

3. npm install

4. npm run dev

5. host on http://127.0.0.1:3000/#/search (defalut route path is /search, other paths are for assignment_1 and assignment_2)





