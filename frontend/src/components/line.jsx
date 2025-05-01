import React from 'react'; 
function Line(prop){
    return(
        <div className="line-yell" style={{"backgroundColor" : prop.color ? prop.color : "white", "width" : prop.w ? prop.w : "0px", "height" : prop.h ? prop.h : "0px", "margin" : prop.margin ? prop.margin : "0px"}}></div>
    )
}

export default Line;