let cookie = {};

export default cookie

cookie.set = (cname,cvalue,exminutes)=>{
    var d = new Date();
    d.setTime(d.getTime()+(exminutes*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

cookie.get = (cname)=>{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

cookie.delete = (cname)=>{
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}