/**
 * Simulates the jQuery $.ajax() function.
 * 
 * @param {Object} option
 * 
 * @return {Void}
 */
function ajax(option)
{
    if (typeof(option.url) == 'undefined') {
        try {
            option.url = location.href;
        } catch(e) {
            var ajaxLocation;
            ajaxLocation = document.createElement('a');
            ajaxLocation.href = '';
            option.url = ajaxLocation.href;
        }
    }
    if (typeof(option.type) == 'undefined') {
        option.type = 'GET';
    }
    if (typeof(option.data) == 'undefined') {
        option.data = null;
    } else {
        var data = '';
        for (x in option.data) {
            if (data != '') {
                data += '&';
            }
            data += encodeURIComponent(x)+'='+encodeURIComponent(option.data[x]);
        };
        option.data = data;
    }
    if (typeof(option.statusCode) == 'undefined') {
        option.statusCode = {};
    }
    if (typeof(option.beforeSend) == 'undefined') {
        option.beforeSend = function () {};
    }
    if (typeof(option.success) == 'undefined') {
        option.success = function () {};
    }
    if (typeof(option.error) == 'undefined') {
        option.error = function () {};
    }
    if (typeof(option.complete) == 'undefined') {
        option.complete = function () {};
    }
    typeof(option.statusCode['404']);

    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) { try { xhr = new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) { xhr = new ActiveXObject('Microsoft.XMLHTTP'); } }
        else { xhr = new XMLHttpRequest(); }
    } else { alert('Your browser does not support XMLHTTPRequest object...'); return null; }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 1) {
            option.beforeSend();
        }
        if (xhr.readyState == 4) {
            option.complete(xhr, xhr.status);
            if (xhr.status == 200 || xhr.status == 0) {
                option.success(xhr.responseText);
            } else {
                option.error(xhr.status);
                if (typeof(option.statusCode[xhr.status]) != 'undefined') {
                    option.statusCode[xhr.status]();
                }
            }
        }
    };

    if (option.type == 'POST') {
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(option.data);
    } else {
        xhr.open(option.type, option.url+option.data, true);
        xhr.send(null);
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    var toggle = document.querySelectorAll('.lima-licence-key-toggle');

    if (toggle) {
        for(var i = 0; i < toggle.length; i++) {

            

            toggle[i].addEventListener('click', function() {

                var spinner = this.parentNode.parentNode.previousSibling;
                spinner.style.opacity = 1;
                var licenceKeyId = parseInt(this.dataset.id);

                ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'lima_show_licence_key',
                        show: licence.show,
                        id: licenceKeyId
                    },
                    success: function(response) {
                        var response = JSON.parse(response);
                        console.log(response);
                    },
                    error: function(response) {
                        console.log(response);
                    },
                    complete: function() {
                        spinner.style.opacity = 0;
                    }
                });

            });
        }
    }
});