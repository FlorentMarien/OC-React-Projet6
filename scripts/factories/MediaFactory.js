class MediaFactory{
    constructor(data){
        if(data.image != undefined) return new MediaImages(data);
        else if(data.video != undefined) return new MediaVideo(data);
        else return Error;
    }
}