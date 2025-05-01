import React from 'react'; 
function Comment(){
    return(
        <div className="flex cenver starthor gap20 w-100" style={{"padding":"1%"}}>
            <img width="50px" height="50px" style={{"borderRadius":"50%"}} src="https://imgs.search.brave.com/1LcwfYbjU8OFzYWLk0FGt4SKF7kVE8qcG0TlTVd6GVc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMzhi/MDQ0cGV2bndjOS5j/bG91ZGZyb250Lm5l/dC9jdXRvdXQtbnV4/dC9jYXJ0b29uL25l/dy8xMy5qcGc"/>
            <div className="flex f-col w-100 gap10" style={{"border":"1px solid white","borderRadius":"5px","fontSize":"14px","color":"white","backgroundColor":"#ffffff3d", "padding":"2%"}}>
                <div className="flex cenhor spa-bet-ver">
                    <h1>
                        Phan Thị Bena
                    </h1>
                    <div className="flex cenhor cenver" style={{"width":"30px","height":"30px","border":"1px solid yellow","borderRadius":"50%","padding":"10px","backgroundColor":"#ffffff3d"}}>
                        <p>9</p>
                    </div>
                </div>
                <div className="w-100">
                    <p>
                        Phim hay quá ạ!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment;