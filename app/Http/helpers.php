
<?php

function delete_image($image){
    if(Storage::exists('public/images/'.$image)){
        Storage::delete('public/images/'.$image);
      }else{
        return('image does not exist');
      }

}



