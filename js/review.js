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
    let datas = [];
    let currentShowNum = 0;
    const updateDetailInfo = (data) => {
        let sticker = "";
        let message = ""
        let rating = ""
        detailInfoEL = $('mer-item-thumbnail', 'a[href="/item/' + data['id'] + '"]')
        let filepath = $(detailInfoEL[0]).attr("src");
        $('a[href="/item/' + data['id'] + '"]').css({ display: "block" })
        if (!detailInfoEL.length) return;
        currentShowNum++;
        if (data.status == "trading") {
            sticker = "sticker='sold'"
        }
        if (data.comments[0]) {
            message = '<div style="display:flex"><img src="https://www.svgrepo.com/show/356146/comment.svg" /><div style="align-items:center;display:flex;"> ' + data.comments[0]['message'] + "</div></div>";
        }
        if (data.seller.ratings.good > data.seller.ratings.bad) {
            rating = '<span class="item-name" style="line-height:1;color: blue;display: block;">Good</span>'
        } else {
            rating = '<span class="item-name" style="line-height:1;color: red;display: block;">Good</span>'
        }
        // $('a[href="/item/'+data['id']+'"]').html('');
        $('a[href="/item/' + data['id'] + '"]').html(`
        <mer-item-thumbnail item-name=\"${data.name}" src=\"${filepath}\" alt=\"adfs\" size=\"fluid\" price=\"${data.price}\" radius=\"\" mer-defined=\"\" ${sticker}>
        </mer-item-thumbnail>
        <span class="item-name" style="line-height:1"><div style="display:flex"><img src="https://www.svgrepo.com/show/356087/pie.svg" /><div style="align-items:center;display:flex;"> ${(new Date(1000 * data.updated)).toISOString()}</div></div></span>
        <span class="item-name" style="line-height:1">${message}</span>
        ${rating}`);

    }
    const callback = function(mutationsList, observer) {

        // let showedItemsNum = $('.style_comment__1BGTS').length;
        // if(currentShowNum % 30 != 0) return;
        // if(currentShowNum < showedItemsNum) {
        //     currentShowNum = 0;
        //     for(let i = 0; i < datas.length; i++){
        //         updateDetailInfo(datas[i])
        //     }
        // }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    if (datas.length) return;
    $.ajax({
        type: "GET",
        url: "https://api.mercari.jp/reviews/history",
        headers: {
            "X-Platform": "web",
            "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiNE9ySUxYeVRkREM0ck9Yb0JWYWdrNjBmLUhqVlpyQmZ5S2U1S3ZBcDlkcyIsInkiOiJRUUJ3TFlZSWlZa2dDRjVIUGZZcmJGSlVTSVYyaVBob192bXktclN4TWE0In19.eyJpYXQiOjE2MzQ4OTA5NTYsImp0aSI6ImU0MWExYjYxLTA4Y2UtNDg1Yi1iNzZhLTE1NjM5YjdmZjA2NyIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvcmV2aWV3cy9oaXN0b3J5IiwiaHRtIjoiR0VUIiwidXVpZCI6IjA3ZjJhMWU2LTczNzItNGQxOS1iMmMxLWYxYzIxNzI4ZmI4NCJ9.fkSpblr0My7BfT2R7H02giRj1YvZVd7gS1LelSGvE1rwlqa-nbFyz734fsOTh1Dex7h7WXJt6Sqko0_H74fQgg"
        },
        data: {
            user_id: userId,
            subject: "seller,buyer",
            fame: "good,normal,bad",
            limit: 100
        },
        success: function(data) {
            result = data.data
            let itemNum = result.length;
            console.log(result, itemNum)
            for (let i = 0; i < itemNum; i++) {
                $.ajax({
                    type: "GET",
                    url: "https://api.mercari.jp/items/get_items",
                    headers: {
                        "X-Platform": "web",
                        "DPoP": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiNE9ySUxYeVRkREM0ck9Yb0JWYWdrNjBmLUhqVlpyQmZ5S2U1S3ZBcDlkcyIsInkiOiJRUUJ3TFlZSWlZa2dDRjVIUGZZcmJGSlVTSVYyaVBob192bXktclN4TWE0In19.eyJpYXQiOjE2MzQ4ODkxODEsImp0aSI6ImU2OWFiZDllLWUyZWQtNDI2Ny04NzIxLTVjYjRkNTNlNDA4NSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0X2l0ZW1zIiwiaHRtIjoiR0VUIiwidXVpZCI6IjA3ZjJhMWU2LTczNzItNGQxOS1iMmMxLWYxYzIxNzI4ZmI4NCJ9._R2sCDO6SHUKIwjfYZkbwifSEN0c0k4dKpIodmvFCrGIpT1hCT7HvUFiswwDVXm9B-07_Ils1ZGPfA4LFm-NAw"
                    },
                    data: {
                        seller_id: result[i].user.id,
                        limit: 5,
                        status: "on_sale,trading,sold_out"
                    },
                    success: function(data) {
                        console.log("data", data)
                        let dataLength = data.data.length;
                        let thumb;
                        let name;
                        let href;
                        if (!dataLength) {
                            let images = [
                                "https://static.mercdn.net/thumb/photos/m67969487976_1.jpg?1618400606",
                                "https://static.mercdn.net/thumb/photos/m65630425715_1.jpg?1633084178",
                                "https://static.mercdn.net/thumb/photos/m91757743909_1.jpg?1628170553",
                                "https://static.mercdn.net/thumb/photos/m53642437576_1.jpg?1605008264",
                                "https://static.mercdn.net/thumb/photos/m69678924009_1.jpg?1625285728"
                            ]
                            let hrefs = [
                                "m89670852656",
                                "m65630425715",
                                "m91757743909",
                                "m53642437576",
                                "m69678924009"
                            ]
                            let names = [
                                "Qpa10周年記念 グラッテ第2弾 アクリルコースター クッキー はらだ先生",
                                "Sunny手帳 セミバーチカル 2022年 1月始まり B6 アッシュグレー",
                                "【チーズ様専用】リュック",
                                "CoCo壱 第2弾アズールレーン クリアファイル 全8種類12枚訳あり",
                                "犬小屋@トレカ扱い店の専用ページ"
                            ]
                            thumb = images[i % 5]
                            name = names[i % 5]
                            href = hrefs[i % 5]+data.id;
                        } else {
                            data = data.data[i % dataLength];
                            thumb = data.thumbnails[0]
                            name = data.name;
                            href = "https://jp.mercari.com/item/"+data.id;
                        }
                        let dom = $(".style_textContainer__1KJEs",$(".style_comment__1BGTS")[i])
                        dom.css({display:"flex"});
                        let html = dom.html();
                        
                        dom.html(`<div style="width: 50%; align-items: center; display: flex;"><div>${html}</div></div>
                            <div class="style_textContainer__1KJEs" style="display:flex; width:50%;align-items: center;">
                                <img src="${thumb}" alt="ニ avatar" loading="lazy" decoding="async" style="width:50px;height:50px;"/>
                                <div style="justify-content: center;align-items: center;display:flex;"> <a href="${href}"> &nbsp;&nbsp;${name}</a></div>
                            </div>`)

                        console.log(thumb);
                        // updateDetailInfo(data.data);
                        // datas.push(data.data);
                    }
                });
            }
        }
    });
}
main();