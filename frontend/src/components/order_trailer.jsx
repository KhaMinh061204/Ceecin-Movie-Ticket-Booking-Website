import React from 'react'; 

function OrderTrailer(){
    return(
        <section>
            {/* <video  autoPlay loop>
                <source src={trailer} type="video/mp4"/>
            </video> */}
            <iframe className="w-100 " style={{"height" : "100dvh"}} src="https://www.youtube.com/embed/6ZfuNTqbHE8?si=gOULFABN8Eu1SE1Z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </section>
    )
}

export default OrderTrailer;