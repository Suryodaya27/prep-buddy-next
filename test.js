const JWT_SECRET = "suryodayapandey";

function convertIdtoJwt(id){
    return jwt.sign({id: id}, JWT_SECRET);
}
console.log(convertIdtoJwt(1)); 