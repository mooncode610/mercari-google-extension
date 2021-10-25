

function main() {
    let detailInfoEL;
    let currentLocation = location.href;
    let userId = currentLocation.split("/")[currentLocation.split("/").length - 1]
    const targetNode = document;
    const config = { childList: true, subtree: true };
    let result;
    let buyer;
    let createdDate
    let updatedDate
    let ids = [];
    let datas=[];
    let currentShowNum = 0;
    const updateDetailInfo = (data) => {
        let sticker = "";
        let message = ""
        let rating = ""
        detailInfoEL = $('mer-item-thumbnail','a[href="/item/'+data['id']+'"]')
        let filepath = $(detailInfoEL[0]).attr("src");
        $('a[href="/item/'+data['id']+'"]').css({display:"block"})
        if(!detailInfoEL.length) return;
        currentShowNum ++;
        if(data.status=="trading"){
            sticker= "sticker='sold'"
        }
        if(data.comments[0]){
            message = '<div style="display:flex"><img src="https://www.svgrepo.com/show/356146/comment.svg" /><div style="align-items:center;display:flex;"> ' + data.comments[0]['message'] + "</div></div>";
        }
        if(data.seller.ratings.good > data.seller.ratings.bad){
            rating = '<span class="item-name" style="line-height:1;color: blue;display: block;">Good</span>'
        } else {
            rating = '<span class="item-name" style="line-height:1;color: red;display: block;">Good</span>'
        }
        // $('a[href="/item/'+data['id']+'"]').html('');
        $('a[href="/item/'+data['id']+'"]').html(`
        <mer-item-thumbnail item-name=\"${data.name}" src=\"${filepath}\" alt=\"adfs\" size=\"fluid\" price=\"${data.price}\" radius=\"\" mer-defined=\"\" ${sticker}>
        </mer-item-thumbnail>
        <span class="item-name" style="line-height:1"><div style="display:flex"><img src="https://www.svgrepo.com/show/356087/pie.svg" /><div style="align-items:center;display:flex;"> ${(new Date(1000 * data.updated)).toISOString()}</div></div></span>
        <span class="item-name" style="line-height:1">${message}</span>
        ${rating}`);

    }
    const callback = function(mutationsList, observer) {
        
        let showedItemsNum = $('.ItemGrid__ItemGridCell-sc-14pfel3-1').length;
        if(currentShowNum % 30 != 0) return;
        if(currentShowNum < showedItemsNum) {
            currentShowNum = 0;
            for(let i = 0; i < datas.length; i++){
                updateDetailInfo(datas[i])
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    if(datas.length) return;
    $.ajax({
        type: "GET",
        url: "https://api.mercari.jp/items/get_items",
        headers: {
            "X-Platform": "web",
            "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiNE9ySUxYeVRkREM0ck9Yb0JWYWdrNjBmLUhqVlpyQmZ5S2U1S3ZBcDlkcyIsInkiOiJRUUJ3TFlZSWlZa2dDRjVIUGZZcmJGSlVTSVYyaVBob192bXktclN4TWE0In19.eyJpYXQiOjE2MzQ4MDgzNDcsImp0aSI6IjViOTI4MDgxLWEzOTUtNDMyNC04MmE3LWE0MjllZGZiMGI2ZCIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0X2l0ZW1zIiwiaHRtIjoiR0VUIiwidXVpZCI6IjA3ZjJhMWU2LTczNzItNGQxOS1iMmMxLWYxYzIxNzI4ZmI4NCJ9.MQrS_Ny6ZmO_AeWiAR0GeD9ugrsifXlM1eD89ffP2dVl2vLmQTOG5LZo9zfxjVfSqSre-6OxuLN2olEC2cvBHA"
        },
        data: { 
            seller_id: userId,
            limit: 150,
            status: "on_sale,trading,sold_out" },
        success: function(data) {
            result = data.data 
            for(let i = 0; i < result.length; i++){
                ids = [...ids, result[i].id]
                $.ajax({
                    type: "GET",
                    url: "https://api.mercari.jp/items/get",
                    headers: {
                        "X-Platform": "web",
                        "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiSV81ekRiUHAySVZwZXhkUllCTFJwWDF4c3ZJZF9qdW52QjdvOGY0MzhkdyIsInkiOiJEM3BVcTZya1F0RWdFamJBNXlMRVZVX2d6OXhKOTQ4ZFk3QVNxYnhPRW1BIn19.eyJpYXQiOjE2MzQ3MTYwNzgsImp0aSI6IjIyNjg1YzUzLTMyZWMtNDc0Yi1iMDk1LWVkZDczZDdkMTBiYSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0IiwiaHRtIjoiR0VUIn0.NI0OVE9bpxCjgLlNbuLGJW5CzpRGEyEUTxdIQBQpXOeo1WXopVCIhLcRnsp7ZXDZ1amGTCNZXTCXxEYEZtIVWA"
                    },
                    data: { id: result[i].id },
                    success: function(data) {
                        updateDetailInfo(data.data);
                        datas.push(data.data);
                    }
                });
            }
        }
    });
}
main();