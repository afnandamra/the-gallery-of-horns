'use strict';
// <template id="photo-template">
// <h2></h2>
// <img src="" alt="">
// <p></p>
// </template>

// {
//     "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
//     "title": "UniWhal",
//     "description": "A unicorn and a narwhal nuzzling their horns",
//     "keyword": "narwhal",
//     "horns": 1
// }

$(function () {
    // get data
    $.ajax('./data/page-1.json').then(data => {
        data.forEach(element => {
            // console.log(element.title);
            let newTemplate = new Template(
                element.image_url,
                element.title,
                element.description,
                element.keyword,
                element.horns);
            // console.log(newTemplate);
            newTemplate.render();
        });

    })

    // constructor
    let keywords = [];
    function Template(url, title, description, keyword, horns) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
        keywords.push(this.keyword);
    }

    // render method
    Template.prototype.render = function () {
        let tem = $('#photo-template').clone();
        tem.removeAttr('id');
        tem.find('h2').text(this.title);
        tem.find('img').attr('src', this.url);
        tem.find('p').text(this.description);
        $('main').append(tem);
    }
    // render keywords



    // 

});