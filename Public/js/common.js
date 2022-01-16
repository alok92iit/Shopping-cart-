const allLikebtn =document.querySelectorAll(".like-btn")

async function likebtn(productId,btn){
    
    try{
        const data =await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        });//fas mean like  far mean unlike
        if(btn.children[0].classList.contains('fas'))
        {   
           
            btn.children[0].classList.add('far')
            btn.children[0].classList.remove('fas');
        }
        else{
            btn.children[0].classList.add('fas')
            btn.children[0].classList.remove('far');
           
        }


        
        }
    catch(err){
        window.location.replace("login")
        console.log(err.message)
    }
}


for(let btn of allLikebtn){
    btn.addEventListener("click",()=>{
        const productId = btn.getAttribute("product-id")
        likebtn(productId,btn)
    })
}