'use strict';

$(function () {
    let keywords = [];
    let objects = [];
    // get data
    const page1 = () => {
        $.ajax('./data/page-1.json').then(data => {
            keywords = [];
            objects = [];
            data.forEach(element => {
                let newTemplate = new Template(
                    element.image_url,
                    element.title,
                    element.description,
                    element.keyword,
                    element.horns);
                objects.push(newTemplate);

            });
            filter();
            sortByName(objects);
            objects.forEach(obj => {
                let renderedObj = obj.render();
                $('#cards').append(renderedObj);
            })
            // event
            select();
            sort();
        })
    }
    const page2 = () => {
        keywords = [];
        objects = [];
        $.ajax('./data/page-2.json').then(data => {
            console.log(data);
            data.forEach(element => {
                let newTemplate = new Template(
                    element.image_url,
                    element.title,
                    element.description,
                    element.keyword,
                    element.horns);
                objects.push(newTemplate);

            });
            filter();
            sortByName(objects);
            objects.forEach(obj => {
                let renderedObj = obj.render();
                $('#cards').append(renderedObj);
            })
            // event
            select();
            sort();
        })
    }
    page1();

    // sorting


    $('#page1').click(function () {
        $('#cards').html('');
        $('select').first().empty();
        page1();
        $('#sort').val('default');
    });

    $('#page2').on('click', function () {
        $('#cards').html('');
        $('select').first().empty();
        page2();
        $('#sort').val('default');
    });

    // filtering
    function select() {
        $('select').first().on('change', function () {
            // $('div').css('display', 'none');
            $('#cards').empty();
            objects.forEach(item => {
                if ($(this).val() === item.keyword) {
                    $('#cards').append(item.render());
                }
            })
            if ($(this).val() === 'default') {
                objects.forEach(item => {
                    $('#cards').append(item.render());
                })
            }
        })
    }


    // sorting
    function sort() {
        $('#sort').on('change', function () {
            $('#cards').html('');
            console.log($(this).val());
            if ($(this).val() === 'title') {
                sortByName(objects);
            } else if ($(this).val() === 'horns') {
                sortByHorns(objects);
            } else {
                $(this).val('default');
                objects.forEach(obj => {
                    let renderedObj = obj.render();
                    $('#cards').append(renderedObj);
                })
            }
        })
    }

    function sortByName(objArr) {
        objArr.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        objArr.forEach(obj => {
            let renderedObj = obj.render();
            $('#cards').append(renderedObj);
        })
    }

    function sortByHorns(objArr) {
        objArr.sort((a, b) => {
            if (a.horns < b.horns) return -1;
            else if (a > b) return 1;
            else return 0;
        })
        objArr.forEach(obj => {
            let renderedObj = obj.render();
            $('#cards').append(renderedObj);
        })
    }



    // constructor
    function Template(url, title, description, keyword, horns) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
    }
    Template.prototype.addArray = function () {
        if (!keywords.includes(this.keyword)) {
            keywords.push(this.keyword);
        }
    }

    // render method
    Template.prototype.render = function () {
        let tem = $('#template').html();
        let card = Mustache.render(tem, this);
        return card;

        // let tem = $('#photo-template').clone();
        // tem.removeAttr('id');
        // tem.find('h2').text(this.title);
        // tem.find('img').attr('src', this.url);
        // tem.find('p').text(this.description);
        // $('main').append(tem);
    }



    // render keywords
    const filter = () => {
        objects.forEach(obj => {
            obj.addArray();
        })
        keywords.forEach(item => {
            let selectKey = $('option').first().clone();
            selectKey.attr('value', item);
            selectKey.text(item);
            $('select').first().append(selectKey);
        })
    }


});