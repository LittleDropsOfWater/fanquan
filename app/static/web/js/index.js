require.config({
    baseUrl: './js/libs',
    paths: {
        'mui': 'mui.min',
        'flex': 'flexible'
    }
})

require(['mui', 'flex'], (mui) => {

    var oldidx = 0,
        skip = 0,
        limit = 5;

    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh,
                auto: true
            }
        }
    });
    init()

    function init() {
        tabsChange()
    }

    function tabsChange() {
        var lis = [...document.querySelectorAll('.tabs li')];
        lis.forEach(val => {
            val.onclick = function() {
                if (!val.classList.contains('active')) {
                    lis.forEach(val => {
                        val.classList.remove('active')
                    })
                    val.classList.add('active')
                    datashow.innerHTML = `<P style='text-align:center;padding:10px 0;'>正在加载...</P>`;
                    pullupRefresh();
                }
            }
        })
    }

    var timer = null;

    function pullupRefresh() {
        clearTimeout(timer);
        timer = setTimeout(function() {


            var idx = document.querySelector('.tabs .active').getAttribute('type');
            console.log('type:', idx);
            if (idx == oldidx) {
                skip += limit;
            } else {
                skip = 0;
            }
            mui.ajax('api/getData', {
                data: {
                    type: idx,
                    skip,
                    limit
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(res) {
                    render(res.data, idx)
                    oldidx = idx;
                },
                error: function(xhr, type, errorThrown) {}
            });
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
        }, 500)
    }

    function render(data, idx) {
        var str = data.map(val => {
            return ` <li class="mui-table-view-cell">
                <p>${val.name}</p>
                <p>${val.title}</p>
        </li>`;
        }).join('');
        console.log(idx);

        if (idx > 0) {
            datashow.classList.add('pull');
        } else {
            datashow.classList.remove('pull');
        }
        if (oldidx == idx) {
            datashow.innerHTML += str;
        } else {
            datashow.innerHTML = str;

        }
    }

})