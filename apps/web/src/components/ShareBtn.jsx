
function ShareBtn(postId) {

    const sharePost = async () => {
        const url = `${window.location.origin}/${postId.id}`;
        console.log(postId.id)

        if(navigator.share){
            await navigator.share({
                title : "Check Out This Post Bitch!!!", 
                url : url
            })
        } else {
            await navigator.clipboard.writeText(url);
            alert("Link Copied, You Better Share This!!!")
        }
    }

    return (
        <button onClick={sharePost}>Share</button>
    )
}

export default ShareBtn