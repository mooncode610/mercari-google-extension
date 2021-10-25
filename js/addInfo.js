console.log("On addInfo.js");

function main() {
    let detailInfoEL;
    let currentLocation = location.href;
    let itemId = currentLocation.split("/")[currentLocation.split("/").length - 1]
    const targetNode = document;
    const config = { childList: true, subtree: true };
    let result;
    let buyer;
    let createdDate
    let updatedDate

    const updateDetailInfo = () => {
            if ($("span[name='buyerName']").length > 0) return;
            detailInfoEL = $('section', '#item-info')
            if (detailInfoEL.length == 0) {
                setTimeout(updateDetailInfo, 500);
            } else {
                let container = $($('div', $(detailInfoEL[4]))[0]);
                buyer = result.buyer;
                if (!buyer) buyer = { name: "No buyer" };
                createdDate = new Date(1000 * result.created);
                updatedDate = new Date(1000 * result.updated);
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
                    <span slot="body" id='buyerName' name='buyerName' data-testid="${buyer.name}" style="cursor: pointer;">${buyer.name}</span>
                </mer-display-row>
            
            `)
                $('#buyerName').click(function() {
                    if (buyer.id)
                        location.href = "https://jp.mercari.com/user/profile/" + buyer.id;
                })
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
            "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiNklLYkc2NnNycFQ4clNpb0J2c0RTbURfY0ItZnhob1VpN1ZUWWdCOTJEZyIsInkiOiJDT1FWQnIxNm5vZ2hvLWVHekRNYXhVa0toZ001anN3eE92ZzVTUmhsWVFRIn19.eyJpYXQiOjE2MzQ4OTkzMjYsImp0aSI6ImY0MGY5NTI5LTQ5YmQtNDM3My1hYWYzLTU0MjQzOTc4Y2ViZiIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0IiwiaHRtIjoiR0VUIiwidXVpZCI6IjkxMGJmOTZmLWZiYTItNGQ5Mi04NjU0LWE4NzE3OWQ1NTVlNyJ9.CyiG-IxEk7om7vqc3gn3x9KuJV1GpZtX9Go0noido75sdWNn9x752_GOSxa6pqrf_zPQU1LCJosTu0ixR-CbNw"
        },
        data: { id: itemId },
        success: function(data) {
            result = data.data
            updateDetailInfo();
        }
    });
}
main();