
console.log("On addInfo.js");
let detailInfoEL;
let currentLocation = location.href;
let itemId = currentLocation.split("/")[currentLocation.split("/").length - 1]
const targetNode = document;
const config = { childList: true, subtree: true };
let result;
const updateDetailInfo = () => {
    console.log("updateDetailInfo");
    detailInfoEL = $('section','#item-info')
    if(detailInfoEL.length == 0){
        setTimeout(updateDetailInfo, 500);
    } else{
        let container = $($('div',$(detailInfoEL[4]))[0]);
        // console.log($(detailInfoEL[4]),$($('div',$(detailInfoEL[4]))[0]),$(detailInfoEL[4]).context.children);
        // return;
        let buyer = result.buyer;
        let createdDate = new Date(1000 * result.created);
        let updatedDate = new Date(1000 * result.updated);
        console.log(container);
        container.append(`
            <mer-display-row variant="small" mer-defined="">
                <span slot="title">出品日時</span>
                <span slot="body" data-testid="${createdDate.toISOString()}">${createdDate.toISOString()}</span>
            </mer-display-row>
            <mer-display-row variant="small" mer-defined="">
                <span slot="title">更新日時</span>
                <span slot="body" data-testid="${updatedDate.toISOString()}">${updatedDate.toISOString()}</span>
            </mer-display-row>
            <mer-display-row variant="small" mer-defined="">
                <span slot="title">購入者</span>
                <span slot="body" data-testid="${buyer.name}">${buyer.name}</span>
            </mer-display-row>
          
        `)
        console.log(detailInfoEL[4])
    }
    // console.log(detailInfoEL[4],$('section','#item-info'))
}
// const callback = function(mutationsList, observer) {
//     // for(const mutation of mutationsList) {
//     //     if (mutation.type === 'childList') {
//     //         console.log('A child node has been added or removed.');
//     //     }
//     //     else if (mutation.type === 'attributes') {
//     //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
//     //     }
//     //     console.log(mutation);
//     // }
//     console.log("updated",$('section','#item-info'));
//     if($('section','#item-info').length > 0) {
//         $.ajax({
//             type: "GET",
//             url: "https://api.mercari.jp/items/get",
//             headers: {
//                 "X-Platform": "web",
//                 "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiSV81ekRiUHAySVZwZXhkUllCTFJwWDF4c3ZJZF9qdW52QjdvOGY0MzhkdyIsInkiOiJEM3BVcTZya1F0RWdFamJBNXlMRVZVX2d6OXhKOTQ4ZFk3QVNxYnhPRW1BIn19.eyJpYXQiOjE2MzQ3MTYwNzgsImp0aSI6IjIyNjg1YzUzLTMyZWMtNDc0Yi1iMDk1LWVkZDczZDdkMTBiYSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0IiwiaHRtIjoiR0VUIn0.NI0OVE9bpxCjgLlNbuLGJW5CzpRGEyEUTxdIQBQpXOeo1WXopVCIhLcRnsp7ZXDZ1amGTCNZXTCXxEYEZtIVWA"
//             },
//             data: { id: itemId },
//             success: function(data) { 
//                 detailInfoEL = $('section','#item-info')
//                 console.log(detailInfoEL[4],$('section','#item-info'))
//             }
//         });
        
//     }
// };
// const observer = new MutationObserver(callback);
// observer.observe(targetNode, config);
$.ajax({
    type: "GET",
    url: "https://api.mercari.jp/items/get",
    headers: {
        "X-Platform": "web",
        "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiSV81ekRiUHAySVZwZXhkUllCTFJwWDF4c3ZJZF9qdW52QjdvOGY0MzhkdyIsInkiOiJEM3BVcTZya1F0RWdFamJBNXlMRVZVX2d6OXhKOTQ4ZFk3QVNxYnhPRW1BIn19.eyJpYXQiOjE2MzQ3MTYwNzgsImp0aSI6IjIyNjg1YzUzLTMyZWMtNDc0Yi1iMDk1LWVkZDczZDdkMTBiYSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0IiwiaHRtIjoiR0VUIn0.NI0OVE9bpxCjgLlNbuLGJW5CzpRGEyEUTxdIQBQpXOeo1WXopVCIhLcRnsp7ZXDZ1amGTCNZXTCXxEYEZtIVWA"
    },
    data: { id: itemId },
    success: function(data) {
        result = data.data 
        updateDetailInfo();
    }
});